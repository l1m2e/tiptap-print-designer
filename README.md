# tiptap-print-designer

[![npm version](https://img.shields.io/npm/v/tiptap-print-designer.svg)](https://www.npmjs.com/package/tiptap-print-designer)
[![license](https://img.shields.io/npm/l/tiptap-print-designer.svg)](https://github.com/l1m2e/tiptap-print-designer/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dm/tiptap-print-designer.svg)](https://www.npmjs.com/package/tiptap-print-designer)

一个开箱即用的富文本打印设计器，基于 tiptap 和 Vue3 开发。让开发者可以像写文档一样设计打印模板。

## ✨ 特性

- 🎨 **所见即所得** - 基于 tiptap 的富文本编辑器
- 📝 **字段绑定** - 支持动态数据字段绑定
- 📊 **表格支持** - 支持表格和数据表格
- 🧩 **自定义组件** - 支持自定义 Vue 组件
- 🌐 **OpenAPI 集成** - 与 OpenAPI 文档深度集成
- 🎯 **TypeScript 支持** - 完整的 TypeScript 类型定义

## 📦 安装

```sh
npm install tiptap-print-designer
# 或
yarn add tiptap-print-designer
# 或
pnpm add tiptap-print-designer
```

## 🚀 快速开始

### 1. 引入样式

在你的入口文件中引入样式：

```ts
import 'tiptap-print-designer/index.css'
```

### 2. 使用设计器

```vue
<script setup lang="ts">
import { Designer } from 'tiptap-print-designer'

function handleSave(templateData) {
  console.log('保存模板数据:', templateData)
}
</script>

<template>
  <Designer @save="handleSave" />
</template>
```

### 3. 使用渲染器

```vue
<script setup lang="ts">
import type { TemplateData } from 'tiptap-print-designer'
import { Render } from 'tiptap-print-designer'
import { ref } from 'vue'

const template = ref<TemplateData>({
  content: '<p><field-node label="用户信息" path="user.name" format="" fontsize="12pt"></field-node></p>',
  page: {
    size: ['210mm', '297mm'],
    paperType: 'A4',
  },
  dataSources: [],
  mockData: {}
})

const data = ref({
  user: { name: '张三' }
})
</script>

<template>
  <Render :template="template" :data="data" />
</template>
```

## 📚 API 文档

### Designer 组件

设计器组件用于创建和编辑打印模板。

**Props:**

- 无

**Events:**

- `@save(templateData: TemplateData)` - 保存模板时触发

### Render 组件

渲染器组件用于渲染打印模板。

**Props:**

- `template: TemplateData` - 模板数据
- `data: Record<string, any>` - 渲染数据

### 类型定义

```typescript
interface TemplateData {
  content: string // 模板内容
  page: PageConfig // 页面配置
  dataSources: DataSource[] // 数据源配置
  mockData: Record<string, any> // 模拟数据
}

interface PageConfig {
  size: [string, string] // 页面尺寸
  paperType: string // 纸张类型
}
```

## 🎯 功能特性

已实现功能:

- ✅ 基础富文本功能
- ✅ 字段绑定
- ✅ 表格支持
- ✅ 数据表格
- ✅ 自定义组件

计划中功能:

- ⏳ 二维码 / 条形码
- ⏳ 分页符
- ⏳ 分页（页头页脚）

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

[MIT](./LICENSE) © l1m2e

## 🔗 相关链接

- [GitHub 仓库](https://github.com/l1m2e/tiptap-print-designer)
- [文档站点](https://l1m2e.github.io/tiptap-print-designer/)
- [Issue 反馈](https://github.com/l1m2e/tiptap-print-designer/issues)
