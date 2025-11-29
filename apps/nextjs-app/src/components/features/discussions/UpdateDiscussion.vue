<template>
  <FormDrawer
    v-if="canUpdateDiscussion(user?.data.value)"
    :is-done="updateDiscussionMutation.isSuccess.value"
    title="Update Discussion"
  >
    <template #trigger>
      <Button size="sm">
        <template #icon>
          <Pen class="size-4" />
        </template>
        Update Discussion
      </Button>
    </template>
    <template #submit>
      <Button
        form="update-discussion"
        type="submit"
        size="sm"
        :is-loading="updateDiscussionMutation.isPending.value"
      >
        Submit
      </Button>
    </template>
    <form id="update-discussion" class="space-y-6" @submit="onSubmit">
      <FormInput
        name="title"
        label="Title"
        :error="errors.title"
      />
      <FormTextarea
        name="body"
        label="Body"
        :error="errors.body"
      />
      <div class="flex items-center space-x-2">
        <SwitchRoot
          :checked="isPublic"
          :class="cn(
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 peer shrink-0 cursor-pointer border-2 border-transparent shadow-sm data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
          )"
          @update:checked="(val: boolean) => { setFieldValue('public', val); isPublic = val; }"
        >
          <SwitchThumb
            class="pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
          />
        </SwitchRoot>
        <label class="text-sm font-medium leading-none">Public</label>
      </div>
    </form>
  </FormDrawer>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { Pen } from 'lucide-vue-next';
import { SwitchRoot, SwitchThumb } from 'radix-vue';
import { useDiscussion } from '~/features/discussions/api/get-discussion';
import {
  updateDiscussionInputSchema,
  useUpdateDiscussion,
} from '~/features/discussions/api/update-discussion';
import { useNotifications } from '~/composables/useNotifications';
import { useUser } from '~/lib/auth';
import { canUpdateDiscussion } from '~/lib/authorization';
import { cn } from '~/utils/cn';
import Button from '~/components/ui/button/Button.vue';
import FormDrawer from '~/components/ui/form/FormDrawer.vue';
import FormInput from '~/components/ui/form/FormInput.vue';
import FormTextarea from '~/components/ui/form/FormTextarea.vue';

interface Props {
  discussionId: string;
}

const props = defineProps<Props>();

const { addNotification } = useNotifications();
const user = useUser();
const discussionQuery = useDiscussion({ discussionId: props.discussionId });

const discussion = computed(() => discussionQuery.data.value?.data);
const isPublic = ref(discussion.value?.public ?? false);

const updateDiscussionMutation = useUpdateDiscussion({
  mutationConfig: {
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'Discussion Updated',
      });
    },
  },
});

const { handleSubmit, errors, setFieldValue } = useForm({
  validationSchema: toTypedSchema(updateDiscussionInputSchema),
  initialValues: computed(() => ({
    title: discussion.value?.title ?? '',
    body: discussion.value?.body ?? '',
    public: discussion.value?.public ?? false,
  })),
});

watch(discussion, (newDiscussion) => {
  if (newDiscussion) {
    isPublic.value = newDiscussion.public;
  }
});

const onSubmit = handleSubmit((values) => {
  updateDiscussionMutation.mutate({
    data: values,
    discussionId: props.discussionId,
  });
});
</script>
