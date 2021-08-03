import Vue from "vue";
import VueRouter from "vue-router";

import local from "@/utils/local";

import Login from "@/views/Login.vue";
import Layout from "@/views/layout/Layout.vue";

Vue.use(VueRouter);

// 一二级路由
const routes = [
	// 首页重定向
	{
		path: "/",
		redirect: "/login",
	},
	// 登录
	{
		path: "/login",
		component: Login,
	},
	// 后台首页
	{
		path: "",
		component: Layout,
		children: [
			{
				path: "/layout",
				meta: { title: "后台首页" },
				component: () => import("@/views/layout/home/Home.vue"),
			},
		],
	},
	// 个人中心
	{
		path: "",
		component: Layout,
		children: [
			{
				path: "/user",
				meta: { title: "个人中心" },
				component: () => import("@/views/layout/user/User.vue"),
			},
		],
	},
	// 订单管理
	{
		path: "",
		component: Layout,
		children: [
			{
				path: "/order",
				meta: { title: "订单管理" },
				component: () => import("@/views/layout/order/Order.vue"),
			},
		],
	},
	// 商品管理
	{
		path: "/goods",
		meta: { title: "商品管理" },
		component: Layout,
		redirect: "/goods/goods-list",
		children: [
			{
				path: "goods-list",
				meta: { title: "商品列表" },
				component: () => import("@/views/layout/goods/GoodsList.vue"),
			},
			{
				path: "goods-add",
				meta: { title: "商品添加" },
				component: () => import("@/views/layout/goods/GoodsAdd.vue"),
			},
			{
				path: "goods-cate",
				meta: { title: "商品类型" },
				component: () => import("@/views/layout/goods/GoodsCate.vue"),
			},
		],
	},
	// 店铺管理
	{
		path: "",
		component: Layout,
		children: [
			{
				path: "/shop",
				meta: { title: "店铺管理" },
				component: () => import("@/views/layout/shop/Shop.vue"),
			},
		],
	},
	// 账号管理
	{
		path: "/acc",
		meta: { title: "账号管理" },
		component: Layout,
		redirect: "/acc/acc-list",
		children: [
			{
				path: "acc-list",
				meta: { title: "账号列表" },
				component: () => import("@/views/layout/acc/AccList.vue"),
			},
			{
				path: "acc-add",
				meta: { title: "账号添加" },
				component: () => import("@/views/layout/acc/AccAdd.vue"),
			},
			{
				path: "acc-edit",
				meta: { title: "账号修改" },
				component: () => import("@/views/layout/acc/AccEdit.vue"),
			},
		],
	},
	// 销售统计
	{
		path: "/count",
		meta: { title: "销售统计" },
		component: Layout,
		redirect: "/count/count-goods",
		children: [
			{
				path: "count-goods",
				meta: { title: "商品统计" },
				component: () => import("@/views/layout/count/CountGoods.vue"),
			},
			{
				path: "count-order",
				meta: { title: "订单统计" },
				component: () => import("@/views/layout/count/CountOrder.vue"),
			},
		],
	},
];

// 当前页路由重访问
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
	routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
	let token = local.get("token");
	if (to.path == "/login") {
		// 只要访问登录页 永远放行
		next();
	} else if (token) {
		next();
	} else if (!token) {
		// 如果token不存在 就应该回到登录页
		router.push("/login");
	}
});

export default router;
