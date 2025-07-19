<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { inject } from 'vue'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface Props {
  class?: HTMLAttributes['class']
  tooltip: string
  side?: 'top' | 'bottom' | 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  side: 'top',
})

const promptInput = inject('promptInput', {
  isLoading: () => false,
  value: () => '',
  setValue: () => {},
  maxHeight: () => 240,
  onSubmit: () => {},
  textareaRef: { value: null },
})

const handleClick = (event: MouseEvent) => {
  event.stopPropagation()
}
</script>

<template>
  <Tooltip>
    <TooltipTrigger 
      as-child 
      :disabled="promptInput.isLoading()" 
      @click="handleClick"
    >
      <slot />
    </TooltipTrigger>
    <TooltipContent :side="side" :class="props.class">
      {{ tooltip }}
    </TooltipContent>
  </Tooltip>
</template> 
