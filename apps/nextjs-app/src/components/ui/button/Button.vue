<template>
  <component
    :is="asChild ? 'slot' : 'button'"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="disabled || isLoading"
    v-bind="$attrs"
  >
    <Spinner v-if="isLoading" size="sm" class="text-current" />
    <span v-if="!isLoading && $slots.icon" class="mr-2">
      <slot name="icon" />
    </span>
    <span class="mx-2">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority';
import { cn } from '~/utils/cn';
import { buttonVariants } from './variants';
import Spinner from '../spinner/Spinner.vue';

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface Props {
  class?: string;
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  asChild?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  asChild: false,
  isLoading: false,
  disabled: false,
});
</script>
