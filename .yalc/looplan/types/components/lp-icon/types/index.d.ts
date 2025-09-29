interface IconfontType {
    woff2: string;
    woff: string;
    truetype: string;
}
type IconsOption = {
    [key: string]: string;
};
/**
 * 图标组件属性
 *
 */
interface LpIconProps {
    /**
     * 图标名称
     * @example package@name
     * @description 图标名称，格式为 package@name，package 为图标库的名称，name 为图标字体的图标名称
     */
    is: string;
    /**
     * 图标大小
     */
    size?: number | string;
    /**
     * 图标颜色
     */
    color?: string;
}
/**
 * 图标包配置
 */
interface IconPackageConfig {
    /**
     * 图标字体标题
     */
    title: string;
    /**
     * 图标字体名称
     */
    name: string;
    /**
     * 图标字体类型
     */
    type: string;
    /**
     * 对应类型的数据
     */
    data: IconfontType;
    /**
     * 图标选项
     */
    icons: IconsOption;
    /**
     * 图标字体版本
     */
    version: string;
}
interface IconGatewayOption {
    /**
     * 网关名称
     */
    name: string;
    /**
     * 网关地址
     */
    url: string;
    /**
     * 图标包列表
     * @todo 设置图标包列表后, 指定图标包从这个网关加载
     */
    packages?: string[];
    /**
     * 网关token
     */
    token?: string;
}
export type { IconfontType, IconsOption, IconPackageConfig, LpIconProps, IconGatewayOption };
