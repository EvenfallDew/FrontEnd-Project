<template>
	<div class="top-nav">
		<div class="bread-crumb">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item v-for="(item, i) in breadArr" :key="i" :to="{ path: item.path }">
					{{ item.title }}
				</el-breadcrumb-item>
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
						<el-dropdown-item command="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			<img :src="info.imgUrl" class="avatorImg" />
		</div>
	</div>
</template>

<script>
import local from "@/utils/local";
import base from "@/utils/base";
import { getInfo_api } from "@/api/acc";

export default {
	data() {
		return {
			info: {},
			breadArr: [],
		};
	},
	created() {
		// 信息绘制
		this.getInfo();
		// 接收$bus
		this.$bus.$on("uploadImg", () => {
			// 重绘
			this.getInfo();
		});
		this.filterBread();
	},

	watch: {
		// 监听hash变化
		"$route.path"() {
			this.filterBread();
		},
	},

	methods: {
		// 遍历路由对象 得到面包屑所需要的数据
		filterBread() {
			let newArr = [{ path: "/layout", title: "后台首页" }];
			this.$route.matched.forEach((item) => {
				// 如果path不是空
				if (item.path != "") {
					newArr.push({
						path: item.path,
						title: item.meta.title,
					});
				}
			});
			// 赋值
			this.breadArr = newArr;
		},
		// 获取用户信息
		async getInfo() {
			let res = await getInfo_api();
			// 解构赋值
			let { accountInfo } = res.data;
			this.info = accountInfo;
			// 存入本地
			local.set("info", this.info);
			let imgHead = this.info.imgUrl.split("/");
			let imgTarget = imgHead[imgHead.length - 1];
			this.info.imgUrl = base.url + "/upload/imgs/acc_img/" + imgTarget;
		},
		// 下拉选择框
		selItem(val) {
			// val 就是command 绑定的值 形参随便叫什么无所谓
			if (val == "user") {
				// 如果点击的是个人中心 就应该跳转页面
				this.$router.push("/acc/acc-user");
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
.top-nav {
    display: flex;

    border: 1px solid rgba(0, 0, 0, 0);
    padding: 0 20px;
    width: 100%;

    background-color: rgba(0, 0, 0, .24);

    box-shadow: 0 .1rem .7rem rgba(0, 0, 0, .18);

    justify-content: space-between;
    align-items: center;

    /deep/ .el-breadcrumb__inner {
        color: #fff;
    }

    /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner {
        color: #fff;
    }

    .el-dropdown {
        color: #fff;
    }

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
