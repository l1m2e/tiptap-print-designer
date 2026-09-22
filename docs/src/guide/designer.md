### 设计器

```vue [Vue]
<script setup lang="ts">
import { Designer } from 'tiptap-print-designer'
</script>

<template>
  <Designer @save="save" />
</template>
```

### 浮动节点兼容

设计器新建的图片、字段和自定义组件，以及从剪贴板粘贴的原生图片，带有 `floatingVersion: 2`。开启自由拖拽后，节点限制在所在单元格的内容区域内；表格外限制在纸张可打印区域内。图片超过容器时等比显示，容器拉宽后可恢复设定的尺寸；自动适配不反复改写图片尺寸，实际拖动或手柄缩放才写入编辑结果。无法容纳的文字或组件恢复普通布局。

没有标记的旧节点继续使用原来的自由定位方式。打开、保存、复制或导入旧模板不会自动升级节点；新旧节点可以存在于同一模板中。复制旧图片节点仍保留旧版本；从剪贴板粘贴图片文件或外部网页图片才视为新建。HTML 使用 `data-floating-version="2"` 保存标记，Schema 默认值为 `null`。

通过 Tiptap API 插入节点时，需要显式指定标记才启用新规则，例如：

```ts
editor.commands.insertContent({
  type: 'field-node',
  attrs: { label: '姓名', path: 'user.name', floatingVersion: 2 },
})
```

兼容判断集中在 `useFloating` 的 `constrained` 中。未来迁移完旧模板或明确停止支持旧行为后，可将其改为始终启用约束，删除 `Floating` 扩展及新建节点时的标记写入；无需维护另一套旧版拖拽实现。
