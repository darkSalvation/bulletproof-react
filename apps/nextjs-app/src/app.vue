<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Notifications />
  </div>
</template>

<script setup lang="ts">
import Notifications from '~/components/ui/notifications/Notifications.vue';
</script>
