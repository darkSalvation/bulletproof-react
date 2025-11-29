<template>
  <div>
    <div class="mb-4 flex items-center justify-between">
      <h3 class="text-xl font-bold">Comments:</h3>
      <CreateComment v-if="!isPublicView" :discussion-id="discussionId" />
    </div>
    <CommentsList :discussion-id="discussionId" />
  </div>
</template>

<script setup lang="ts">
import CommentsList from './CommentsList.vue';
import CreateComment from './CreateComment.vue';

interface Props {
  discussionId: string;
}

defineProps<Props>();

const route = useRoute();
const isPublicView = computed(() => route.path.startsWith('/public/'));
</script>
