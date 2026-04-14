<template>
    <div class="home-layout full">
        <aside class="home-sidebar">
            <div class="sidebar-title">Looplan-pkg</div>
            <div class="sidebar-desc">
                多组件包开发
            </div>
            <lp-menu
                v-model="activeMenu"
                :data="menuData"
                :keys="menuKeys"
                class="menu-panel"
            ></lp-menu>
        </aside>

        <main class="home-main">
            <div v-if="activeMenu === 'packages'" class="main-panel">
                <home-packages-panel></home-packages-panel>
            </div>

            <div v-else class="doc-panel">
                <div class="doc-head">
                    <div class="doc-title">开发文档</div>
                    <a href="https://doc.looplan.cn/looplan-pkg" target="_blank" rel="noopener">
                        新窗口打开
                    </a>
                </div>
                <div class="doc-frame-wrap">
                    <iframe
                        class="doc-frame"
                        src="https://doc.looplan.cn/looplan-pkg"
                        title="looplan-pkg-doc"
                    ></iframe>
                </div>
            </div>
        </main>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import HomePackagesPanel from './components/HomePackagesPanel.vue';

const activeMenu = ref('packages');

const menuData = [
    { id: 'packages', title: '组件包' },
    { id: 'docs', title: '开发文档' },
];

const menuKeys = {
    label: 'title',
    value: 'id',
};
</script>
<script lang="ts">
export default {
    title: '首页'
}
</script>
<style lang="scss" scoped>
.home-layout {
    min-height: 100%;
    background: #f3f6fb;
    display: grid;
    grid-template-columns: 240px minmax(0, 1fr);
}

.home-sidebar {
    height: 100vh;
    position: sticky;
    top: 0;
    padding: 14px 12px;
    border-right: 1px solid #e3ebf7;
    background: #fff;
}

.sidebar-title {
    font-size: 16px;
    font-weight: 600;
    color: #2a3344;
    padding: 8px 10px 14px;
}

.menu-panel {
    border-radius: 12px;
    padding: 10px;
    background: #f7f9fe;
}

.home-main {
    padding: 16px;
}

.main-panel {
    min-height: calc(100vh - 32px);
}

.doc-panel {
    min-height: calc(100vh - 32px);
    border-radius: 16px;
    border: 1px solid #e3ebf7;
    background: #fff;
    overflow: hidden;
}

.doc-head {
    padding: 14px 16px;
    border-bottom: 1px solid #edf1f7;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.doc-title {
    font-size: 15px;
    font-weight: 600;
    color: #2a3344;
}

.doc-frame-wrap {
    height: calc(100vh - 100px);
    min-height: 680px;
}

.doc-frame {
    width: 100%;
    height: 100%;
    border: 0;
}

@media (max-width: 1024px) {
    .home-layout {
        grid-template-columns: 1fr;
    }

    .home-sidebar {
        position: static;
        height: auto;
        border-right: 0;
        border-bottom: 1px solid #e3ebf7;
    }

    .doc-frame-wrap {
        min-height: 520px;
    }
}
</style>
