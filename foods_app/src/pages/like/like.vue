<template>
	<view class="like">
		<view class="title">
			<view class="title-num">
				<image class="clear-img" src="../../static/images/icon_cha.png">已收藏{{ list.length }}个餐宴</image>
			</view>
			<view class="title-btn" @click="clear()">
				<image class="clear-img" src="../../static/images/icon_clear.png">清空</image>
			</view>
		</view>

		<view class="foods-like">
			<view class="food-box" v-for="(item, index) in list">
				<view class="food-top">
					<image class="food-top-img" mode="aspectFill" :src="item.img"></image>
				</view>
				<!-- 描述 -->
				<view class="food-info">
					<view class="food-text">
						<view class="food-name">{{ item.title }}</view>
						<view class="food-price">￥{{ item.price }}/桌</view>
					</view>
					<view class="food-collect">
						<image class="collect-icon" src="../../static/images/footer2.png"></image>
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
		// 清空
		clear() {
			uni.showModal({
				title: "清空收藏",
				content: "清空后将无法恢复",
				success: (res) => {
					if (res.confirm) {
						this.list = [];
					} else if (res.cancel) {
					}
				},
			});
		},
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

.clear-img {
    margin-right: 5px;
    width: 16px;
    height: 16px;

    vertical-align: middle;
}

.food-box {
    overflow: hidden;

    margin: 0 auto 20px;
    border-radius: 10px;
    width: 90%;

    box-shadow: 1px 1px 8px 1px #ccc;
}

.food-top,
.food-top-img {
    width: 100%;
    height: 425rpx;

    background-color: #999;
}

.food-info {
    display: flex;

    padding: 10px;
    height: 52px;

    justify-content: space-between;
    align-items: center;
}

.food-text {
    display: flex;

    flex-direction: column;
    justify-content: center;
}

.food-name {
    font-size: 20px;
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
    width: 30px;
    height: 30px;
}

.collect-text {
    font-size: 16px;
}

</style>
