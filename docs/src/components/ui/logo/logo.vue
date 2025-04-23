<script setup lang="ts">
// 仅用于展示logo，无逻辑
</script>

<template>
  <div class="relative">
    <div class="absolute left-[20%] top-[10%] w-[60%] h-[25%] bg-gray-300 rounded-t-xl z-20" />
    <!-- 打印机主体 -->
    <div class="top-[25%] w-[80%] left-[10%] h-[10%] to bg-neutral-800 rounded-t-md relative " />
    <div class="w-full top-[25%] h-[40%] to bg-neutral-800 rounded-2xl relative shadow-2xl" />
    <!-- 打印机按钮 -->
    <div class="absolute size-3 bg-white rounded-full left-[10%] top-[45%]" />
    <div class="absolute size-3 bg-white rounded-full left-[20%] top-[45%]" />
    <!-- 底部出纸口/纸张 -->
    <div class="absolute left-[18%] top-[60%] w-[64%] h-[30%] bg-white rounded-md shadow-lg z-20" />
    <!-- 出纸口线条 -->
    <div class="absolute left-[25%] top-[68%] w-[50%] h-[6%] bg-gray-200 rounded-full z-30" />
    <div class="absolute left-[25%] top-[78%] w-[50%] h-[6%] bg-gray-200 rounded-full z-30" />
  </div>
</template>
