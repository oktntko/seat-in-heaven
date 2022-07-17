<template>
  <div class="p-8">
    <!-- パンくず -->
    <nav class="mb-8 flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <p class="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-400">
            <Icon class="mr-2 h-4 w-4" icon="clarity:users-solid" />
            ユーザ管理
          </p>
        </li>
        <li>
          <RouterLink to="/system/users" class="flex items-center">
            <Icon class="h-4 w-4 text-gray-400" icon="el:chevron-right" />
            <p
              class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-800 dark:text-gray-400 dark:hover:text-white md:ml-2"
            >
              ユーザ一覧
            </p>
          </RouterLink>
        </li>
        <li>
          <div class="flex items-center">
            <Icon class="h-4 w-4 text-gray-400" icon="el:chevron-right" />
            <p class="ml-1 text-sm font-medium text-gray-700 dark:text-gray-400 md:ml-2">
              ユーザ追加
            </p>
          </div>
        </li>
      </ol>
    </nav>

    <!-- フォーム -->
    <UserFormVue />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import UserFormVue from "~/pages/system/users/components/UserForm.vue";

export default Vue.extend({
  components: {
    UserFormVue,
  },
});
</script>

<style scoped></style>
