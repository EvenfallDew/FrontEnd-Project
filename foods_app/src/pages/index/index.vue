<template>
	<view class="content">
		<view>
			<text class="title">{{ title }}</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: "Hello",
		};
	},
	onLoad() {},
	methods: {},
};
</script>

<style>
.content {
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo {
    margin: 200rpx auto 50rpx auto;
    width: 200rpx;
    height: 200rpx;
}

.text-area {
    display: flex;

    justify-content: center;
}

.title {
    font-size: 36rpx;

    color: #8f8f94;
}

</style>
