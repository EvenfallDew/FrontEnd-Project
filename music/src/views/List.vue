<template>
	<div class="list">
		<h2>播放列表</h2>
		<h3 @click="goSearch()">返回搜索</h3>
		<table>
			<thead>
				<tr>
					<th>序号</th>
					<th>歌曲名</th>
					<th>歌手</th>
					<th>专辑</th>
				</tr>
			</thead>

			<tbody>
				<tr v-for="(item, index) in musicList" :key="index" @click="getId(item)">
					<td class="num">{{ index + 1 }}</td>
					<td>{{ item.name }}</td>
					<td>{{ item.artists[0].name }}</td>
					<td>{{ item.album.name }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { search_api } from "@/api/music";
import local from "@/utils/local";

export default {
	data() {
		return {
			musicName: "",
			musicList: {},
		};
	},
	created() {
		// 调用函数
		this.musicName = local.get("music");
		this.getList();
	},
	methods: {
		// 获取列表
		async getList() {
			this.musicName = local.get("music");
			let res = await search_api({
				keywords: this.musicName,
			});
			let data = res.data;

			this.musicList = data.result.songs;
		},

		// 获取并跳转播放
		getId(item) {
			local.set("id", item.id);
			this.$router.push("/play");
		},
		// 返回搜索
		goSearch() {
			this.$router.push("/search");
		},
	},
};
</script>

<style lang="less" scoped>
.list {
	table {
		width: 1000px;
		margin: 0 auto;
	}
	thead {
		text-align: left;
	}
	tbody {
		tr {
			height: 30px;
			.num {
				width: 50px;
			}
		}
	}
}
</style>
