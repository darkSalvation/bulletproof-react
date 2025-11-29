<template>
  <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
    <div class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5">
      <div class="p-4" role="alert" :aria-label="notification.title">
        <div class="flex items-start">
          <div class="shrink-0">
            <component :is="icons[notification.type]" />
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
            <p class="mt-1 text-sm text-gray-500">{{ notification.message }}</p>
          </div>
          <div class="ml-4 flex shrink-0">
            <button
              class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              @click="$emit('dismiss', notification.id)"
            >
              <span class="sr-only">Close</span>
              <CircleX class="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { Info, CircleAlert, CircleX, CircleCheck } from 'lucide-vue-next';
import type { Notification } from '~/stores/notifications';

const icons = {
  info: h(Info, { class: 'size-6 text-blue-500', 'aria-hidden': 'true' }),
  success: h(CircleCheck, { class: 'size-6 text-green-500', 'aria-hidden': 'true' }),
  warning: h(CircleAlert, { class: 'size-6 text-yellow-500', 'aria-hidden': 'true' }),
  error: h(CircleX, { class: 'size-6 text-red-500', 'aria-hidden': 'true' }),
};

interface Props {
  notification: Notification;
}

defineProps<Props>();
defineEmits<{
  dismiss: [id: string];
}>();
</script>
