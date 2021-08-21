<template>
	<view class="index-tags">
		<view class="tag-box">
			<image class="tag-img" src="../static/images/13.png" mode="widthFix"></image>
			<view class="tag-text">
				<view class="tag-name">信用</view>
				<view class="tag-info">示例文字示例文字示例文字示例文字</view>
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
.tag-box {
    display: flex;

    width: 50%;

    align-items: center;
    justify-content: space-between;
}

.tag-img {
    width: 80px;
}

.tag-foot,
.tag-foot-img {
    width: 100%;
}

</style>
