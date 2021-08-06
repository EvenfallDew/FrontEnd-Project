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
};
</script>

<style lang="less" scoped src="../../assets/styles/layout.less"></style>
