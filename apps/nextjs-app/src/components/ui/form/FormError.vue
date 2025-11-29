<template>
  <div
    v-if="errorMessage"
    role="alert"
    :aria-label="errorMessage"
    class="text-sm font-semibold text-red-500"
  >
    {{ errorMessage }}
  </div>
</template>

<script setup lang="ts">
interface Props {
  errorMessage?: string | null;
}

defineProps<Props>();
</script>
