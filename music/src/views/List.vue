<template>
	<div class="list">
		<h2>播放列表</h2>
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
		async getList() {
			let res = await search_api({
				keywords: this.musicName,
			});
			let data = res.data;

			this.musicList = data.result.songs;
		},

		getId(music) {
			local.set("id", music.id);
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
