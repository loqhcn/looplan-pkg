<template>
    <div class="console-panel">
        <div class="console-head">
            <div class="console-title">控制台</div>
        </div>

        <div class="console-grid">
            <div class="console-card">
                <div class="card-title">统计信息</div>
                <div class="stat-row">
                    <span>组件包数量</span>
                    <b>{{ packageCount }}</b>
                </div>
                <div class="stat-row">
                    <span>组件总数</span>
                    <b>{{ componentCount }}</b>
                </div>
            </div>

            <div class="console-card">
                <div class="card-title">认证信息</div>
                <div class="auth-actions">
                    <lp-button type="primary" :disabled="tokenLoading" @click="fetchDataToken">
                        {{ tokenLoading ? '获取中...' : '获取 dataToken' }}
                    </lp-button>
                </div>
                <div class="auth-item">
                    <span class="label">dataToken</span>
                    <code class="value token">{{ tokenInfo.token || '-' }}</code>
                </div>
                <div class="auth-item">
                    <span class="label">创建时间</span>
                    <span class="value">{{ formatTime(tokenInfo.issuedAt) }}</span>
                </div>
                <div class="auth-item">
                    <span class="label">过期时间</span>
                    <span class="value">{{ formatTime(tokenInfo.expiresAt) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { packages } from '@example/lib/parsePackages';
import { LpLayer } from 'looplan-ui';

const API_BASE = 'http://127.0.0.1:5050';
const LOCAL_DATA_TOKEN_KEY = 'dataToken';
const LOCAL_DATA_TOKEN_STATUS_KEY = 'dataTokenStatus';

interface TokenStatus {
    issuedAt: string;
    expiresAt: string;
    scene?: string;
    userId?: number;
}

interface TokenInfo extends TokenStatus {
    token: string;
}

const tokenLoading = ref(false);
const tokenInfo = ref<TokenInfo>({
    token: '',
    issuedAt: '',
    expiresAt: '',
});

const packageCount = computed(() => packages.length);
const componentCount = computed(() =>
    packages.reduce((sum, item) => sum + (item?.packageConfig?.components?.length || 0), 0),
);

const formatTime = (value?: string) => {
    if (!value) return '-';
    const time = new Date(value);
    if (Number.isNaN(time.getTime())) return '-';
    return time.toLocaleString();
};

const saveTokenToLocalStorage = (payload: TokenInfo) => {
    localStorage.setItem(LOCAL_DATA_TOKEN_KEY, payload.token || '');
    localStorage.setItem(
        LOCAL_DATA_TOKEN_STATUS_KEY,
        JSON.stringify({
            issuedAt: payload.issuedAt || '',
            expiresAt: payload.expiresAt || '',
            scene: payload.scene || '',
            userId: payload.userId,
        }),
    );
};

const loadTokenFromLocalStorage = () => {
    const token = localStorage.getItem(LOCAL_DATA_TOKEN_KEY) || '';
    const statusRaw = localStorage.getItem(LOCAL_DATA_TOKEN_STATUS_KEY);
    if (!statusRaw && !token) return;

    let status: Partial<TokenStatus> = {};
    if (statusRaw) {
        try {
            status = JSON.parse(statusRaw) as Partial<TokenStatus>;
        } catch {
            status = {};
        }
    }
    tokenInfo.value = {
        token,
        issuedAt: String(status.issuedAt || ''),
        expiresAt: String(status.expiresAt || ''),
        scene: String(status.scene || ''),
        userId: typeof status.userId === 'number' ? status.userId : undefined,
    };
};

const fetchDataToken = async () => {
    if (tokenLoading.value) return;
    tokenLoading.value = true;
    try {
        const res = await fetch(`${API_BASE}/Console.dataToken`);
        const data = (await res.json().catch(() => ({}))) as any;
        if (!res.ok || data?.code !== 200) {
            LpLayer.toast(data?.message || data?.msg || '获取 dataToken 失败');
            return;
        }
        const tokenPayload: TokenInfo = {
            token: data?.data?.token || '',
            issuedAt: data?.data?.issuedAt || '',
            expiresAt: data?.data?.expiresAt || '',
            scene: data?.data?.scene || '',
            userId: data?.data?.userId,
        };
        tokenInfo.value = tokenPayload;
        saveTokenToLocalStorage(tokenPayload);
        LpLayer.toast('dataToken 获取成功');
    } catch {
        LpLayer.toast('服务连接失败，获取 dataToken 失败');
    } finally {
        tokenLoading.value = false;
    }
};

onMounted(() => {
    loadTokenFromLocalStorage();
});
</script>
<style scoped lang="scss">
.console-panel {
    min-height: calc(100vh - 32px);
}

.console-head {
    margin-bottom: 12px;
}

.console-title {
    font-size: 18px;
    font-weight: 600;
    color: #2a3344;
}

.console-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
}

.console-card {
    border-radius: 14px;
    border: 1px solid #e3ebf7;
    background: #fff;
    padding: 16px;
}

.card-title {
    font-size: 15px;
    font-weight: 600;
    color: #2a3344;
    margin-bottom: 10px;
}

.stat-row,
.auth-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 8px 0;
    border-bottom: 1px dashed #edf1f7;
}

.auth-actions {
    margin-bottom: 10px;
}

.auth-item .label {
    color: #6a768c;
    font-size: 13px;
}

.auth-item .value {
    color: #2a3344;
    font-size: 13px;
    max-width: 70%;
    text-align: right;
    word-break: break-all;
}

.auth-item .token {
    font-size: 12px;
    background: #f5f8fe;
    padding: 4px 6px;
    border-radius: 6px;
}

@media (max-width: 1024px) {
    .console-grid {
        grid-template-columns: 1fr;
    }
}
</style>
