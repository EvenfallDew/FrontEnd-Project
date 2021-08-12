import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "@/assets/styles/reset.css";
import "@/assets/fonts/iconfont.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import XLSX from "xlsx";
Vue.use(XLSX);

Vue.use(ElementUI);

Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;

const bus = new Vue();
Vue.prototype.$bus = bus;

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
