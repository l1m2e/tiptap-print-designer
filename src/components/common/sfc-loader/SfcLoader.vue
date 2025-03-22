<script setup lang="ts">
import { compileScript, compileTemplate, parse } from '@vue/compiler-sfc'
import { defineAsyncComponent } from 'vue'
// @ts-expect-error 忽略此类型问题
import { loadModule } from 'vue3-sfc-loader'

const { text, moduleCache = {} } = defineProps<{ text: string, moduleCache?: Record<string, any> }>()

const sfcComponent = shallowRef()

function generateComponent() {
  // 随机生成文件名解决缓存问题
  const randomFileName = `${Date.now()}.vue`

  const file = {
    files: {
      [randomFileName]: {
        getContentData: () => text,
      },
    },
  }

  const options = {
    moduleCache,
    async getFile(url: string) {
      return file.files[url]
    },

    addStyle(textContent: string) {
      const style = Object.assign(document.createElement('style'), { textContent })
      const ref = document.head.getElementsByTagName('style')[0] || null
      document.head.insertBefore(style, ref)
    },
  }

  const { errors: parseError, descriptor } = parse(text)

  if (parseError.length > 0)
    return console.error('Vue template syntax error:', parseError)

  try {
    if (descriptor?.scriptSetup?.content) {
      compileScript(descriptor, { id: 'sfc' })
      const { errors } = compileTemplate({ id: 'sfc', ...descriptor })
      errors.length > 0 && new Error(errors.join('\n'))
    }

    sfcComponent.value = defineAsyncComponent(() => loadModule(randomFileName, options as any))
  }
  catch (error) {
    console.error('编译失败:', error)
  }
}

watchImmediate(() => text, () => generateComponent())

onErrorCaptured((err, instance, info) => {
  console.error('[errorCaptured]', err, instance, info)
  return false
})

const sfcComponentRef = ref()
defineExpose({ sfcComponentRef })
</script>

<template>
  <component :is="sfcComponent" ref="sfcComponentRef" />
</template>
