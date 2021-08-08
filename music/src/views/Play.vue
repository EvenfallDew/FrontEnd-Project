<template>
	<div class="play">
		<h2>
			<button type="button" @click="goList()">返回结果</button>
		</h2>
		<hr />
		<main>
			<div class="play-box">
				<img ref="playBtn" class="play-btn play-rotate" :src="pic" alt="album_pic" @click="play()" />
				<audio ref="song" :src="src" controls></audio>
			</div>
		</main>
		<div>
			<h3>热门留言</h3>
			<table>
				<tr v-for="(item, index) in commentList" :key="index">
					<td>
						<img class="avatar" :src="item.user.avatarUrl" alt="ava" />
					</td>
					<td>{{ item.user.nickname }}</td>
					<td class="content">{{ item.content }}</td>
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

let main = document.querySelector("main");

export default {
	data() {
		return {
			musicId: "",
			src: "",
			commentList: [],
			pic: "",
			isPlay: false,
			timer: null,
		};
	},

	created() {
		// 调用函数
		this.musicId = local.get("id");
		this.pic = local.get("img");
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

		// 返回搜索
		goList() {
			this.$router.push("/list");
		},

		// 播放
		play() {
			if (this.isPlay == false) {
				this.toPlay();
			} else {
				this.toPause();
			}
			this.isPlay = !this.isPlay;
		},

		toPlay() {
			this.$refs.song.play();
			this.$refs.playBtn.style.animationPlayState = "running";
		},

		toPause() {
			this.$refs.song.pause();
			this.$refs.playBtn.style.animationPlayState = "paused";
			clearInterval(this.timer);
		},
	},
};
</script>
<style lang="less" scoped src="../assets/styles/play.less"></style>

<style lang="less" scoped>
.play {
    color: #fff;
    background-color: #212124;

    h2 {
        margin: 0;
        padding: 0;
    }

    hr {
        width: 1000px;
    }

    h2,
    h3 {
        margin: 0 auto;
        width: 1000px;
    }

    table {
        margin: 0 auto;
        width: 1000px;

        tr {
            td {
                border-collapse: collapse;
            }
        }
    }

    .avatar {
        width: 50px;
        height: 50px;
    }

    .content {
        font-size: 14px;
    }

    .time {
        width: 200px;

        font-size: 14px;
    }

    button {
        border: none;
        width: 100px;
        height: 40px;

        color: #fff;
        background-color: #df0036;

        outline: none;

        cursor: pointer;
    }

    button:hover {
        background-color: #930702;
    }
}

</style>
