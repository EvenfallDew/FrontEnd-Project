<template>
	<view class="index-goods">
		<image class="good-title" src="../static/images/10.png" mode="widthFix"></image>

		<view class="goods-box">
			<view class="good" v-for="(item, index) in goodslist">
				<image class="good-img" mode="aspectFill" :src="item.img"></image>
				<view class="good-info">
					<view class="good-name">{{ item.goodsname }}</view>
					<view class="good-price">￥{{ item.price }}/桌</view>
				</view>
			</view>
		</view>

		<view class="more-btn">
			<text>更多餐宴</text>
		</view>
	</view>
</template>

<script>
import jsons from "@/json/static_data.json";

export default {
	name: "IndexGoods",
	data() {
		return {
			goodsList: jsons.goodslist,
		};
	},
};
</script>

<style>
.index-goods {
    padding: 20px 0 5px;
}

.good-title {
    display: block;

    margin: 0 auto;
    width: 60%;
}

.goods-box {
    overflow-x: auto;
    overflow-y: hidden;

    margin: 20px auto;
    padding-left: 20px;

    white-space: nowrap;
}

.good {
    display: inline-block;
    overflow: hidden;

    margin-right: 15px;
    border-radius: 8px;
    width: 180px;

    box-shadow: 1px 1px 8px 1px #ccc;
}

.good-img {
    width: 100%;
    height: 120px;
}

.good-info {
    box-sizing: border-box;
    padding: 8px;
}

.good-name {
    font-size: 14px;
    letter-spacing: 1px;

    color: #333;
}

.good-price {
    font-size: 14px;

    color: #fe6259;
}

.more-btn {
    font-size: 14px;
    text-align: center;
    letter-spacing: 1px;

    color: #646464;
}

</style>
