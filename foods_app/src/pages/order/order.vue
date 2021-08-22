<template>
	<view class="order">
		<view class="title">
			<view class="title-num">
				<image class="history-img" src="../../static/images/icon_cha.png">已有{{ list.length }}个行程</image>
			</view>
			<view class="title-btn">
				<image class="history-img" src="../../static/images/icon_clear.png">历史</image>
			</view>
		</view>

		<view class="orders-list">
			<view class="order-box" v-for="(item, index) in list">
				<!-- 时间 -->
				<view>
					<view class="title-num">
						<image class="history-img" src="../../static/images/icon_cha.png">
							已有{{ list.length }}个行程
						</image>
					</view>
					<view class="title-btn">
						<image class="history-img" src="../../static/images/icon_clear.png">历史</image>
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
						<image class="collect-icon" src="../../static/images/footer2.png"></image>
						<view class="collect-text">取消收藏</view>
					</view>
				</view>
				<!-- 账单 -->
				<view class="order-mine">
					<button class="order-btn" type="button" @click="myOrder()">爷的账单</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{ id: 1, img: "../../static/images/goods1.jpg", title: "麻辣小龙虾", fire: "99+", price: "99" },
				{ id: 2, img: "../../static/images/goods2.jpg", title: "蒜蓉小龙虾", fire: "99+", price: "100" },
				{ id: 3, img: "../../static/images/goods3.jpg", title: "油焖大闸蟹", fire: "99+", price: "150" },
				{ id: 4, img: "../../static/images/goods1.jpg", title: "肉蛋充饥", fire: "99+", price: "30" },
				{ id: 5, img: "../../static/images/goods2.jpg", title: "清蒸小龙虾", fire: "99+", price: "98" },
			],
		};
	},
	methods: {
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
    font-size: 18px;
    letter-spacing: 1px;

    color: #333;
}

.title-btn {
    color: #bbb;
}

.history-img {
    margin-right: 5px;
    width: 16px;
    height: 16px;

    vertical-align: middle;
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

    color: #bbb;

    align-items: center;
    flex-direction: column;
    justify-content: center;
}

.collect-icon {
    width: 30px;
    height: 30px;
}

.collect-text {
    font-size: 16px;
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
