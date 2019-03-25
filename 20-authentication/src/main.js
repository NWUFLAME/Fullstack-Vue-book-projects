import Vue from "vue";
import App from "./app/App.vue";
import store from "./app/store";
import router from './app/router';


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
