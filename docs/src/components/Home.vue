<script lang="ts" setup>
import { useData } from 'vitepress'
import { Button } from './ui/button'
import { FlipWords } from './ui/flip-words'
import { ParticlesBg } from './ui/particles-bg'
import { SparklesText } from './ui/sparkles-text'

const { isDark } = useData()
</script>

<template>
  <div class="w-[100%] h-[100vh] relative">
    <ParticlesBg :color="isDark ? '#fff' : '#000'" class="absolute top-0 left-0 right-0 bottom-0 -z-10" />
    <div class="pt-[64px] flex flex-col items-center">
      <img class="size-[200px] border rounded md:my-40 my-10">
      <SparklesText text="tiptap-print-designer" class="md:text-6xl text-4xl" />
      <div class="md:text-2xl my-10 md:my-20">
        一个富文本打印设计器
        <FlipWords
          :words="['设计像写Word一样简单', '可定制化', '开箱即用']"
          :duration="3000"
        />
      </div>
      <div>
        <Button>开始使用</Button>
        <Button class="ml-4 " variant="secondary">
          立即尝试
        </Button>
      </div>
    </div>
  </div>
</template>
