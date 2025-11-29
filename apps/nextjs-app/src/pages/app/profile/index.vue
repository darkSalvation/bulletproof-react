<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <div class="flex justify-between">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          User Information
        </h3>
        <UpdateProfile />
      </div>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        Personal details of the user.
      </p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
      <dl class="sm:divide-y sm:divide-gray-200">
        <Entry label="First Name" :value="user.data.value?.firstName ?? ''" />
        <Entry label="Last Name" :value="user.data.value?.lastName ?? ''" />
        <Entry label="Email Address" :value="user.data.value?.email ?? ''" />
        <Entry label="Role" :value="user.data.value?.role ?? ''" />
        <Entry label="Bio" :value="user.data.value?.bio ?? ''" />
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUser } from '~/lib/auth';
import UpdateProfile from '~/components/features/users/UpdateProfile.vue';
import Entry from '~/components/features/users/ProfileEntry.vue';

definePageMeta({
  layout: 'app',
});

useHead({
  title: 'Profile',
});

const user = useUser();
</script>
