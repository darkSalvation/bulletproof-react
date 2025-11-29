<template>
  <ContentLayout :title="discussion?.data?.title">
    <DiscussionView :discussion-id="discussionId" />
    <div class="mt-8">
      <Comments :discussion-id="discussionId" />
    </div>
  </ContentLayout>
</template>

<script setup lang="ts">
import { useDiscussion } from '~/features/discussions/api/get-discussion';
import ContentLayout from '~/components/layout/ContentLayout.vue';
import DiscussionView from '~/components/features/discussions/DiscussionView.vue';
import Comments from '~/components/features/comments/Comments.vue';

definePageMeta({
  layout: false,
});

const route = useRoute();
const discussionId = computed(() => route.params.id as string);

const discussionQuery = useDiscussion({ discussionId: discussionId.value });
const discussion = computed(() => discussionQuery.data.value);

useHead({
  title: computed(() => discussion.value?.data?.title || 'Discussion'),
});
</script>
