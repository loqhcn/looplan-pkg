export type CommandHooks = {
    timeout?: number
    stream?: boolean
    onSend?: (packet: any) => void
    onStart?: (result: any, packet: any) => void
    onChunk?: (chunk: any, packet: any) => void
    onEnd?: (result: any, packet: any) => void
    onResponse?: (result: any, packet: any) => void
    onError?: (error: Error | any) => void
}

export type CommandResponse = {
    code: number
    msg: string
    data: any
    timestamp: number
}

export type CommandRequest = {
    id: string
    name: string
    data: Record<string, any> | null
    hooks: CommandHooks
    abortSignal: AbortSignal
}

export type CommandHandler = (req: CommandRequest) => Promise<CommandResponse> | CommandResponse

const DEFAULT_API_BASE = 'http://localhost:3007'

const DEFAULT_MODELS = [
    {
        id: 'dev-default-agent',
        providerName: 'looplan-ai',
        providerTitle: '本地测试服务',
        modelName: 'deepseek-v4-flash',
        modelType: 'llm',
        isDefault: true,
    },
]

function createResponse(code: number, msg: string, data: any) {
    return {
        code,
        msg,
        data,
        timestamp: Date.now(),
    }
}

function createErrorResponse(message: string, code = 500, data: any = null) {
    return createResponse(code, message, data)
}

function normalizeApiBase(data: Record<string, any> | null) {
    return String(data?.baseUrl || data?.apiBase || DEFAULT_API_BASE).replace(/\/$/, '')
}

function parseStreamLine(line: string) {
    const text = String(line || '').trim()
    if (!text) {
        return null
    }
    const separatorIndex = text.indexOf(':')
    if (separatorIndex < 0) {
        return null
    }
    const type = text.slice(0, separatorIndex)
    const rawPayload = text.slice(separatorIndex + 1)
    try {
        return {
            type,
            payload: rawPayload ? JSON.parse(rawPayload) : {},
        }
    } catch {
        return {
            type,
            payload: {
                raw: rawPayload,
            },
        }
    }
}

function emitStreamLine(req: CommandRequest, line: string, done = false) {
    req.hooks.onChunk?.(line, {
        type: 'stream',
        requestId: req.id,
        done,
        result: {
            stream: {
                stop: done,
                data: line,
            },
        },
    })
}

function createStreamState() {
    return {
        sessionId: '',
        content: '',
        think: '',
        modelName: '',
        events: [] as any[],
        tools: [] as any[],
        rawLines: [] as string[],
        finalData: null as any,
        errorMessage: '',
    }
}

function applyStreamPayload(state: ReturnType<typeof createStreamState>, type: string, payload: any, line: string) {
    state.rawLines.push(line)
    if (type === 'res') {
        state.sessionId = String(payload?.data?.sessionId || state.sessionId || '')
        return
    }
    if (type === 'say' && typeof payload?.content === 'string') {
        state.content += payload.content
        state.sessionId = String(payload?.sessionId || state.sessionId || '')
        return
    }
    if (type === 'think' && typeof payload?.content === 'string') {
        state.think += payload.content
        state.sessionId = String(payload?.sessionId || state.sessionId || '')
        return
    }
    if (type === 'tool') {
        state.tools.push(payload)
        return
    }
    if (type === 'event') {
        state.events.push(payload)
        return
    }
    if (type === 'error') {
        state.errorMessage = String(payload?.msg || payload?.data?.error || '请求失败')
        return
    }
    if (type === 'data') {
        state.finalData = payload
        state.sessionId = String(payload?.sessionId || state.sessionId || '')
        if (typeof payload?.content === 'string') {
            state.content = payload.content
        }
        if (typeof payload?.think === 'string') {
            state.think = payload.think
        }
        if (typeof payload?.modelName === 'string') {
            state.modelName = payload.modelName
        }
    }
}

function buildChatPayload(data: Record<string, any> | null, stream: boolean) {
    const messages = Array.isArray(data?.messages) ? data?.messages : []
    const prompt = String(
        data?.message ||
        data?.prompt ||
        messages[messages.length - 1]?.content ||
        ''
    ).trim()
    const history = Array.isArray(data?.history)
        ? data.history
        : messages.slice(0, -1).map((item: any) => ({
            role: String(item?.role || ''),
            content: String(item?.content || ''),
        }))
    return {
        message: prompt,
        sessionId: data?.sessionId ? String(data.sessionId) : undefined,
        history,
        model: data?.model ? String(data.model) : undefined,
        stream,
    }
}

async function fetchJson(url: string, body: Record<string, any>, signal: AbortSignal) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal,
    })

    if (!response.ok) {
        throw new Error(await response.text() || `请求失败: ${response.status}`)
    }

    return response.json()
}

