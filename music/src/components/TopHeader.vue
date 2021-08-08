<template>
	<div class="top-header">
		<header>
			<h2 class="find" @click="goSearch()">发现音乐</h2>
		</header>
		<nav>
			<img src="../assets/images/slide.jpg" alt="pic" />
		</nav>
	</div>
</template>

<script>
export default {
	methods: {
		goSearch() {
			this.$router.push("/search");
		},
	},
};
</script>

<style lang="less" scoped>
.top-header {
    header {
        height: 50px;

        line-height: 50px;
        text-align: center;

        color: #fff;
        background-color: #0f0f0f;

        .find {
            margin: 0;
            padding: 0;

            cursor: pointer;
        }
    }

    nav {
        overflow: hidden;

        height: 400px;

        text-align: center;

        background-color: #212124;

        img {
            width: 1000px;
        }
    }
}

</style>
