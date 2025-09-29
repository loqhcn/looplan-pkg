import type { IconGatewayOption, IconPackageConfig } from '../types';
/**
 * 图标网关配置
 */
declare const iconGatewayOptions: IconGatewayOption[];
/**
 * 设置图标网关
 * @param gatewayOption 图标网关配置
 * @returns
 */
declare function setIconGateway(gatewayOption: IconGatewayOption): void;
/**
 * 获取图标包
 * @todo 从网关加载图标包
 */
declare function getIconPackage(packageName: string): Promise<IconPackageConfig>;
export { iconGatewayOptions, setIconGateway, getIconPackage, };
