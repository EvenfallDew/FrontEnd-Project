<template>
	<view class="like">
		<view class="title">
			<text class="title-num">已收藏XX个餐宴</text>
			<text class="title-btn">清空</text>
		</view>

		<view class="foods-like">
			<view class="food-box">
				<view class="food-top">
					<image class="food-top-img"></image>
				</view>
				<!-- 描述 -->
				<view class="food-info">
					<view>
						<view class="food-name">name</view>
						<view class="food-price">￥money/桌</view>
					</view>
					<view class="food-collect">
						<view class="collect-icon">icon</view>
						<view class="collect-text">取消收藏</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {},
};
</script>

<style>
.title {
    display: flex;

    margin: 0 auto;
    width: 90%;
    height: 100rpx;

    justify-content: space-between;
    align-items: center;
}

.title-num {
    font-size: 18px;
    letter-spacing: 1px;

    color: #333;
}

.title-btn {
    color: #bbb;
}

.food-box {
    overflow: hidden;

    margin: 0 auto;
    border-radius: 10px;
    width: 90%;

    box-shadow: 1px 1px 8px 1px #ccc;
}

.food-top {
    height: 425rpx;

    background-color: #999;
}

.food-info {
    display: flex;

    padding: 15px;

    justify-content: space-between;
    align-items: center;
}

.food-name {
    font-size: 26px;
    line-height: 1em;
}

.food-price {
    font-size: 18px;

    color: #ff6854;
}

.food-collect {
    display: flex;

    color: #bbb;

    align-items: center;
    flex-direction: column;
    justify-content: center;
}

.collect-icon {
    font-size: 26px;
    line-height: 1em;
}

.collect-text {
    font-size: 18px;
}

</style>
