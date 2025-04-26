# 简介

`tiptap-print-designer `是一个所见即所得、开箱即用、可定制化的富文本打印设计器，它基于 `Vue3` 和 `Tiptap` 开发， 依赖 `openapiDoc` 生成数据源 。

它提供了两个重要组件：设计器 `Designer` 渲染器`Render `

### 设计器

是一个可视化设计器组件，用户可以通过像平常编写 Word 文档或者 Markdown 文档一样使用设计器，设计器会提供 关联字段 、基础表格 、 数据表格 、 数据格式化 等功能 。如果您并非软件开发者您只需阅读[设计器使用教程](/guide/designer-tutorial)即可

### 渲染器

开发者可以把设计好的`模板字符串`和`打印数据`传递给渲染器组件，渲染器就会在浏览器上渲染打印内容。渲染器内置了打印功能。在组件渲染完成后用户调用渲染器内部的打印方法即可完成打印。如果您追求服务端渲染打印模板的方案，您可以自己实现或者等我们社区实现对应语言的插件

---

### 技术栈

<script setup>
import { IconCloud } from '~/components/ui/icon-cloud'
const slugs = [
  "typescript",
  "tiptap",
  "tailwindcss",
  "vite",
  "pnpm",
  "nodedotjs",
  "vuedotjs",
  'eslint',
  'shadcnui/green',
];
const imageUrls = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}`);
</script>

<div class="grid place-content-center p-6">
  <IconCloud :images="imageUrls" />
</div>

更多请查看 [package.json](https://github.com/l1m2e/tiptap-print-designer/blob/main/packages/core/package.json)

---

### 浏览器支持

开发和测试平台均在 Google 和最新版 Edge 上完成，其它浏览器请自行测试。如果存在兼容问题可在 gitee 或 github 提交 Issue。
