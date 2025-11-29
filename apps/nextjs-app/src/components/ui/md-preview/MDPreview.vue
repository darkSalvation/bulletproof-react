<template>
  <div
    class="prose prose-slate w-full p-2"
    v-html="sanitizedHtml"
  />
</template>

<script setup lang="ts">
import DOMPurify from 'isomorphic-dompurify';
import { parse } from 'marked';

interface Props {
  value: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
});

const sanitizedHtml = computed(() => {
  return DOMPurify.sanitize(parse(props.value) as string);
});
</script>
