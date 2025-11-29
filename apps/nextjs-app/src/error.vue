<template>
  <div class="mt-52 flex flex-col items-center font-semibold">
    <h1>{{ error?.statusCode === 404 ? '404 - Not Found' : 'Error' }}</h1>
    <p v-if="error?.statusCode === 404">Sorry, the page you are looking for does not exist.</p>
    <p v-else>{{ error?.message || 'An error occurred' }}</p>
    <NuxtLink :to="paths.home.getHref()" class="mt-4 text-blue-600 hover:text-blue-500">
      Go to Home
    </NuxtLink>
    <Button class="mt-4" @click="handleError">
      Try Again
    </Button>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';
import { paths } from '~/config/paths';
import Button from '~/components/ui/button/Button.vue';

interface Props {
  error: NuxtError;
}

const props = defineProps<Props>();

const handleError = () => clearError({ redirect: '/' });
</script>
