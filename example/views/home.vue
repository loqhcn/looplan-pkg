<template>
    <div class="home-page full padding">
        <div class="home-shell">
            <div class="hero">
                <div class="hero-title">Looplan 多组件包开发</div>
                <div class="hero-desc">
                    支持包过滤、单包构建与实时日志查看，便于 PC 端开发调试。
                </div>
                <div class="hero-meta">
                    共 {{ packageConfigs.length }} 个包，当前显示 {{ filteredPackages.length }} 个
                </div>
            </div>

            <div class="home-content">
                <div class="left-pane">
                    <div class="filter-bar">
                        <input
                            v-model.trim="keyword"
                            class="filter-input"
                            type="text"
                            placeholder="输入包名 / 标题 / 类型 / 版本进行过滤"
                        />
                        <lp-button @click="keyword = ''">清空</lp-button>
                    </div>

                    <div class="pkg-grid">
                        <div class="pkg-card" v-for="pkg in filteredPackages" :key="pkg.name">
                            <div class="card-head">
                                <div class="pkg-title">
                                    {{ pkg.title || pkg.name }}
                                </div>
                                <span class="pkg-type">{{ pkg.type || 'unknown' }}</span>
                            </div>

                            <div class="pkg-name">{{ pkg.name }}</div>

                            <div class="card-info">
                                <div class="info-item">
                                    <span class="label">版本</span>
                                    <span class="value">{{ pkg.version || '-' }}</span>
                                </div>
                                <div class="info-item">
                                    <span class="label">组件数</span>
                                    <span class="value">{{ pkg.components?.length ?? 0 }}</span>
                                </div>
                            </div>

                            <div class="card-foot">
                                <lp-button @click="onOpen(pkg)">打开文档</lp-button>
                                <lp-button
                                    type="primary"
                                    :disabled="isBuilding(pkg.name)"
                                    @click="onBuild(pkg)"
                                >
                                    {{ isBuilding(pkg.name) ? '构建中...' : '点击打包' }}
                                </lp-button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="log-pane">
                    <div class="log-head">
                        <div class="log-title">构建日志</div>
                        <div class="log-actions">
                            <span class="log-status" :class="{ online: streamConnected }">
                                {{ streamConnected ? '实时连接中' : '连接中断' }}
                            </span>
                            <lp-button @click="clearLogs">清空日志</lp-button>
                        </div>
                    </div>
                    <div class="log-list" ref="logListRef">
                        <div class="log-empty" v-if="logs.length === 0">暂无日志</div>
                        <div
                            class="log-item"
                            v-for="item in logs"
                            :key="item.id"
                            :class="[`level-${item.level}`]"
                        >
                            <span class="log-time">{{ formatTime(item.time) }}</span>
                            <span class="log-pkg" v-if="item.pkg">[{{ item.pkg }}]</span>
                            <span class="log-message">{{ item.message }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { packages } from '@example/lib/parsePackages';
import { useRouter } from 'vue-router';
import { $store } from 'looplan-doc';

interface PackageConfig {
    name: string;
    title?: string;
    type?: string;
    version?: string;
    components?: unknown[];
}

interface BuildLog {
    id: string;
    time: string;
    level: 'info' | 'error' | 'system';
    pkg?: string;
    status?: 'running' | 'done' | 'failed';
    message: string;
}

const API_BASE = '/api';
const DB_NAME = 'looplan-build-logs';
const DB_VERSION = 1;
const DB_STORE = 'logs';
const LOG_LIMIT = 800;

const packageConfigs = packages.map(pkg => pkg.packageConfig as PackageConfig);
const router = useRouter();
const keyword = ref('');
const logs = ref<BuildLog[]>([]);
const logListRef = ref<HTMLElement | null>(null);
const streamConnected = ref(false);
const buildingMap = ref<Record<string, boolean>>({});
const logIds = new Set<string>();
let eventSource: EventSource | null = null;

const filteredPackages = computed(() => {
    if (!keyword.value) return packageConfigs;
    const q = keyword.value.toLowerCase();
    return packageConfigs.filter((pkg) =>
        [pkg.name, pkg.title, pkg.type, pkg.version]
            .filter(Boolean)
            .some((v) => String(v).toLowerCase().includes(q)),
    );
});

const onOpen = async (row: any) => {
    console.log('onOpen', row)
    await $store('app').loadAppFromGateway(row.name);
    $store('app').loadDocLayout();
    console.log('onOpen')
    router.push({ path: `/${row.name}` });
}

const isBuilding = (pkgName: string) => !!buildingMap.value[pkgName];

const setBuildState = (pkgName: string, value: boolean) => {
    buildingMap.value = {
        ...buildingMap.value,
        [pkgName]: value,
    };
};

const formatTime = (value: string) => {
    const time = new Date(value);
    if (Number.isNaN(time.getTime())) return '--:--:--';
    return time.toLocaleTimeString();
};

const openLogDB = () =>
    new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(DB_STORE)) {
                db.createObjectStore(DB_STORE, { keyPath: 'id' });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });

