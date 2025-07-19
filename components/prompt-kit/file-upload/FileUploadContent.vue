<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { inject, ref, onMounted, onUnmounted, computed, Teleport } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const mounted = ref(false)

const fileUpload = inject('fileUpload', {
  isDragging: { value: false },
  inputRef: { value: null },
  multiple: () => true,
  disabled: () => false,
})

onMounted(() => {
  mounted.value = true
})

onUnmounted(() => {
  mounted.value = false
})

const shouldShow = computed(() => 
  fileUpload.isDragging.value && mounted.value && !fileUpload.disabled()
)
</script>

<template>
  <Teleport to="body">
    <div
      v-if="shouldShow"
      :class="cn(
        'bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm',
        'animate-in fade-in-0 slide-in-from-bottom-10 zoom-in-90 duration-150',
        props.class
      )"
    >
      <slot />
    </div>
  </Teleport>
</template> 
