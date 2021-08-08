import Vue from "vue";
import VueRouter from "vue-router";

// 引入页面
import Search from "@/views/Search.vue";
import List from "@/views/List.vue";
import Play from "@/views/Play.vue";

Vue.use(VueRouter);
// 当前页路由重访问
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err);
};
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
