<template>
	<view class="index-nav">
		<view class="navs">
			<view class="nav-item" v-for="(item, i) in navArr" :key="i" @click="go(item.id)">
				<image class="nav-icon" :src="item.img" mode=""></image>
				<view class="nav-text">
					{{ item.text }}
				</view>
			</view>
		</view>

		<navigator url="" class="marry-box">
			<image class="marry-img" src="../static/images/8.png" mode="widthFix"></image>
		</navigator>
	</view>
</template>

<script>
import jsons from "@/json/goods.json";

export default {
	name: "IndexNav",
	data() {
		return {
			navArr: jsons.navlist,
		};
	},

	methods: {
		go(i) {
			console.log(1);
			if (i == 4) {
				uni.navigateTo({
					url: "/pages/cart/cart",
				});
			}
		},
	},
};
</script>

<style>
.index-nav {
    padding-top: 20px;
}

.navs {
    display: flex;

    width: 100%;
    height: 150px;

    align-items: center;
    justify-content: space-around;
}

.nav-item {
    text-align: center;
}

.nav-icon {
    width: 60px;
    height: 60px;
}

.nav-text {
    font-size: 14px;

    color: #333;
}

.marry-box,
.marry-img {
    margin: auto;
    margin-top: -7px;
    width: 675rpx;
    height: 300rpx;
}

</style>
