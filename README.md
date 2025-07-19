# prompt-kit-vue

**Customizable, high-quality components for AI applications.**  
Build chat experiences, AI agents, autonomous assistants, and more, quickly and beautifully.
This is a Vue port of [prompt-kit](https://github.com/prompt-kit/prompt-kit).

![cover](/app/opengraph-image.jpg)

## Installation

### Install shadcn/vue

First, you'll need to install and configure [shadcn/vue](https://www.shadcn-vue.com/) in your project.  
Follow the installation guide in the shadcn/vue documentation.

### Install prompt-kit components

Once shadcn/vue is set up, you can install `prompt-kit-vue` components using the shadcn CLI:

```sh
npx shadcn-vue@latest add prompt-kit-vue/[component]
```

### Usage

After installation, import and start using the components in your project:

```vue
<template>
  <PromptInput />
</template>

<script setup lang="ts">
import { PromptInput } from "@/components/ui/prompt-input"
</script>
```
