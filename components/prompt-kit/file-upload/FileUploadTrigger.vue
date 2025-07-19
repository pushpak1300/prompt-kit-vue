<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { inject } from 'vue'

interface Props {
  asChild?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  asChild: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const fileUpload = inject('fileUpload', {
  isDragging: { value: false },
  inputRef: { value: null },
  multiple: () => true,
  disabled: () => false,
})

const handleClick = (event: MouseEvent) => {
  event.stopPropagation()
  fileUpload.inputRef.value?.click()
  emit('click', event)
}
</script>

<template>
  <button
    v-if="!asChild"
    type="button"
    :class="props.class"
    @click="handleClick"
  >
    <slot />
  </button>
  <div
    v-else
    role="button"
    :class="props.class"
    @click="handleClick"
  >
    <slot />
  </div>
</template> 
