import { type UserConfig } from 'vite';
interface ParseLog {
    level: 'info' | 'warn' | 'error';
    message: string;
    timestamp: Date;
}
interface ParseResult {
    /** 组件包名称 */
    pkgName: string;
    /** 组件包路径 */
    pkgPath: string;
    /** 入口文件 */
    entryFile: string | null;
    /** 是否使用TypeScript */
    useType: boolean;
    /** Vite配置文件路径 */
    viteConfig: string | null;
    /** Vite配置对象 */
    viteConfigObject: UserConfig | null;
    /** package.json内容 */
    packageJson: any | null;
    /** 配置文件内容 */
    config: any | null;
    /** 解析日志 */
    logs: ParseLog[];
    /** 是否解析成功 */
    success: boolean;
}
declare class BuildParse {
    logs: ParseLog[];
    pkgName: string;
    private projectRoot;
    constructor();
    /**
     * 创建解析器实例
     * @param pkgName 组件包名称
     * @returns BuildParse实例
     */
    static src(pkgName: string): BuildParse;
    private addLog;
    private fileExists;
    private readJsonFile;
    private readConfigFile;
    parse(): Promise<ParseResult>;
    /**
     * 解析并合并Vite配置
     * @param pkgPath 组件包路径
     * @param viteConfigFile Vite配置文件路径
     * @returns 合并后的Vite配置对象
     */
    private parseViteConfig;
    /**
     * 智能合并Vite配置，避免重复项
     */
    private smartMergeConfig;
    /**
     * 读取基础Vite配置
     */
    private loadBaseViteConfig;
    /**
     * 读取组件包的自定义Vite配置
     */
    private loadCustomViteConfig;
    /**
     * 注入必要的路径配置
     */
    private injectPathConfig;
    private findEntryFile;
    private findViteConfig;
    private parsePackageJson;
    private findConfig;
}
interface PackageItem {
    name: string;
    path: string;
    config: any;
    hasEntryFile: boolean;
    hasViteConfig: boolean;
    hasPackageJson: boolean;
    hasConfig: boolean;
}
/**
 * 获取所有组件包
 */
declare function getPackages(): Promise<PackageItem[]>;
export { getPackages, BuildParse, type ParseResult };
