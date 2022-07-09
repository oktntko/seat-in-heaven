<template>
  <div>
    <div
      style="height: 500px; width: 500px; border: 1px solid red; position: relative"
      class="ruled-line"
    >
      <VueDraggableResizable :w="100" :h="100" parent @dragging="onDrag" @resizing="onResize">
        <p>
          Hello! I'm a flexible component. You can drag me around and you can resize me.<br />
          X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}
        </p>
      </VueDraggableResizable>
      <VueDraggableResizable :grid="[20, 20]" :x="10" :y="10">
        <p>Grid 20x20 starting with a 10x10 offset</p>
      </VueDraggableResizable>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueDraggableResizable from "vue-draggable-resizable";

import "vue-draggable-resizable/dist/VueDraggableResizable.css";

export default Vue.extend({
  components: {
    VueDraggableResizable,
  },
});
</script>

<style scoped>
.ruled-line {
  background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 10px 10px / 20px 20px,
    linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px;
}
</style>