async function readProtocolStream(
    response: Response,
    req: CommandRequest,
    state: ReturnType<typeof createStreamState>,
) {
    if (!response.body) {
        return
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let started = false
    let buffer = ''

    while (true) {
        const { done, value } = await reader.read()
        if (done) {
            break
        }
        if (!started) {
            started = true
            req.hooks.onStart?.(
                createResponse(200, 'start', {
                    sessionId: state.sessionId,
                }),
                {
                    type: 'stream',
                    requestId: req.id,
                }
            )
        }
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split(/\r?\n/)
        buffer = lines.pop() || ''

        for (const line of lines) {
            const text = String(line || '').trim()
            if (!text) {
                continue
            }
            emitStreamLine(req, text, false)
            const parsed = parseStreamLine(text)
            if (!parsed) {
                continue
            }
            applyStreamPayload(state, parsed.type, parsed.payload, text)
        }
    }

    buffer += decoder.decode()
    const tail = String(buffer || '').trim()
    if (tail) {
        emitStreamLine(req, tail, false)
        const parsed = parseStreamLine(tail)
        if (parsed) {
            applyStreamPayload(state, parsed.type, parsed.payload, tail)
        }
    }
}

function createStreamResult(state: ReturnType<typeof createStreamState>, aborted = false) {
    if (aborted) {
        return createResponse(200, 'aborted', {
            sessionId: state.sessionId,
            content: state.content,
            think: state.think,
            modelName: state.modelName,
            events: state.events,
            tools: state.tools,
            rawLines: state.rawLines,
        })
    }
    if (state.finalData) {
        return createResponse(
            state.errorMessage ? 500 : 200,
            state.errorMessage || 'success',
            {
                ...state.finalData,
                content: state.content,
                think: state.think,
                modelName: state.modelName || state.finalData?.modelName || '',
                events: Array.isArray(state.finalData?.events) ? state.finalData.events : state.events,
                tools: state.tools,
                rawLines: state.rawLines,
            }
        )
    }
    if (state.errorMessage) {
        return createErrorResponse(state.errorMessage, 500, {
            sessionId: state.sessionId,
            content: state.content,
            think: state.think,
            events: state.events,
            tools: state.tools,
            rawLines: state.rawLines,
        })
    }
    return createErrorResponse('未接收到最终结果', 500, {
        sessionId: state.sessionId,
        content: state.content,
        think: state.think,
        events: state.events,
        tools: state.tools,
        rawLines: state.rawLines,
    })
}

async function requestChatStream(url: string, body: Record<string, any>, req: CommandRequest) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: req.abortSignal,
    })

    if (!response.ok) {
        throw new Error(await response.text() || `请求失败: ${response.status}`)
    }

    const state = createStreamState()
    await readProtocolStream(response, req, state)
    return createStreamResult(state, false)
}

const aiModels: CommandHandler = async (req) => {
    const modelType = String(req.data?.modelType || '').trim()
    const list = DEFAULT_MODELS.filter((item) => !modelType || item.modelType === modelType)
    return createResponse(200, 'success', {
        list,
    })
}

const aiChat: CommandHandler = async (req) => {
    const body = buildChatPayload(req.data, Boolean(req.data?.stream || req.hooks.stream))
    if (!body.message) {
        return createErrorResponse('缺少聊天内容', 400)
    }

    try {
        if (body.stream) {
            return await requestChatStream(`${normalizeApiBase(req.data)}/api/chat`, body, req)
        }
        const json = await fetchJson(`${normalizeApiBase(req.data)}/api/chat`, body, req.abortSignal)
        return createResponse(
            Number(json?.code ?? 200),
            String(json?.msg || 'success'),
            json?.data ?? json
        )
    } catch (error: any) {
        if (error?.name === 'AbortError') {
            return createResponse(200, 'aborted', {
                sessionId: String(req.data?.sessionId || ''),
                content: '',
            })
        }
        return createErrorResponse(error?.message || 'ai.chat 调用失败')
    }
}

const aiAgentChat: CommandHandler = async (req) => {
    const body = buildChatPayload(req.data, true)
    if (!body.message) {
        return createErrorResponse('缺少聊天内容', 400)
    }

    try {
        return await requestChatStream(`${normalizeApiBase(req.data)}/api/agent/chat`, body, req)
    } catch (error: any) {
        if (error?.name === 'AbortError') {
            return createResponse(200, 'aborted', {
                sessionId: String(req.data?.sessionId || ''),
                content: '',
                events: [],
            })
        }
        return createErrorResponse(error?.message || 'ai.agent.chat 调用失败')
    }
}

function createCommandMap() {
    const commands = new Map<string, CommandHandler>()
    commands.set('ai.chat', aiChat)
    commands.set('ai.models', aiModels)
    commands.set('ai.agent.chat', aiAgentChat)
    return commands
}

export {
    createCommandMap,
    DEFAULT_MODELS,
}
