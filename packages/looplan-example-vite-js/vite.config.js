import { defineConfig } from 'vite'

// 使用自定义配置的示例
// 这个配置将与基础配置合并
export default defineConfig({
  // 自定义构建选项
  build: {
    // 部分 lib 配置，将与解析系统注入的配置合并
    lib: {
      // 自定义输出格式
      formats: ['es', 'umd', 'cjs'],
      // 自定义库名称
      name: 'CustomTestViteConfig'
    },
    rollupOptions: {
      // 自定义外部依赖
      external: ['vue', 'lodash','axios'],
      // 自定义全局变量映射
      output: {
        globals: {
          vue: 'Vue',
          axios: 'axios',
          lodash: '_'
        }
      }
    }
  },
  // 自定义开发服务器配置
  server: {
    port: 3001
  },
  // 自定义定义
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development')
  }
})