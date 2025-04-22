import path from 'node:path'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'tiptap-print-designer',
  description: 'tiptap-print-designer',
  base: '/tiptap-print-designer/',
  srcDir: './src',
  vite: {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, '../src')}/`,
        '@/': `${path.resolve(__dirname, '../src')}/`,
      },
    },
  },
})