const saveLogToDB = async (entry: BuildLog) => {
    try {
        const db = await openLogDB();
        await new Promise<void>((resolve) => {
            const tx = db.transaction(DB_STORE, 'readwrite');
            tx.objectStore(DB_STORE).put(entry);
            tx.oncomplete = () => resolve();
            tx.onerror = () => resolve();
        });
        db.close();
    } catch {
        // 忽略持久化失败，不影响主流程
    }
};

const loadLogsFromDB = async () => {
    try {
        const db = await openLogDB();
        const records = await new Promise<BuildLog[]>((resolve) => {
            const tx = db.transaction(DB_STORE, 'readonly');
            const req = tx.objectStore(DB_STORE).getAll();
            req.onsuccess = () => resolve((req.result || []) as BuildLog[]);
            req.onerror = () => resolve([]);
        });
        db.close();
        const sorted = records
            .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
            .slice(-LOG_LIMIT);
        for (const item of sorted) {
            logIds.add(item.id);
        }
        logs.value = sorted;
    } catch {
        logs.value = [];
    }
};

const clearLogs = async () => {
    logs.value = [];
    logIds.clear();
    try {
        const db = await openLogDB();
        await new Promise<void>((resolve) => {
            const tx = db.transaction(DB_STORE, 'readwrite');
            tx.objectStore(DB_STORE).clear();
            tx.oncomplete = () => resolve();
            tx.onerror = () => resolve();
        });
        db.close();
    } catch {
        // 忽略清理失败
    }
};

const scrollLogsToBottom = async () => {
    await nextTick();
    if (!logListRef.value) return;
    logListRef.value.scrollTop = logListRef.value.scrollHeight;
};

const appendLog = (entry: BuildLog, persist = true) => {
    if (!entry.id || logIds.has(entry.id)) return;
    logIds.add(entry.id);
    logs.value = [...logs.value, entry].slice(-LOG_LIMIT);

    if (entry.pkg && entry.status) {
        if (entry.status === 'running') setBuildState(entry.pkg, true);
        if (entry.status === 'done' || entry.status === 'failed') setBuildState(entry.pkg, false);
    }

    if (persist) {
        void saveLogToDB(entry);
    }
    void scrollLogsToBottom();
};

const appendLocalSystemLog = (message: string, level: BuildLog['level'] = 'system') => {
    appendLog(
        {
            id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
            time: new Date().toISOString(),
            level,
            message,
        },
        true,
    );
};

const syncLogsFromApi = async () => {
    try {
        const res = await fetch(`${API_BASE}/logs`);
        if (!res.ok) return;
        const data = (await res.json()) as { logs?: BuildLog[] };
        const serverLogs = data.logs || [];
        for (const item of serverLogs) {
            appendLog(item, true);
        }
    } catch {
        appendLocalSystemLog('日志服务暂不可用，已切换本地缓存日志模式', 'error');
    }
};

const connectLogStream = () => {
    if (eventSource) eventSource.close();
    eventSource = new EventSource(`${API_BASE}/logs/stream`);

    eventSource.onopen = () => {
        streamConnected.value = true;
    };

    eventSource.onmessage = (event) => {
        try {
            const entry = JSON.parse(event.data) as BuildLog;
            appendLog(entry, true);
        } catch {
            // 忽略异常消息
        }
    };

    eventSource.onerror = () => {
        streamConnected.value = false;
    };
};

const onBuild = async (row: PackageConfig) => {
    if (!row.name || isBuilding(row.name)) return;

    setBuildState(row.name, true);
    try {
        const res = await fetch(`${API_BASE}/build`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pkg: row.name }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            setBuildState(row.name, false);
            appendLocalSystemLog(data?.message || `提交构建失败: ${row.name}`, 'error');
            return;
        }
        appendLocalSystemLog(data?.message || `已提交构建: ${row.name}`, 'system');
    } catch {
        setBuildState(row.name, false);
        appendLocalSystemLog(`服务连接失败: ${row.name}`, 'error');
    }
};

onMounted(() => {
    console.log('packageConfigs', packageConfigs);
    void loadLogsFromDB().then(() => {
        void syncLogsFromApi();
    });
    connectLogStream();
});

