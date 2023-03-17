<template>
  <!-- フォーム -->
  <div class="container mx-auto md:my-4 md:max-w-3xl md:px-4">
    <form
      class="w-full rounded-xl bg-white p-8 dark:border-gray-600 dark:bg-gray-700"
      @submit.prevent="handleSubmit"
    >
      <div class="mb-6 flex items-start">
        <div class="mr-4 flex items-center">
          <input
            id="floortype-FLOOR"
            v-model="form.floortype"
            :type="floorId ? 'hidden' : 'radio'"
            value="FLOOR"
            class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 dark:border-gray-600 dark:bg-gray-700"
          />
          <label
            for="floortype-FLOOR"
            class="ml-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-gray-300"
            :class="floorId && form.floortype !== 'FLOOR' ? 'text-gray-400' : ''"
          >
            <Icon
              class="h-5 w-5"
              :class="!floorId || form.floortype === 'FLOOR' ? 'text-yellow-600' : ''"
              icon="bxs:folder"
            />
            フロア
          </label>
        </div>
        <div class="mr-4 flex items-center">
          <input
            id="floortype-ROOM"
            v-model="form.floortype"
            :type="floorId ? 'hidden' : 'radio'"
            value="ROOM"
            class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 dark:border-gray-600 dark:bg-gray-700"
          />
          <label
            for="floortype-ROOM"
            class="ml-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-gray-300"
            :class="floorId && form.floortype !== 'ROOM' ? 'text-gray-400' : ''"
          >
            <Icon
              class="h-5 w-5"
              :class="!floorId || form.floortype === 'ROOM' ? 'text-blue-600' : ''"
              icon="ant-design:file-outlined"
            />
            居室
          </label>
        </div>
      </div>
      <div class="mb-6">
        <label
          for="floorname"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          名前
        </label>
        <input
          id="floorname"
          v-model="form.floorname"
          type="text"
          class="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
          required
          maxlength="50"
        />
      </div>
      <div class="flex justify-end gap-4">
        <button
          v-if="floorId"
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
          {{ floorId ? "保存" : "登録" }}
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
    floorId: {
      type: Number,
      required: false,
      default: undefined,
    },
    parentId: {
      type: Number,
      required: false,
      default: undefined,
    },
  },
  data() {
    return {
      form: {
        floortype: "FLOOR" as "FLOOR" | "ROOM",
        floorname: "",
        updated_at: "",
      },
    };
  },
  created() {
    if (this.floorId) {
      this.getFloor(this.floorId);
    }
  },
  methods: {
    handleSubmit() {
      if (this.floorId) {
        this.putFloor(this.floorId);
      } else if (this.parentId) {
        this.postFloor(this.parentId);
      }
    },
    handleDelete() {
      if (this.floorId) {
        $dialog
          .open({
            colorset: "danger",
            icon: "bx:error",
            message: `${this.form.floorname}に紐づくすべてのデータが消去されます。この操作は取り消せません。よろしいですか？`,
          })
          .then(() => {
            this.deleteFloor(this.floorId);
          });
      }
    },

    getFloor(floor_id: number) {
      const loading = $loading.open();
      api.get
        .floor({ floor_id: String(floor_id) })
        .then(({ data }) => (this.form = data))
        .finally(loading.close);
    },
    postFloor(parent_id: number) {
      const loading = $loading.open();
      api.post
        .floor({ ...this.form, parent_id })
        .then(({ data }) => {
          this.$emit("success");
          this.$emit("added", data);
          $toast.open({ type: "success", message: "登録に成功しました" });
        })
        .finally(loading.close);
    },
    putFloor(floor_id: number) {
      const loading = $loading.open();
      api.put
        .floor({ floor_id: String(floor_id) }, { ...this.form })
        .then(({ data }) => {
          this.$emit("success");
          this.$emit("updated", data);
          $toast.open({ type: "success", message: "保存に成功しました" });
        })
        .finally(loading.close);
    },
    deleteFloor(floor_id: number) {
      const loading = $loading.open();
      api.delete
        .floor({ floor_id: String(floor_id) }, this.form)
        .then(() => {
          this.$emit("success");
          this.$emit("deleted");
          $toast.open({ type: "success", message: "削除に成功しました" });
        })
        .finally(loading.close);
    },
  },
});
</script>

<style scoped></style>
