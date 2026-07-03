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
                <div class="card-title">用户信息</div>
                <div class="auth-actions">
                    <lp-button type="primary" :disabled="userLoading" @click="fetchAccountInfo">
                        {{ userLoading ? '获取中...' : '刷新用户信息' }}
                    </lp-button>
                </div>
                <div class="user-card">
                    <img v-if="userInfo.avatar" class="user-avatar" :src="userInfo.avatar" alt="avatar" />
                    <div v-else class="user-avatar empty">无</div>
                    <div class="user-main">
                        <div class="user-name">{{ userInfo.nickname || '-' }}</div>
                        <div class="user-id">ID: {{ userInfo.id || '-' }}</div>
                    </div>
                </div>
                <div class="auth-item">
                    <span class="label">余额</span>
                    <span class="value">{{ userInfo.money ?? '-' }}</span>
                </div>
                <div class="auth-item">
                    <span class="label">积分</span>
                    <span class="value">{{ userInfo.score ?? '-' }}</span>
                </div>
            </div>

            <div class="console-card">
                <div class="card-title">认证信息</div>
                <div class="auth-actions">
                    <lp-button type="primary" :disabled="tokenLoading.dataToken" @click="fetchToken('dataToken')">
                        {{ tokenLoading.dataToken ? '获取中...' : '获取 dataToken' }}
                    </lp-button>
                    <lp-button type="primary" :disabled="tokenLoading.token" @click="fetchToken('token')">
                        {{ tokenLoading.token ? '获取中...' : '获取 token' }}
                    </lp-button>
                </div>
                <div class="auth-section-title">dataToken</div>
                <div class="auth-item">
                    <span class="label">token</span>
                    <code class="value token">{{ dataTokenInfo.token || '-' }}</code>
                </div>
                <div class="auth-item">
                    <span class="label">创建时间</span>
                    <span class="value">{{ formatTime(dataTokenInfo.issuedAt) }}</span>
                </div>
                <div class="auth-item">
                    <span class="label">过期时间</span>
                    <span class="value">{{ formatTime(dataTokenInfo.expiresAt) }}</span>
                </div>
                <div class="auth-section-title">普通 token</div>
                <div class="auth-item">
                    <span class="label">token</span>
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
const LOCAL_TOKEN_KEY = 'token';
const LOCAL_TOKEN_STATUS_KEY = 'tokenStatus';
const LOCAL_USER_INFO_KEY = 'userInfo';

interface TokenStatus {
    issuedAt: string;
    expiresAt: string;
    scene?: string;
    userId?: number;
}

interface TokenInfo extends TokenStatus {
    token: string;
}

interface UserInfo {
    id?: number;
    nickname: string;
    avatar: string;
    money?: number;
    score?: number;
}

