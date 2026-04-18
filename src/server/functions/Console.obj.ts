// @ts-nocheck
interface DataTokenResp {
    code: number;
    msg: string;
    data?: {
        token?: string;
        issuedAt?: string;
        expiresAt?: string;
        scene?: string;
        userId?: number;
    };
}

function normalizeEnv(value: string | undefined): string {
    return String(value || '').trim();
}

export default class Console {
    public health() {
        return {
            ok: true,
            service: 'console',
        };
    }

    public async dataToken(ctx: any) {
        // const apiBase = normalizeEnv(process.env.VITE_LP_API_URL);
        // const apiKey = normalizeEnv(process.env.VITE_LP_API_KEY);

        const {
            VITE_LP_API_URL:apiBase,
            VITE_LP_API_KEY:apiKey,
        } = Bun.env;

        if (!apiBase) {
            return ctx.json({ ok: false, message: '缺少环境变量: VITE_LP_API_URL' }, 500);
        }
        if (!apiKey) {
            return ctx.json({ ok: false, message: '缺少环境变量: VITE_LP_API_KEY' }, 500);
        }

        const targetUrl = `${apiBase.replace(/\/+$/, '')}/openapi/Auth.userApiDataToken`;
        try {
            const resp = await fetch(targetUrl, {
                method: 'GET',
                headers: {
                    'x-sign': apiKey,
                },
            });
            const data = (await resp.json().catch(() => null)) as DataTokenResp | null;
            if (!resp.ok || !data) {
                return ctx.json(
                    {
                        ok: false,
                        message: `获取 dataToken 失败: HTTP ${resp.status}`,
                    },
                    502,
                );
            }
            return ctx.json(data, 200);
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            return ctx.json({ ok: false, message: `请求 dataToken 失败: ${message}` }, 500);
        }
    }
}
