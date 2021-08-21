<template>
	<view class="index-banner">
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
					<image class="banner-img" :src="item.ad_pic"></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 搜索栏 -->
		<view class="search">
			<image class="search-icon" src="../static/images/3.png"></image>
			<text>搜美食，菜谱</text>
		</view>
		<!-- 抽屉 -->
		<view class="drawer-btn" @click="showDrawer()"></view>
		<uni-drawer class="drawer" ref="drawer" mode="left" :width="drawerWidth" :mask-click="true">
			<scroll-view style="height: 100%;" scroll-y="true">
				<view class="">
					logo
				</view>
				<view v-for="item in 7" :key="item">icon,text {{ item }}</view>
			</scroll-view>
		</uni-drawer>
	</view>
</template>

<script>
import { baseUrl } from "@/utils/utils";
import uniDrawer from "@dcloudio/uni-ui/lib/uni-drawer/uni-drawer.vue";

export default {
	name: "IndexBanner",

	components: { uniDrawer },

	data() {
		return {
			bannerArr: [], // 轮播数据
			indicatorDots: true, // 小点点
			autoplay: true, // 自动播放
			interval: 5000, // 间隔时间
			duration: 500, // 滚动时长
			drawerWidth: 220,
		};
	},

	created() {
		uni.request({
			url: baseUrl + "/index/home_banner",
			method: "POST",
			success: (res) => {
				let { data, status } = res.data;
				if (status == 200) {
					this.bannerArr = data;
				}
			},
		});
	},
	watch: {
		drawerWidth(newVal, oldVal) {
			console.log(newVal, oldVal);
			if (newVal == 300) {
				wx.hideTabBar();
			} else {
				wx.hideTabBar();
			}
		},
	},
	methods: {
		showDrawer() {
			this.$refs.drawer.open();
			console.log(this.$refs.drawer);
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

    width: 60rpx;
    height: 60rpx;

    background-color: blue;
}

.drawer {
    z-index: 9999999;
}

.drawer2 {
    z-index: 9999999;
}

</style>
