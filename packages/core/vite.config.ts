import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
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
      external: [
        'vue',
        'monaco-editor',
        '@floating-ui/dom',
        '@tiptap/core',
        '@tiptap/vue-3',
        '@tiptap/pm',
        '@tiptap/extension-table',
        '@tiptap/extension-text-align',
        '@tiptap/extension-text-style',
        '@tiptap/extensions',
        '@tiptap/starter-kit',
        '@tiptap/suggestion',
      ],
      output: {
        globals: {
          'vue': 'Vue',
          'monaco-editor': 'monaco',
          '@floating-ui/dom': 'FloatingDOM',
          '@tiptap/core': 'TiptapCore',
          '@tiptap/vue-3': 'TiptapVue3',
          '@tiptap/pm': 'TiptapPM',
          '@tiptap/extension-table': 'TiptapExtensionTable',
          '@tiptap/extension-text-align': 'TiptapExtensionTextAlign',
          '@tiptap/extension-text-style': 'TiptapExtensionTextStyle',
          '@tiptap/extensions': 'TiptapExtensions',
          '@tiptap/starter-kit': 'TiptapStarterKit',
          '@tiptap/suggestion': 'TiptapSuggestion',
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
