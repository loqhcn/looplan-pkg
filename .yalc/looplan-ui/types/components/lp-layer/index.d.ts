import Layer from './src/lib/Layer';
import DialogContainer from './src/containers/dialog.vue';
import LayerGroup from './src/lib/LayerGroup';
interface ToastOptions {
    /**
     * 消息文本
     */
    message?: string;
    /**
     * 持续时间:
     * 单位：毫秒
     * 默认值：2000
     */
    duration?: number;
    /**
     * 类型
     * 可选值：success、error、warning、info
     * 默认值：info
     */
    type?: string;
}
interface AlertOptions {
    title?: string;
    message?: string;
}
interface ConfirmOptions extends AlertOptions {
}
/**
 * 显示toast提示
 * @param options 消息文本或配置对象
 * @returns Layer实例
 */
declare function toast(message: string, options: ToastOptions): Promise<Layer>;
/**
 * 显示确认框
 * @param options 消息文本或配置对象
 * @returns Promise，resolve为用户选择结果
 */
declare function confirm(options: string | ConfirmOptions): Promise<boolean>;
/**
 * 显示警告框
 * @param options 消息文本或配置对象
 * @returns Promise，resolve为用户点击确定
 */
declare function alert(options: string | AlertOptions): Promise<void>;
export { Layer, DialogContainer, toast, confirm, alert, LayerGroup };
declare let component: {
    install: (app: any) => void;
};
export default component;
