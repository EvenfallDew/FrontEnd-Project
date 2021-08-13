<template>
	<div class="goods">
		<!-- {{ goodsData }} -->
		goods
	</div>
</template>

<script>
import { getGoods_api } from "@/api/apis";

export default {
	data() {
		return {
			goodsData: [],
		};
	},

	created() {
		this.getGoods();
	},

	methods: {
		// 获取 商品
		async getGoods() {
			let res = await getGoods_api();
			let { goodsList } = res.data;
			this.goodsData = goodsList;
		},
	},
};
</script>

<style lang="less" scoped></style>
