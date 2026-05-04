// @ts-nocheck
import { stat } from 'node:fs/promises';
import { join } from 'node:path';
import AdmZip from 'adm-zip';

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

interface OpenApiResponse<T = any> {
    code: number;
    msg: string;
    data?: T;
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

function normalizeEnv(value: string | undefined): string {
    return String(value || '').trim();
}

function normalizeVersion(input: string | undefined | null): string {
    return String(input || '')
        .trim()
        .replace(/^v/i, '');
}

function compareVersion(a: string, b: string): number {
    const aParts = normalizeVersion(a)
        .split('.')
        .map((v) => Number.parseInt(v.replace(/[^0-9].*$/, ''), 10) || 0);
    const bParts = normalizeVersion(b)
        .split('.')
        .map((v) => Number.parseInt(v.replace(/[^0-9].*$/, ''), 10) || 0);
    const maxLen = Math.max(aParts.length, bParts.length);
    for (let i = 0; i < maxLen; i += 1) {
        const av = aParts[i] ?? 0;
        const bv = bParts[i] ?? 0;
        if (av > bv) return 1;
        if (av < bv) return -1;
    }
    return 0;
}

async function requireDir(path: string): Promise<void> {
    const info = await stat(path).catch(() => null);
    if (!info || !info.isDirectory()) {
        throw new Error(`目录不存在: ${path}`);
    }
}

async function readDistPkgVersion(distPkgDir: string): Promise<string> {
    const packageJsonFile = Bun.file(join(distPkgDir, 'package.json'));
    if (!(await packageJsonFile.exists())) {
        throw new Error(`未找到 package.json: ${distPkgDir}`);
    }
    const pkgJson = await packageJsonFile.json().catch(() => null);
    const version = normalizeVersion(pkgJson?.version);
    if (!version) {
        throw new Error(`构建产物 package.json 缺少 version: ${distPkgDir}`);
    }
    return version;
}

function pickLatestVersion(latestVersion: any): string {
    return normalizeVersion(
        latestVersion?.version || latestVersion?.versionName || latestVersion?.tag || latestVersion?.name,
    );
}

async function requestOpenApiJson<T = any>(
    apiBase: string,
    apiKey: string,
    endpoint: string,
    body: Record<string, any>,
): Promise<OpenApiResponse<T>> {
    const url = `${apiBase.replace(/\/+$/, '')}${endpoint}`;
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-sign': apiKey,
        },
        body: JSON.stringify(body),
    });
    const data = (await resp.json().catch(() => null)) as OpenApiResponse<T> | null;
    if (!resp.ok || !data) {
        throw new Error(`请求失败 ${endpoint}: HTTP ${resp.status}`);
    }
    if (data.code !== 200) {
        throw new Error(`请求失败 ${endpoint}: ${data.msg || '未知错误'}`);
    }
    return data;
}

async function uploadByOpenApi(
    apiBase: string,
    apiKey: string,
    pkg: string,
    version: string,
    zipBuffer: Buffer,
): Promise<OpenApiResponse<any>> {
    const form = new FormData();
    form.append('name', pkg);
    form.append('version', version);
    form.append('file', new Blob([zipBuffer], { type: 'application/zip' }), `${pkg}-${version}.zip`);

    const resp = await fetch(`${apiBase.replace(/\/+$/, '')}/openapi/Component.upload`, {
        method: 'POST',
        headers: {
            'x-sign': apiKey,
        },
        body: form,
    });
    const data = (await resp.json().catch(() => null)) as OpenApiResponse<any> | null;
    if (!resp.ok || !data) {
        throw new Error(`上传失败: HTTP ${resp.status}`);
    }
    if (data.code !== 200) {
        throw new Error(`上传失败: ${data.msg || '未知错误'}`);
    }
    return data;
}

async function runUpload(pkg: string): Promise<void> {
    if (building.has(pkg)) {
        pushLog(createLog(`包 ${pkg} 正在处理中，请稍后重试`, { level: 'system', pkg }));
        return;
    }

    building.add(pkg);
    pushLog(createLog(`开始上传 ${pkg}`, { level: 'system', pkg, status: 'running' }));
    try {
        const distPkgDir = join(process.cwd(), 'dist', pkg);
        await requireDir(distPkgDir);
        pushLog(createLog(`检测到构建目录: ${distPkgDir}`, { level: 'info', pkg, status: 'running' }));

        const localVersion = await readDistPkgVersion(distPkgDir);
        pushLog(createLog(`本地版本: ${localVersion}`, { level: 'info', pkg, status: 'running' }));

        const apiBase = normalizeEnv(Bun.env.VITE_LP_API_URL) || 'https://api.looplan.cn';
        const apiKey = normalizeEnv(Bun.env.VITE_LP_API_KEY);
        if (!apiKey) {
            throw new Error('缺少环境变量: VITE_LP_API_KEY');
        }

        const detailRes = await requestOpenApiJson<{ latestVersion?: any }>(
            apiBase,
            apiKey,
            '/openapi/Component.getByName',
            { name: pkg },
        );
        const remoteVersion = pickLatestVersion(detailRes?.data?.latestVersion);
        if (remoteVersion) {
            pushLog(createLog(`线上最新版本: ${remoteVersion}`, { level: 'info', pkg, status: 'running' }));
            if (compareVersion(localVersion, remoteVersion) <= 0) {
                throw new Error(`本地版本(${localVersion})必须大于线上版本(${remoteVersion})`);
            }
        } else {
            pushLog(createLog('线上暂无可比较版本，按首次上传处理', { level: 'system', pkg, status: 'running' }));
        }

        const zip = new AdmZip();
        zip.addLocalFolder(distPkgDir, '');
        const zipBuffer = zip.toBuffer();
        pushLog(
            createLog(`压缩完成: ${(zipBuffer.length / 1024).toFixed(1)} KB`, {
                level: 'info',
                pkg,
                status: 'running',
            }),
        );

        const uploadRes = await uploadByOpenApi(apiBase, apiKey, pkg, localVersion, zipBuffer);
        const mainUrl = uploadRes?.data?.cloudResult?.mainUrl;
        const successMsg = mainUrl
            ? `上传成功 ${pkg}@${localVersion} -> ${mainUrl}`
            : `上传成功 ${pkg}@${localVersion}`;
        pushLog(createLog(successMsg, { level: 'system', pkg, status: 'done' }));
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        pushLog(createLog(`上传失败 ${pkg}: ${message}`, { level: 'error', pkg, status: 'failed' }));
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

    public async upload(ctx: any) {
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
            return ctx.json({ ok: false, message: `${pkg} 正在处理中` }, 409);
        }

        void runUpload(pkg);
        return ctx.json({ ok: true, message: `已提交上传任务: ${pkg}` }, 202);
    }
}

pushLog(createLog('Build cloud object 已加载', { level: 'system' }));
