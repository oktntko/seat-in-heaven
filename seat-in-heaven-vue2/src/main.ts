import Vue from "vue";
import App from "~/App.vue";
import "~/components/circular-components";
import "~/libs/iconify";
import "~/libs/vxe-table";
import "~/main.css";
import router from "~/router";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
