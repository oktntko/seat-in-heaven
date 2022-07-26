<template>
  <div>
    <div
      v-if="treeRole !== 'ROOT'"
      class="flex flex-row flex-nowrap items-center justify-start gap-2"
      :class="isOpen ? 'pb-2' : ''"
    >
      <!-- ハンドル -->
      <Icon class="handle h-5 w-5 cursor-move" icon="clarity:drag-handle-line" />
      <!-- フロア or ルーム -->
      <template v-if="isFloor">
        <button type="button" @click="handleChangeOpen">
          <Icon
            class="h-5 w-5 cursor-pointer text-yellow-600"
            :icon="isOpen ? 'bxs:folder-open' : `bxs:folder`"
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
    <template v-if="isFloor">
      <FloorChildren
        v-if="isOpen"
        :floor="floor"
        :choosing-item="choosingItem"
        @choose="onChoose"
        @unchoose="onUnchoose"
        @change="onChange"
        @addChild="onAddChild"
        @open="onOpen"
      ></FloorChildren>
    </template>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { components } from "~/repositories/schema";
import { ChangeEventObject, EventObject } from "./FloorChildren.vue";

export default Vue.extend({
  props: {
    floor: {
      required: true,
      type: Object as PropType<components["schemas"]["FloorResponseWithChildren"]>,
    },
    treeRole: {
      required: false,
      type: String,
      default: "",
    },
    // eslint-disable-next-line vue/require-prop-types
    choosingItem: {
      required: false,
      default: undefined,
    },
  },
  data() {
    const isOpen = this.treeRole === "ROOT";
    return {
      isOpen,
    };
  },
  computed: {
    isFloor(): boolean {
      return this.floor.floortype !== "ROOM";
    },
  },
  methods: {
    handleChangeOpen() {
      this.isOpen = !this.isOpen;
      this.onOpen(this.floor, this.isOpen);
    },

    onChoose(event?: EventObject) {
      this.$emit("choose", event);
    },
    onUnchoose(event?: EventObject) {
      this.$emit("unchoose", event);
    },
    onChange(parent: components["schemas"]["FloorResponseWithChildren"], event: ChangeEventObject) {
      this.$emit("change", parent, event);
    },
    onAddChild(parent: components["schemas"]["FloorResponseWithChildren"]) {
      this.$emit("addChild", parent);
    },
    onOpen(parent: components["schemas"]["FloorResponseWithChildren"], isOpen: boolean) {
      this.$emit("open", parent, isOpen);
    },
  },
});
</script>

<style scoped></style>
