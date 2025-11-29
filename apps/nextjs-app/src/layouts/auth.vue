<template>
  <div class="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <NuxtLink
          class="flex items-center text-white"
          :to="paths.home.getHref()"
        >
          <img class="h-24 w-auto" src="/logo.svg" alt="Workflow" />
        </NuxtLink>
      </div>

      <h2 class="mt-3 text-center text-3xl font-extrabold text-gray-900">
        {{ title }}
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { paths } from '~/config/paths';
import { useUser } from '~/lib/auth';

const route = useRoute();
const router = useRouter();
const user = useUser();

const isLoginPage = computed(() => route.path === paths.auth.login.getHref());
const title = computed(() =>
  isLoginPage.value ? 'Log in to your account' : 'Register your account',
);

const redirectTo = computed(() => route.query.redirectTo as string | undefined);

watch(
  () => user.data.value,
  (userData) => {
    if (userData) {
      router.replace(
        redirectTo.value
          ? decodeURIComponent(redirectTo.value)
          : paths.app.dashboard.getHref(),
      );
    }
  },
  { immediate: true },
);
</script>
