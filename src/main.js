import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import firebase from "@/services/firebaseConnection";

Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: function (h) {
        return h(App);
      },
    }).$mount("#app");
  }
});

/* new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  },
}).$mount("#app"); */
