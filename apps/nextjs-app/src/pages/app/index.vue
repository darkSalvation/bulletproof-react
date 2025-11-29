<template>
  <div>
    <h1 class="text-xl">
      Welcome <b>{{ user.data.value?.firstName }} {{ user.data.value?.lastName }}</b>
    </h1>
    <h4 class="my-3">
      Your role is : <b>{{ user.data.value?.role }}</b>
    </h4>
    <p class="font-medium">In this application you can:</p>
    <ul v-if="user.data.value?.role === 'USER'" class="my-4 list-inside list-disc">
      <li>Create comments in discussions</li>
      <li>Delete own comments</li>
    </ul>
    <ul v-if="user.data.value?.role === 'ADMIN'" class="my-4 list-inside list-disc">
      <li>Create discussions</li>
      <li>Edit discussions</li>
      <li>Delete discussions</li>
      <li>Comment on discussions</li>
      <li>Delete all comments</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useUser } from '~/lib/auth';

definePageMeta({
  layout: 'app',
});

useHead({
  title: 'Dashboard',
});

const user = useUser();
</script>
