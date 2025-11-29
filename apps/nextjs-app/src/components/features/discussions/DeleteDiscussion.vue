<template>
  <ConfirmationDialog
    v-if="canDeleteDiscussion(user?.data.value)"
    icon="danger"
    title="Delete Discussion"
    body="Are you sure you want to delete this discussion?"
    :is-loading="deleteDiscussionMutation.isPending.value"
    @confirm="deleteDiscussionMutation.mutate({ discussionId: id })"
  >
    <template #trigger>
      <Button variant="destructive">
        <template #icon>
          <Trash class="size-4" />
        </template>
        Delete Discussion
      </Button>
    </template>
  </ConfirmationDialog>
</template>

<script setup lang="ts">
import { Trash } from 'lucide-vue-next';
import { useDeleteDiscussion } from '~/features/discussions/api/delete-discussion';
import { useNotifications } from '~/composables/useNotifications';
import { useUser } from '~/lib/auth';
import { canDeleteDiscussion } from '~/lib/authorization';
import Button from '~/components/ui/button/Button.vue';
import ConfirmationDialog from '~/components/ui/dialog/ConfirmationDialog.vue';

interface Props {
  id: string;
}

const props = defineProps<Props>();

const user = useUser();
const { addNotification } = useNotifications();

const deleteDiscussionMutation = useDeleteDiscussion({
  mutationConfig: {
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'Discussion Deleted',
      });
    },
  },
});
</script>