onBeforeUnmount(() => {
    if (eventSource) eventSource.close();
});
</script>
<script lang="ts">
export default {
    title: '首页'
}
</script>
<style lang="scss" scoped>
.home-page {
    min-height: 100%;
    background: linear-gradient(180deg, #f7faff 0%, #f3f5f9 100%);
}

.home-shell {
    max-width: 1480px;
    margin: 0 auto;
}

.hero {
    padding: 28px 24px;
    border-radius: 16px;
    background: linear-gradient(135deg, #1f6dff 0%, #4b8dff 100%);
    color: #fff;
    box-shadow: 0 10px 28px rgba(42, 98, 234, 0.28);
}

.hero-title {
    font-size: 26px;
    font-weight: 600;
    line-height: 1.25;
}

.hero-desc {
    margin-top: 8px;
    font-size: 14px;
    opacity: 0.95;
}

.hero-meta {
    margin-top: 14px;
    font-size: 13px;
    opacity: 0.9;
}

.home-content {
    margin-top: 18px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 430px;
    gap: 16px;
    align-items: start;
}

.filter-bar {
    display: flex;
    align-items: center;
    gap: 10px;
}

.filter-input {
    width: 100%;
    height: 38px;
    padding: 0 12px;
    border: 1px solid #d8e1f0;
    border-radius: 10px;
    outline: none;
    font-size: 14px;
    color: #1f2633;
    background: #fff;
}

.filter-input:focus {
    border-color: #4b8dff;
    box-shadow: 0 0 0 3px rgba(75, 141, 255, 0.14);
}

.pkg-grid {
    margin-top: 14px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
    gap: 16px;
}

.pkg-card {
    padding: 18px;
    border-radius: 14px;
    background: #fff;
    border: 1px solid #e8eef7;
    box-shadow: 0 8px 24px rgba(15, 45, 90, 0.06);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.pkg-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(15, 45, 90, 0.1);
}

.card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.pkg-title {
    font-size: 16px;
    font-weight: 600;
    color: #1e2430;
    line-height: 1.35;
}

.pkg-type {
    display: inline-flex;
    align-items: center;
    padding: 2px 10px;
    border-radius: 999px;
    background: #edf4ff;
    color: #2c67d6;
    font-size: 12px;
    white-space: nowrap;
}

.pkg-name {
    margin-top: 10px;
    color: #566074;
    font-size: 13px;
    word-break: break-all;
}

.card-info {
    margin-top: 14px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
}

.info-item {
    padding: 10px;
    border-radius: 10px;
    background: #f7f9fd;
}

.label {
    display: block;
    font-size: 12px;
    color: #8b95a7;
}

.value {
    display: block;
    margin-top: 2px;
    font-size: 14px;
    color: #2a3344;
    font-weight: 600;
}

.card-foot {
    margin-top: 16px;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
}

.log-pane {
    border-radius: 14px;
    border: 1px solid #e8eef7;
    background: #fff;
    box-shadow: 0 8px 24px rgba(15, 45, 90, 0.06);
    min-height: 640px;
    max-height: calc(100vh - 120px);
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 16px;
}

.log-head {
    padding: 14px;
    border-bottom: 1px solid #edf1f7;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}

.log-title {
    font-size: 15px;
    font-weight: 600;
    color: #283042;
}

.log-actions {
    display: flex;
    align-items: center;
    gap: 10px;
}

.log-status {
    font-size: 12px;
    color: #d26a00;
}

.log-status.online {
    color: #11a35c;
}

.log-list {
    flex: 1;
    overflow: auto;
    padding: 10px 12px 14px;
    background: #f8fbff;
    font-family: Consolas, Monaco, 'Courier New', monospace;
    font-size: 12px;
}

.log-empty {
    color: #93a0b4;
    padding: 10px;
}

.log-item {
    line-height: 1.45;
    color: #2d3648;
    padding: 5px 4px;
    border-bottom: 1px dashed #e6edf7;
    word-break: break-word;
}

.log-item.level-error {
    color: #c52828;
}

.log-item.level-system {
    color: #2c67d6;
}

.log-time {
    color: #8c98ab;
    margin-right: 6px;
}

.log-pkg {
    color: #55607a;
    margin-right: 6px;
}

@media (max-width: 1280px) {
    .home-content {
        grid-template-columns: 1fr;
    }

    .log-pane {
        position: static;
        max-height: 460px;
        min-height: 420px;
    }
}

@media (max-width: 900px) {
    .hero {
        padding: 22px 18px;
    }

    .hero-title {
        font-size: 22px;
    }

    .pkg-grid {
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    }
}
</style>
