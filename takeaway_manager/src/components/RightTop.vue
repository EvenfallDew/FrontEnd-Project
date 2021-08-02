<template>
	<div class="right-top">
		<div class="bread-crumb">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>活动管理</el-breadcrumb-item>
				<el-breadcrumb-item>活动列表</el-breadcrumb-item>
				<el-breadcrumb-item>活动详情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="account">
			<div>
				<el-dropdown @command="selItem">
					<span class="el-dropdown-link">
						欢迎你，
						{{ info.account }}
						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="user">个人中心</el-dropdown-item>
						<el-dropdown-item command="outlogin">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			<img :src="info.imgUrl" class="avatorImg" />
		</div>
	</div>
</template>

<script>
import local from "@/utils/local";
import { getInfo_api } from "@/api/acc";

export default {
	data() {
		return {
			info: {},
		};
	},
	created() {
		// 调用函数
		this.getInfo();
		// 接收$bus
		this.$bus.$on("uploadImg", () => {
			// 重绘
			this.getInfo();
		});
	},
	methods: {
		// 获取用户信息的函数
		async getInfo() {
			let res = await getInfo_api();
			let { accountInfo } = res.data;
			// 赋值
			this.info = accountInfo;
			// 拿到数据后，存入本地 给个人中心用
			local.set("info", this.info);
		},
		// 下拉选择框触发的函数
		selItem(val) {
			// val 就是command 绑定的值 形参随便叫什么无所谓
			if (val == "user") {
				// 如果点击的是个人中心 就应该跳转页面
				this.$router.push("/user");
			} else {
				// 点击退出登录
				local.clear();
				this.$router.push("/login");
			}
		},
	},
};
</script>

<style lang="less" scoped>
.right-top {
    display: flex;

    padding: 0 20px;
    width: 100%;

    justify-content: space-between;
    align-items: center;

    .account {
        display: flex;

        align-items: center;

        .avatorImg {
            margin-left: 15px;
            border-radius: 50%;
            width: 60px;
            height: 60px;
        }
    }
}

</style>
