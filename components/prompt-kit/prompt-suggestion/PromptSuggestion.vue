<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ButtonVariants } from '@/components/ui/button'

interface Props {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  highlight?: string
}

const props = defineProps<Props>()
const slots = defineSlots<{
  default(): any
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const isHighlightMode = computed(() => 
  props.highlight !== undefined && props.highlight.trim() !== ""
)

const processHighlight = (content: string, highlight: string) => {
  const trimmedHighlight = highlight.trim()
  const contentLower = content.toLowerCase()
  const highlightLower = trimmedHighlight.toLowerCase()
  const shouldHighlight = contentLower.includes(highlightLower)

  if (!shouldHighlight) {
    return [{ type: 'text', content, highlighted: false }]
  }

  const index = contentLower.indexOf(highlightLower)
  if (index === -1) {
    return [{ type: 'text', content, highlighted: false }]
  }

  const actualHighlightedText = content.substring(
    index,
    index + highlightLower.length
  )

  const before = content.substring(0, index)
  const after = content.substring(index + actualHighlightedText.length)

  const parts = []
  if (before) parts.push({ type: 'text', content: before, highlighted: false })
  parts.push({ type: 'text', content: actualHighlightedText, highlighted: true })
  if (after) parts.push({ type: 'text', content: after, highlighted: false })

  return parts
}

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<template>
  <Button
    v-if="!isHighlightMode"
    :variant="variant || 'outline'"
    :size="size || 'lg'"
    :class="cn('rounded-full', props.class)"
    @click="handleClick"
  >
    <slot />
  </Button>
  <Button
    v-else
    :variant="variant || 'ghost'"
    :size="size || 'sm'"
    :class="cn(
      'w-full cursor-pointer justify-start rounded-xl py-2',
      'hover:bg-accent',
      !highlight ? 'gap-0' : '',
      props.class
    )"
    @click="handleClick"
  >
    <template v-if="highlight && typeof $slots.default()[0]?.children === 'string'">
      <template 
        v-for="(part, index) in processHighlight($slots.default()[0].children, highlight)"
        :key="index"
      >
        <span 
          v-if="part.highlighted"
          class="text-primary font-medium whitespace-pre-wrap"
        >
          {{ part.content }}
        </span>
        <span 
          v-else
          class="text-muted-foreground whitespace-pre-wrap"
        >
          {{ part.content }}
        </span>
      </template>
    </template>
    <template v-else>
      <slot />
    </template>
  </Button>
</template> 
