<script setup lang="ts">
// import Designer from '~/Designer/Designer.vue'
import { useFormatDialog } from '~/composables'

const { open } = useFormatDialog()
</script>

<template>
  <Button @click="open({})">
    Open Dialog
  </Button>
  <!-- <Designer /> -->
</template>
