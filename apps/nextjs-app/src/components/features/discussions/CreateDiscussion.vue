<template>
  <FormDrawer
    v-if="canCreateDiscussion(user?.data.value)"
    :is-done="createDiscussionMutation.isSuccess.value"
    title="Create Discussion"
  >
    <template #trigger>
      <Button size="sm">
        <template #icon>
          <Plus class="size-4" />
        </template>
        Create Discussion
      </Button>
    </template>
    <template #submit>
      <Button
        form="create-discussion"
        type="submit"
        size="sm"
        :is-loading="createDiscussionMutation.isPending.value"
      >
        Submit
      </Button>
    </template>
    <form id="create-discussion" class="space-y-6" @submit="onSubmit">
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
import { Plus } from 'lucide-vue-next';
import { SwitchRoot, SwitchThumb } from 'radix-vue';
import {
  createDiscussionInputSchema,
  useCreateDiscussion,
} from '~/features/discussions/api/create-discussion';
import { useNotifications } from '~/composables/useNotifications';
import { useUser } from '~/lib/auth';
import { canCreateDiscussion } from '~/lib/authorization';
import { cn } from '~/utils/cn';
import Button from '~/components/ui/button/Button.vue';
import FormDrawer from '~/components/ui/form/FormDrawer.vue';
import FormInput from '~/components/ui/form/FormInput.vue';
import FormTextarea from '~/components/ui/form/FormTextarea.vue';

const { addNotification } = useNotifications();
const user = useUser();
const isPublic = ref(false);

const createDiscussionMutation = useCreateDiscussion({
  mutationConfig: {
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'Discussion Created',
      });
    },
  },
});

const { handleSubmit, errors, setFieldValue } = useForm({
  validationSchema: toTypedSchema(createDiscussionInputSchema),
  initialValues: {
    title: '',
    body: '',
    public: false,
  },
});

const onSubmit = handleSubmit((values) => {
  createDiscussionMutation.mutate({ data: values });
});
</script>