const tokenLoading = ref({
    dataToken: false,
    token: false,
});
const userLoading = ref(false);
const dataTokenInfo = ref<TokenInfo>({
    token: '',
    issuedAt: '',
    expiresAt: '',
});
const tokenInfo = ref<TokenInfo>({
    token: '',
    issuedAt: '',
    expiresAt: '',
});
const userInfo = ref<UserInfo>({
    nickname: '',
    avatar: '',
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

const saveTokenToLocalStorage = (type: 'dataToken' | 'token', payload: TokenInfo) => {
    const tokenKey = type === 'dataToken' ? LOCAL_DATA_TOKEN_KEY : LOCAL_TOKEN_KEY;
    const statusKey = type === 'dataToken' ? LOCAL_DATA_TOKEN_STATUS_KEY : LOCAL_TOKEN_STATUS_KEY;

    localStorage.setItem(tokenKey, payload.token || '');
    localStorage.setItem(
        statusKey,
        JSON.stringify({
            issuedAt: payload.issuedAt || '',
            expiresAt: payload.expiresAt || '',
            scene: payload.scene || '',
            userId: payload.userId,
        }),
    );
};

const readTokenFromLocalStorage = (tokenKey: string, statusKey: string): TokenInfo | null => {
    const token = localStorage.getItem(tokenKey) || '';
    const statusRaw = localStorage.getItem(statusKey);
    if (!statusRaw && !token) return null;

    let status: Partial<TokenStatus> = {};
    if (statusRaw) {
        try {
            status = JSON.parse(statusRaw) as Partial<TokenStatus>;
        } catch {
            status = {};
        }
    }
    return {
        token,
        issuedAt: String(status.issuedAt || ''),
        expiresAt: String(status.expiresAt || ''),
        scene: String(status.scene || ''),
        userId: typeof status.userId === 'number' ? status.userId : undefined,
    };
};

const loadTokenFromLocalStorage = () => {
    const dataToken = readTokenFromLocalStorage(LOCAL_DATA_TOKEN_KEY, LOCAL_DATA_TOKEN_STATUS_KEY);
    const token = readTokenFromLocalStorage(LOCAL_TOKEN_KEY, LOCAL_TOKEN_STATUS_KEY);
    if (dataToken) dataTokenInfo.value = dataToken;
    if (token) tokenInfo.value = token;
};

const saveUserInfoToLocalStorage = (payload: UserInfo) => {
    localStorage.setItem(LOCAL_USER_INFO_KEY, JSON.stringify(payload));
};

const loadUserInfoFromLocalStorage = () => {
    const userRaw = localStorage.getItem(LOCAL_USER_INFO_KEY);
    if (!userRaw) return;

    try {
        const user = JSON.parse(userRaw) as Partial<UserInfo>;
        userInfo.value = {
            id: typeof user.id === 'number' ? user.id : undefined,
            nickname: String(user.nickname || ''),
            avatar: String(user.avatar || ''),
            money: typeof user.money === 'number' ? user.money : undefined,
            score: typeof user.score === 'number' ? user.score : undefined,
        };
    } catch {
        userInfo.value = { nickname: '', avatar: '' };
    }
};

const fetchToken = async (type: 'dataToken' | 'token') => {
    if (tokenLoading.value[type]) return;
    tokenLoading.value[type] = true;
    const isDataToken = type === 'dataToken';
    const label = isDataToken ? 'dataToken' : 'token';

    try {
        const res = await fetch(`${API_BASE}/Console.${isDataToken ? 'dataToken' : 'token'}`);
        const data = (await res.json().catch(() => ({}))) as any;
        if (!res.ok || data?.code !== 200) {
            LpLayer.toast(data?.message || data?.msg || `获取 ${label} 失败`);
            return;
        }
        const tokenPayload: TokenInfo = {
            token: data?.data?.token || '',
            issuedAt: data?.data?.issuedAt || '',
            expiresAt: data?.data?.expiresAt || '',
            scene: data?.data?.scene || '',
            userId: data?.data?.userId,
        };
        if (isDataToken) {
            dataTokenInfo.value = tokenPayload;
        } else {
            tokenInfo.value = tokenPayload;
        }
        saveTokenToLocalStorage(type, tokenPayload);
        LpLayer.toast(`${label} 获取成功`);
    } catch {
        LpLayer.toast(`服务连接失败，获取 ${label} 失败`);
    } finally {
        tokenLoading.value[type] = false;
    }
};

const fetchAccountInfo = async () => {
    if (userLoading.value) return;
    userLoading.value = true;
    try {
        const res = await fetch(`${API_BASE}/Console.accountInfo`);
        const data = (await res.json().catch(() => ({}))) as any;
        if (!res.ok || data?.code !== 200) {
            LpLayer.toast(data?.message || data?.msg || '获取用户信息失败');
            return;
        }
        const userPayload: UserInfo = {
            id: data?.data?.id,
            nickname: data?.data?.nickname || '',
            avatar: data?.data?.avatar || '',
            money: data?.data?.money,
            score: data?.data?.score,
        };
        userInfo.value = userPayload;
        saveUserInfoToLocalStorage(userPayload);
        LpLayer.toast('用户信息获取成功');
    } catch {
        LpLayer.toast('服务连接失败，获取用户信息失败');
    } finally {
        userLoading.value = false;
    }
};

onMounted(() => {
    loadTokenFromLocalStorage();
    loadUserInfoFromLocalStorage();
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
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 10px;
}

.auth-section-title {
    margin-top: 12px;
    padding-bottom: 4px;
    font-size: 13px;
    font-weight: 600;
    color: #2a3344;
}

.user-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 0 12px;
    border-bottom: 1px dashed #edf1f7;
}

.user-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
    background: #f5f8fe;
}

.user-avatar.empty {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8a96aa;
    font-size: 12px;
}

.user-main {
    min-width: 0;
}

.user-name {
    color: #2a3344;
    font-size: 15px;
    font-weight: 600;
}

.user-id {
    margin-top: 4px;
    color: #6a768c;
    font-size: 12px;
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
