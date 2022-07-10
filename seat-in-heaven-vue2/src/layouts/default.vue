<template>
  <div
    class="flex min-h-screen flex-auto flex-shrink-0 flex-col bg-gray-50 text-black antialiased dark:bg-gray-700 dark:text-white"
  >
    <!-- Header -->
    <div class="fixed z-10 ml-14 flex h-14 w-full items-center justify-between text-white md:ml-64">
      <div class="header-right flex h-14 items-center justify-end bg-blue-800 dark:bg-gray-800">
        <ul class="flex items-center">
          <li>
            <div class="mx-3 block h-6 w-px bg-gray-400 dark:bg-gray-700"></div>
          </li>
          <li>
            <RouterLink to="/login" class="mr-4 flex items-center hover:text-blue-100">
              <Icon class="mr-1 inline-flex" icon="fe:logout" />
              Logout
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <!-- ./Header -->

    <!-- Sidebar -->
    <div
      class="sidebar fixed left-0 z-10 flex h-full w-14 flex-col border-none bg-blue-900 text-white transition-all duration-300 hover:w-64 dark:bg-gray-900 md:w-64"
    >
      <div
        class="flex h-14 items-center justify-start border-none bg-blue-700 pl-3 dark:bg-gray-800 md:justify-center"
      >
        <span class="hidden md:block">ロゴ</span>
      </div>

      <div class="flex flex-grow flex-col justify-between overflow-y-auto overflow-x-hidden">
        <ul class="flex flex-col space-y-1 py-4">
          <template v-for="block in sidemenu">
            <li :key="block.block_title" class="hidden px-5 md:block">
              <div class="flex h-8 flex-row items-center">
                <div class="text-sm font-light uppercase tracking-wide text-gray-400">
                  {{ block.block_title }}
                </div>
              </div>
            </li>
            <template v-for="menu in block.menu">
              <li :key="menu.link">
                <RouterLink
                  :to="menu.link"
                  class="text-white-600 hover:text-white-800 relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 hover:border-blue-500 hover:bg-blue-800 focus:outline-none dark:hover:border-gray-800 dark:hover:bg-gray-600"
                >
                  <Icon class="ml-4 inline-flex items-center justify-center" :icon="menu.icon" />
                  <span class="ml-2 truncate text-sm tracking-wide">{{ menu.title }}</span>
                </RouterLink>
              </li>
            </template>
          </template>
        </ul>

        <p class="hidden px-5 py-3 text-center text-xs md:block">Copyright @2021</p>
      </div>
    </div>
    <!-- ./Sidebar -->

    <div class="ml-14 mt-14 mb-10 h-full md:ml-64">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

type MenuBlock = {
  block_title: string;
  menu: Menu[];
};
type Menu = {
  title: string;
  link: string;
  icon: string;
};

export default Vue.extend({
  data() {
    return {
      sidemenu: [
        {
          block_title: "予約する",
          menu: [
            {
              title: "15F",
              link: "15",
              icon: "15",
            },
            {
              title: "16F",
              link: "16",
              icon: "16",
            },
          ],
        },
        {
          block_title: "フロア管理",
          menu: [],
        },
        {
          block_title: "システム管理",
          menu: [
            {
              title: "ユーザ管理",
              link: "/system/users",
              icon: "clarity:users-solid",
            },
            {
              title: "フロア管理",
              link: "/system/floors",
              icon: "fa-solid:layer-group",
            },
          ],
        },
      ] as MenuBlock[],
    };
  },
  methods: {},
});
</script>

<style scoped>
/* Custom style */
.header-right {
  width: calc(100% - 3.5rem);
}
.sidebar:hover {
  width: 16rem;
}
@media only screen and (min-width: 768px) {
  .header-right {
    width: calc(100% - 16rem);
  }
}
</style>
