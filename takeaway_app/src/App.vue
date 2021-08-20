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
				<transition enter-active-class="animate__animated animate__fadeIn">
					<router-view :sellerInfo="sellerInfo" />
				</transition>
			</main>

			<!-- 底部 -->
			<FooterHome />
		</div>

		<!-- 弹窗 -->
		<transition
			enter-active-class="animate__animated animate__slideInDown"
			leave-active-class="animate__animated animate__slideOutUp"
		>
			<div class="dialog-box" v-if="isShow">
				<main>
					<section class="name-star">
						<h2>
							{{ sellerInfo.name }}
						</h2>
						<p>
							<van-rate
								color="#fe9900"
								void-icon="star"
								void-color="#464b51"
								readonly
								allow-half
								v-model="sellerInfo.score"
								:size="25"
							/>
						</p>
					</section>

					<section class="discount-info">
						<van-divider :style="{ color: '#fff', borderColor: '#fff', fontSize: '16px' }">
							优惠信息
						</van-divider>
						<ul>
							<li v-for="(item, index) in sellerInfo.supports" :key="index">
								<van-icon :name="imagesList[0]" />
								{{ item }}
							</li>
						</ul>
					</section>

					<section class="seller-ad">
						<van-divider :style="{ color: '#fff', borderColor: '#fff', fontSize: '16px' }">
							商家公告
						</van-divider>
						<p>
							{{ sellerInfo.bulletin }}
						</p>
					</section>

					<section class="close-btn">
						<van-icon name="cross" size="35px" color="#eee" @click="closeDialog()" />
					</section>
				</main>
			</div>
		</transition>
	</div>
</template>

<script>
import HeaderHome from "@/components/HeaderHome.vue";
import FooterHome from "@/components/FooterHome.vue";
import { getSeller_api } from "@/api/apis";
import { animateCss } from "@/utils/animate";
import local from "@/utils/local";

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
			imagesList: [
				require("./assets/images/decrease.png"),
				require("./assets/images/discount.png"),
				require("./assets/images/special.png"),
			],
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
			local.set("sellerInfo", data);
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
