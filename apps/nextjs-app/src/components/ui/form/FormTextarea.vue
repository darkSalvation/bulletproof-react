<template>
  <div>
    <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {{ label }}
      <div class="mt-1">
        <textarea
          v-bind="field"
          :class="cn(
            'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            props.class,
          )"
        />
      </div>
    </label>
    <FormError :error-message="error" />
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { cn } from '~/utils/cn';
import FormError from './FormError.vue';

interface Props {
  name: string;
  label?: string;
  error?: string;
  class?: string;
}

const props = defineProps<Props>();

const { value, handleChange, handleBlur } = useField(() => props.name);

const field = computed(() => ({
  value: value.value,
  onInput: handleChange,
  onBlur: handleBlur,
}));
</script>
