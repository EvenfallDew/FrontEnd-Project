<template>
	<view class="order">
		<view class="title">
			<view>
				<uni-icons type="map" size="18" color="#333"></uni-icons>
				<text class="title-num">已有{{ list.length }}个行程</text>
			</view>
			<view>
				<uni-icons type="info" size="16" color="#bbb"></uni-icons>
				<text class="title-history">历史</text>
			</view>
		</view>

		<view class="orders-list">
			<view class="order-box" v-for="(item, index) in list">
				<!-- 时间地址 -->
				<view class="order-title">
					<view>
						<uni-icons type="flag" size="16" color="#646464"></uni-icons>
						<text class="title-time">{{ item.time }}</text>
					</view>
					<view>
						<uni-icons type="map-pin-ellipse" size="16" color="#646464"></uni-icons>
						<text class="title-address">{{ item.address }}</text>
					</view>
				</view>
				<!-- 图片 -->
				<view class="order-top">
					<image class="order-top-img" mode="aspectFill" :src="item.img"></image>
				</view>
				<!-- 描述 -->
				<view class="order-info">
					<!-- 价格 -->
					<view class="order-text">
						<view class="order-name">{{ item.title }}</view>
						<view class="order-price">￥{{ item.price }}/桌</view>
					</view>
					<!-- 操作 -->
					<view class="order-collect">
						<view style="margin-right:20px" @click="call(item.tel, item.cook)">
							<uni-icons type="phone" size="20" color="#f5b658"></uni-icons>
							<view class="collect-phone">电话</view>
						</view>
						<view>
							<uni-icons type="mail-open" size="20" color="#f5b658"></uni-icons>
							<view class="collect-serve">服务</view>
						</view>
					</view>
				</view>
				<!-- 账单 -->
				<view class="order-mine">
					<button class="order-btn" type="button" @click="myOrder()">我的账单</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import jsons from "@/json/static_data.json";

export default {
	data() {
		return {
			list: jsons.orderList,
		};
	},
	methods: {
		// 打电话
		call(tel, cook) {
			uni.showModal({
				title: cook,
				content: tel + "",
				confirmText: "拨打电话",
				confirmColor: "#f01",
				success: function(res) {
					if (res.confirm) {
						console.log("用户点击拨打电话");
						uni.makePhoneCall({
							phoneNumber: tel + "",
						});
					} else if (res.cancel) {
					}
				},
			});
		},
		// 查看账单
		myOrder() {},
	},
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
    margin-left: 10px;

    font-size: 18px;
    letter-spacing: 1px;

    color: #333;
}

.title-history {
    margin-left: 8px;

    color: #bbb;
}

.order-title {
    padding: 10px;
}

.title-time {
    margin-left: 8px;

    line-height: 1.5em;

    color: #333;
}

.title-address {
    margin-left: 8px;

    line-height: 1.5em;

    color: #333;
}

.order-box {
    overflow: hidden;

    margin: 0 auto 20px;
    border-radius: 10px;
    width: 90%;

    box-shadow: 1px 1px 8px 1px #ccc;
}

.order-top,
.order-top-img {
    width: 100%;
    height: 425rpx;

    background-color: #999;
}

.order-info {
    display: flex;

    padding: 10px;
    height: 52px;

    justify-content: space-between;
    align-items: center;
}

.order-text {
    display: flex;

    flex-direction: column;
    justify-content: center;
}

.order-name {
    font-size: 20px;
}

.order-price {
    font-size: 18px;

    color: #ff6854;
}

.order-collect {
    display: flex;

    font-size: 18px;
    text-align: center;

    color: #f5b658;

    align-items: center;
    justify-content: center;
}

.order-mine {
    padding: 0 10px 10px;
}

.order-btn {
    border: none;
    width: 100%;
    height: 40px;

    font: normal 14px/40px "微软雅黑";
    letter-spacing: 2px;

    color: #fff;
    background-color: #ff6855;

    outline: none;
}

</style>
