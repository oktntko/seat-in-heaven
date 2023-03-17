<template>
  <!-- フォーム -->
  <div class="container mx-auto md:my-4 md:max-w-3xl md:px-4">
    <form
      class="w-full rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-600 dark:bg-gray-700"
      @submit.prevent="handleSubmit"
    >
      <div class="mb-6">
        <label for="email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
          メールアドレス
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
          placeholder="example@example.com"
          required
          maxlength="255"
        />
      </div>
      <div class="mb-6">
        <label
          for="username"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          ユーザ名
        </label>
        <input
          id="username"
          v-model="form.username"
          type="text"
          class="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
          required
          maxlength="50"
        />
      </div>
      <div class="mb-6 flex items-start">
        <div class="mr-4 flex items-center">
          <input
            id="role-SYSTEM_ADMIN"
            v-model="form.role"
            type="radio"
            value="SYSTEM_ADMIN"
            class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 dark:border-gray-600 dark:bg-gray-700"
          />
          <label
            for="role-SYSTEM_ADMIN"
            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            システム管理者
          </label>
        </div>
        <div class="mr-4 flex items-center">
          <input
            id="role-LIMITED_ADMIN"
            v-model="form.role"
            type="radio"
            value="LIMITED_ADMIN"
            class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 dark:border-gray-600 dark:bg-gray-700"
          />
          <label
            for="role-LIMITED_ADMIN"
            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            フロア責任者
          </label>
        </div>
        <div class="mr-4 flex items-center">
          <input
            id="role-USER"
            v-model="form.role"
            type="radio"
            value="USER"
            class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 dark:border-gray-600 dark:bg-gray-700"
          />
          <label for="role-USER" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            一般ユーザ
          </label>
        </div>
      </div>
      <div class="flex justify-end gap-4">
        <button
          v-if="userId"
          type="button"
          class="inline-flex min-w-[120px] items-center justify-center rounded-lg bg-yellow-400 py-2.5 px-5 text-sm font-medium text-gray-800 transition-all hover:bg-yellow-500 focus:z-10 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
          @click="handleDelete"
        >
          <Icon class="mr-2 h-4 w-4" icon="bx:trash" />
          削除
        </button>
        <button
          type="submit"
          class="inline-flex min-w-[120px] items-center justify-center rounded-lg bg-green-600 py-2.5 px-5 text-sm font-medium text-white transition-all hover:bg-green-700 focus:z-10 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <Icon class="mr-2 h-4 w-4" icon="akar-icons:check-box" />
          {{ userId ? "保存" : "登録" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { $dialog } from "~/components/Dialog.vue";
import { $toast } from "~/components/Toast.vue";
import { $loading } from "~/components/Loading.vue";
import { api } from "~/repositories/api";

export default Vue.extend({
  props: {
    userId: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      form: {
        email: "",
        username: "",
        role: "USER" as "SYSTEM_ADMIN" | "LIMITED_ADMIN" | "USER",
        updated_at: "",
      },
    };
  },
  created() {
    if (this.userId) {
      this.getUser(this.userId);
    }
  },
  methods: {
    handleSubmit() {
      if (this.userId) {
        this.putUser(this.userId);
      } else {
        this.postUser();
      }
    },
    handleDelete() {
      if (this.userId) {
        $dialog
          .open({
            colorset: "danger",
            icon: "bx:error",
            message: `${this.form.username}を削除します。この操作は取り消せません。よろしいですか？`,
          })
          .then(() => {
            this.deleteUser(this.userId);
          });
      }
    },

    getUser(user_id: string) {
      const loading = $loading.open();
      api.get
        .user({ user_id })
        .then(({ data }) => (this.form = data))
        .finally(loading.close);
    },
    postUser() {
      api.post.user(this.form).then(({ data }) => {
        $toast.open({ type: "success", message: "登録に成功しました" });
        this.$router.replace(`/users/${data.user_id}`);
      });
    },
    putUser(user_id: string) {
      api.put.user({ user_id }, this.form).then(({ data }) => {
        $toast.open({ type: "success", message: "保存に成功しました" });
        this.form = data;
      });
    },
    deleteUser(user_id: string) {
      api.delete.user({ user_id }, this.form).then(() => {
        $toast.open({ type: "success", message: "削除に成功しました" });
        this.$router.replace(`/users`);
      });
    },
  },
});
</script>

<style scoped></style>
