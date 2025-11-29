<template>
  <div v-if="usersQuery.isLoading.value" class="flex h-48 w-full items-center justify-center">
    <Spinner size="lg" />
  </div>
  <div v-else-if="!users?.length" class="flex h-80 flex-col items-center justify-center bg-white text-gray-500">
    <ArchiveX class="size-16" />
    <h4>No Entries Found</h4>
  </div>
  <div v-else class="relative w-full overflow-auto">
    <table class="w-full caption-bottom text-sm">
      <thead class="[&_tr]:border-b">
        <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground">First Name</th>
          <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Last Name</th>
          <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Email</th>
          <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Role</th>
          <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Created At</th>
          <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground"></th>
        </tr>
      </thead>
      <tbody class="[&_tr:last-child]:border-0">
        <tr
          v-for="user in users"
          :key="user.id"
          class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
        >
          <td class="p-2 align-middle">{{ user.firstName }}</td>
          <td class="p-2 align-middle">{{ user.lastName }}</td>
          <td class="p-2 align-middle">{{ user.email }}</td>
          <td class="p-2 align-middle">{{ user.role }}</td>
          <td class="p-2 align-middle">{{ formatDate(user.createdAt) }}</td>
          <td class="p-2 align-middle">
            <DeleteUser :id="user.id" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ArchiveX } from 'lucide-vue-next';
import { useUsers } from '~/features/users/api/get-users';
import { formatDate } from '~/utils/format';
import Spinner from '~/components/ui/spinner/Spinner.vue';
import DeleteUser from './DeleteUser.vue';

const usersQuery = useUsers();
const users = computed(() => usersQuery.data.value?.data);
</script>
