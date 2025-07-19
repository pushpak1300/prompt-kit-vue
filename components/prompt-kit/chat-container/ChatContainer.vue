<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { provide, ref, onMounted } from 'vue'
import { cn } from '@/utils'

interface Props {
  class?: HTMLAttributes['class']
  resize?: 'smooth' | 'instant'
  initial?: 'smooth' | 'instant'
}

const props = withDefaults(defineProps<Props>(), {
  resize: 'smooth',
  initial: 'instant',
})

const containerRef = ref<HTMLDivElement>()
const isAtBottom = ref(true)

const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
  if (containerRef.value) {
    containerRef.value.scrollTo({
      top: containerRef.value.scrollHeight,
      behavior,
    })
  }
}

const checkIfAtBottom = () => {
  if (containerRef.value) {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.value
    isAtBottom.value = scrollTop + clientHeight >= scrollHeight - 5
  }
}

const handleScroll = () => {
  checkIfAtBottom()
}

onMounted(() => {
  if (props.initial === 'instant') {
    scrollToBottom('instant')
  } else {
    scrollToBottom('smooth')
  }
})

provide('stickToBottom', {
  isAtBottom,
  scrollToBottom,
  containerRef,
})
</script>

<template>
  <div
    ref="containerRef"
    :class="cn('flex overflow-y-auto', props.class)"
    role="log"
    @scroll="handleScroll"
  >
    <slot />
  </div>
</template> 
