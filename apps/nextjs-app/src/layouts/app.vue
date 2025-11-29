<template>
  <div class="flex min-h-screen w-full flex-col bg-muted/40">
    <aside class="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-black sm:flex">
      <nav class="flex flex-col items-center gap-4 px-2 py-4">
        <div class="flex h-16 shrink-0 items-center px-4">
          <Logo />
        </div>
        <NuxtLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.to"
          :class="cn(
            'text-gray-300 hover:bg-gray-700 hover:text-white',
            'group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium',
            route.path === item.to && 'bg-gray-900 text-white',
          )"
        >
          <component
            :is="item.icon"
            :class="cn(
              'text-gray-400 group-hover:text-gray-300',
              'mr-4 size-6 shrink-0',
            )"
            aria-hidden="true"
          />
          {{ item.name }}
        </NuxtLink>
      </nav>
    </aside>
    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
      <header class="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:justify-end sm:border-0 sm:bg-transparent sm:px-6">
        <DrawerRoot v-model:open="drawerOpen">
          <DrawerTrigger as-child>
            <Button size="icon" variant="outline" class="sm:hidden">
              <PanelLeft class="size-5" />
              <span class="sr-only">Toggle Menu</span>
            </Button>
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerOverlay class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
            <DrawerContent
              class="fixed inset-y-0 left-0 z-50 h-full w-3/4 bg-black pt-10 text-white sm:max-w-60 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out"
            >
              <nav class="grid gap-6 text-lg font-medium">
                <div class="flex h-16 shrink-0 items-center px-4">
                  <Logo />
                </div>
                <NuxtLink
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.to"
                  :class="cn(
                    'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium',
                    route.path === item.to && 'bg-gray-900 text-white',
                  )"
                >
                  <component
                    :is="item.icon"
                    :class="cn(
                      'text-gray-400 group-hover:text-gray-300',
                      'mr-4 size-6 shrink-0',
                    )"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </NuxtLink>
              </nav>
              <DrawerClose class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <X class="size-4 text-white" />
                <span class="sr-only">Close</span>
              </DrawerClose>
            </DrawerContent>
          </DrawerPortal>
        </DrawerRoot>
        <DropdownMenuRoot>
          <DropdownMenuTrigger as-child>
            <Button
              variant="outline"
              size="icon"
              class="overflow-hidden rounded-full"
            >
              <span class="sr-only">Open user menu</span>
              <User2 class="size-6 rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent
              align="end"
              :side-offset="4"
              class="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
            >
              <DropdownMenuItem
                :class="cn('block px-4 py-2 text-sm text-gray-700 cursor-pointer relative flex select-none items-center rounded-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50')"
                @click="navigateTo(paths.app.profile.getHref())"
              >
                Your Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator class="-mx-1 my-1 h-px bg-muted" />
              <DropdownMenuItem
                :class="cn('block px-4 py-2 text-sm text-gray-700 w-full cursor-pointer relative flex select-none items-center rounded-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50')"
                @click="handleLogout"
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenuRoot>
      </header>
      <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Home, PanelLeft, Folder, Users, User2, X } from 'lucide-vue-next';
import {
  DialogRoot as DrawerRoot,
  DialogTrigger as DrawerTrigger,
  DialogPortal as DrawerPortal,
  DialogOverlay as DrawerOverlay,
  DialogContent as DrawerContent,
  DialogClose as DrawerClose,
} from 'radix-vue';
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from 'radix-vue';
import { paths } from '~/config/paths';
import { useUser, useLogout } from '~/lib/auth';
import { cn } from '~/utils/cn';
import Button from '~/components/ui/button/Button.vue';
import Logo from '~/components/layout/Logo.vue';

const route = useRoute();
const router = useRouter();
const user = useUser();
const drawerOpen = ref(false);

const logout = useLogout({
  onSuccess: () => router.push(paths.auth.login.getHref(route.path)),
});

const handleLogout = () => {
  logout.mutate();
};

const navigation = computed(() => [
  { name: 'Dashboard', to: paths.app.root.getHref(), icon: Home },
  { name: 'Discussions', to: paths.app.discussions.getHref(), icon: Folder },
  ...(user.data.value?.role === 'ADMIN'
    ? [{ name: 'Users', to: paths.app.users.getHref(), icon: Users }]
    : []),
]);
</script>
