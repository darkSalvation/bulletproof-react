<template>
  <FormDrawer
    :is-done="updateProfileMutation.isSuccess.value"
    title="Update Profile"
  >
    <template #trigger>
      <Button size="sm">
        <template #icon>
          <Pen class="size-4" />
        </template>
        Update Profile
      </Button>
    </template>
    <template #submit>
      <Button
        form="update-profile"
        type="submit"
        size="sm"
        :is-loading="updateProfileMutation.isPending.value"
      >
        Submit
      </Button>
    </template>
    <form id="update-profile" class="space-y-6" @submit="onSubmit">
      <FormInput
        name="firstName"
        label="First Name"
        :error="errors.firstName"
      />
      <FormInput
        name="lastName"
        label="Last Name"
        :error="errors.lastName"
      />
      <FormInput
        name="email"
        type="email"
        label="Email Address"
        :error="errors.email"
      />
      <FormTextarea
        name="bio"
        label="Bio"
        :error="errors.bio"
      />
    </form>
  </FormDrawer>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { Pen } from 'lucide-vue-next';
import {
  updateProfileInputSchema,
  useUpdateProfile,
} from '~/features/users/api/update-profile';
import { useNotifications } from '~/composables/useNotifications';
import { useUser } from '~/lib/auth';
import Button from '~/components/ui/button/Button.vue';
import FormDrawer from '~/components/ui/form/FormDrawer.vue';
import FormInput from '~/components/ui/form/FormInput.vue';
import FormTextarea from '~/components/ui/form/FormTextarea.vue';

const { addNotification } = useNotifications();
const user = useUser();

const updateProfileMutation = useUpdateProfile({
  mutationConfig: {
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'Profile Updated',
      });
    },
  },
});

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(updateProfileInputSchema),
  initialValues: computed(() => ({
    firstName: user.data.value?.firstName ?? '',
    lastName: user.data.value?.lastName ?? '',
    email: user.data.value?.email ?? '',
    bio: user.data.value?.bio ?? '',
  })),
});

const onSubmit = handleSubmit((values) => {
  updateProfileMutation.mutate({ data: values });
});
</script>
