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
				<!-- 导航地址 -->
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>活动管理</el-breadcrumb-item>
					<el-breadcrumb-item>活动列表</el-breadcrumb-item>
					<el-breadcrumb-item>活动详情</el-breadcrumb-item>
				</el-breadcrumb>
				<!-- 头像相关 -->
				<div class="acc-box">
					<!-- 下拉 -->
					<el-dropdown @command="handleCommand">
						<span class="el-dropdown-link">
							欢迎你,
							<span>XXX</span>
							<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="a">个人中心</el-dropdown-item>
							<el-dropdown-item command="b">注销登录</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<!-- 头像 -->
					<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
				</div>
			</header>
			<main>
				<router-view></router-view>
			</main>
		</div>
	</div>
</template>

<script>
import LeftMenu from "@/components/LeftMenu.vue";

export default {
	components: {
		LeftMenu,
	},

	methods: {
		handleCommand(command) {
			this.$router.push("/user");
		},
	},
};
</script>

<style lang="less" scoped src="../../assets/styles/layout.less"></style>
