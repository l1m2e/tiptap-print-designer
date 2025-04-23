import type { DefaultTheme } from 'vitepress'
import path from 'node:path'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'tiptap-print-designer',
  description: 'tiptap-print-designer',
  base: '/tiptap-print-designer/',
  srcDir: 'src',
  themeConfig: {
    sidebar: {
      '/guide/': { base: '/guide/', items: sidebarGuide() },
    },
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/l1m2e/tiptap-print-designer' },
    ],
    docFooter: { prev: '上一页', next: '下一页' },
    outlineTitle: '目录',
  },
  vite: {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, '../src')}/`,
        '@/': `${path.resolve(__dirname, '../src')}/`,
      },
    },
  },
})

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '指南',
      collapsed: false,
      items: [
        { text: '简介', link: 'start' },
        { text: '安装', link: 'installation' },
        { text: '快速上手', link: 'quick-start' },
      ],
    },
    {
      text: '组件',
      collapsed: false,
      items: [
        { text: 'Designer', link: 'designer' },
        { text: 'Render', link: 'render' },
      ],
    },
  ]
}
