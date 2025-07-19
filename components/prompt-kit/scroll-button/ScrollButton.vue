<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, inject } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ButtonVariants } from '@/components/ui/button'

interface Props {
  class?: HTMLAttributes['class']
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'outline',
  size: 'sm',
})

const stickToBottom = inject('stickToBottom', {
  isAtBottom: { value: false },
  scrollToBottom: () => {},
})

const buttonClass = computed(() => 
  cn(
    'h-10 w-10 rounded-full transition-all duration-150 ease-out',
    !stickToBottom.isAtBottom.value
      ? 'translate-y-0 scale-100 opacity-100'
      : 'pointer-events-none translate-y-4 scale-95 opacity-0',
    props.class
  )
)

const handleClick = () => {
  stickToBottom.scrollToBottom()
}
</script>

<template>
  <Button
    :variant="variant"
    :size="size"
    :class="buttonClass"
    @click="handleClick"
  >
    <ChevronDown class="h-5 w-5" />
  </Button>
</template> 
