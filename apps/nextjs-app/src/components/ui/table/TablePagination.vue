<template>
  <nav
    role="navigation"
    aria-label="pagination"
    class="mx-auto flex w-full justify-end py-8"
  >
    <ul class="flex flex-row items-center gap-1">
      <li v-if="currentPage > 1">
        <NuxtLink
          :to="createHref(currentPage - 1)"
          aria-label="Go to previous page"
          class="inline-flex h-9 items-center justify-center gap-1 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 pl-2.5 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <ChevronLeft class="size-4" />
          <span>Previous</span>
        </NuxtLink>
      </li>
      <li v-if="currentPage > 2">
        <span class="flex h-9 w-9 items-center justify-center">
          <MoreHorizontal class="size-4" />
          <span class="sr-only">More pages</span>
        </span>
      </li>
      <li v-if="currentPage > 1">
        <NuxtLink
          :to="createHref(currentPage - 1)"
          class="inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          {{ currentPage - 1 }}
        </NuxtLink>
      </li>
      <li class="rounded-sm bg-gray-200">
        <NuxtLink
          :to="createHref(currentPage)"
          class="inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md border border-input text-sm font-medium shadow-sm"
        >
          {{ currentPage }}
        </NuxtLink>
      </li>
      <li v-if="totalPages > currentPage">
        <NuxtLink
          :to="createHref(currentPage + 1)"
          class="inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          {{ currentPage + 1 }}
        </NuxtLink>
      </li>
      <li v-if="totalPages > currentPage + 1">
        <span class="flex h-9 w-9 items-center justify-center">
          <MoreHorizontal class="size-4" />
          <span class="sr-only">More pages</span>
        </span>
      </li>
      <li v-if="currentPage < totalPages">
        <NuxtLink
          :to="createHref(totalPages)"
          aria-label="Go to next page"
          class="inline-flex h-9 items-center justify-center gap-1 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 pr-2.5 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <span>Next</span>
          <ChevronRight class="size-4" />
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-vue-next';

interface Props {
  totalPages: number;
  currentPage: number;
  rootUrl: string;
}

const props = defineProps<Props>();

const createHref = (page: number) => `${props.rootUrl}?page=${page}`;
</script>
