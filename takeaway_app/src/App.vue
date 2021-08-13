<template>
	<div class="app">
		<!-- 头部 -->
		<HeaderHome :sellerInfo="sellerInfo" />
		<!-- 导航 -->
		<nav>
			<router-link
				v-for="(item, i) in navs"
				:key="i"
				:class="$route.path == item.path ? 'active' : ''"
				:to="item.path"
			>
				{{ item.title }}
			</router-link>
		</nav>
		<!-- 主体 -->
		<main>
			<!-- 路由出口 -->
			<router-view :sellerInfo="sellerInfo" />
		</main>
		<!-- 底部 -->
		<FooterHome />
	</div>
</template>

<script>
// 引入api
import { getSeller_api } from "@/api/apis";

import HeaderHome from "@/components/HeaderHome.vue";
import FooterHome from "@/components/FooterHome.vue";

export default {
	components: {
		HeaderHome,
		FooterHome,
	},

	data() {
		return {
			navs: [
				{ path: "/goods", title: "商品" },
				{ path: "/rating", title: "评价" },
				{ path: "/seller", title: "商家" },
			],
			sellerInfo: {}, // 商家数据
		};
	},

	created() {
		this.getSeller();
	},

	methods: {
		// 获取 商家信息
		async getSeller() {
			let res = await getSeller_api();
			let { data } = res.data;
			this.sellerInfo = data;
		},
	},
};
</script>

<style lang="less" scoped>
.app {
    display: flex;

    width: 100%;
    height: 100%;

    flex-direction: column;

    nav {
        display: flex;

        border-bottom: 1px solid #ccc;
        width: 100%;
        height: 40px;

        align-items: center;
        justify-content: space-around;

        a {
            color: #646464;

            &.active {
                color: red;
            }
        }
    }

    main {
        overflow: scroll;

        flex: 1;
    }
}

</style>
