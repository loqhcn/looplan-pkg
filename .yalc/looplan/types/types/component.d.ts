/**
 * 组件选项类型
 */
export interface ComponentOption {
    /**
     * 组件标题
     */
    title: string;
    /**
     * 组件名称
     */
    name: string;
    /**
     * 组件模型类型
     */
    modelType: string;
    /**
     * 是否为异步组件
     */
    isAsync?: boolean;
    /**
     * 表单模型类型
     */
    formModelType?: string;
    /**
     * 配置
     * @todo 自由设置配置, 用于特定场景读取
     */
    config?: Record<string, any>;
    /**
     * 样式cdn地址
     */
    styleCdn?: string[];
    /**
     * 样式导入时机
     * register: 注册时导入, use: 使用时导入
     */
    styleImportCase?: 'register' | 'use';
}
/**
 * 组件包配置类型，用于描述组件包的基本信息和状态。
 * 包含组件包的名称、标题、类型、版本、CDN 地址等信息，以及加载状态。
 */
export interface ComponentPackageConfig {
    /**
     * 组件包名称
     */
    name: string;
    /**
     * 组件包标题
     */
    title?: string;
    /**
     * 类型
     */
    type: 'cdn' | 'local';
    /**
     * 版本
     */
    version?: string;
    /**
     * 是否在window上保留组件库
     */
    keepOfWindow?: boolean;
    /**
     * cdn 地址
     */
    cdn?: string;
    /**
     * 样式cdn地址
     */
    styleCdn?: string[];
    /**
     * 样式导入时机
     * register: 注册时导入, use: 使用时导入
     */
    styleImportCase?: 'register' | 'use';
    /**
     * 组件列表
     */
    components: (ComponentOption | string)[];
    /**
     * 加载状态
     * -1: 加载失败, 0: 未加载, 1: 加载中, 200: 加载完成
     */
    loadStatus?: -1 | 0 | 1 | 200;
    /**
     * 需要异步加载的组件
     * @todo 需要异步加载的组件, 用于在组件包加载时, 异步加载组件
     * @todo 也可以在组件列表中设置 isAsync: true, 如果组件列表通过字符串设置, 则需要通过此配置设置
     */
    asyncComponents?: string[];
}
/**
 * 已加载的模块类型
 */
export type LoadedModule = Record<string, any>;
/**
 * 组件加载器选项类型
 */
export interface ComponentLoaderOptions {
    package: string;
    isCache: boolean;
}
