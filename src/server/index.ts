// @ts-nocheck
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { registerBuildLogWsClient, unregisterBuildLogWsClient } from './functions/Build.obj';

const PORT = Number(process.env.BUILD_SERVER_PORT || 5050);

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

function respondJson(data: unknown, status = 200): Response {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            ...corsHeaders,
        },
    });
}

function parseRoute(pathname: string): { objectName: string; methodName: string } | null {
    const cleaned = pathname.replace(/^\/+/, '');
    const matched = /^([A-Za-z][A-Za-z0-9_]*)\.([A-Za-z][A-Za-z0-9_]*)$/.exec(cleaned);
    if (!matched) return null;
    return { objectName: matched[1], methodName: matched[2] };
}

async function loadCloudObject(objectName: string): Promise<any> {
    const filePath = join(import.meta.dir, 'functions', `${objectName}.obj.ts`);
    const fileUrl = pathToFileURL(filePath).href;
    const module = await import(fileUrl);
    const CloudObject = module.default;
    if (typeof CloudObject !== 'function') {
        throw new Error(`${objectName}.obj.ts default export 必须是 class`);
    }
    return new CloudObject();
}

const server = Bun.serve({
    port: PORT,
    websocket: {
        open(ws) {
            if (ws.data?.channel === 'build-logs') {
                registerBuildLogWsClient(ws);
            }
        },
        close(ws) {
            if (ws.data?.channel === 'build-logs') {
                unregisterBuildLogWsClient(ws);
            }
        },
    },
    async fetch(req: Request, serverCtx: any) {
        const url = new URL(req.url);

        if (req.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: corsHeaders });
        }

        if (url.pathname === '/' || url.pathname === '/health') {
            return respondJson({
                ok: true,
                service: 'looplan-pkg-cloud-server',
                routeRule: '/对象名.方法名',
                example: '/Test.test',
                wsLogRoute: '/ws/build-logs',
                port: PORT,
            });
        }

        if (url.pathname === '/ws/build-logs') {
            const upgraded = serverCtx.upgrade(req, {
                data: {
                    channel: 'build-logs',
                },
            });
            if (upgraded) return;
            return respondJson({ ok: false, message: 'WebSocket 升级失败' }, 400);
        }

        const route = parseRoute(url.pathname);
        if (!route) {
            return respondJson({ ok: false, message: '无效路由，请使用 /对象名.方法名' }, 404);
        }

        try {
            const instance = await loadCloudObject(route.objectName);
            const handler = instance?.[route.methodName];
            if (typeof handler !== 'function') {
                return respondJson(
                    { ok: false, message: `方法不存在: ${route.objectName}.${route.methodName}` },
                    404,
                );
            }

            const ctx = {
                req,
                url,
                corsHeaders,
                json: respondJson,
                async readJson<T = any>(): Promise<T> {
                    return (await req.json()) as T;
                },
            };

            const result = await handler.call(instance, ctx);
            if (result instanceof Response) return result;
            return respondJson(result ?? { ok: true });
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            return respondJson({ ok: false, message }, 500);
        }
    },
});

console.log(`Cloud server listening on http://127.0.0.1:${server.port}`);
