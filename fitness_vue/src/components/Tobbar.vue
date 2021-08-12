<template>
	<div class="tobbar">
		<van-tabbar route v-model="active" active-color="#29a1f7" inactive-color="#000">
			<van-tabbar-item replace to="/home" icon="home-o">标签</van-tabbar-item>
			<van-tabbar-item replace to="/search" icon="search">标签</van-tabbar-item>
			<van-tabbar-item replace to="/friends" icon="friends-o">标签</van-tabbar-item>
			<van-tabbar-item replace to="/setting" icon="contact">标签</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.tobbar {
	background-color: aquamarine;
}
</style>
