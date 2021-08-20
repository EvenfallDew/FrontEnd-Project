<template>
	<div id="app">
		<van-skeleton title avatar :row="3" :loading="loading">
			<div class="haha">实际内容</div>
		</van-skeleton>

		<van-button plain type="primary" @click="change()">朴素按钮</van-button>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loading: true,
		};
	},
	methods: {
		change() {
			this.loading = !this.loading;
		},
	},
};
</script>

<style lang="less">
#app {
	.haha {
		background-color: red;
	}
	@media screen and (max-width: 768px) {
		.haha {
			background-color: green;
		}
	}
}
</style>
