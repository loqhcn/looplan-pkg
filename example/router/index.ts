import { createRouter, createWebHistory } from 'vue-router'
import mergeAppRoute from './mergeAppRoute';
import { pages } from './mergeAppRoute';
const HomeView = () => import('./../views/home.vue');

// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    // history: VueRouter.createWebHashHistory(),
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', component: HomeView },
    ], // `routes: routes` 的缩写
});

function setupRouter(app: any) {

    mergeAppRoute(router);

    app.use(router);
    return router;
}

export {
    setupRouter,
    pages
};