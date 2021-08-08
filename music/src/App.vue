<template>
	<div class="app">
		<TopHeader></TopHeader>
		<!-- 路由出口 -->
		<router-view></router-view>
	</div>
</template>
<script>
import TopHeader from "@/components/TopHeader.vue";

// import Search from "@/views/Search.vue";
// import List from "@/views/List.vue";
// import Play from "@/views/Play.vue";

export default {
	components: {
		TopHeader,
		// Search,
		// List,
		// Play,
	},
};
</script>
<style lang="less">
.app {
    background-color: #212124;
}

</style>
