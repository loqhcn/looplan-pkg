// @ts-nocheck
interface TokenResp {
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

interface AccountInfoResp {
    code: number;
    msg: string;
    data?: {
        id?: number;
        nickname?: string;
        avatar?: string;
        money?: number;
        score?: number;
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

    private getOpenApiConfig(ctx: any) {
        const apiBase = normalizeEnv(Bun.env.VITE_LP_API_URL || process.env.VITE_LP_API_URL);
        const apiKey = normalizeEnv(Bun.env.VITE_LP_API_KEY || process.env.VITE_LP_API_KEY);

        if (!apiBase) {
            return ctx.json({ ok: false, message: '缺少环境变量: VITE_LP_API_URL' }, 500);
        }
        if (!apiKey) {
            return ctx.json({ ok: false, message: '缺少环境变量: VITE_LP_API_KEY' }, 500);
        }

        return { apiBase: apiBase.replace(/\/+$/, ''), apiKey };
    }

    private async requestOpenApi<T>(ctx: any, methodName: string, failLabel: string) {
        const config = this.getOpenApiConfig(ctx);
        if (config instanceof Response) return config;

        const targetUrl = `${config.apiBase}/openapi/Auth.${methodName}`;
        try {
            const resp = await fetch(targetUrl, {
                method: 'GET',
                headers: {
                    'x-sign': config.apiKey,
                },
            });
            const data = (await resp.json().catch(() => null)) as T | null;
            if (!resp.ok || !data) {
                return ctx.json(
                    {
                        ok: false,
                        apiBase: config.apiBase,
                        message: `${failLabel}失败: HTTP ${resp.status}`,
                    },
                    502,
                );
            }
            return ctx.json(data, 200);
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            return ctx.json({ ok: false, message: `请求${failLabel}失败: ${message}` }, 500);
        }
    }

    public async dataToken(ctx: any) {
        return this.requestOpenApi<TokenResp>(ctx, 'userApiDataToken', '获取 dataToken ');
    }

    public async token(ctx: any) {
        return this.requestOpenApi<TokenResp>(ctx, 'userApiToken', '获取 token ');
    }

    public async accountInfo(ctx: any) {
        return this.requestOpenApi<AccountInfoResp>(ctx, 'accountInfo', '获取用户信息 ');
    }
}
