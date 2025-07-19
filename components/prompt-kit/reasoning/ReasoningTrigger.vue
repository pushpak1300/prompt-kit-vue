<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { inject } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const reasoning = inject('reasoning', {
  isOpen: { value: false },
  onOpenChange: () => {},
})

const handleClick = () => {
  reasoning.onOpenChange(!reasoning.isOpen.value)
}
</script>

<template>
  <button
    :class="cn('flex cursor-pointer items-center gap-2', props.class)"
    @click="handleClick"
  >
    <span class="text-primary">
      <slot />
    </span>
    <div
      :class="cn(
        'transform transition-transform',
        reasoning.isOpen.value ? 'rotate-180' : ''
      )"
    >
      <ChevronDown class="size-4" />
    </div>
  </button>
</template> 
