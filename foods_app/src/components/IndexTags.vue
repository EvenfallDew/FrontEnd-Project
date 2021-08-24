<template>
	<view class="index-tags">
		<view class="tag-boxes">
			<view class="tag-box">
				<image class="tag-img" src="../static/images/13.png" mode="widthFix"></image>
				<view class="tag-text">
					<view class="tag-name">信用保障</view>
					<view class="tag-info">服务到位，时间准时</view>
				</view>
			</view>
			<view class="tag-box">
				<image class="tag-img" src="../static/images/14.png" mode="widthFix"></image>
				<view class="tag-text">
					<view class="tag-name">信用保障</view>
					<view class="tag-info">服务到位，时间准时</view>
				</view>
			</view>
		</view>

		<view class="tag-boxes">
			<view class="tag-box">
				<image class="tag-img" src="../static/images/15.png" mode="widthFix"></image>
				<view class="tag-text">
					<view class="tag-name">信用保障</view>
					<view class="tag-info">服务到位，时间准时</view>
				</view>
			</view>
			<view class="tag-box">
				<image class="tag-img" src="../static/images/16.png" mode="widthFix"></image>
				<view class="tag-text">
					<view class="tag-name">信用保障</view>
					<view class="tag-info">服务到位，时间准时</view>
				</view>
			</view>
		</view>

		<view class="tag-foot">
			<image class="tag-foot-img" src="../static/images/gg.jpg" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
export default {
	name: "IndexTags",
	data() {
		return {};
	},
};
</script>

<style>
.index-tags {
    background-color: #fff;
}

.tag-boxes {
    display: flex;

    justify-content: space-between;
}

.tag-box {
    display: flex;

    box-sizing: border-box;
    padding: 15px;
    width: 50%;

    align-items: center;
    justify-content: space-between;
}

.tag-box:nth-child(1),
.tag-box:nth-child(3) {
    border-right: 1px solid #ddd;
}

.tag-box {
    border-bottom: 1px solid #ddd;
}

.tag-img {
    margin-right: 10px;
    width: 45px;
}

.tag-name {
    font-size: 15px;
    font-weight: bold;

    color: #333;
}

.tag-info {
    overflow: hidden;

    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;

    color: #646464;
}

.tag-foot,
.tag-foot-img {
    margin-top: 10px;
    width: 100%;
}

</style>
