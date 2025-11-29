<template>
  <div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 z-50 flex flex-col items-end space-y-4 px-4 py-6 sm:items-start sm:p-6"
  >
    <Notification
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
      @dismiss="dismissNotification"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNotificationsStore } from '~/stores/notifications';
import Notification from './Notification.vue';

const notificationsStore = useNotificationsStore();
const { notifications } = storeToRefs(notificationsStore);
const { dismissNotification } = notificationsStore;
</script>
