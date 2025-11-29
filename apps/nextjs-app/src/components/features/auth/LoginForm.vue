<template>
  <div>
    <form class="space-y-6" @submit="onSubmit">
      <FormInput
        name="email"
        type="email"
        label="Email Address"
        :error="errors.email"
      />
      <FormInput
        name="password"
        type="password"
        label="Password"
        :error="errors.password"
      />
      <div>
        <Button
          :is-loading="login.isPending.value"
          type="submit"
          class="w-full"
        >
          Log in
        </Button>
      </div>
    </form>
    <div class="mt-2 flex items-center justify-end">
      <div class="text-sm">
        <NuxtLink
          :to="paths.auth.register.getHref(redirectTo)"
          class="font-medium text-blue-600 hover:text-blue-500"
        >
          Register
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { paths } from '~/config/paths';
import { useLogin, loginInputSchema } from '~/lib/auth';
import Button from '~/components/ui/button/Button.vue';
import FormInput from '~/components/ui/form/FormInput.vue';

interface Props {
  onSuccess: () => void;
}

const props = defineProps<Props>();

const route = useRoute();
const redirectTo = computed(() => route.query.redirectTo as string | undefined);

const login = useLogin({
  onSuccess: props.onSuccess,
});

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(loginInputSchema),
});

const onSubmit = handleSubmit((values) => {
  login.mutate(values);
});
</script>
