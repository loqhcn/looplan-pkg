import type { ComponentPackageConfig } from './component';
interface GatewayOption {
    /**
     * 网关名称
     */
    name: string;
    /**
     * 网关地址
     */
    url: string;
    /**
     * 组件包列表
     * @todo 设置组件包列表后, 指定组件从这个网关加载
     */
    packages?: string[];
    /**
     * 网关token
     */
    token?: string;
}
export type { GatewayOption, ComponentPackageConfig };
