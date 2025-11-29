<template>
  <div>
    <RegisterForm
      :on-success="handleSuccess"
      :choose-team="chooseTeam"
      :set-choose-team="() => chooseTeam = !chooseTeam"
      :teams="teamsQuery.data.value?.data"
    />
  </div>
</template>

<script setup lang="ts">
import { paths } from '~/config/paths';
import RegisterForm from '~/components/features/auth/RegisterForm.vue';
import { useTeams } from '~/features/teams/api/get-teams';

definePageMeta({
  layout: 'auth',
});

const route = useRoute();
const router = useRouter();
const redirectTo = computed(() => route.query.redirectTo as string | undefined);
const chooseTeam = ref(false);

const teamsQuery = useTeams({
  queryConfig: {
    enabled: chooseTeam,
  },
});

const handleSuccess = () => {
  router.replace(
    redirectTo.value
      ? decodeURIComponent(redirectTo.value)
      : paths.app.dashboard.getHref(),
  );
};
</script>
