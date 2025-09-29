import { isEmpty, isArray } from 'lodash-es';


let appRoutes: any[] = [];
const appRouteFiles = import.meta.glob('../views/*.vue', { eager: true });

// 定义 Vue 组件模块的类型
type VueComponentModule = {
    default: any;
};
let pages: any[] = [];

for (const path in appRouteFiles) {
    let row: VueComponentModule = appRouteFiles[path] as VueComponentModule;
    // 封装路由表
    const routePath = path.replace('../views/', '/').replace('.vue', '');
    appRoutes.push({
        path: routePath,
        component: row.default,
    });
    pages.push({
        value: row.default.name || routePath.replace('/', ''),
        title: row.default.title || row.default.name || routePath.replace('/', ''),
    });
}
console.log('应用路由', appRoutes)
console.log('页面', pages);

function mergeAppRoute(router: any) {
    appRoutes.forEach(route => {
        console.debug('添加路由', route)
        router.addRoute(route)
    });
    // 注册路由
}

export {
    pages,
}

export default mergeAppRoute;