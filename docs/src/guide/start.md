# 简介

`tiptap-print-designer `是一个使用 `Vue 3` 和 `Tiptap` 构建的所见即所得的富文本打印设计器库。它提供了一个可视化模板设计系统，允许用户创建具有数据绑定功能的打印模板，然后使用实际数据呈现这些模板以进行打印。

它提供了两个重要组件：设计器 `Designer` 渲染器`Render `

### 设计器

是一个可视化设计器组件，设计器会提供 关联字段 、基础表格 、 数据表格 、 数据格式化 等功能设计阶段的数据模拟功能依赖于 `openapiDoc`

### 渲染器

开发者可以把设计好的模板字符串和打印数据传递给渲染器组件，渲染器就会在浏览器上渲染打印内容。渲染器内置了打印功能。在组件渲染完成后用户调用渲染器内部的打印方法即可完成打印

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

### 当前功能和路线图

#### 实现的功能

- 基础编辑功能
- 使用数据绑定插入字段
- 基础表格
- 数据表格
- 数据格式化
- 插入单文件组件

#### 计划的功能

- QR 码和条形码
- 分页符
- 使用页眉和页脚进行分页
