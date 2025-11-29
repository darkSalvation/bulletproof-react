<template>
  <FormDrawer
    :is-done="createCommentMutation.isSuccess.value"
    title="Create Comment"
  >
    <template #trigger>
      <Button size="sm">
        <template #icon>
          <Plus class="size-4" />
        </template>
        Create Comment
      </Button>
    </template>
    <template #submit>
      <Button
        form="create-comment"
        type="submit"
        size="sm"
        :is-loading="createCommentMutation.isPending.value"
        :disabled="createCommentMutation.isPending.value"
      >
        Submit
      </Button>
    </template>
    <form id="create-comment" class="space-y-6" @submit="onSubmit">
      <FormTextarea
        name="body"
        label="Body"
        :error="errors.body"
      />
    </form>
  </FormDrawer>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { Plus } from 'lucide-vue-next';
import {
  createCommentInputSchema,
  useCreateComment,
} from '~/features/comments/api/create-comment';
import { useNotifications } from '~/composables/useNotifications';
import Button from '~/components/ui/button/Button.vue';
import FormDrawer from '~/components/ui/form/FormDrawer.vue';
import FormTextarea from '~/components/ui/form/FormTextarea.vue';

interface Props {
  discussionId: string;
}

const props = defineProps<Props>();

const { addNotification } = useNotifications();

const createCommentMutation = useCreateComment({
  discussionId: props.discussionId,
  mutationConfig: {
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'Comment Created',
      });
    },
  },
});

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(createCommentInputSchema),
  initialValues: {
    body: '',
    discussionId: props.discussionId,
  },
});

const onSubmit = handleSubmit((values) => {
  createCommentMutation.mutate({ data: values });
});
</script>
