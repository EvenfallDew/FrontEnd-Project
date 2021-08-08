<template>
	<div class="app">
		<TopHeader></TopHeader>
		<Search></Search>
		<!-- <List></List>
		<Play></Play> -->

		<!-- 路由出口 -->
		<router-view></router-view>
	</div>
</template>
<script>
import TopHeader from "@/components/TopHeader.vue";
import Search from "@/views/Search.vue";
import List from "@/views/List.vue";
import Play from "@/views/Play.vue";

export default {
	components: {
		TopHeader,
		Search,
		List,
		Play,
	},
};
</script>
<style lang="less"></style>
