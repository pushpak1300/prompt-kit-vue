<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface Props {
  src: string
  alt: string
  fallback?: string
  delayMs?: number
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Avatar :class="cn('h-8 w-8 shrink-0', props.class)">
    <AvatarImage :src="src" :alt="alt" />
    <AvatarFallback v-if="fallback" :delay-ms="delayMs">
      {{ fallback }}
    </AvatarFallback>
  </Avatar>
</template> 
