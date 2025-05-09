import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
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
    vue({
      script: {
        propsDestructure: true,
        defineModel: true,
      },
    }),
    vueJsx(),
    nodePolyfills(),
    autoImport({
      imports: [
        'vue',
        '@vueuse/core',
        { 'vue-router/auto': ['useLink'] },
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),
    components({
      dts: true,
    }),
    /** @ts-expect-error https://github.com/vdesjs/vite-plugin-monaco-editor/issues/21 */
    monacoEditorPlugin.default({
      languageWorkers: ['editorWorkerService', 'typescript', 'json', 'html'],
    }),
    dts({
      outDir: 'dist',
    }),
  ],

  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'tiptap-print-designer',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue', 'monaco-editor'],
      output: {
        globals: {
          'vue': 'Vue',
          'monaco-editor': 'monaco',
        },
      },
    },
  },

  server: {
    port: 3333,
    open: true,
    host: '0.0.0.0',
  },
})
