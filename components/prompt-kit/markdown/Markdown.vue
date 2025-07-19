<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ref, computed, watchEffect } from 'vue'
import { marked } from 'marked'
import { cn } from '@/lib/utils'
import { CodeBlock, CodeBlockCode } from '../code-block'

interface Props {
  children?: string
  id?: string
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const blockId = ref(props.id || Math.random().toString(36).substr(2, 9))

const parseMarkdownIntoBlocks = (markdown: string): string[] => {
  const tokens = marked.lexer(markdown)
  return tokens.map((token) => token.raw)
}

const blocks = computed(() => {
  if (!props.children) return []
  return parseMarkdownIntoBlocks(props.children)
})

const extractLanguage = (className?: string): string => {
  if (!className) return 'plaintext'
  const match = className.match(/language-(\w+)/)
  return match ? match[1] : 'plaintext'
}

const isInlineCode = (node: any): boolean => {
  return !node?.position?.start.line ||
    node?.position?.start.line === node?.position?.end.line
}

const processMarkdown = (content: string): string => {
  // This is a simplified version - you might want to use a proper Vue markdown renderer
  // like @nuxtjs/mdc or similar for production
  return marked(content, {
    breaks: true,
    gfm: true,
  })
}
</script>

<template>
  <div :class="props.class">
    <div 
      v-for="(block, index) in blocks" 
      :key="`${blockId}-block-${index}`"
      v-html="processMarkdown(block)"
    />
  </div>
</template> 
