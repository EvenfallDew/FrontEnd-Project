<template>
	<view class="index-cooks">
		<image class="cook-title" src="../static/images/9.png" mode="widthFix"></image>

		<view class="cooks-box">
			<view class="cook" v-for="(item, index) in list">
				<image class="cook-img" mode="aspectFill" :src="item.img"></image>
				<text class="cook-name">{{ item.name }}</text>
				<view class="star">
					<uni-rate :size="14" :touchable="false" :value="item.star" />
				</view>
			</view>
		</view>

		<view class="more-btn">
			<text>更多名厨</text>
		</view>
	</view>
</template>

<script>
import jsons from "@/json/static_data.json";

export default {
	name: "IndexCooks",

	data() {
		return {
			list: jsons.cookList,
		};
	},
	methods: {},
};
</script>

<style>
.index-cooks {
    padding: 20px 0 5px;
}

.cook-title {
    display: block;

    margin: 0 auto;
    width: 60%;
}

.cooks-box {
    display: flex;

    margin: 20px auto;
    width: 90%;

    justify-content: space-between;
}

.cook {
    display: flex;

    border-radius: 8px;
    width: 30%;
    height: 120px;

    box-shadow: 1px 1px 8px 1px #ccc;

    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.cook-img {
    display: block;

    border-radius: 50%;
    width: 65px;
    height: 65px;
}

.cook-name {
    display: block;

    font-size: 15px;

    color: #333;
}

.more-btn {
    font-size: 14px;
    text-align: center;
    letter-spacing: 1px;

    color: #646464;
}

</style>
