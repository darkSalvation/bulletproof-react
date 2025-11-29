<template>
  <Button
    variant="destructive"
    size="sm"
    :is-loading="deleteCommentMutation.isPending.value"
    @click="handleDelete"
  >
    <template #icon>
      <Trash class="size-4" />
    </template>
    Delete
  </Button>
</template>

<script setup lang="ts">
import { Trash } from 'lucide-vue-next';
import { useDeleteComment } from '~/features/comments/api/delete-comment';
import { useNotifications } from '~/composables/useNotifications';
import Button from '~/components/ui/button/Button.vue';

interface Props {
  discussionId: string;
  id: string;
}

const props = defineProps<Props>();

const { addNotification } = useNotifications();

const deleteCommentMutation = useDeleteComment({
  discussionId: props.discussionId,
  mutationConfig: {
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'Comment Deleted',
      });
    },
  },
});

const handleDelete = () => {
  deleteCommentMutation.mutate({ commentId: props.id });
};
</script>
