import LayerGroup from './LayerGroup';
import type { ComponentInternalInstance } from 'vue';
interface LayerPosition {
    /**
     * 宽度
     */
    width?: any;
    /**
     * 高度
     */
    height?: any;
    /**
     * 横坐标
     * - center 居中
     */
    x?: any;
    /**
     * 纵坐标
     * - center 居中
     */
    y?: any;
    /**
     * 是否反向
     * @todo 默认是通过left和top来定位，如果设置为true，则通过right和bottom来定位     */
    reverse?: Boolean;
}
export interface FollowOptions {
    position: string;
    arrow?: boolean;
    arrowSize?: number;
    fps?: number;
}
type DrawerDirection = 'right' | 'left' | 'top' | 'bottom';
export interface MaskOptions {
    /**
     * 点击后是否关闭
     */
    close?: boolean;
}
declare class Layer {
    /**
     * 层id
     */
    id: string;
    layerInstance: ComponentInternalInstance | null;
    /**
     * 组重置状态
     * @todo 用于在层关闭时, 组内其它层需要重新计算位置
     */
    groupResetStatus: number;
    options: {
        /**
         * 组件
         */
        component: any;
        /**
         * 位置
         */
        position?: LayerPosition;
        /**
         * 容器
         */
        containerComponent?: any;
        /**
         * 容器绑定的数据
         */
        containerModel?: any;
        /**
         * 容器绑定的props
         */
        containerProps?: any;
        /**
         * 过渡动画组件
         */
        transitionComponent?: any;
        /**
         * 过渡动画类型
         * @example 'fade' | 'zoom' | 'slide-top' | 'slide-bottom' | 'slide-left' | 'slide-right' | 'drawer-right' | 'drawer-left' | 'drawer-top' | 'drawer-bottom'
         */
        transition?: string;
        /**
         * v-model绑定的数据
         */
        model?: any;
        /**
         * 是否使用遮罩
         */
        useMask?: boolean;
        /**
         * 是否锁定body滚动
         */
        lockBodyScroll?: boolean | null;
        /**
         * 遮罩层配置
         */
        maskOptions?: MaskOptions;
        /**
         * 组件绑定的props
         */
        props?: any;
        /**
         * 自定义遮罩层z-index
         */
        zIndex?: number;
        /**
         * 抽屉方向
         */
        drawerDirection?: DrawerDirection;
        /**
         * 事件监听器
         */
        events: Record<string, (...args: any[]) => void>;
        /**
         * 跟随
         * 跟随某个dom的位置
         */
        follow?: {
            target: HTMLElement | string;
            options: FollowOptions;
        };
        /**
         * 管理组
         */
        group?: LayerGroup;
        /**
         * 追加到哪个元素
         */
        appendTo?: HTMLElement | null;
    };
    layerVnode: any;
    contentVnode: any;
    maskLayer: Layer | null;
    closing: boolean;
    layerZIndex: number;
    maskZIndex: number;
    containerEl: HTMLElement | null;
    layerElement: Element | null;
    createTime: number;
    get vnode(): any;
    constructor();
    static src(component: any): Layer;
    model(model: any): this;
    zIndex(zIndex: number): this;
    on(event: string, callback: (...args: any[]) => void): this;
    off(event: string): this;
    /**
     * 设置容器
     * @param container 容器组件或容器名称
     * @returns
     */
    container(container: any, props?: any): this;
    /**
     * 设置过渡动画组件
     * @param transition 过渡动画组件
     * @returns
     */
    transitionComponent(transition: any): this;
    getTransitionComponent(): any;
    group(group: LayerGroup): this;
    props(props: any): this;
    containerProps(props: any): this;
    containerModel(model: any): this;
    useMask(use?: boolean, options?: MaskOptions): this;
    /**
     * 设置是否锁定body滚动
     * @param lock 是否锁定(null时根据useMask来决定)
     *
     * @todo null时根据useMask来决定
     * @todo true时锁定
     * @todo false时不锁定
     *
     * @returns
     */
    lockBodyScroll(lock?: boolean | null): this;
    /**
     * 设置过渡类型
     * @param type 过渡类型
     * @example 'fade' | 'zoom' | 'slide-top' | 'slide-bottom' | 'slide-left' | 'slide-right' | 'drawer-right' | 'drawer-left' | 'drawer-top' | 'drawer-bottom'
     * @returns
     */
    transition(type: string): this;
    /**
     * 设置是否追踪某个dom
     * @param target 要跟随的目标元素，可以是DOM元素或"mouse"字符串表示跟随鼠标
     * @param options 跟随选项
     * @returns
     */
    follow(target: HTMLElement | string, options: FollowOptions): this;
    /**
     * 设置抽屉方向
     * @param direction 方向
     * @returns
     */
    drawerDirection(direction: DrawerDirection): this;
    /**
     * 显示层
     * @param position 位置
     * @returns
     */
    show(position?: LayerPosition): this;
    /**
     * 获取追加到的元素
     * @returns
     */
    getAppendTo(): HTMLElement;
    /**
     * 处理关闭后
     * @todo 关闭动画结束后，删除元素
     *
     */
    handleAfterLeave(): void;
    getContainer(): HTMLDivElement;
    /**
     * 创建遮罩层
     * @param closeHandler 关闭回调
     */
    createMask(closeHandler: Function): void;
    hide(from?: string): void;
    /**
     * 移除所有DOM元素
     *
     */
    private removeElements;
    emit(event: string, ...args: any[]): this;
    /**
     * 获取层大小
     * @returns
     */
    getLayerInfo(): {
        width: number;
        height: number;
        x: number;
        y: number;
    };
    /**
    * 设置层实例
    * @param layerInstance 层实例
    */
    setLayerInstance(layerInstance: ComponentInternalInstance): this;
    /**
     * 获取层实例
     * @returns 层实例
     */
    getLayerInstance(): ComponentInternalInstance | null;
    /**
     * 关闭层
     */
    close(): void;
    /**
     * 关闭所有层
     * @param check 过滤方法
     */
    static closeAll(check?: CheckFunction): void;
    /**
     * 关闭组内所有层
     * @param group 组
     */
    static closeByGroup(group: LayerGroup): void;
}
type CheckFunction = ((layer: Layer) => boolean) | null;
export default Layer;
