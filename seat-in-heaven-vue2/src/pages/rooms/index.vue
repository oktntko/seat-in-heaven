<template>
  <div class="p-8">
    <!-- パンくず -->
    <nav class="mb-8 flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <p class="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-400">
            <Icon class="mr-2 h-4 w-4" icon="clarity:users-solid" />
            居室管理
          </p>
        </li>
        <li>
          <div class="flex items-center">
            <Icon class="h-4 w-4 text-gray-400" icon="el:chevron-right" />
            <p class="ml-1 text-sm font-medium text-gray-700 dark:text-gray-400 md:ml-2">
              居室を探す
            </p>
          </div>
        </li>
      </ol>
    </nav>

    <!-- フィルタ -->
    <form class="mb-8 flex flex-wrap gap-8 px-8" @submit.prevent="getRooms">
      <div class="flex w-96 items-center">
        <label for="keyword" class="sr-only">Search</label>
        <div class="relative w-full">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon class="mx-1 h-4 w-4 text-gray-500 dark:text-gray-400" icon="fa:search" />
          </div>
          <input
            id="keyword"
            v-model="form.keyword"
            type="text"
            class="block w-full rounded-lg border border-gray-300 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="キーワード"
            maxlength="100"
          />
        </div>
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="inline-flex min-w-[120px] items-center justify-center rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-900 transition-all hover:bg-blue-50 hover:text-blue-700 focus:z-10 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <Icon class="mx-1 h-4 w-4" icon="fa:search" />
          検索
        </button>
      </div>
    </form>

    <!-- 検索結果 -->
    <div class="mb-8">
      <vxe-table :data="table.data">
        <vxe-column type="seq" width="72" align="right"></vxe-column>
        <vxe-column field="favorite" width="72" title=""> </vxe-column>
        <vxe-column field="path" title="パス">
          <template #default="{ row }">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li v-for="(ancestor, i) in row.ancestors" :key="ancestor.floor_id">
                <RouterLink
                  :to="{
                    path: `/floors`,
                    query: { floor_id: ancestor.floor_id },
                  }"
                  class="flex items-center"
                >
                  <Icon v-show="i" class="h-4 w-4 text-gray-400" icon="el:chevron-right" />
                  <p
                    class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-800 dark:text-gray-400 dark:hover:text-white md:ml-2"
                  >
                    {{ ancestor.floorname }}
                  </p>
                </RouterLink>
              </li>
            </ol>
          </template>
        </vxe-column>
        <vxe-column field="floorname" title="居室名">
          <template #default="{ row }">
            <RouterLink :to="`/rooms/${row.floor_id}`" class="text-blue-700 hover:text-blue-800">
              {{ row.floorname }}
            </RouterLink>
          </template>
        </vxe-column>
        <template #empty>
          <div
            class="border-t border-b border-yellow-500 bg-yellow-100 px-4 py-3 text-yellow-700"
            role="alert"
          >
            <p class="font-bold">該当するデータが見つかりません</p>
          </div>
        </template>
      </vxe-table>

      <vxe-pager
        perfect
        :loading="table.loading"
        :current-page="table.currentPage"
        :page-size="table.pageSize"
        :total="table.total"
        :layouts="[
          'PrevJump',
          'PrevPage',
          'Number',
          'NextPage',
          'NextJump',
          'Sizes',
          'FullJump',
          'Total',
        ]"
        @page-change="handlePageChange"
      >
        <template #left> </template>
        <template #right> </template>
      </vxe-pager>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { api } from "~/repositories/api";
import { components } from "~/repositories/schema";

export default Vue.extend({
  data() {
    return {
      form: {
        keyword: "",
      },
      table: {
        loading: true,
        data: [] as components["schemas"]["RoomFloorResponse"][],
        total: 0,
        pageSize: 20,
        currentPage: 1,
      },
    };
  },
  computed: {
    limit(): string {
      return String(this.table.pageSize);
    },
    offset(): string {
      return String((this.table.currentPage - 1) * this.table.pageSize);
    },
  },
  created() {
    this.getRooms();
  },
  methods: {
    getRooms() {
      this.table.loading = true;
      api.get
        .rooms({ ...this.form })
        .then(({ data }) => {
          this.table.data = data.rooms;
          this.table.total = data.rooms.length;
        })
        .finally(() => (this.table.loading = false));
    },
    handlePageChange(param: { type: "size" | "current"; pageSize: number; currentPage: number }) {
      this.table.currentPage = param.currentPage;
      this.table.pageSize = param.pageSize;
      this.getRooms();
    },
  },
});
</script>
