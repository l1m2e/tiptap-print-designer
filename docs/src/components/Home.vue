<script lang="ts" setup>
import { useData, useRouter } from 'vitepress'
import { ref } from 'vue'
import { Button } from './ui/button'
import { CardBody, CardContainer, CardItem } from './ui/card-3d'
import { FlipWords } from './ui/flip-words'
import { Logo } from './ui/logo'
import { ParticlesBg } from './ui/particles-bg'
import { RainbowButton } from './ui/rainbow-button'
import { SparklesText } from './ui/sparkles-text'

const { isDark } = useData()
const router = useRouter()
const HomeRef = ref<HTMLElement | null>(null)
</script>

<template>
  <div ref="HomeRef" class="w-[100%] h-[100vh] relative overflow-y-auto">
    <ParticlesBg :color="isDark ? '#fff' : '#000'" class="absolute top-0 left-0 right-0 bottom-0 -z-10 bg-gray-200 dark:bg-neutral-950" />
    <div class="pt-[64px] flex flex-col items-center">
      <CardContainer class="md:my-40 my-10">
        <CardBody class="md:!w-[280px] md:!h-[260px] !w-[200px] !h-[180px] flex items-center justify-center group/card hover:shadow-2xl border relative border-black/[0.1] rounded-3xl bg-white dark:bg-black/[0.5]  dark:border-white/[0.2]  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
          <CardItem :translate-z="100">
            <Logo class="md:size-[200px] size-[160px]" />
          </CardItem>
        </CardBody>
      </CardContainer>

      <SparklesText text="tiptap-print-designer" class="md:!text-6xl !text-4xl" />
      <div class="md:text-2xl my-10 md:my-20">
        一个富文本打印设计器
        <FlipWords
          :words="['设计像写Word一样简单', '可定制化', '开箱即用']"
          :duration="3000"
        />
      </div>
      <div>
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
