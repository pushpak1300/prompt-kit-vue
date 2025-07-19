<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { Markdown } from '@/components/prompt-kit/markdown'

interface Props {
  markdown?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  markdown: false,
})

const classNames = computed(() => 
  cn(
    'rounded-lg p-2 text-foreground bg-secondary prose break-words whitespace-normal',
    props.class
  )
)
</script>

<template>
  <Markdown 
    v-if="markdown" 
    :class="classNames"
  >
    <slot />
  </Markdown>
  <div 
    v-else 
    :class="classNames"
  >
    <slot />
  </div>
</template> 
