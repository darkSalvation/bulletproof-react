<template>
  <ContentLayout title="Discussions">
    <div class="flex justify-end">
      <CreateDiscussion />
    </div>
    <div class="mt-4">
      <DiscussionsList />
    </div>
  </ContentLayout>
</template>

<script setup lang="ts">
import ContentLayout from '~/components/layout/ContentLayout.vue';
import CreateDiscussion from '~/components/features/discussions/CreateDiscussion.vue';
import DiscussionsList from '~/components/features/discussions/DiscussionsList.vue';

definePageMeta({
  layout: 'app',
});

useHead({
  title: 'Discussions',
});
</script>
