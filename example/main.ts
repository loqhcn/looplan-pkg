import { createApp,provide } from 'vue'
import * as Vue from 'vue';
import * as Looplan from 'looplan';
import { setupDocRouter, setupStore, $store, useLocalDoc } from 'looplan-doc';
import LooplanDoc from 'looplan-doc';

import './style.css'
import App from './App.vue'

import { setupRouter } from '@example/router';
import looplanUi from 'looplan-ui';
import 'looplan-ui/lib/index.css'; // 引入全局样式
import 'looplan-ui/lib/looplan-ui.css';
import 'looplan-doc/lib/looplan-doc.css';

// import currentLib from '@/index';


import {
    packages,
    packageDocs
} from './lib/parsePackages';

// 扩展 Window 类型，添加 Vue 属性
declare global {
    interface Window {
        Vue: typeof Vue;
        Looplan: typeof Looplan;
        vm: Vue.App;
        $store: typeof $store;
        docConfig: {
            multiDoc: boolean;
            gatewayApi: string;
            defaultDoc?: string;
        };
        docBaseUrl: string;
        $router: any;
    }
}

let docBaseUrl = window.docBaseUrl || "/docs";
async function bootstrap() {
    const app = createApp(App);
    app.use(Looplan);
    app.use(looplanUi);
    app.use(LooplanDoc);

    // app.use(currentLib);
    // TODO 载入store
    setupStore(app);

    // TODO 设置网关
    Looplan.setGateway({
        url: 'http://api.looplan.cn/ComponentGateway.detail',
        name: 'test',
        // 认证
        // token:''
    });

    // TODO 配置组件到Looplan
    const packageConfigs = packages.map(pkg => pkg.packageConfig);
    provide('packageConfigs', packageConfigs);
    packages.forEach(pkg => {
        console.log(`setpkg`, pkg.packageConfig, pkg.module);
        Looplan.setPkg(pkg.packageConfig, pkg.module);
    });
    
    // TODO 配置文档到LooplanDoc
    useLocalDoc(packageDocs);


    // TODO setupDoc
    const docConfig = window.docConfig || {};
    let isMultiDoc = docConfig.multiDoc;
    let appName = '';

    if (isMultiDoc) {
        // Extract appName from path
        const path = location.pathname;
        const parts = path.split('/').filter(Boolean);
        if (parts.length > 0) {
            appName = parts[0];
        } else if (docConfig.defaultDoc) {
            // Redirect to default doc if at root
            location.replace(`/pkg`);
            return;
        }
    }

    if (isMultiDoc && appName) {
        await $store('app').loadAppFromGateway(appName);
    } else {
        $store('app').setDocBaseUrl(docBaseUrl);
    }

    // TODO 载入路由
    const router =  setupRouter(app)
    await router.isReady();
    console.log('router',router.getRoutes());

    window.Vue = Vue;
    window.Looplan = Looplan;

    app.mount('#app');

    // TODO 载入文档布局
    if ($store('app').docBaseUrl) {
        $store('app').loadDocLayout();
    }

    window.$store = $store;
    window.$router = router;

}

bootstrap();