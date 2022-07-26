import Vue from "vue";

// https://v2.vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components

import FloorNode from "~/components/FloorNode.vue";
import FloorChildren from "~/components/FloorChildren.vue";

Vue.component("FloorNode", FloorNode);
Vue.component("FloorChildren", FloorChildren);
