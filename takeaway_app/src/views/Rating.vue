<template>
	<div class="rating">
		rating
	</div>
</template>

<script>
// 引入API
import { getRating_api } from "@/api/apis";

export default {
	created() {
		this.getRating();
	},

	methods: {
		// 获取 评价
		async getRating() {
			let res = await getRating_api();
			console.log(res);
		},
	},
};
</script>

<style lang="less" scoped></style>
