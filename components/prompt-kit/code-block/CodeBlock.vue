<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="cn(
      'not-prose flex w-full flex-col overflow-clip border',
      'border-border bg-card text-card-foreground rounded-xl',
      props.class
    )"
  >
    <slot />
  </div>
</template> 
