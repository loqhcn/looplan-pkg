import { defineConfig, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// 基础 Vite 配置
export const baseViteConfig: UserConfig = {
  css: {
		preprocessorOptions: {
			scss: {
				// css预加载
				// api: 'modern',
				additionalData: `@use "looplan-ui/lib/var.scss" as *;` // 根据你的文件路径调整  
			}
		}
	},
  define: {
		// 定义全局变量, 解决打包的依赖访问了 process.env.NODE_ENV 为 undefined 的问题
		'process.env.NODE_ENV': '"production"',
	},
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
      external: ['vue','looplan','looplan-ui','looplan-touch','looplan-use'],
      output: {
        globals: {
          vue: 'Vue',
          'looplan':'Looplan',
          'looplan-ui': 'LooplanUi',
          'looplan-touch': 'LooplanTouch',
          'looplan-use': 'LooplanUse'
        }
      }
    }
  }
}