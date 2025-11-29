<template>
  <div>
    <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {{ label }}
      <div class="mt-1">
        <input
          v-bind="field"
          :type="type"
          :class="cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
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
  type?: string;
  label?: string;
  error?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
});

const { value, handleChange, handleBlur } = useField(() => props.name);

const field = computed(() => ({
  value: value.value,
  onInput: handleChange,
  onBlur: handleBlur,
}));
</script>
