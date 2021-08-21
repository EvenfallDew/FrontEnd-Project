<template>
	<view class="index-cooks">
		<image class="cook-title" src="../static/images/9.png" mode="widthFix"></image>

		<view class="cooks-box">
			<view class="cook">
				<image class="cook-img" src="../static/images/man1.jpg" mode="widthFix"></image>
				<text class="cook-name">张小美</text>
				<uni-rate v-model="value" @change="onChange" />
			</view>
		</view>

		<view class="more-btn">
			<text>更多名厨</text>
		</view>
	</view>
</template>

<script>
import uniRate from "@dcloudio/uni-ui/lib/uni-rate/uni-rate.vue";

export default {
	name: "IndexCooks",

	components: { uniRate },

	data() {
		return {
			value: 3,
		};
	},
	methods: {
		onChange() {
			console.log(233);
		},
	},
};
</script>

<style>
.index-cooks {
    padding: 20px 0 5px;
}

.cook-title {
    display: block;

    margin: 0 auto;
    width: 70%;
}

.cooks-box {
    display: flex;

    margin: 20px auto;
    width: 90%;

    justify-content: space-between;
}

.cook {
    display: block;
}

.cook-img {
    display: block;

    width: 50px;
}

.cook-name {
    display: block;
}

.more-btn {
    font-size: 14px;
    text-align: center;

    color: #646464;
}

</style>
