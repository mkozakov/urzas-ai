import Vue from "vue";
import App from "./App.vue";
import { analytics } from "./services/firebase"
import { logEvent } from "firebase/analytics"

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  created: () => {
    logEvent(analytics, "User landed on the page.");
    const html = document.documentElement; // returns the html tag
    html.setAttribute("lang", "en");
  },
  beforeCreate: function () {
    document.body.style = "margin: 0; width: 100%; height: 100%;";
  },
}).$mount("#app");
