<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ref, provide, watch } from 'vue'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface Props {
  isLoading?: boolean
  value?: string
  maxHeight?: number | string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  maxHeight: 240,
})

const emit = defineEmits<{
  'update:value': [value: string]
  submit: []
}>()

const internalValue = ref(props.value || '')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const handleValueChange = (newValue: string) => {
  internalValue.value = newValue
  emit('update:value', newValue)
}

const handleSubmit = () => {
  emit('submit')
}

// Watch for external value changes
watch(() => props.value, (newValue) => {
  if (newValue !== undefined) {
    internalValue.value = newValue
  }
})

// Provide context for child components
provide('promptInput', {
  isLoading: () => props.isLoading,
  value: () => props.value ?? internalValue.value,
  setValue: handleValueChange,
  maxHeight: () => props.maxHeight,
  onSubmit: handleSubmit,
  textareaRef,
})

const handleContainerClick = () => {
  textareaRef.value?.focus()
}
</script>

<template>
  <TooltipProvider>
    <div
      :class="cn(
        'border-input bg-background cursor-text rounded-3xl border p-2 shadow-xs',
        props.class
      )"
      @click="handleContainerClick"
    >
      <slot />
    </div>
  </TooltipProvider>
</template> 
