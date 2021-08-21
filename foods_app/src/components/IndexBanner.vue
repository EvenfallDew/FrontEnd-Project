<template>
	<view class="index-banner">
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

		<view class="search">
			<image class="search-icon" src="../static/images/3.png"></image>
			<text>搜美食，菜谱</text>
		</view>
	</view>
</template>

<script>
import { baseUrl } from "@/utils/utils";

export default {
	name: "IndexBanner",
	data() {
		return {
			bannerArr: [], // 轮播数据
			indicatorDots: true, // 小点点
			autoplay: true, // 自动播放
			interval: 5000, // 间隔时间
			duration: 500, // 滚动时长
		};
	},
	// 使用vue的生命周期
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

    box-shadow: 1px 4px 8px 1px #ccc;

    align-items: center;
    justify-content: center;
}

.search-icon {
    margin-right: 10px;
    width: 15px;
    height: 15px;
}

</style>
