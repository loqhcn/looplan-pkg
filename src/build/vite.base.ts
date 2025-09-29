import { defineConfig, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// 基础 Vite 配置
export const baseViteConfig: UserConfig = {
  plugins: [
    vue({
      include: [/\.vue$/],
      exclude: [/node_modules/],
      template: {
        compilerOptions: {
          // 确保正确处理模板
        }
      }
    }),
    dts({
      insertTypesEntry: true,
      cleanVueFileName: true,
      copyDtsFiles: true,
      include: ['src/**/*'],
      exclude: ['**/*.test.ts', '**/*.spec.ts']
    })
  ],
  build: {
    // lib 配置将在运行时动态注入
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
}