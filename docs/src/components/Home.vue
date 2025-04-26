<script lang="ts" setup>
import { useRouter } from 'vitepress'
import { ref } from 'vue'
import { Button } from './ui/button'
import { CardBody, CardContainer, CardItem } from './ui/card-3d'
import { FlipWords } from './ui/flip-words'
import { RainbowButton } from './ui/rainbow-button'

const router = useRouter()
const HomeRef = ref<HTMLElement | null>(null)
</script>

<template>
  <div ref="HomeRef" class="w-[100%] h-[100vh] relative overflow-hidden flex items-center justify-center">
    <div class="flex flex-col items-center">
      <CardContainer class="md:mb-20 mb-10">
        <CardBody class="md:!size-[280px] !size-[220px] flex items-center justify-center group/card hover:shadow-2xl border relative border-black/[0.1] rounded-3xl bg-white dark:bg-black/[0.5]  dark:border-white/[0.2]  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
          <CardItem :translate-z="100">
            <img src="/logo.svg" class="md:size-[260px] size-[200px]">
          </CardItem>
        </CardBody>
      </CardContainer>

      <div class="md:!text-6xl !text-4xl text-black dark:text-white font-bold">
        tiptap-print-designer
      </div>

      <div class="md:text-2xl my-10 md:my-20">
        一个富文本打印设计器
        <FlipWords
          :words="['所见即所得', '可定制化', '开箱即用']"
          :duration="3000"
        />
      </div>
      <div class="md:mb-40">
        <RainbowButton @click="() => router.go('/tiptap-print-designer/guide/start')">
          开始使用
        </RainbowButton>
        <Button class="ml-4 rounded-xl h-11 py-2" variant="outline" size="lg">
          立即尝试
        </Button>
      </div>
    </div>
  </div>
</template>
