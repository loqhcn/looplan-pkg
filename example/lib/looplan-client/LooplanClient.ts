import { createCommandMap } from './commands'
import type { CommandHandler, CommandHooks, CommandResponse } from './commands'

type PendingTask = {
    abortController: AbortController
    timer: ReturnType<typeof setTimeout> | null
    name: string
}

class LooplanClient {
    clientType = 'web'
    sequence = 0
    commands: Map<string, CommandHandler>
    pending = new Map<string, PendingTask>()

    constructor(commands?: Map<string, CommandHandler>) {
        this.commands = commands || createCommandMap()
    }

    nextId() {
        this.sequence += 1
        return `web_req_${Date.now()}_${this.sequence}`
    }

    async command(name: string, data: any, options: CommandHooks = {}) {
        const requestId = this.nextId()
        const packet = {
            type: 'request',
            requestId,
            name,
            data: data ?? null,
        }
        options.onSend?.(packet)

        if (name === 'command.abort') {
            const result = this.abortRequest(String(data?.requestId || ''))
            options.onResponse?.(result, {
                type: 'response',
                requestId,
                result,
            })
            return result
        }

        const commandHandler = this.commands.get(name)
        if (!commandHandler) {
            const result = this.createErrorResponse(`未实现命令: ${name}`, 404)
            options.onError?.(new Error(result.msg))
            options.onResponse?.(result, {
                type: 'response',
                requestId,
                result,
            })
            return result
        }

        const abortController = new AbortController()
        const timeout = options.timeout || (options.stream ? 120000 : 60000)

        const pendingTask: PendingTask = {
            abortController,
            timer: timeout > 0
                ? setTimeout(() => {
                    abortController.abort('timeout')
                }, timeout)
                : null,
            name,
        }
        this.pending.set(requestId, pendingTask)

        try {
            const result = await commandHandler({
                id: requestId,
                name,
                data: data ?? null,
                hooks: options,
                abortSignal: abortController.signal,
            })
            this.clearPending(requestId)
            options.onResponse?.(result, {
                type: 'response',
                requestId,
                result,
            })
            if (options.stream) {
                options.onEnd?.(result, {
                    type: 'stream',
                    requestId,
                    done: true,
                    result,
                })
            }
            return result
        } catch (error: any) {
            this.clearPending(requestId)
            const aborted = abortController.signal.aborted
            const result = aborted
                ? this.createResponse(200, 'aborted', {
                    requestId,
                    name,
                })
                : this.createErrorResponse(error?.message || `${name} 执行失败`)
            options.onError?.(error)
            options.onResponse?.(result, {
                type: 'response',
                requestId,
                result,
            })
            if (options.stream) {
                options.onEnd?.(result, {
                    type: 'stream',
                    requestId,
                    done: true,
                    result,
                })
            }
            return result
        }
    }

    commandStream(name: string, data: any, handlers: CommandHooks = {}) {
        return this.command(name, data, {
            ...handlers,
            stream: true,
            timeout: handlers.timeout || 120000,
        })
    }

    abort(requestId: string, handlers: CommandHooks = {}) {
        return this.command('command.abort', { requestId }, handlers)
    }

    abortRequest(requestId: string): CommandResponse {
        const pendingTask = this.pending.get(requestId)
        if (!pendingTask) {
            return this.createErrorResponse('请求不存在或已结束', 404, {
                requestId,
            })
        }
        pendingTask.abortController.abort('manual')
        this.clearPending(requestId)
        return this.createResponse(200, 'success', {
            requestId,
            name: pendingTask.name,
            aborted: true,
        })
    }

    clearPending(requestId: string) {
        const pendingTask = this.pending.get(requestId)
        if (pendingTask?.timer) {
            clearTimeout(pendingTask.timer)
        }
        this.pending.delete(requestId)
    }

    createResponse(code: number, msg: string, data: any): CommandResponse {
        return {
            code,
            msg,
            data,
            timestamp: Date.now(),
        }
    }

    createErrorResponse(message: string, code = 500, data: any = null): CommandResponse {
        return this.createResponse(code, message, data)
    }
}

export {
    LooplanClient,
}
