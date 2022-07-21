<template>
  <div
    class="flex flex-row flex-nowrap items-center justify-start gap-2"
    :class="isFloor ? 'pb-2' : ''"
  >
    <!-- ハンドル -->
    <Icon class="handle h-5 w-5 cursor-move" icon="clarity:drag-handle-line" />
    <!-- フロア or ルーム -->
    <Icon
      class="h-5 w-5"
      :class="isFloor ? 'text-yellow-600' : 'text-blue-600'"
      :icon="isFloor ? 'bxs:folder' : 'ant-design:file-outlined'"
    />
    <!-- フロア名 -->
    <p class="flex-grow truncate p-1">{{ node.name }}</p>
    <!-- 追加 -->
    <button
      v-if="isFloor"
      class="flex flex-row flex-nowrap items-center gap-1"
      @click="addFloor(node.children)"
    >
      <Icon class="h-5 w-5" icon="bx:folder-plus" />
    </button>
    <button
      v-if="isFloor"
      class="flex flex-row flex-nowrap items-center gap-1"
      @click="addRoom(node.children)"
    >
      <Icon class="h-5 w-5" icon="ant-design:file-add-outlined" />
    </button>
    <!-- 削除 -->
    <button class="flex flex-row flex-nowrap items-center gap-1" @click="trash(node)">
      <Icon class="h-5 w-5 cursor-pointer" icon="bx:trash" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import type { FloorNode } from "~/pages/system/floors/components/FloorTree.vue";

export default Vue.extend({
  props: {
    node: {
      required: true,
      type: Object as PropType<FloorNode>,
    },
  },
  computed: {
    isFloor(): boolean {
      return this.node.type === "floor";
    },
  },
  methods: {
    addFloor(list: FloorNode[]) {
      this.$emit("addFloor", list);
    },
    addRoom(list: FloorNode[]) {
      this.$emit("addRoom", list);
    },
    trash(node: FloorNode) {
      this.$emit("trash", node);
    },
  },
});
</script>

<style scoped></style>
