<template>
  <div>
    <LoginForm :on-success="handleSuccess" />
  </div>
</template>

<script setup lang="ts">
import { paths } from '~/config/paths';
import LoginForm from '~/components/features/auth/LoginForm.vue';

definePageMeta({
  layout: 'auth',
});

const route = useRoute();
const router = useRouter();
const redirectTo = computed(() => route.query.redirectTo as string | undefined);

const handleSuccess = () => {
  router.replace(
    redirectTo.value
      ? decodeURIComponent(redirectTo.value)
      : paths.app.dashboard.getHref(),
  );
};
</script>
