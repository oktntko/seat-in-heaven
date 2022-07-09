import { Icon } from "@iconify/vue2";
import Vue from "vue";
import App from "~/App.vue";
import "~/main.css";
import router from "~/router";

Vue.config.productionTip = false;

Vue.component("Icon", Icon);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
