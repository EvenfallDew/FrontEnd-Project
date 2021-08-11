<template>
	<div class="left-menu">
		<el-menu
			class="el-menu-vertical-demo"
			text-color="#fff"
			active-text-color="gray"
			router
			unique-opened
			:default-active="this.$route.path"
		>
			<div v-for="(item, i) in menu" :key="i">
				<template>
					<!-- 没有子菜单 -->
					<el-menu-item v-if="item.children.length == 1" :index="item.children[0].path">
						<span slot="title">
							<i :class="icon + item.children[0].meta.tag"></i>
							{{ item.children[0].meta.title }}
						</span>
					</el-menu-item>
					<!-- 有子菜单 -->
					<el-submenu v-else :index="item.path">
						<template slot="title">
							<span>
								<i :class="icon + item.meta.tag"></i>
								{{ item.meta.title }}
							</span>
						</template>
						<el-menu-item-group>
							<el-menu-item
								v-for="(v, index) in item.children"
								:key="index"
								:index="item.path + '/' + v.path"
							>
								{{ v.meta.title }}
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</template>
			</div>
		</el-menu>
	</div>
</template>

<script>
import router, { aysncRoutes } from "@/router";
import { getRole_api } from "@/api/acc";

export default {
	data() {
		return {
			menu: [],
			icon: "iconfont icon-menu-",
		};
	},

	async created() {
		// 获取到身份角色
		let res = await getRole_api();
		let { role } = res.data;
		// 判断当前路由是否有身份权限
		function hasRole(roles, routers) {
			if (routers.meta && routers.meta.roles) {
				// 如果roles数组存在 就return 当前包含权限的路由对象
				return routers.meta.roles.includes(roles);
			} else {
				return true;
			}
		}
		// 过滤路由数组
		function filterRouters(roles, routers) {
			let accRouter = routers.filter((item) => {
				// 过滤1 级路由
				if (hasRole(roles, item)) {
					// 递归过滤 过滤2级路由
					if (item.children) {
						item.children = filterRouters(roles, item.children);
					}
					return true;
				} else {
					return false;
				}
			});
			return accRouter;
		}

		let fRouter = filterRouters(role, aysncRoutes);
		// 动态添加路由
		router.addRoutes(fRouter);
		// 过滤出所有要展示的路由对象  isShow == true
		this.menu = fRouter.filter((item) => item.isShow);
	},
};
</script>

<style lang="less" scoped>
.left-menu {
	/deep/ .el-menu {
		border: none;

		background-color: rgba(0, 0, 0, 0.24);
	}

	/deep/ .el-submenu .el-menu-item {
		text-indent: 20px;
	}

	/deep/.el-menu-item:hover {
		color: black !important;
	}

	/deep/.el-submenu__title:hover {
		color: black !important;
	}

	/deep/ .iconfont {
		margin-right: 10px;
	}
}
</style>
