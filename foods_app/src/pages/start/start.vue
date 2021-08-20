<template>
	<view class="start">
		<image class="login-bg" src="../../static/images/w4.jpg" mode=""></image>
		<button class="login-btn" open-type="getUserInfo" @click="getuserinfo()">登录授权</button>
	</view>
</template>

<script>
import { baseUrl } from "@/utils/utils";

export default {
	data() {
		return {};
	},

	onLoad() {
		let info = uni.getStorageSync("userinfo");
		if (info != null) {
			uni.switchTab({
				url: "/pages/index/index",
			});
		}
	},

	methods: {
		getuserinfo() {
			uni.login({
				provider: "weixin",
				success: function(res) {
					let { code } = res;
					// 换取openid和session_key
					if (code) {
						uni.request({
							url: "/login/getOpenid",
							data: { code },
							method: "POST",
							success: (res) => {
								let { data } = res.data;
								uni.setStorageSync("accInfo", data);
							},
						});
					}
				},
			});

			// 获取 用户信息
			uni.getUserProfile({
				desc: "登录授权获取信息",
				success(res) {
					console.log(res.userInfo);
					// 存入本地
					uni.setStorageSync("userinfo", res.userInfo);
					// 跳转首页
					uni.switchTab({
						url: "/pages/index/index",
					});
				},
			});
		},
	},
};
</script>

<style>
.start,
page {
    position: relative;

    width: 100%;
    height: 100%;
}

.login-bg {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
}

.login-btn {
    position: absolute;
    bottom: 30px;
    left: 50%;

    margin-left: -75px;
    width: 150px;

    color: #fff;
    background-color: #7e9da2;
}

</style>
