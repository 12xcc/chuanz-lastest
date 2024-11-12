import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),  // 配置 @ 指向 src 目录
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import "element-plus/theme-chalk/index.css";`,
      },
    },
  },
  server: {
    proxy: {
      '/admin': {
        target: 'https://ds.sccdc.cn',
        // target: 'http://43.138.213.54:8080',
        changeOrigin: true,
        logLevel: 'debug',
      },
      '/cdcStaff': {
        target: 'https://ds.sccdc.cn',
        // target: 'http://43.138.213.54:8080',
        changeOrigin: true,
        logLevel: 'debug',
      },
      '/medicalStaff': {
        target: 'https://ds.sccdc.cn',
        // target: 'http://43.138.213.54:8080',
        changeOrigin: true,
        logLevel: 'debug',
      },
      '/common': {
        target: 'https://ds.sccdc.cn',
        // target: 'http://43.138.213.54:8080',
        changeOrigin: true,
        logLevel: 'debug',
      },
      '/user': {
        target: 'https://ds.sccdc.cn',
        // target: 'http://43.138.213.54:8080',
        changeOrigin: true,
        logLevel: 'debug',
      },
      '/ai': {
        target: 'https://ds.sccdc.cn',
        // target: 'http://43.138.213.54:8080',
        changeOrigin: true,
        logLevel: 'debug',
      },
    },
  },
});
