<template>
	<div class="play">
		<h2>播放页面</h2>
		<div>
			<audio :src="src" controls></audio>
		</div>

		<div>
			<h2>热门留言</h2>
			<table>
				<tr v-for="(item, index) in commentList" :key="index">
					<td>
						<img class="avatar" :src="item.user.avatarUrl" alt="ava" />
					</td>
					<td>{{ item.user.nickname }}</td>
					<td>{{ item.content }}</td>
					<td class="time">{{ item.time | formatTime() }}</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
import { play_api, comment_api } from "@/api/music";
import local from "@/utils/local";
import moment from "moment";

export default {
	data() {
		return {
			musicId: "",
			src: "",
			commentList: [],
		};
	},

	created() {
		// 调用函数
		this.musicId = local.get("id");
		this.getList();
		this.getComment();
	},

	filters: {
		// 时间转换
		formatTime(item) {
			return moment(item).format("YYYY-MM-DD HH:mm:ss");
		},
	},

	methods: {
		// 播放
		async getList() {
			let res = await play_api({
				id: this.musicId,
			});
			let data = res.data.data;
			this.src = data[0].url;
		},

		// 评论
		async getComment() {
			let res = await comment_api({
				type: 0,
				id: this.musicId,
			});
			let data = res.data;

			this.commentList = data.hotComments;
		},
	},
};
</script>

<style lang="less" scoped>
.play {
	table {
		width: 1000px;
		tr {
			border: 1px solid red;
			td {
				border-collapse: collapse;
				border: 1px solid black;
			}
		}
	}
	.avatar {
		width: 50px;
		height: 50px;
	}

	.time {
		width: 200px;
	}
}
</style>
