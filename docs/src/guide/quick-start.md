### 安装

1. 安装设计器

   ::: code-group

   ```sh [pnpm]
   pnpm add tiptap-print-designer
   ```

   ```sh [npm]
   npm install tiptap-print-designer
   ```

   ```sh [yarn]
   yarn add tiptap-print-designer
   ```

   ```sh [bun]
   bun add tiptap-print-designer
   ```

   :::

2. 设计器基于 Vue 3、Tiptap 和 Floating UI，因此需要手动安装以下依赖：

   ::: code-group

   ```sh [pnpm]
   pnpm add vue monaco-editor @floating-ui/dom @tiptap/core @tiptap/vue-3 @tiptap/pm @tiptap/extension-table @tiptap/extension-text-align @tiptap/extension-text-style @tiptap/extensions @tiptap/starter-kit @tiptap/suggestion
   ```

   ```sh [npm]
   npm install vue monaco-editor @floating-ui/dom @tiptap/core @tiptap/vue-3 @tiptap/pm @tiptap/extension-table @tiptap/extension-text-align @tiptap/extension-text-style @tiptap/extensions @tiptap/starter-kit @tiptap/suggestion
   ```

   ```sh [yarn]
   yarn add vue monaco-editor @floating-ui/dom @tiptap/core @tiptap/vue-3 @tiptap/pm @tiptap/extension-table @tiptap/extension-text-align @tiptap/extension-text-style @tiptap/extensions @tiptap/starter-kit @tiptap/suggestion
   ```

   ```sh [bun]
   bun add vue monaco-editor @floating-ui/dom @tiptap/core @tiptap/vue-3 @tiptap/pm @tiptap/extension-table @tiptap/extension-text-align @tiptap/extension-text-style @tiptap/extensions @tiptap/starter-kit @tiptap/suggestion
   ```

   :::

3. `monaco-editor` 资源加载 安装`vite-plugin-monaco-editor`并使用插件

   ::: code-group

   ```sh [pnpm]
   pnpm add vite-plugin-monaco-editor
   ```

   ```sh [npm]
   npm install vite-plugin-monaco-editor
   ```

   ```sh [yarn]
   yarn add vite-plugin-monaco-editor
   ```

   ```sh [bun]
   bun add vite-plugin-monaco-editor
   ```

   :::

   ```ts [vite.config.ts]
   import monacoEditorPlugin from 'vite-plugin-monaco-editor'

   export default defineConfig({
     plugins: [
       /** @ts-expect-error https://github.com/vdesjs/vite-plugin-monaco-editor/issues/21 */
       monacoEditorPlugin.default({
         languageWorkers: ['editorWorkerService', 'typescript', 'json', 'html'],
       }),
     ]
   })
   ```

4. 在入口文件引入样式

   ```ts [main.ts]
   import 'tiptap-print-designer/index.css'
   ```

### 使用设计器组件

```vue [Vue]
<script setup lang="ts">
import { Designer } from 'tiptap-print-designer'
</script>

<template>
  <Designer />
</template>
```

### 使用渲染器组件

```vue [Vue]
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
