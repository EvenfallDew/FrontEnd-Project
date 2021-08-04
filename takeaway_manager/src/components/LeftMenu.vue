<template>
	<div class="left-menu">
		<el-menu
			class="el-menu-vertical-demo"
			text-color="#fff"
			active-text-color="#3f9af8"
			background-color="#304156"
			router
			unique-opened
			:default-active="this.$route.path"
		>
			<!-- 后台首页 -->
			<el-menu-item index="/layout">
				<i class="iconfont icon-menu-home"></i>
				<span slot="title">后台首页</span>
			</el-menu-item>
			<!-- 店铺管理 -->
			<el-menu-item index="/shop">
				<i class="iconfont icon-menu-shop"></i>
				<span slot="title">店铺管理</span>
			</el-menu-item>
			<!-- 订单管理 -->
			<el-menu-item index="/order">
				<i class="iconfont icon-menu-order"></i>
				<span slot="title">订单管理</span>
			</el-menu-item>
			<!-- 商品管理 -->
			<el-submenu index="/goods">
				<template slot="title">
					<i class="iconfont icon-menu-goods"></i>
					<span>商品管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/goods/goods-list">商品列表</el-menu-item>
					<el-menu-item index="/goods/goods-add">商品添加</el-menu-item>
					<el-menu-item index="/goods/goods-cate">商品分类</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<!-- 账号管理 -->
			<el-submenu index="/acc">
				<template slot="title">
					<i class="iconfont icon-menu-acc"></i>
					<span>账号管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/acc/acc-list">账号列表</el-menu-item>
					<el-menu-item index="/acc/acc-add">账号添加</el-menu-item>
					<el-menu-item index="/acc/acc-edit">修改密码</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<!-- 销售统计 -->
			<el-submenu index="/count">
				<template slot="title">
					<i class="iconfont icon-menu-count"></i>
					<span>销售统计</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/count/count-goods">商品统计</el-menu-item>
					<el-menu-item index="/count/count-order">订单统计</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.left-menu {
    /deep/ .el-menu {
        border: none;
    }

    /deep/ .iconfont {
        margin-right: 10px;
    }
}

</style>
