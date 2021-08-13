import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import Goods from "@/views/Goods.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "*",
		redirect: "/goods",
	},
	{
		path: "/goods",
		component: Goods,
	},
	{
		path: "/rating",
		component: () => import("@/views/Rating.vue"),
	},
	{
		path: "/seller",
		component: () => import("@/views/Seller.vue"),
	},
];

const router = new VueRouter({
	routes,
});

export default router;
