<template>
  <ConfirmationDialog
    icon="danger"
    title="Delete User"
    body="Are you sure you want to delete this user?"
    :is-loading="deleteUserMutation.isPending.value"
    @confirm="deleteUserMutation.mutate({ userId: id })"
  >
    <template #trigger>
      <Button variant="destructive" size="sm">
        <template #icon>
          <Trash class="size-4" />
        </template>
        Delete
      </Button>
    </template>
  </ConfirmationDialog>
</template>

<script setup lang="ts">
import { Trash } from 'lucide-vue-next';
import { useDeleteUser } from '~/features/users/api/delete-user';
import { useNotifications } from '~/composables/useNotifications';
import Button from '~/components/ui/button/Button.vue';
import ConfirmationDialog from '~/components/ui/dialog/ConfirmationDialog.vue';

interface Props {
  id: string;
}

const props = defineProps<Props>();

const { addNotification } = useNotifications();

const deleteUserMutation = useDeleteUser({
  mutationConfig: {
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'User Deleted',
      });
    },
  },
});
</script>
