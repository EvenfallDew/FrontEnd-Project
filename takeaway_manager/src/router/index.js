import Vue from "vue";
import VueRouter from "vue-router";

import local from "@/utils/local";

import Login from "@/views/Login.vue";
import Layout from "@/views/layout/Layout.vue";

Vue.use(VueRouter);

// 一二级路由
export const aysncRoutes = [
	// 首页重定向
	{
		path: "/",
		redirect: "/login",
		isShow: false,
	},
	// 登录
	{
		path: "/login",
		component: Login,
		isShow: false,
	},
	// 后台首页
	{
		path: "",
		component: Layout,
		isShow: true,
		children: [
			{
				path: "/layout",
				meta: { title: "后台首页", tag: "home" },
				component: () => import("@/views/layout/home/Home.vue"),
				isShow: true,
			},
		],
	},
	// 店铺管理
	{
		path: "",
		component: Layout,
		isShow: true,
		children: [
			{
				path: "/shop",
				meta: { title: "店铺管理", tag: "shop" },
				component: () => import("@/views/layout/shop/Shop.vue"),
				isShow: true,
			},
		],
	},
	// 订单管理
	{
		path: "",
		component: Layout,
		isShow: true,

		children: [
			{
				path: "/order",
				meta: { title: "订单管理", tag: "order" },
				component: () => import("@/views/layout/order/Order.vue"),
				isShow: true,
			},
		],
	},
	// 商品管理
	{
		path: "/goods",
		meta: { title: "商品管理", tag: "goods" },
		component: Layout,
		redirect: "/goods/goods-list",
		isShow: true,
		children: [
			{
				path: "goods-list",
				meta: { title: "商品列表" },
				component: () => import("@/views/layout/goods/GoodsList.vue"),
				isShow: true,
			},
			{
				path: "goods-add",
				meta: { title: "商品添加" },
				component: () => import("@/views/layout/goods/GoodsAdd.vue"),
				isShow: true,
			},
			{
				path: "goods-cate",
				meta: { title: "商品类型" },
				component: () => import("@/views/layout/goods/GoodsCate.vue"),
				isShow: true,
			},
		],
	},
	// 账号管理
	{
		path: "/acc",
		meta: { title: "账号管理", tag: "acc", roles: ["super", "normal"] },
		component: Layout,
		isShow: true,
		redirect: "/acc/acc-list",
		children: [
			{
				path: "acc-list",
				meta: { title: "账号列表", roles: ["super"] },
				component: () => import("@/views/layout/acc/AccList.vue"),
				isShow: true,
			},
			{
				path: "acc-add",
				meta: { title: "账号添加", roles: ["super"] },
				component: () => import("@/views/layout/acc/AccAdd.vue"),
				isShow: true,
			},
			{
				path: "acc-edit",
				meta: { title: "账号修改", roles: ["super", "normal"] },
				component: () => import("@/views/layout/acc/AccEdit.vue"),
				isShow: true,
			},
			{
				path: "acc-user",
				meta: { title: "个人中心", roles: ["super", "normal"] },
				component: () => import("@/views/layout/acc/AccUser.vue"),
				isShow: true,
			},
		],
	},
	// 销售统计
	{
		path: "/count",
		meta: { title: "销售统计", tag: "count", roles: ["super"] },
		component: Layout,
		isShow: true,
		redirect: "/count/count-goods",
		children: [
			{
				path: "count-goods",
				meta: { title: "商品统计", roles: ["super"] },
				component: () => import("@/views/layout/count/CountGoods.vue"),
				isShow: true,
			},
			{
				path: "count-order",
				meta: { title: "订单统计", roles: ["super"] },
				component: () => import("@/views/layout/count/CountOrder.vue"),
				isShow: true,
			},
		],
	},
	// 错误页面
	{
		path: "/error",
		isShow: false,
		component: () => import("@/views/layout/error/Error.vue"),
	},
	// 重定向
	{
		path: "*",
		isShow: false,
		redirect: "/error",
	},
];

// 当前页路由重访问
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
	routes: aysncRoutes,
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
