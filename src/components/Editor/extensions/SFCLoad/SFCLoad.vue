<script setup lang="ts">
import { NodeViewWrapper } from '@tiptap/vue-3'
import { compileScript, compileTemplate, parse } from '@vue/compiler-sfc'
import { defineAsyncComponent } from 'vue'
import { loadModule } from 'vue3-sfc-loader'
// import { moduleCache } from './moduleCache'

const props = defineProps<{ text: string }>()

const sfcComponent = shallowRef()

function generateComponent() {
  // 随机生成文件名解决缓存问题
  const randomFileName = `${Date.now()}.vue`

  const file = {
    files: {
      [randomFileName]: {
        getContentData: () => props.text,
      },
    },
  }

  const options = {
    // moduleCache,
    async getFile(url: string) {
      return file.files[url]
    },

    addStyle(textContent: string) {
      const style = Object.assign(document.createElement('style'), { textContent })
      const ref = document.head.getElementsByTagName('style')[0] || null
      document.head.insertBefore(style, ref)
    },
  }

  const { errors: parseError, descriptor } = parse(props.text)

  if (parseError.length > 0)
    return console.error('Vue template syntax error:', parseError)

  try {
    if (descriptor?.scriptSetup?.content) {
      compileScript(descriptor, { id: 'remote-component' })
      const { errors } = compileTemplate({ id: 'remote-component', ...descriptor })
      errors.length > 0 && new Error(errors.join('\n'))
    }

    sfcComponent.value = defineAsyncComponent(() => loadModule(randomFileName, options as any))
  }
  catch (error) {
    console.error('编译失败:', error)
  }
}

watchImmediate(() => props.text, () => generateComponent())

onErrorCaptured((err, instance, info) => {
  console.error('[errorCaptured]', err, instance, info)
  return false
})

const sfcComponentRef = ref()
defineExpose({ sfcComponentRef })
</script>

<template>
  <NodeViewWrapper
    as="div"
  >
    {{ text }}
  </NodeViewWrapper>
  <component :is="sfcComponent" ref="sfcComponentRef" />
</template>
