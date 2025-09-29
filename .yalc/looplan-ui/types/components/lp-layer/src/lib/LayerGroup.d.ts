type LayerMode = 'x' | 'y' | 'xy';
type LayerGroupJustifyContent = 'start' | 'center' | 'end' | null;
type LayerGroupAlignItems = 'start' | 'center' | 'end';
import type Layer from './Layer';
import type { CSSProperties } from 'vue';
declare class LayerGroup {
    /**
     * 管理组模式
     * x: 水平管理组
     * y: 垂直管理组
     * xy: 水平和垂直管理组(排列一行满了，自动换行)
     */
    mode: LayerMode;
    /**
     * 管理组内部对齐方式(类似flex布局的justify-content)
     * start: 左对齐
     * center: 居中对齐
     * end: 右对齐
     * null: 不进行对齐
     */
    justifyContent: LayerGroupJustifyContent;
    /**
     * 管理组内部对齐方式(类似flex布局的align-items)
     * start: 顶部对齐
     * center: 居中对齐
     * end: 底部对齐
     */
    alignItems: LayerGroupAlignItems;
    /**
     * 管理组内部边距
     * 控制弹出层在可渲染区域内
     */
    paddingSize: number;
    /**
     * 层与层之间的间距
     * 两个层之间的间距
     */
    spaceSize: number;
    /**
     * 位置过渡动画时长（毫秒）
     */
    transitionDuration: number;
    /**
     * 位置过渡动画函数
     */
    transitionTimingFunction: string;
    /**
     * xy模式下每行的最大宽度
     */
    private rowMaxWidth;
    /**
     * xy模式下单个项的标准宽度（0表示自动）
     */
    private itemWidth;
    /**
     * xy模式下每行最大项数
     */
    private itemsPerRow;
    groupElement: HTMLElement | null;
    constructor(mode?: LayerMode);
    /**
     * 获取追加到的元素
     * @returns
     */
    renderGroupElement(): HTMLElement | null;
    /**
     * 卸载从body中移除组元素
     */
    unmountGroupElement(): void;
    /**
     * 处理窗口大小变化
     */
    private handleResize;
    /**
     * 设置xy模式下的行宽度
     */
    setRowMaxWidth(width: number): this;
    /**
     * 设置xy模式下的单个项标准宽度
     */
    setItemWidth(width: number): this;
    /**
     * 设置xy模式下每行最大项数
     */
    setItemsPerRow(count: number): this;
    /**
     * 设置位置过渡动画时长
     */
    transition(duration: number, timingFunction?: string): this;
    /**
     * 设置管理组内部边距
     */
    padding(paddingSize: number): this;
    /**
     * 设置层与层之间的间距
     */
    space(spaceSize: number): this;
    /**
     * 设置管理组内部对齐方式
     * @param justifyContent 水平对齐方式
     * @param alignItems 垂直对齐方式
     */
    align(justifyContent: LayerGroupJustifyContent, alignItems: LayerGroupAlignItems): this;
    /**
     * 初始化组容器样式
     */
    initGroupContainerStyle(): void;
    /**
     * 计算层的位置
     * @param containerStyle 容器样式
     * @param layer 层对象
     */
    computePosition(containerStyle: CSSProperties, layer: Layer): void;
    /**
     * 获取或创建层的占位元素
     * @param layer 层对象
     * @returns 占位元素
     */
    private getOrCreatePlaceholder;
    /**
     * 更新组内所有层的位置
     * @todo 在有元素被移除后, 需要重新计算位置
     */
    updateLayersPosition(): void;
    /**
     * 清理不再可见的层的占位元素
     * @param visibleLayers 当前可见的层
     */
    private cleanupPlaceholders;
    /**
     * 注册窗口大小变化事件
     */
    regResizeEvent(): void;
    /**
     * 移除窗口大小变化事件
     */
    unregResizeEvent(): void;
    getLayers(): Layer[];
}
export default LayerGroup;
