import type { ParseResult } from './../../scripts/BuildParse';
export declare const ensureDir: (dir: string) => Promise<void>;
export declare function generatePackageJson(pkgName: string, distDir: string, parseResult: ParseResult): Promise<void>;
export declare const removeDir: (dir: string) => Promise<void>;
