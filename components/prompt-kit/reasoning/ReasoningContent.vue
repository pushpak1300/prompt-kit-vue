<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ref, inject, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { cn } from '@/lib/utils'
import { Markdown } from '@/components/prompt-kit/markdown'

interface Props {
  class?: HTMLAttributes['class']
  contentClass?: HTMLAttributes['class']
  markdown?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  markdown: false,
})

const contentRef = ref<HTMLDivElement>()
const innerRef = ref<HTMLDivElement>()

const reasoning = inject('reasoning', {
  isOpen: { value: false },
  onOpenChange: () => {},
})

let resizeObserver: ResizeObserver | null = null

const updateHeight = async () => {
  await nextTick()
  if (!contentRef.value || !innerRef.value) return

  if (reasoning.isOpen.value) {
    contentRef.value.style.maxHeight = `${innerRef.value.scrollHeight}px`
  } else {
    contentRef.value.style.maxHeight = '0px'
  }
}

onMounted(() => {
  if (innerRef.value) {
    resizeObserver = new ResizeObserver(updateHeight)
    resizeObserver.observe(innerRef.value)
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})

watch(() => reasoning.isOpen.value, updateHeight)
</script>

<template>
  <div
    ref="contentRef"
    :class="cn(
      'overflow-hidden transition-[max-height] duration-150 ease-out',
      props.class
    )"
    :style="{
      maxHeight: reasoning.isOpen.value ? 'auto' : '0px'
    }"
  >
    <div
      ref="innerRef"
      :class="cn(
        'text-muted-foreground prose prose-sm dark:prose-invert',
        contentClass
      )"
    >
      <Markdown v-if="markdown">
        <slot />
      </Markdown>
      <slot v-else />
    </div>
  </div>
</template> 
