<template>
	<div class="error">
		<!--end row-->
		<main>
			<div class="text">
				<h2>ERROR</h2>
				<h3>
					未找到该页面
					<br />
					您可以选择
				</h3>
				<p>
					<button @click="$router.go(-1)">
						返回上一页
					</button>
					<button @click="$router.push('/layout')">
						返回首页
					</button>
				</p>
			</div>
			<img class="pic" src="../../../assets/images/error.png" alt="" />
		</main>
	</div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped src="../../../assets/styles/error.less"></style>
