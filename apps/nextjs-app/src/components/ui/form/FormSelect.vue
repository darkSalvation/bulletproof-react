<template>
  <div>
    <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {{ label }}
      <div class="mt-1">
        <select
          v-bind="field"
          :class="cn(
            'mt-1 block w-full rounded-md border-gray-600 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm',
            props.class,
          )"
        >
          <option v-for="option in options" :key="String(option.value)" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </label>
    <FormError :error-message="error" />
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { cn } from '~/utils/cn';
import FormError from './FormError.vue';

interface Option {
  label: string;
  value: string | number | string[];
}

interface Props {
  name: string;
  label?: string;
  error?: string;
  options: Option[];
  class?: string;
}

const props = defineProps<Props>();

const { value, handleChange, handleBlur } = useField(() => props.name);

const field = computed(() => ({
  value: value.value,
  onChange: handleChange,
  onBlur: handleBlur,
}));
</script>
