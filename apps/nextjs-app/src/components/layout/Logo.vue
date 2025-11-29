<template>
  <NuxtLink class="flex items-center text-white" :to="paths.home.getHref()">
    <img class="h-8 w-auto" src="/logo.svg" alt="Workflow" />
    <span class="text-sm font-semibold text-white">
      Bulletproof Vue
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { paths } from '~/config/paths';
</script>
