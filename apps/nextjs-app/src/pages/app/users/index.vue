<template>
  <ContentLayout title="Users">
    <div v-if="!user?.data.value" class="m-4">
      <Spinner />
    </div>
    <div v-else-if="!canViewUsers(user?.data.value)">
      Only admin can view this.
    </div>
    <UsersList v-else />
  </ContentLayout>
</template>

<script setup lang="ts">
import { useUser } from '~/lib/auth';
import { canViewUsers } from '~/lib/authorization';
import ContentLayout from '~/components/layout/ContentLayout.vue';
import Spinner from '~/components/ui/spinner/Spinner.vue';
import UsersList from '~/components/features/users/UsersList.vue';

definePageMeta({
  layout: 'app',
});

useHead({
  title: 'Users',
});

const user = useUser();
</script>
