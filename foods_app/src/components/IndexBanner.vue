<template>
	<view class="index-banner" @click="showTab($event)">
		<!-- 轮播图 -->
		<swiper
			class="swiper"
			:indicator-dots="indicatorDots"
			:autoplay="autoplay"
			:interval="interval"
			:duration="duration"
			circular
		>
			<swiper-item v-for="(item, i) in bannerArr" :key="i">
				<view class="swiper-item">
					<image class="banner-img" :src="item"></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 搜索栏 -->
		<view class="search">
			<image class="search-icon" src="../static/images/3.png"></image>
			<text class="test">搜美食，菜谱</text>
		</view>
		<!-- 抽屉 -->
		<uni-icons class="drawer-btn" size="35" type="list" color="#fff" @click="showDrawer()"></uni-icons>
		<uni-drawer class="drawer" ref="drawer" mode="left" :width="drawerWidth" :mask-click="true">
			<scroll-view style="height: 100%;" scroll-y="true">
				<view class="logo">
					<image class="shop-logo" src="../static/images/logo.png" mode="widthFix"></image>
				</view>
				<view class="li-box" v-for="(item, i) in list" :key="i" @click="goLink()">
					<uni-icons class="li-icon" size="20" :type="item.icon"></uni-icons>
					<text class="li-text">{{ item.title }}</text>
				</view>
			</scroll-view>
		</uni-drawer>
	</view>
</template>

<script>
export default {
	name: "IndexBanner",

	data() {
		return {
			bannerArr: [
				"../static/images/banner.png",
				"../static/images/goods1.jpg",
				"../static/images/goods2.jpg",
				"../static/images/goods3.jpg",
			], // 轮播数据
			indicatorDots: true, // 小点点
			autoplay: true, // 自动播放
			interval: 5000, // 间隔时间
			duration: 500, // 滚动时长
			drawerWidth: 220, //抽屉宽度
			list: [
				{ title: "公司介绍", img: "../static/images/footer2.png", icon: "home" },
				{ title: "分店风采", img: "../static/images/footer2.png", icon: "shop" },
				{ title: "订单服务", img: "../static/images/footer2.png", icon: "cart" },
				{ title: "形象展示", img: "../static/images/footer2.png", icon: "person" },
				{ title: "服务流程", img: "../static/images/footer2.png", icon: "pengyouquan" },
				{ title: "厨师加盟", img: "../static/images/footer2.png", icon: "personadd" },
				{ title: "服务加盟", img: "../static/images/footer2.png", icon: "info" },
			],
		};
	},

	methods: {
		showDrawer() {
			this.$refs.drawer.open();
			wx.hideTabBar();
		},

		goLink() {
			this.$refs.drawer.close();
			wx.showTabBar();
		},

		showTab(e) {
			if (e.detail.x > this.drawerWidth) {
				wx.showTabBar();
			}
		},
	},
};
</script>

<style>
.index-banner,
.swiper,
.banner-img {
    position: relative;

    width: 100%;
    height: 380rpx;
}

.search {
    display: flex;

    position: absolute;
    bottom: -23px;
    left: 5%;

    border-radius: 23px;
    width: 90%;
    height: 46px;

    font-size: 14px;

    color: #646464;
    background-color: #fff;

    box-shadow: 1px 2px 8px 1px #ccc;

    align-items: center;
    justify-content: center;
}

.search-icon {
    margin-right: 10px;
    width: 15px;
    height: 15px;
}

.drawer-btn {
    position: absolute;
    top: 30rpx;
    left: 30rpx;

    width: 35px;
    height: 35px;
}

.logo {
    display: flex;

    height: 180px;

    background-color: #f6f6f6;

    justify-content: center;
    align-items: center;
}

.shop-logo {
    width: 110px;
}

.li-box {
    height: 60px;

    text-align: center;

    color: #333;
}

.li-box:nth-last-child(1),
.li-box:nth-last-child(2) {
    color: #fd6852;
}

.li-icon {
    margin-right: 10px;
    width: 20px;
}

.li-text {
    line-height: 80px;
    letter-spacing: 1px;
}

</style>
