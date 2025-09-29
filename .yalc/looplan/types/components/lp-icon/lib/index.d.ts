import type { IconPackageConfig } from '../types';
/**
 * 已加载的图标库
 */
declare const IconPackages: Record<string, IconPackageConfig>;
/**
 * 加载图标
 */
declare function loadIcon(iconName: string): Promise<string>;
/**
 * 设置图标包
 * @param pkg 图标包配置
 */
declare function setIconPackage(pkg: IconPackageConfig): void;
/**
 * 解析图标名称
 */
declare function parseIconName(iconName: string): IconInfo;
/**
 * 挂载字体样式
 * @param pkg 图标包配置
 */
declare function mountIconfont(pkg: IconPackageConfig): void;
/**
 * 取消挂载字体样式
 * @param pkg 图标包配置
 */
declare function unmountIconfont(pkg: IconPackageConfig): void;
interface IconInfo {
    package: string;
    icon: string;
}
export { IconPackages, loadIcon, parseIconName, mountIconfont, unmountIconfont, setIconPackage, };
