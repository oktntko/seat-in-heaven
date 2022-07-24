<template>
  <Draggable
    tag="ul"
    class="flex flex-col rounded-md border-2 border-dashed pl-4 opacity-90 transition-all"
    :class="`${choosingItem && !isChoosingParentItem ? 'border-sky-500/50' : 'border-transparent'}`"
    :list="root.children"
    :options="{
      animation: 300,
      handle: '.handle',
      group: groupName,
      chosenClass: 'opacity-10', // Class name for the chosen item
      ghostClass: 'border-sky-500', // Class name for the drop placeholder
      dragClass: '', // Class name for the dragging item
      dragoverBubble: false,
    }"
    :move="checkMove"
    @change="onChange"
    @choose="onChoose"
    @start="onStart"
    @unchoose="onUnchoose"
    @update="onUpdate"
    @sort="onSort"
    @end="onEnd"
    @remove="onRmove"
    @add="onAdd"
  >
    <li
      v-for="floor in root.children"
      :key="floor.floor_id"
      class="border border-b-0 p-2 first:rounded-t-md last:rounded-b-md last:border-b"
    >
      <FloorVue :floor="floor" @addChild="addChild" @trash="trash" @pullChildren="pullChildren" />
      <FloorTree
        v-if="floor.floortype === 'FLOOR'"
        :root="floor"
        :choosing-item="choosingItem"
        :dragging="dragging"
        @choose="onChoose"
        @start="onStart"
        @unchoose="onUnchoose"
        @end="onEnd"
        @addChild="addChild"
        @trash="trash"
        @pullChildren="pullChildren"
      >
      </FloorTree>
    </li>
  </Draggable>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Draggable from "vuedraggable";
import FloorVue from "~/pages/system/floors/components/Floor.vue";
import { components } from "~/repositories/schema";

export type EventObject = {
  to: HTMLElement; // list, in which moved element
  from: HTMLElement; // previous list
  item: HTMLElement; // dragged element
  clone: HTMLElement;
  oldIndex: number | undefined; // old index within parent
  newIndex: number | undefined; // new index within parent
  oldDraggableIndex: number | undefined; // old index within parent, only counting draggable elements
  newDraggableIndex: number | undefined; // new index within parent, only counting draggable elements
  pullMode: string | boolean | undefined; // Pull mode if dragging into another sortable ("clone", true, or false), otherwise undefined
};

export type MoveEventObject = {
  to: HTMLElement; // list, in which moved element
  from: HTMLElement; // previous list
  dragged: HTMLElement; // dragged element
  draggedRect: DOMRect;
  related: HTMLElement; //element on which have guided
  relatedRect: DOMRect;
  willInsertAfter: boolean; // true if will element be inserted after target (or false if before)
};

export default Vue.extend({
  name: "FloorTree",
  components: { Draggable, FloorVue },
  props: {
    groupName: {
      required: false,
      type: String,
      default: "tree",
    },
    root: {
      required: true,
      type: Object as PropType<components["schemas"]["ListFloorResponse"]>,
    },
    // eslint-disable-next-line vue/require-prop-types
    choosingItem: {
      required: false,
      default: undefined,
    },
    dragging: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isChoosingParentItem: false,
    };
  },
  watch: {
    choosingItem() {
      this.isChoosingParentItem = this.$el?.parentElement === this.choosingItem;
    },
  },
  methods: {
    onChoose(event?: EventObject) {
      this.$emit("choose", event);
      console.log("onChoose", event?.item);
    },
    onStart(event?: EventObject) {
      this.$emit("start", event);
      console.log("onStart", event?.item);
    },
    checkMove: function (evt: MoveEventObject) {
      console.log("checkMove", evt);
      return true;
    },
    onChange(dropResult: { removedIndex: number; addedIndex: number; payload: object }) {
      console.log("onChange", dropResult);
    },
    onUnchoose(event?: EventObject) {
      this.$emit("unchoose", event);
      console.log("onUnchoose", event?.item);
    },
    onUpdate(event?: EventObject) {
      console.log("onUpdate", event?.item);
    },
    onSort(event?: EventObject) {
      console.log("onSort", event?.item);
    },
    onEnd(event?: EventObject) {
      this.$emit("end", event);
      console.log("onEnd", event?.item);
    },
    onAdd(event?: EventObject) {
      console.log("onAdd", event?.item);
    },
    onRmove(event?: EventObject) {
      console.log("onRmove", event?.item);
    },
    addChild(parent: components["schemas"]["FloorResponse"]) {
      this.$emit("addChild", parent);
    },
    trash(floor: components["schemas"]["FloorResponse"]) {
      this.$emit("trash", floor);
    },
    pullChildren(open: boolean, parent: components["schemas"]["FloorResponse"]) {
      this.$emit("pullChildren", open, parent);
    },
  },
});
</script>

<style scoped></style>
