import { build, InlineConfig, mergeConfig } from "vite";
import { existsSync } from "fs";
import { resolve } from "path";
import { createBaseConfig } from "./vite.base";

async function run() {
  const pkg = process.env.PKG;
  if (!pkg) {
    throw new Error("请提供组件库名，例如: PKG=ui-core");
  }

  const pkgPath = resolve(__dirname, `../packages/${pkg}`);
  const userConfigPath = resolve(pkgPath, "vite.config.ts");

  let finalConfig: InlineConfig;

  if (existsSync(userConfigPath)) {
    console.log(`使用 ${pkg} 的独立 vite.config.ts`);
    finalConfig = (await import(userConfigPath)).default;
  } else {
    console.log(`使用公共配置构建 ${pkg}`);
    finalConfig = createBaseConfig(pkg);
  }

  await build(finalConfig);
}

run();