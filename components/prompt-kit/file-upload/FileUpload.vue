<script setup lang="ts">
import { ref, provide, onMounted, onUnmounted } from 'vue'

interface Props {
  multiple?: boolean
  accept?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  multiple: true,
  disabled: false,
})

const emit = defineEmits<{
  filesAdded: [files: File[]]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const dragCounter = ref(0)

const handleFiles = (files: FileList) => {
  const newFiles = Array.from(files)
  if (props.multiple) {
    emit('filesAdded', newFiles)
  } else {
    emit('filesAdded', newFiles.slice(0, 1))
  }
}

const handleDrag = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
}

const handleDragIn = (e: DragEvent) => {
  handleDrag(e)
  dragCounter.value++
  if (e.dataTransfer?.items.length) isDragging.value = true
}

const handleDragOut = (e: DragEvent) => {
  handleDrag(e)
  dragCounter.value--
  if (dragCounter.value === 0) isDragging.value = false
}

const handleDrop = (e: DragEvent) => {
  handleDrag(e)
  isDragging.value = false
  dragCounter.value = 0
  if (e.dataTransfer?.files.length) {
    handleFiles(e.dataTransfer.files)
  }
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files?.length) {
    handleFiles(target.files)
    target.value = ''
  }
}

onMounted(() => {
  window.addEventListener('dragenter', handleDragIn)
  window.addEventListener('dragleave', handleDragOut)
  window.addEventListener('dragover', handleDrag)
  window.addEventListener('drop', handleDrop)
})

onUnmounted(() => {
  window.removeEventListener('dragenter', handleDragIn)
  window.removeEventListener('dragleave', handleDragOut)
  window.removeEventListener('dragover', handleDrag)
  window.removeEventListener('drop', handleDrop)
})

// Provide context for child components
provide('fileUpload', {
  isDragging,
  inputRef,
  multiple: () => props.multiple,
  disabled: () => props.disabled,
})
</script>

<template>
  <div>
    <input
      ref="inputRef"
      type="file"
      class="hidden"
      :multiple="multiple"
      :accept="accept"
      :disabled="disabled"
      aria-hidden="true"
      @change="handleFileSelect"
    />
    <slot />
  </div>
</template> 
