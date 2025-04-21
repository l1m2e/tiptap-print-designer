# tiptap-print-designer

#### 一个开箱即用的富文本打印设计器

## 简介

一个基于 tiptap vue3 开发，和 openapiDoc 结合的打印设计器，所有的打印内容皆为富文本节点。 让开发者可以像写文档一样设计打印模板。

#### 快速上手

安装

```sh
pnpm i tiptap-print-designer
```

在入口文件引入样式

```ts
import 'tiptap-print-designer/index.css'
```

使用组件

设计器

```vue
<script setup lang="ts">
import { Designer } from 'tiptap-print-designer'
</script>

<template>
  <Designer @save="save" />
</template>
```

渲染器

```vue
<script setup lang="ts">
import type { TemplateData } from 'tiptap-print-designer'
import { Render } from 'tiptap-print-designer'
import { ref } from 'vue'

const template = ref<TemplateData>({
  content: '<p><field-node label="boos信息" path="boosInfo.name" format="" fontsize="12pt"></field-node></p>',
  page: {
    size: [
      '210mm',
      '297mm',
    ],
    paperType: 'A4',
  },
})
const data = ref({ boosInfo: { name: '黄金律法-拉达冈' } })
</script>

<template>
  <Render :template="template" :data="data" />
</template>
```

#### 功能

已实现功能

- [x] 基础富文本功能

* [x] 字段

- [x] 表格

* [x] 数据表格

- [x] 自定义组件

未实现功能（待更新）

- [ ] 二维码 条形码

- [ ] 分页符

- [ ] 分页（页头页脚）
