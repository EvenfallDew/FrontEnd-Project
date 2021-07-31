import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue';
import Layout from '@/views/layout/Layout.vue';

Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: "/login"
    },
    // 登录页面
    {
        path: "/login",
        component: Login
    },
    // 布局组件 直接加载后台首页
    {
        path: "/layout",
        component: Layout,
        children: [{
            path: "",
            component: () => import("@/views/layout/home/Home.vue")
        }]
    },
    // 订单管理
    {
        path: "/order",
        component: Layout,
        children: [{
            path: "",
            component: () => import("@/views/layout/order/Order.vue")
        }]
    },
    // 商品管理
    {
        path: "/goods",
        component: Layout,
        redirect: "/goods/goods-list",
        children: [{
                path: "goods-list",
                component: () => import("@/views/layout/goods/GoodsList.vue")
            },
            {
                path: "goods-add",
                component: () => import("@/views/layout/goods/GoodsAdd.vue")
            },
            {
                path: "goods-type",
                component: () => import("@/views/layout/goods/GoodsType.vue")
            }
        ]
    },
    // 店铺管理
    {
        path: "/shop",
        component: Layout,
        children: [{
            path: "",
            component: () => import("@/views/layout/shop/Shop.vue")
        }]
    },
    // 账号管理
    {
        path: "/acc",
        component: Layout,
        redirect: "/acc/acc-list",
        children: [{
                path: "acc-list",
                component: () => import("@/views/layout/acc/AccList.vue")
            },
            {
                path: "acc-add",
                component: () => import("@/views/layout/acc/AccAdd.vue")
            },
            {
                path: "acc-eidit",
                component: () => import("@/views/layout/acc/AccEidit.vue")
            }
        ]
    },
    // 销售统计
    {
        path: "/count",
        component: Layout,
        redirect: "/count/count-goods",
        children: [{
                path: "count-goods",
                component: () => import("@/views/layout/count/CountGoods.vue")
            },
            {
                path: "count-order",
                component: () => import("@/views/layout/count/CountOrder.vue")
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router