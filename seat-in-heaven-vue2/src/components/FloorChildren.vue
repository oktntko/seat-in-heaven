<template>
  <Draggable
    tag="ul"
    class="flex flex-col rounded-md border-2 border-dashed pl-4 opacity-90 transition-all"
    :class="`${choosingItem && !isChoosingParentItem ? 'border-sky-500/50' : 'border-transparent'}`"
    :list="floor.children"
    group="tree"
    handle=".handle"
    chosen-class="opacity-10"
    ghost-class="border-sky-500"
    drag-class=""
    :animation="300"
    :dragover-bubble="false"
    @choose="onChoose"
    @unchoose="onUnchoose"
    @change="handleChange"
  >
    <FloorNode
      v-for="child in floor.children"
      :key="child.floor_id"
      class="border border-b-0 p-2 first:rounded-t-md last:rounded-b-md last:border-b"
      :floor="child"
      :choosing-item="choosingItem"
      @choose="onChoose"
      @unchoose="onUnchoose"
      @change="onChange"
      @addChild="onAddChild"
      @open="onOpen"
    >
    </FloorNode>
  </Draggable>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Draggable from "vuedraggable";
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

export type AddedEventObject = {
  newIndex: number;
  element: components["schemas"]["FloorResponseWithChildren"];
};

export type RemovedEventObject = {
  oldIndex: number;
  element: components["schemas"]["FloorResponseWithChildren"];
};

export type MovedEventObject = {
  newIndex: number;
  oldIndex: number;
  element: components["schemas"]["FloorResponseWithChildren"];
};

export type ChangeEventObject = {
  added?: AddedEventObject;
  removed?: RemovedEventObject;
  moved?: MovedEventObject;
};

export default Vue.extend({
  name: "FloorTree",
  components: { Draggable },
  props: {
    floor: {
      required: true,
      type: Object as PropType<components["schemas"]["FloorResponseWithChildren"]>,
    },
    // eslint-disable-next-line vue/require-prop-types
    choosingItem: {
      required: false,
      default: undefined,
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
    handleChange(event: ChangeEventObject) {
      this.onChange(this.floor, event);
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
