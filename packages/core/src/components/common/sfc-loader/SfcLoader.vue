<script setup lang="ts">
import { compileScript, compileTemplate, parse } from '@vue/compiler-sfc'
import { formatDate } from '@vueuse/core'
import { defineAsyncComponent } from 'vue'
import * as Vue from 'vue'
// @ts-expect-error 忽略此类型问题
import { loadModule } from 'vue3-sfc-loader'
import { TIPTAP_PRINT_DESIGNER_SFCLOADER_MODULE_CACHE } from '~/constants'
import { EDITOR_CONTEXT } from '~/editor/constants'

const { text } = defineProps<{ text: string }>()

const interiorModuleCache = {
  'vue': Vue,
  'TIPTAP_PRINT_DESIGNER/constants': { EDITOR_CONTEXT },
  'TIPTAP_PRINT_DESIGNER/utils': { formatDate },
}
const externalModuleCache = inject(TIPTAP_PRINT_DESIGNER_SFCLOADER_MODULE_CACHE, {})
const moduleCache = Object.assign({}, interiorModuleCache, externalModuleCache)

const sfcComponent = shallowRef()

const parentInstance = getCurrentInstance()
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

    sfcComponent.value = defineAsyncComponent(async () => {
      const comp: any = await loadModule(randomFileName, options)
      if (parentInstance?.appContext && !comp.appContext)
        comp.appContext = parentInstance.appContext
      return comp
    })
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
