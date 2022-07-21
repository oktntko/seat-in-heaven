<template>
  <div class="p-8">
    <!-- パンくず -->
    <nav class="mb-8 flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <p class="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-400">
            <Icon class="mr-2 h-4 w-4" icon="fa-solid:layer-group" />
            フロア管理
          </p>
        </li>
        <li>
          <RouterLink to="/system/floors/東京本社" class="flex items-center">
            <Icon class="h-4 w-4 text-gray-400" icon="el:chevron-right" />
            <p
              class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-800 dark:text-gray-400 dark:hover:text-white md:ml-2"
            >
              東京本社
            </p>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/system/floors/東京本社/15F" class="flex items-center">
            <Icon class="h-4 w-4 text-gray-400" icon="el:chevron-right" />
            <p
              class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-800 dark:text-gray-400 dark:hover:text-white md:ml-2"
            >
              15F
            </p>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/system/floors/東京本社/西側エリア" class="flex items-center">
            <Icon class="h-4 w-4 text-gray-400" icon="el:chevron-right" />
            <p
              class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-800 dark:text-gray-400 dark:hover:text-white md:ml-2"
            >
              西側エリア
            </p>
          </RouterLink>
        </li>
      </ol>
    </nav>

    <!-- フィルタ -->
    <form class="mb-8 flex flex-wrap gap-8 px-8" @submit.prevent="getFloors">
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
            @click="addFloor(list)"
          >
            <Icon class="h-4 w-4 text-yellow-600" icon="bxs:folder-plus" />
            <span>フロアを追加する</span>
          </button>
          <button
            class="flex flex-row flex-nowrap items-center gap-1 text-sm"
            @click="addRoom(list)"
          >
            <Icon class="h-4 w-4 text-blue-600" icon="ant-design:file-add-outlined" />
            <span>ルームを追加する</span>
          </button>
        </div>
      </div>
      <FloorTree
        :list="list"
        :choosing-item="choosingItem"
        :dragging="dragging"
        @choose="onChoose"
        @start="dragging = true"
        @unchoose="onUnchoose"
        @end="dragging = false"
        @addFloor="addFloor"
        @addRoom="addRoom"
        @trash="trash"
      >
      </FloorTree>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import type { EventObject, FloorNode } from "./components/FloorTree.vue";
import FloorTree from "./components/FloorTree.vue";

export default Vue.extend({
  components: {
    FloorTree,
  },
  data() {
    return {
      choosingItem: undefined as HTMLElement | undefined,
      dragging: false,
      list: [
        {
          parent_id: 1,
          node_id: 1,
          name: "floor 1",
          type: "floor",
          children: [
            {
              node_id: 9,
              name: "room 8",
              type: "room",
            },
            {
              node_id: 2,
              name: "floor 2",
              type: "floor",
              children: [],
            },
          ],
        },
        {
          node_id: 3,
          name: "floor 3",
          type: "floor",
          children: [
            {
              node_id: 4,
              name: "room 4",
              type: "room",
            },
          ],
        },
        {
          node_id: 5,
          name: "floor 5",
          type: "floor",
          children: [
            {
              node_id: 6,
              name: "room 6",
              type: "room",
            },
            {
              node_id: 7,
              name: "room 7",
              type: "room",
            },
          ],
        },
      ] as FloorNode[],
      form: {
        keyword: "",
      },
    };
  },
  created() {
    this.getFloors();
  },
  methods: {
    onChoose(event?: EventObject) {
      console.log("Root onChoose", event?.item);
      this.choosingItem = event?.item;
    },
    onUnchoose(event?: EventObject) {
      console.log("Root onUnchoose", event?.item);
      this.choosingItem = undefined;
    },

    getFloors() {
      console.log("getFloors");
    },
    addFloor(list: FloorNode[]) {
      const node_id = Math.floor(Math.random() * 10000000000000);
      list.push({
        node_id,
        type: "floor",
        name: `floor${node_id}`,
        children: [],
      });
    },
    addRoom(list: FloorNode[]) {
      const node_id = Math.floor(Math.random() * 10000000000000);
      list.push({
        node_id,
        type: "room",
        name: `room${node_id}`,
      });
    },
    trash(node: FloorNode) {
      this.$emit("trash", node);
    },
  },
});
</script>

<style scoped></style>
