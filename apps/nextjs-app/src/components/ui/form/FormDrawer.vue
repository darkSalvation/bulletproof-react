<template>
  <DialogRoot v-model:open="isOpen">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogContent
        class="fixed inset-y-0 right-0 z-50 h-full w-3/4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-[540px] flex flex-col justify-between"
      >
        <div class="flex flex-col">
          <DialogTitle class="text-lg font-semibold text-foreground">
            {{ title }}
          </DialogTitle>
          <div class="mt-4">
            <slot />
          </div>
        </div>
        <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <DialogClose as-child>
            <Button variant="outline" type="button">
              Close
            </Button>
          </DialogClose>
          <slot name="submit" />
        </div>
        <DialogClose class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          <X class="size-4" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next';
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
} from 'radix-vue';
import Button from '~/components/ui/button/Button.vue';

interface Props {
  isDone: boolean;
  title: string;
}

const props = defineProps<Props>();

const isOpen = ref(false);

watch(() => props.isDone, (done) => {
  if (done) {
    isOpen.value = false;
  }
});
</script>
