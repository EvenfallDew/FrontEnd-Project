<template>
	<div class="play">
		<h2>播放页面</h2>
		<h3 @click="goList()">返回结果</h3>
		<main>
			<div class="play-box" @click="play()">
				<img id="playBtn" class="play-btn play-rotate" src="../assets/images/1.jpg" alt="album_pic" />
				<audio id="song" :src="src" controls></audio>
			</div>
			<!-- 进度条 -->
			<div id="progressBar" class="progress-bar"></div>
			<!-- 时长 -->
			<div class="play-time">
				<span id="musicCurrent">0:00</span>
				/
				<span id="musicDuration">0:00</span>
			</div>
		</main>
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
let playBtn = document.querySelector("#playBtn");
let song = document.querySelector("#song");
let progressBar = document.querySelector("#progressBar");
let musicDuration = document.querySelector("#musicDuration");
let musicCurrent = document.querySelector("#musicCurrent");
let main = document.querySelector("main");

export default {
	data() {
		return {
			musicId: "",
			src: "",
			commentList: [],

			isPlay: false,
			timer: null,
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
		// 返回搜索
		goList() {
			this.$router.push("/list");
		},

		play() {
			// 播放
			if (this.isPlay == false) {
				this.toPlay();
				musicDuration.innerHTML = format(song.duration);
			} else {
				this.toPause();
			}
			this.isPlay = !isPlay;
		},
		toPlay() {
			song.play();
			playBtn.style.animationPlayState = "running";
			progress();
		},

		toPause() {
			song.pause();
			playBtn.style.animationPlayState = "paused";
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

    table {
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

    .time {
        width: 200px;
    }
}

</style>
