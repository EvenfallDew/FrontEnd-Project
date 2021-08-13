<template>
	<div class="app animated bounce">
		<div class="content" ref="content">
			<!-- 头部 -->
			<HeaderHome :sellerInfo="sellerInfo" @open="openDialog" />

			<!-- 导航 -->
			<nav>
				<router-link
					v-for="(item, i) in navs"
					:key="i"
					:to="item.path"
					:class="$route.path == item.path ? 'active' : ''"
				>
					{{ item.title }}
				</router-link>
			</nav>

			<!-- 主体 -->
			<main>
				<transition
					enter-active-class="animate__animated animate__fadeInUp"
					leave-active-class="animate__animated animate__fadeOutDown"
				>
					<router-view :sellerInfo="sellerInfo" />
				</transition>
			</main>

			<!-- 底部 -->
			<FooterHome />
		</div>

		<!-- 弹窗 -->
		<transition
			enter-active-class="animate__animated animate__fadeInUp"
			leave-active-class="animate__animated animate__fadeOutDown"
		>
			<div class="dialog animated" v-if="isShow">
				{{ sellerInfo.name }}
				<van-divider :style="{ color: '#fff', borderColor: '#fff', padding: '0 16px', fontSize: '20px' }">
					优惠信息
				</van-divider>
				{{ sellerInfo.supports[0] }}
				{{ sellerInfo.supports[1] }}

				<van-divider :style="{ color: '#fff', borderColor: '#fff', padding: '0 16px', fontSize: '20px' }">
					商家公告
				</van-divider>
				{{ sellerInfo.bulletin }}

				<div class="close-btn" @click="closeDialog">X</div>
			</div>
		</transition>
	</div>
</template>

<script>
import HeaderHome from "@/components/HeaderHome.vue";
import FooterHome from "@/components/FooterHome.vue";
import { getSeller_api } from "@/api/apis";
import { animateCss } from "@/utils/animate";

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
			isShow: false, //弹窗显示
			show: true,
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

		// 打开 弹窗
		openDialog(data) {
			this.isShow = data;
			this.$refs.content.style.filter = "blur(5px)";
		},

		// 关闭 弹窗
		closeDialog() {
			this.isShow = false;
			this.$refs.content.style.filter = "blur(0px)";
		},
	},
};
</script>

<style lang="less" scoped src="./assets/styles/app.less"></style>
