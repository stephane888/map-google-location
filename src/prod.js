import Vue from "vue";
import App from "./components/googleplace.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#googleplace");
