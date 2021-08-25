<template>
	<view class="like">
		<view class="title">
			<view class="title-num">
				<uni-icons type="compose" size="18" color="#000" style="margin-right:5px"></uni-icons>
				已收藏{{ list.length }}个餐宴
			</view>
			<view class="title-btn" @click="clear()">
				<uni-icons type="trash" size="16" color="#646464" style="margin-right:5px"></uni-icons>
				清空
			</view>
		</view>
		<!-- 食物列表 -->
		<view class="foods-list">
			<view class="food-box" v-for="(item, index) in list">
				<view class="food-top">
					<image class="food-top-img" mode="aspectFill" :src="item.img"></image>
					<view class="fire">
						<uni-icons
							type="hand-thumbsup-filled"
							size="16"
							color="#f01"
							style="margin-right:5px"
						></uni-icons>
						{{ item.fire }}
					</view>
				</view>
				<!-- 描述 -->
				<view class="food-info">
					<view class="food-text">
						<view class="food-name">{{ item.title }}</view>
						<view class="food-price">￥{{ item.price }}/桌</view>
					</view>
					<view class="food-collect" @click="del(item.id)">
						<image class="collect-icon" src="../../static/images/footer2.png"></image>
						<view class="collect-text">取消收藏</view>
					</view>
				</view>
			</view>
			<!-- 底线 -->
			<view class="bottom-line" v-if="!isShow">-------------我是有底线的-------------</view>
		</view>
		<!-- 无商品 -->
		<view v-if="list.length == 0" class="nomore">
			<image class="nomore-img" src="../../static/images/nomore2.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
import jsons from "@/json/static_data.json";

export default {
	data() {
		return {
			isShow: true,
			list: jsons.likeList,
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
		// 删除
		del(id) {
			this.list.forEach((item, i) => {
				if (id == item.id) {
					this.list.splice(i, 1);
				}
			});
		},
		// 滚动底部加载新的数据
		onReachBottom() {
			// 滚动到底部 发请求
			let newArr = jsons.likeList1;

			if (this.isShow) {
				uni.showLoading({
					title: "加载中",
				});
				setTimeout(function() {
					uni.hideLoading();
				}, 1500);
				this.list = this.list.concat(newArr);
			} else {
				uni.showToast({
					title: "没有了嗷",
					duration: 1500,
					icon: "none",
					mask: true,
				});
			}

			// 判断
			if (newArr.length == this.list.length) {
				this.isShow = true;
			} else {
				this.isShow = false;
			}
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

.food-top {
    position: relative;
}

.fire {
    position: absolute;
    right: 15px;
    bottom: 15px;

    border-radius: 7px;
    width: 80px;
    height: 30px;

    line-height: 30px;
    text-align: center;

    color: #fff;
    background-color: rgba(0, 0, 0, .6);
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

.nomore {
    margin-top: 50px;
    width: 100%;

    text-align: center;
}

.nomore-img {
    width: 60%;
}

.bottom-line {
    font-size: 14px;
    text-align: center;

    color: #646464;
}

</style>
