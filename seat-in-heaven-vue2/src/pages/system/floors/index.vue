<template>
  <div class="p-8">
    <!-- パンくず -->
    <nav class="mb-8 flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <RouterLink
            :to="{ path: `/system/floors` }"
            class="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            <Icon class="mr-2 h-4 w-4" icon="fa-solid:layer-group" />
            <p
              class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-800 dark:text-gray-400 dark:hover:text-white md:ml-2"
            >
              フロア管理
            </p>
          </RouterLink>
        </li>
        <template v-if="root">
          <li v-for="ancestor in root.ancestors" :key="ancestor.floor_id">
            <RouterLink
              :to="{
                path: `/system/floors`,
                query: { floor_id: ancestor.floor_id },
              }"
              class="flex items-center"
            >
              <Icon class="h-4 w-4 text-gray-400" icon="el:chevron-right" />
              <p
                class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-800 dark:text-gray-400 dark:hover:text-white md:ml-2"
              >
                {{ ancestor.floorname }}
              </p>
            </RouterLink>
          </li>
        </template>
      </ol>
    </nav>

    <!-- フィルタ -->
    <form class="mb-8 flex flex-wrap gap-8 px-8" @submit.prevent="getRoot">
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
          />
        </div>
      </div>
    </form>

    <!-- 検索結果 -->
    <div class="mb-8">
      <div class="mb-4">
        <div class="flex flex-row flex-nowrap items-center justify-end gap-2">
          <button
            class="flex flex-row flex-nowrap items-center gap-1 text-sm"
            @click="handleAddChild(root)"
          >
            <Icon class="h-4 w-4 text-yellow-600" icon="bxs:folder-plus" />
            <span>フロアを追加する</span>
          </button>
        </div>
      </div>

      <FloorNode
        v-if="root"
        :floor="root"
        :choosing-item="choosingItem"
        tree-role="ROOT"
        @choose="handleChoose"
        @unchoose="handleUnchoose"
        @change="handleChange"
        @addChild="handleAddChild"
        @open="handleOpen"
      >
      </FloorNode>
      <div v-else>ローディング</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ChangeEventObject, EventObject } from "~/components/FloorChildren.vue";
import { $loading } from "~/components/Loading.vue";
import { $modal } from "~/components/Modal.vue";
import { api } from "~/repositories/api";
import { components } from "~/repositories/schema";
import FloorFormVue from "./components/FloorForm.vue";

export default Vue.extend({
  beforeRouteUpdate(to, from, next) {
    this.floor_id = to.query.floor_id as string | undefined;
    next();
  },
  data() {
    return {
      floor_id: undefined as string | undefined,
      choosingItem: undefined as HTMLElement | undefined,
      root: undefined as components["schemas"]["RootFloorResponse"] | undefined,
      form: {
        keyword: "",
      },
    };
  },
  watch: {
    floor_id() {
      this.getRoot();
    },
  },
  created() {
    this.getRoot();
  },
  methods: {
    getRoot() {
      const loading = $loading.open();
      api.get
        .floors({ floor_id: this.floor_id ? Number(this.floor_id) : undefined })
        .then(({ data }) => {
          this.root = data;
        })
        .finally(loading.close);
    },
    handleChoose(event?: EventObject) {
      this.choosingItem = event?.item;
    },
    handleUnchoose() {
      this.choosingItem = undefined;
    },
    handleChange(
      parent: components["schemas"]["FloorResponseWithChildren"],
      event: ChangeEventObject
    ) {
      // parent > child となるようにノードを付け替える
      if (event.added) {
        // parent.children は移動後の状態になっている
        console.log(parent, event.added);
        const child = event.added.element; // 移動してきた子
        // parent > child となるようにノードを付け替える
        this.patchFloorsNode(parent.floor_id, child.floor_id);
      }
      // 追加=>削除の順番にイベントが呼ばれるが、処理は追加の方でやるのでremovedイベントは捨てる

      // 順番の移動(追加でもどこに追加されるかわからないのですべて更新する)
      if (event.added || event.moved) {
        // parent.children は移動後の状態になっている
        // クライアント側のデータを更新
        const floor_id_list = parent.children.map((child, index) => {
          child.order = index + 1;
          return child.floor_id;
        });

        // サーバ側のデータは投げっぱなしにする
        this.patchFloorsOrder(floor_id_list);
      }
    },
    patchFloorsNode(parent_id: number, child_id: number) {
      return api.patch.floors.node({ parent_id, child_id });
    },
    patchFloorsOrder(floor_id_list: number[]) {
      return api.patch.floors.order({ floor_id_list });
    },
    handleAddChild(parent: components["schemas"]["FloorResponseWithChildren"]) {
      $modal
        .open<components["schemas"]["FloorResponseWithChildren"]>({
          component: FloorFormVue,
          componentProps: {
            parentId: parent.floor_id,
          },
        })
        .then((child) => {
          parent.children.push(child);
        });
    },
    handleOpen(parent: components["schemas"]["FloorResponseWithChildren"], isOpen: boolean) {
      if (isOpen) {
        const loading = $loading.open();
        api.get
          .floors({ floor_id: parent.floor_id })
          .then(({ data }) => {
            this.$set(parent, "children", data.children);
          })
          .finally(loading.close);
      }
    },
  },
});
</script>

<style scoped></style>
