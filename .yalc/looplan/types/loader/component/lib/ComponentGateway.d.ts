import type { GatewayOption, ComponentPackageConfig } from '../../../types/index';
/**
 * 组件网关配置
 */
declare const gatewayOptions: GatewayOption[];
declare function setGateway(gatewayOption: GatewayOption): void;
/**
 * 获取组件包
 * @todo 从网关加载组件包
 */
declare function getComponentPackage(packageName: string): Promise<ComponentPackageConfig>;
export { gatewayOptions, setGateway, getComponentPackage };
