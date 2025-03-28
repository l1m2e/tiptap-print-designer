import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    Vue({
      script: {
        propsDestructure: true,
        defineModel: true,
      },
    }),

    VueRouter(),
    vueJsx(),
    nodePolyfills(),
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
        { 'vue-router/auto': ['useLink'] },
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),
    Components({
      dts: true,
    }),
    /** @ts-expect-error https://github.com/vdesjs/vite-plugin-monaco-editor/issues/21 */
    monacoEditorPlugin.default({
      languageWorkers: ['editorWorkerService', 'typescript', 'json', 'html'],
    }),
  ],

  server: {
    port: 3333, // vite项目启动时自定义端口
    open: true, // vite项目启动时自动打开浏览器
    host: '0.0.0.0',
  },

})
