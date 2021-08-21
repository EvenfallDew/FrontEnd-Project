<template>
	<view>
		<!-- 1. 轮播 -->
		<IndexBanner />
		<!-- 2. nav导航 -->
		<IndexNav />
		<view class="hr"></view>
		<!-- 3. 优选名厨 -->
		<IndexCooks />
		<view class="hr"></view>
		<!-- 4. 优选餐宴 -->
		<IndexGoods />
		<view class="hr"></view>
		<!-- 5. tag标签 -->
		<IndexTags />
	</view>
</template>

<script>
import IndexBanner from "@/components/IndexBanner.vue";
import IndexNav from "@/components/IndexNav.vue";
import IndexCooks from "@/components/IndexCooks.vue";
import IndexGoods from "@/components/IndexGoods.vue";
import IndexTags from "@/components/IndexTags.vue";

export default {
	components: {
		IndexBanner,
		IndexNav,
		IndexCooks,
		IndexGoods,
		IndexTags,
	},

	data() {
		return {};
	},

	onLoad() {},

	methods: {},
};
</script>

<style>
.hr {
    margin-top: 10px;
    width: 100%;
    height: 10px;

    background: #eee;
}

</style>
