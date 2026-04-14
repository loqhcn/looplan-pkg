// @ts-nocheck
type LogLevel = 'info' | 'error' | 'system';
type BuildStatus = 'running' | 'done' | 'failed';

interface BuildLog {
    id: string;
    time: string;
    level: LogLevel;
    pkg?: string;
    status?: BuildStatus;
    message: string;
}

const LOG_LIMIT = 800;
const encoder = new TextEncoder();
const logs: BuildLog[] = [];
const clients = new Set<ReadableStreamDefaultController<Uint8Array>>();
const wsClients = new Set<any>();
const building = new Set<string>();

const sseHeaders = {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
};

function createLog(
    message: string,
    options: { level?: LogLevel; pkg?: string; status?: BuildStatus } = {},
): BuildLog {
    return {
        id: `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
        time: new Date().toISOString(),
        level: options.level || 'info',
        pkg: options.pkg,
        status: options.status,
        message,
    };
}

function pushLog(entry: BuildLog): void {
    logs.push(entry);
    if (logs.length > LOG_LIMIT) logs.shift();

    const wsPayload = JSON.stringify(entry);
    for (const ws of wsClients) {
        try {
            ws.send(wsPayload);
        } catch {
            wsClients.delete(ws);
        }
    }

    const payload = `data: ${JSON.stringify(entry)}\n\n`;
    for (const client of clients) {
        try {
            client.enqueue(encoder.encode(payload));
        } catch {
            clients.delete(client);
        }
    }
}

export function registerBuildLogWsClient(ws: any): void {
    wsClients.add(ws);
    for (const item of logs) {
        try {
            ws.send(JSON.stringify(item));
        } catch {
            wsClients.delete(ws);
            break;
        }
    }
}

export function unregisterBuildLogWsClient(ws: any): void {
    wsClients.delete(ws);
}

async function readStreamLines(
    stream: ReadableStream<Uint8Array> | null,
    onLine: (line: string) => void,
): Promise<void> {
    if (!stream) return;
    const decoder = new TextDecoder();
    const reader = stream.getReader();
    let cache = '';

    while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        cache += decoder.decode(value, { stream: true });
        const lines = cache.split(/\r?\n/);
        cache = lines.pop() || '';

        for (const line of lines) {
            const text = line.trim();
            if (text) onLine(text);
        }
    }

    const tail = cache.trim();
    if (tail) onLine(tail);
}

async function runBuild(pkg: string): Promise<void> {
    if (building.has(pkg)) {
        pushLog(createLog(`包 ${pkg} 正在构建中，请勿重复提交`, { level: 'system', pkg }));
        return;
    }

    building.add(pkg);
    pushLog(createLog(`开始构建 ${pkg}`, { level: 'system', pkg, status: 'running' }));

    const command = ['bun', 'run', '.\\scripts\\build.ts', `--pkg=${pkg}`];
    const proc = Bun.spawn(command, {
        cwd: process.cwd(),
        stdout: 'pipe',
        stderr: 'pipe',
    });

    try {
        await Promise.all([
            readStreamLines(proc.stdout, (line) => {
                pushLog(createLog(line, { level: 'info', pkg, status: 'running' }));
            }),
            readStreamLines(proc.stderr, (line) => {
                pushLog(createLog(line, { level: 'error', pkg, status: 'running' }));
            }),
        ]);

        const exitCode = await proc.exited;
        if (exitCode === 0) {
            pushLog(createLog(`构建完成 ${pkg}`, { level: 'system', pkg, status: 'done' }));
        } else {
            pushLog(
                createLog(`构建失败 ${pkg}，退出码 ${exitCode}`, {
                    level: 'error',
                    pkg,
                    status: 'failed',
                }),
            );
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        pushLog(createLog(`构建异常 ${pkg}: ${message}`, { level: 'error', pkg, status: 'failed' }));
    } finally {
        building.delete(pkg);
    }
}

function handleSSE(corsHeaders: Record<string, string>): Response {
    const stream = new ReadableStream<Uint8Array>({
        start(controller) {
            clients.add(controller);
            controller.enqueue(encoder.encode(`event: ready\ndata: ok\n\n`));
            for (const item of logs) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(item)}\n\n`));
            }
        },
    });

    return new Response(stream, {
        status: 200,
        headers: {
            ...sseHeaders,
            ...corsHeaders,
        },
    });
}

export default class Build {
    public health() {
        return {
            ok: true,
            service: 'build',
            buildingCount: building.size,
        };
    }

    public logs() {
        return { ok: true, logs };
    }

    public stream(ctx: any) {
        return handleSSE(ctx.corsHeaders);
    }

    public clearLogs() {
        logs.length = 0;
        return { ok: true, message: '日志已清空' };
    }

    public async build(ctx: any) {
        let body: { pkg?: string } = {};
        try {
            body = await ctx.readJson();
        } catch {
            return ctx.json({ ok: false, message: '请求体必须是 JSON' }, 400);
        }

        const pkg = (body.pkg || '').trim();
        if (!pkg) {
            return ctx.json({ ok: false, message: 'pkg 不能为空' }, 400);
        }

        if (building.has(pkg)) {
            return ctx.json({ ok: false, message: `${pkg} 正在构建` }, 409);
        }

        void runBuild(pkg);
        return ctx.json({ ok: true, message: `已提交构建任务: ${pkg}` }, 202);
    }
}

pushLog(createLog('Build cloud object 已加载', { level: 'system' }));
