<template>
	<div class="search">
		<h2>请输入您要搜索的歌曲</h2>
		<form>
			<p><input type="text" ref="inp" v-model="inp" /></p>
			<p><button type="button" @click="searchMusic()">搜索</button></p>
		</form>
	</div>
</template>

<script>
import { search_api } from "@/api/music";
import local from "@/utils/local";

export default {
	data() {
		return {
			inp: "",
		};
	},

	methods: {
		searchMusic() {
			console.log(this.inp);
			local.set("music", this.inp);
			this.$router.push("/list");
		},
	},
};
</script>

<style lang="less" scoped>
.search {
	text-align: center;
}
</style>
