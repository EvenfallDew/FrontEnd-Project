<template>
	<view class="index-goods">
		<image class="good-title" src="../static/images/10.png" mode="widthFix"></image>

		<view class="goods-box"></view>

		<view class="more-btn">
			<text>更多名厨</text>
		</view>
	</view>
</template>

<script>
export default {
	name: "IndexGoods",
	data() {
		return {};
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
    width: 70%;
}

.goods-box {
    display: flex;

    margin: 20px auto 5px;
    width: 90%;

    justify-content: space-between;
}

.more-btn {
    font-size: 14px;
    text-align: center;

    color: #646464;
}

</style>
