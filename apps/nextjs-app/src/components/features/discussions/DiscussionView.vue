<template>
  <div v-if="discussionQuery.isLoading.value" class="flex h-48 w-full items-center justify-center">
    <Spinner size="lg" />
  </div>
  <div v-else-if="discussion">
    <div class="flex justify-between">
      <span>
        <span class="text-xs font-bold">
          {{ formatDate(discussion.createdAt) }}
        </span>
        <span v-if="discussion.author" class="ml-2 text-sm font-bold">
          by {{ discussion.author.firstName }} {{ discussion.author.lastName }}
        </span>
      </span>
      <AppLink
        v-if="!isPublicView && discussion.public"
        class="ml-2 flex items-center gap-2 text-sm font-bold"
        :to="paths.public.discussion.getHref(discussionId)"
        target="_blank"
      >
        View Public Version <LinkIcon :size="16" />
      </AppLink>
    </div>
    <div class="mt-6 flex flex-col space-y-16">
      <div v-if="!isPublicView" class="flex justify-end">
        <UpdateDiscussion :discussion-id="discussionId" />
      </div>
      <div>
        <div class="overflow-hidden bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <div class="mt-1 max-w-2xl text-sm text-gray-500">
              <MDPreview :value="discussion.body" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Link as LinkIcon } from 'lucide-vue-next';
import { useDiscussion } from '~/features/discussions/api/get-discussion';
import { paths } from '~/config/paths';
import { formatDate } from '~/utils/format';
import Spinner from '~/components/ui/spinner/Spinner.vue';
import AppLink from '~/components/ui/link/Link.vue';
import MDPreview from '~/components/ui/md-preview/MDPreview.vue';
import UpdateDiscussion from './UpdateDiscussion.vue';

interface Props {
  discussionId: string;
}

const props = defineProps<Props>();
const route = useRoute();

const isPublicView = computed(() => route.path.startsWith('/public/'));

const discussionQuery = useDiscussion({
  discussionId: props.discussionId,
});

const discussion = computed(() => discussionQuery.data.value?.data);
</script>
