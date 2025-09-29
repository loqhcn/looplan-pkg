import { createApp } from 'vue'
import * as Vue from 'vue';

import './style.css'
import App from './App.vue'

import { setupRouter } from '@example/router';
import looplanUi from 'looplan-ui';
import 'looplan-ui/lib/index.css'; // 引入全局样式
import 'looplan-ui/lib/looplan-ui.css';

import currentLib from '@/index';

// TODO looplan
import * as Looplan from 'looplan';

// 扩展 Window 类型，添加 Vue 属性
declare global {
    interface Window {
        Vue: typeof Vue;
        Looplan: typeof Looplan;
    }
}


async function bootstrap() {
    const app = createApp(App);
    app.use(looplanUi);
    app.use(currentLib);

    await setupRouter(app).isReady();

    app.mount('#app');
    window.Vue = Vue;
    window.Looplan = Looplan;
}

bootstrap();