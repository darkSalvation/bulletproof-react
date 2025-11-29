<template>
  <NuxtLink
    :to="to"
    :class="cn('text-slate-600 hover:text-slate-900', props.class)"
    :target="target"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { cn } from '~/utils/cn';

interface Props {
  to: string;
  class?: string;
  target?: string;
}

const props = defineProps<Props>();
</script>
