<template>
	<div class="container" ref="bg">
		<!-- 左边部分 -->
		<aside>
			<div>
				<h2 class="title">外卖商家中心</h2>
				<LeftMenu></LeftMenu>
			</div>
			<div class="change-color" @click="changeColor()">狗狗祟祟，换个主题</div>
		</aside>
		<!-- 右边部分 -->
		<div class="content">
			<header>
				<TopNav></TopNav>
			</header>
			<main>
				<router-view></router-view>
			</main>
		</div>
	</div>
</template>

<script>
import LeftMenu from "@/components/LeftMenuX.vue";
import TopNav from "@/components/TopNav.vue";

export default {
	components: {
		LeftMenu,
		TopNav,
	},

	data() {
		return {
			bgColor: [
				"linear-gradient(45deg, #0c675e, #069e90)",
				"linear-gradient(45deg, #795548, #945c48)",
				"linear-gradient(45deg, #1565C0, #1E88E5)",
				"linear-gradient(45deg, #65379b, #886aea)",
				"linear-gradient(45deg, #29323c, #485563)",
			],
			colorNum: 0,
		};
	},

	methods: {
		changeColor() {
			if (this.colorNum == this.bgColor.length) {
				this.colorNum = 0;
			}
			this.$refs.bg.style.backgroundImage = this.bgColor[this.colorNum];
			this.colorNum = this.colorNum + 1;
		},
	},
};
</script>

<style lang="less" scoped src="../../assets/styles/layout.less"></style>
