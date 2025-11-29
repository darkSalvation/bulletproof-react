<template>
  <div>
    <form class="space-y-6" @submit="onSubmit">
      <FormInput
        name="firstName"
        type="text"
        label="First Name"
        :error="errors.firstName"
      />
      <FormInput
        name="lastName"
        type="text"
        label="Last Name"
        :error="errors.lastName"
      />
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

      <div class="flex items-center space-x-2">
        <SwitchRoot
          :checked="chooseTeam"
          :class="cn(
            chooseTeam ? 'bg-blue-600' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 peer shrink-0 cursor-pointer border-2 border-transparent shadow-sm disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
          )"
          @update:checked="setChooseTeam"
        >
          <SwitchThumb
            class="pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
          />
        </SwitchRoot>
        <label class="text-sm font-medium leading-none">Join Existing Team</label>
      </div>

      <FormSelect
        v-if="chooseTeam && teams"
        name="teamId"
        label="Team"
        :error="errors.teamId"
        :options="teamOptions"
      />
      <FormInput
        v-else
        name="teamName"
        type="text"
        label="Team Name"
        :error="errors.teamName"
      />

      <div>
        <Button
          :is-loading="registering.isPending.value"
          type="submit"
          class="w-full"
        >
          Register
        </Button>
      </div>
    </form>
    <div class="mt-2 flex items-center justify-end">
      <div class="text-sm">
        <NuxtLink
          :to="paths.auth.login.getHref(redirectTo)"
          class="font-medium text-blue-600 hover:text-blue-500"
        >
          Log In
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { SwitchRoot, SwitchThumb } from 'radix-vue';
import { paths } from '~/config/paths';
import { useRegister, registerInputSchema } from '~/lib/auth';
import type { Team } from '~/types/api';
import { cn } from '~/utils/cn';
import Button from '~/components/ui/button/Button.vue';
import FormInput from '~/components/ui/form/FormInput.vue';
import FormSelect from '~/components/ui/form/FormSelect.vue';

interface Props {
  onSuccess: () => void;
  chooseTeam: boolean;
  setChooseTeam: () => void;
  teams?: Team[];
}

const props = defineProps<Props>();

const route = useRoute();
const redirectTo = computed(() => route.query.redirectTo as string | undefined);

const registering = useRegister({
  onSuccess: props.onSuccess,
});

const { handleSubmit, errors, resetField } = useForm({
  validationSchema: toTypedSchema(registerInputSchema),
});

const teamOptions = computed(() =>
  props.teams?.map((team) => ({
    label: team.name,
    value: team.id,
  })) ?? [],
);

const onSubmit = handleSubmit((values) => {
  registering.mutate(values);
});

watch(() => props.chooseTeam, () => {
  if (props.chooseTeam) {
    resetField('teamName');
  } else {
    resetField('teamId');
  }
});
</script>
