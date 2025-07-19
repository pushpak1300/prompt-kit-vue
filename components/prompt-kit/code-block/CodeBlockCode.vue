<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ref, watch, onMounted, computed } from 'vue'
import { codeToHtml } from '@/lib/shiki'
import { cn } from '@/lib/utils'

interface Props {
  code: string
  language?: string
  theme?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  language: 'tsx',
  theme: 'github-light',
})

const highlightedHtml = ref<string | null>(null)
const isLoading = ref(true)

const highlight = async () => {
  if (!props.code) {
    highlightedHtml.value = '<pre><code></code></pre>'
    isLoading.value = false
    return
  }

  try {
    const html = await codeToHtml(props.code, { 
      lang: props.language, 
      theme: props.theme 
    })
    highlightedHtml.value = html
  } catch (error) {
    // Fallback to plain text if highlighting fails
    highlightedHtml.value = `<pre><code>${props.code}</code></pre>`
  }
  isLoading.value = false
}

const classNames = computed(() => 
  cn(
    'w-full overflow-x-auto text-[13px] [&>pre]:px-4 [&>pre]:py-4',
    props.class
  )
)

onMounted(() => {
  highlight()
})

watch([() => props.code, () => props.language, () => props.theme], () => {
  isLoading.value = true
  highlight()
})
</script>

<template>
  <div :class="classNames">
    <div 
      v-if="highlightedHtml && !isLoading"
      v-html="highlightedHtml"
    />
    <div v-else>
      <pre><code>{{ code }}</code></pre>
    </div>
  </div>
</template> 
