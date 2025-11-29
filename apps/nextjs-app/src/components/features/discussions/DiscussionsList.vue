<template>
  <div v-if="discussionsQuery.isLoading.value" class="flex h-48 w-full items-center justify-center">
    <Spinner size="lg" />
  </div>
  <div v-else-if="!discussions?.length" class="flex h-80 flex-col items-center justify-center bg-white text-gray-500">
    <ArchiveX class="size-16" />
    <h4>No Entries Found</h4>
  </div>
  <div v-else>
    <div class="relative w-full overflow-auto">
      <table class="w-full caption-bottom text-sm">
        <thead class="[&_tr]:border-b">
          <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Title</th>
            <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Created At</th>
            <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground"></th>
            <th class="h-10 px-2 text-left align-middle font-medium text-muted-foreground"></th>
          </tr>
        </thead>
        <tbody class="[&_tr:last-child]:border-0">
          <tr
            v-for="discussion in discussions"
            :key="discussion.id"
            class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
          >
            <td class="p-2 align-middle">{{ discussion.title }}</td>
            <td class="p-2 align-middle">{{ formatDate(discussion.createdAt) }}</td>
            <td class="p-2 align-middle">
              <AppLink :to="paths.app.discussion.getHref(discussion.id)">
                View
              </AppLink>
            </td>
            <td class="p-2 align-middle">
              <DeleteDiscussion :id="discussion.id" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <TablePagination
      v-if="meta"
      :total-pages="meta.totalPages"
      :current-page="meta.page"
      root-url=""
    />
  </div>
</template>

<script setup lang="ts">
import { ArchiveX } from 'lucide-vue-next';
import { useDiscussions } from '~/features/discussions/api/get-discussions';
import { paths } from '~/config/paths';
import { formatDate } from '~/utils/format';
import Spinner from '~/components/ui/spinner/Spinner.vue';
import AppLink from '~/components/ui/link/Link.vue';
import DeleteDiscussion from './DeleteDiscussion.vue';
import TablePagination from '~/components/ui/table/TablePagination.vue';

const route = useRoute();
const page = computed(() => {
  const pageParam = route.query.page;
  return pageParam ? Number(pageParam) : 1;
});

const discussionsQuery = useDiscussions({
  page: page.value,
});

const discussions = computed(() => discussionsQuery.data.value?.data);
const meta = computed(() => discussionsQuery.data.value?.meta);
</script>
