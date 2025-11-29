<template>
  <DialogRoot v-model:open="isOpen">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogContent
        class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
      >
        <div class="flex flex-col space-y-1.5 text-center sm:text-left">
          <div class="flex items-center gap-4">
            <div
              v-if="icon === 'danger'"
              class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10"
            >
              <CircleAlert class="size-6 text-red-600" aria-hidden="true" />
            </div>
            <div
              v-else
              class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10"
            >
              <Info class="size-6 text-blue-600" aria-hidden="true" />
            </div>
            <DialogTitle class="text-lg font-semibold leading-none tracking-tight">
              {{ title }}
            </DialogTitle>
          </div>
          <DialogDescription class="text-sm text-muted-foreground mt-4">
            {{ body }}
          </DialogDescription>
        </div>
        <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <DialogClose as-child>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button
            :is-loading="isLoading"
            type="button"
            variant="destructive"
            @click="$emit('confirm')"
          >
            Confirm
          </Button>
        </div>
        <DialogClose class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X class="size-4" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { X, CircleAlert, Info } from 'lucide-vue-next';
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from 'radix-vue';
import Button from '~/components/ui/button/Button.vue';

interface Props {
  icon?: 'danger' | 'info';
  title: string;
  body: string;
  isLoading?: boolean;
}

defineProps<Props>();

defineEmits<{
  confirm: [];
}>();

const isOpen = ref(false);
</script>
