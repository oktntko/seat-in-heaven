<template>
  <div>
    <div
      v-if="treeRole !== 'ROOT'"
      class="flex flex-row flex-nowrap items-center justify-start gap-2 p-2"
      :class="`${isOpen ? 'pb-2' : ''}`"
    >
      <!-- ハンドル -->
      <Icon class="handle h-5 w-5 cursor-move" icon="ic:baseline-drag-indicator" />
      <!-- フロア or 居室 -->
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
          path: `/floors`,
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
        v-if="isFloor && isOpen"
        class="flex flex-row flex-nowrap items-center gap-1"
        @click="add(floor)"
      >
        <Icon class="h-5 w-5" icon="bx:folder-plus" />
      </button>
      <button class="flex flex-row flex-nowrap items-center gap-1" @click="handleEdit">
        <Icon class="h-5 w-5" icon="ep:setting" />
      </button>
    </div>
    <template v-if="isFloor">
      <FloorChildren
        v-if="isOpen"
        class="ml-4 mb-2 flex flex-col border-2 border-dashed transition-all"
        :class="`${choosingItem && !isChoosing ? 'border-sky-500/50' : 'border-transparent'}
                 ${treeRole === 'ROOT' ? '' : 'border-r-0'}`"
        :floor="floor"
        :choosing-item="choosingItem"
        :tree-role="treeRole"
        :change="change"
        :add="add"
        :edit="edit"
        :open="open"
        @choose="onChoose"
        @unchoose="onUnchoose"
      ></FloorChildren>
    </template>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { components } from "~/repositories/schema";
import { EventObject } from "./FloorChildren.vue";

export default Vue.extend({
  props: {
    floor: {
      required: true,
      type: Object as PropType<components["schemas"]["FloorResponseWithChildren"]>,
    },
    brothers: {
      required: false,
      type: Array,
      default: () => [],
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
    change: {
      required: true,
      type: Function,
    },
    add: {
      required: true,
      type: Function,
    },
    edit: {
      required: true,
      type: Function,
    },
    open: {
      required: true,
      type: Function,
    },
  },
  data() {
    const isOpen = this.treeRole === "ROOT";
    return {
      isOpen,
      isChoosing: false,
    };
  },
  computed: {
    isFloor(): boolean {
      return this.floor.floortype !== "ROOM";
    },
  },
  watch: {
    choosingItem() {
      this.isChoosing = this.choosingItem === this.$el;
    },
  },
  methods: {
    handleChangeOpen() {
      this.isOpen = !this.isOpen;
      this.open(this.floor, this.isOpen);
    },
    handleEdit() {
      this.edit(this.floor, this.brothers);
    },

    onChoose(event?: EventObject) {
      this.$emit("choose", event);
    },
    onUnchoose(event?: EventObject) {
      this.$emit("unchoose", event);
    },
  },
});
</script>

<style scoped></style>
