<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { inject, watch, nextTick } from 'vue'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface Props {
  disableAutosize?: boolean
  class?: HTMLAttributes['class']
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  disableAutosize: false,
})

const emit = defineEmits<{
  keydown: [event: KeyboardEvent]
}>()

const promptInput = inject('promptInput', {
  isLoading: () => false,
  value: () => '',
  setValue: () => {},
  maxHeight: () => 240,
  onSubmit: () => {},
  textareaRef: { value: null },
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  promptInput.setValue(target.value)
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    promptInput.onSubmit()
  }
  emit('keydown', event)
}

const autoResize = async () => {
  if (props.disableAutosize) return
  
  await nextTick()
  
  if (!promptInput.textareaRef.value) return
  
  const textarea = promptInput.textareaRef.value
  textarea.style.height = 'auto'
  
  const maxHeight = promptInput.maxHeight()
  const scrollHeight = textarea.scrollHeight
  
  if (typeof maxHeight === 'number') {
    textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`
  } else {
    textarea.style.height = `min(${scrollHeight}px, ${maxHeight})`
  }
}

// Watch for value changes to trigger auto-resize
watch(() => promptInput.value(), autoResize)
</script>

<template>
  <Textarea
    ref="promptInput.textareaRef"
    :value="promptInput.value()"
    :class="cn(
      'text-primary min-h-[44px] w-full resize-none border-none bg-transparent shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
      props.class
    )"
    :rows="1"
    :disabled="promptInput.isLoading()"
    :placeholder="placeholder"
    @input="handleInput"
    @keydown="handleKeyDown"
  />
</template> 
