import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "@/assets/styles/reset.css";
import "@/assets/fonts/iconfont.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");