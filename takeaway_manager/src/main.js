import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/styles/reset.css";
import "@/assets/fonts/iconfont.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import XLSX from "xlsx";
Vue.use(XLSX);

const bus = new Vue();
Vue.prototype.$bus = bus;

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
