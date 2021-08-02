<template>
	<div class="container">
		<!-- 左边部分 -->
		<aside>
			<h2 class="title">外卖商家中心</h2>
			<LeftMenu></LeftMenu>
		</aside>
		<!-- 右边部分 -->
		<div class="content">
			<header>
				<RightTop></RightTop>
			</header>
			<main>
				<router-view></router-view>
			</main>
		</div>
	</div>
</template>

<script>
import LeftMenu from "@/components/LeftMenu.vue";
import RightTop from "@/components/RightTop.vue";

export default {
	components: {
		LeftMenu,
		RightTop,
	},
};
</script>

<style lang="less" scoped src="../../assets/styles/layout.less"></style>
