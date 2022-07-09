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
              <span class="mr-1 inline-flex">
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
              </span>
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
              <span class="ml-4 inline-flex items-center justify-center">
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
              </span>
              <span class="ml-2 truncate text-sm tracking-wide">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="text-white-600 hover:text-white-800 relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 hover:border-blue-500 hover:bg-blue-800 focus:outline-none dark:hover:border-gray-800 dark:hover:bg-gray-600"
            >
              <span class="ml-4 inline-flex items-center justify-center">
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  ></path>
                </svg>
              </span>
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
              <span class="ml-4 inline-flex items-center justify-center">
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  ></path>
                </svg>
              </span>
              <span class="ml-2 truncate text-sm tracking-wide">Messages</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="text-white-600 hover:text-white-800 relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 hover:border-blue-500 hover:bg-blue-800 focus:outline-none dark:hover:border-gray-800 dark:hover:bg-gray-600"
            >
              <span class="ml-4 inline-flex items-center justify-center">
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  ></path>
                </svg>
              </span>
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
              <span class="ml-4 inline-flex items-center justify-center">
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </span>
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
