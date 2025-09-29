import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// const { resolve } = require('path');
import { resolve } from 'path';

export default defineConfig({
	plugins: [vue()],
	server: {
		host: '0.0.0.0',
		port: 7011
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
			// 'looplan-ui':resolve(__dirname,'D:\\work\\vue3-component\\looplan-ui\\src'),
			'@example':resolve(__dirname,'./example'),
			'@packages':resolve(__dirname,'./packages'),

		}
	},
	build: {
		outDir: 'lib',
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'LooplanHotel',
			fileName: (format) => `looplan-hotel.${format}.js`
		},
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ['vue', 'axios','looplan-ui','looplan'],
			output: {
				exports: 'named',
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: 'Vue',
					axios: 'axios',
					'looplan-ui': 'LooplanUi',
					'looplan': 'Looplan',
				},
			},
		},
	},
});
