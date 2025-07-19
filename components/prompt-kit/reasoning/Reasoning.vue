<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ref, provide, watch, computed } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
  open?: boolean
  isStreaming?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:open': [open: boolean]
}>()

const internalOpen = ref(false)
const wasAutoOpened = ref(false)

const isControlled = () => props.open !== undefined
const isOpen = computed(() => isControlled() ? props.open : internalOpen.value)

const handleOpenChange = (newOpen: boolean) => {
  if (!isControlled()) {
    internalOpen.value = newOpen
  }
  emit('update:open', newOpen)
}

watch(() => props.isStreaming, (newStreaming) => {
  if (newStreaming && !wasAutoOpened.value) {
    if (!isControlled()) internalOpen.value = true
    wasAutoOpened.value = true
  }

  if (!newStreaming && wasAutoOpened.value) {
    if (!isControlled()) internalOpen.value = false
    wasAutoOpened.value = false
  }
})

provide('reasoning', {
  isOpen,
  onOpenChange: handleOpenChange,
})
</script>

<template>
  <div :class="props.class">
    <slot />
  </div>
</template> 
