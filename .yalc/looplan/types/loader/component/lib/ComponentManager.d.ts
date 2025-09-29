import type { ComponentOption, ComponentPackageConfig, LoadedModule } from '@/types/component';
declare global {
    interface Window {
        [key: string]: any;
    }
}
/**
 * TODO 组件管理器
 *
 */
export declare class ComponentManager {
    private components;
    /**
     * TODO -- 组件包网关加载状态
     * 0 -- 未加载
     * 1 -- 加载中
     * 200 -- 已加载
     */
    pkgGatewayLoading: Record<string, number>;
    /**
     * 规范化组件名称，格式：包名@驼峰组件名
     */
    parseComponentName(raw: string): string;
    /**
     * 获取或注册组件。
     * TODO -- 获取或注册组件。
     * @param nameRaw 原始名称，如 'MuloLayer@TestComponent'
     * @param component 可选，如果传入则注册该组件
     */
    component(nameRaw: string, component?: any): Promise<any>;
    /**
     * TODO -- 获取组件选项对象
     * @param item 组件选项或组件名称字符串
     * @returns 组件选项对象
     */
    private getComponentOptionObject;
    /**
     * 注册包内所有组件到 this.components
     * TODO -- 注册
     */
    private registerComponents;
    /**
     * TODO -- 获取组件选项对象
     * @param raw 组件名称字符串
     * @returns 组件选项对象
     */
    getComponentOption(raw: string): ComponentOption | undefined;
    /**
     * TODO -- 判断是否异步组件
     * @param pkg 包名
     * @param comp 组件名
     * @returns
     */
    isAsyncComponent(pkg: string, comp: string): boolean;
    /**
     * TODO -- 异步加载组件包
     *
     * @todo 加载组件文件到内存
     * @param packageName 组件包名称
     * @returns 组件包数据
     */
    private getPackage;
    /** 等待加载完成 */
    private waitComputeLoad;
    /**
     * TODO -- 手动添加本地组件包
     * @param cfg 组件包配置
     * @param data 组件包数据
     */
    addLocalPackage(cfg: ComponentPackageConfig, data: LoadedModule): void;
    /**
     * TODO -- 添加组件包配置
     * @param cfg 组件包配置
     */
    registerPackage(cfg: ComponentPackageConfig): void;
    /**
     * TODO -- 通过 CDN 加载全局 UMD 包
     * @param packageInfo 组件包配置
     * @returns 组件包数据
     */
    private getOnlineComponentPackage;
    /**
     * TODO -- 加载组件包的样式
     * @param packageName 组件包名称
     * @returns 组件包数据
     */
    loadPackageStyles(packageName: string): Promise<void>;
    /**
     * TODO -- 加载组件特定的样式
     * @param packageName 组件包名称
     * @param componentOption 组件选项
     * @returns 组件包数据
     */
    private loadComponentStyles;
    /**
     * TODO -- 卸载组件包的样式
     * @param packageName 组件包名称
     * @returns 组件包数据
     */
    unloadPackageStyles(packageName: string): void;
    /**
     * TODO -- 卸载特定组件的样式
     * @param rawName 组件名称，格式：包名@组件名
     * @returns 组件包数据
     */
    unloadComponentStyles(rawName: string): void;
    /**
     * TODO -- 获取所有已加载的样式链接
     * @returns 组件包数据
     */
    getLoadedStyleLinks(): Record<string, HTMLLinkElement[]>;
}
declare const componentManager: ComponentManager;
export default componentManager;
