<template>
	<div class="search">
		<h2>请输入您要搜索的歌曲</h2>
		<form>
			<p><input type="text" v-model="inp" /></p>
			<p><button type="button" @click="searchMusic()" @keyup="searchEnter()">搜索</button></p>
			<p><button class="prev" type="button" @click="goList()">历史</button></p>
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
	created() {
		this.searchEnter();
	},

	methods: {
		searchMusic() {
			if (this.inp.trim() == "") {
				alert("不能为空");
				return;
			} else {
				local.set("music", this.inp);
				this.$router.push("/list");
			}
		},

		// Enter搜索
		searchEnter() {
			document.onkeydown = (e) => {
				if (e.key == "Enter") {
					this.searchMusic();
				}
			};
		},

		goList() {
			this.$router.push("/list");
		},
	},
};
</script>

<style lang="less" scoped>
.search {
    text-align: center;

    color: #fff;
    background-color: #212124;

    h2 {
        margin: 0;
        padding: 0;
    }

    h2,
    h3 {
        margin: 0 auto;
        margin-bottom: 20px;
        width: 1000px;

        cursor: pointer;
    }

    input,
    button {
        border: none;
        width: 450px;
        height: 40px;

        outline: none;
    }

    button {
        width: 200px;
        height: 40px;

        color: #fff;
        background-color: #df0036;

        cursor: pointer;
    }

    .prev {
        background-color: #eb5a7e;
    }

    button:hover {
        background-color: #930702;
    }
}

</style>
