<template>
  <div
    class="flex flex-row flex-nowrap items-center justify-start gap-2"
    :class="isFloor ? 'pb-2' : ''"
  >
    <!-- ハンドル -->
    <Icon class="handle h-5 w-5 cursor-move" icon="clarity:drag-handle-line" />
    <!-- フロア or ルーム -->
    <template v-if="isFloor">
      <button type="button" @click="handleChange">
        <Icon
          class="h-5 w-5 cursor-pointer text-yellow-600"
          :icon="open ? 'bxs:folder-open' : `bxs:folder`"
        />
      </button>
    </template>
    <template v-else>
      <Icon class="h-5 w-5 text-blue-600" icon="ant-design:file-outlined" />
    </template>
    <!-- フロア名 -->
    <RouterLink
      v-if="isFloor"
      :to="{
        path: `/system/floors`,
        query: { floor_id: floor.floor_id },
      }"
      class="flex-grow cursor-pointer truncate p-1 text-blue-700 hover:text-blue-900"
    >
      {{ floor.floorname }}
    </RouterLink>
    <p v-else class="flex-grow truncate p-1">
      {{ floor.floorname }}
    </p>
    <!-- 追加 -->
    <button
      v-if="isFloor"
      class="flex flex-row flex-nowrap items-center gap-1"
      @click="addChild(floor)"
    >
      <Icon class="h-5 w-5" icon="bx:folder-plus" />
    </button>
    <!-- 削除 -->
    <button class="flex flex-row flex-nowrap items-center gap-1" @click="trash(floor)">
      <Icon class="h-5 w-5 cursor-pointer" icon="bx:trash" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { components } from "~/repositories/schema";

export default Vue.extend({
  props: {
    floor: {
      required: true,
      type: Object as PropType<components["schemas"]["FloorResponse"]>,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    isFloor(): boolean {
      return this.floor.floortype === "FLOOR";
    },
  },
  methods: {
    addChild(parent: components["schemas"]["FloorResponse"]) {
      this.$emit("addChild", parent);
    },
    trash(floor: components["schemas"]["FloorResponse"]) {
      this.$emit("trash", floor);
    },
    handleChange() {
      this.open = !this.open;
      this.$emit("pullChildren", this.open, this.floor);
    },
  },
});
</script>

<style scoped></style>
