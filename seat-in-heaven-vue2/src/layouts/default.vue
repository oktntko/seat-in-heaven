<template>
  <div
    class="flex min-h-screen flex-auto flex-shrink-0 flex-col bg-white text-black antialiased dark:bg-gray-700 dark:text-white"
  >
    <!-- Header -->
    <div class="fixed z-10 ml-14 flex h-14 w-full items-center justify-between text-white md:ml-64">
      <div class="header-right flex h-14 items-center justify-end bg-blue-800 dark:bg-gray-800">
        <ul class="flex items-center">
          <li>
            <div class="mx-3 block h-6 w-px bg-gray-400 dark:bg-gray-700"></div>
          </li>
          <li>
            <a href="#" class="mr-4 flex items-center hover:text-blue-100">
              <Icon class="mr-1 inline-flex" icon="fe:logout" />
              Logout
            </a>
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
          <li class="hidden px-5 md:block">
            <div class="flex h-8 flex-row items-center">
              <div class="text-sm font-light uppercase tracking-wide text-gray-400">Main</div>
            </div>
          </li>
          <li>
            <a
              href="#"
              class="text-white-600 hover:text-white-800 relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 hover:border-blue-500 hover:bg-blue-800 focus:outline-none dark:hover:border-gray-800 dark:hover:bg-gray-600"
            >
              <Icon class="ml-4 inline-flex items-center justify-center" icon="carbon:dashboard" />
              <span class="ml-2 truncate text-sm tracking-wide">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="text-white-600 hover:text-white-800 relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 hover:border-blue-500 hover:bg-blue-800 focus:outline-none dark:hover:border-gray-800 dark:hover:bg-gray-600"
            >
              <Icon
                class="ml-4 inline-flex items-center justify-center"
                icon="iconoir:kanban-board"
              />
              <span class="ml-2 truncate text-sm tracking-wide">Board</span>
              <span
                class="ml-auto hidden rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium tracking-wide text-blue-500 md:block"
                >New</span
              >
            </a>
          </li>
          <li>
            <a
              href="#"
              class="text-white-600 hover:text-white-800 relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 hover:border-blue-500 hover:bg-blue-800 focus:outline-none dark:hover:border-gray-800 dark:hover:bg-gray-600"
            >
              <Icon
                class="ml-4 inline-flex items-center justify-center"
                icon="bx:message-rounded-error"
              />
              <span class="ml-2 truncate text-sm tracking-wide">Messages</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="text-white-600 hover:text-white-800 relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 hover:border-blue-500 hover:bg-blue-800 focus:outline-none dark:hover:border-gray-800 dark:hover:bg-gray-600"
            >
              <Icon
                class="ml-4 inline-flex items-center justify-center"
                icon="ic:twotone-notification-add"
              />
              <span class="ml-2 truncate text-sm tracking-wide">Notifications</span>
              <span
                class="ml-auto hidden rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium tracking-wide text-red-500 md:block"
                >1.2k</span
              >
            </a>
          </li>
          <li class="hidden px-5 md:block">
            <div class="mt-5 flex h-8 flex-row items-center">
              <div class="text-sm font-light uppercase tracking-wide text-gray-400">Settings</div>
            </div>
          </li>
          <li>
            <a
              href="#"
              class="text-white-600 hover:text-white-800 relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 hover:border-blue-500 hover:bg-blue-800 focus:outline-none dark:hover:border-gray-800 dark:hover:bg-gray-600"
            >
              <Icon class="ml-4 inline-flex items-center justify-center" icon="bx:user-circle" />
              <span class="ml-2 truncate text-sm tracking-wide">Profile</span>
            </a>
          </li>
        </ul>

        <p class="hidden px-5 py-3 text-center text-xs md:block">Copyright @2021</p>
      </div>
    </div>
    <!-- ./Sidebar -->

    <div class="ml-14 mt-14 mb-10 h-full md:ml-64">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {};
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
