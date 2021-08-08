import Vue from "vue";
import VueRouter from "vue-router";

// 引入页面
import Search from "@/views/Search.vue";
import List from "@/views/List.vue";
import Play from "@/views/Play.vue";

Vue.use(VueRouter);

// routes是路由的核心配置
const routes = [
	{
		path: "/",
		redirect: "/search",
	},
	{
		path: "/search",
		component: Search,
	},
	{
		path: "/list",
		component: List,
	},
	{
		path: "/play",
		component: Play,
	},
];
export default new VueRouter({
	routes,
});
