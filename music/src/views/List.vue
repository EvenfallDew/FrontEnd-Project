<template>
	<div class="list">
		<h2>
			<button type="button" @click="goSearch()">返回搜索</button>
			<button type="button" @click="goPlay()">上次播放</button>
		</h2>
		<hr />
		<h3>搜索结果:</h3>
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
					<td class="names">{{ item.name }}</td>
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
			// this.musicName = local.get("music");
			let res = await search_api({
				keywords: this.musicName,
			});
			let data = res.data;
			setTimeout(() => {
				this.musicList = data.result.songs;
			}, 1000);
		},

		// 获取并跳转播放
		getId(item) {
			local.set("id", item.id);
			local.set("img", item.album.artist.img1v1Url);
			this.$router.push("/play");
		},
		// 返回搜索
		goSearch() {
			this.$router.push("/search");
		},
		goPlay() {
			this.$router.push("/play");
		},
	},
};
</script>

<style lang="less" scoped>
.list {
    color: #fff;
    background-color: #212124;

    h2 {
        display: flex;

        margin: 0;
        padding: 0;

        justify-content: space-between;
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

    h2,
    h3 {
        margin: 0 auto;
        margin-bottom: 20px;
        width: 1000px;
    }

    hr {
        width: 1000px;
    }

    table {
        margin: 0 auto;
        width: 1000px;
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

            .names {
                cursor: pointer;
            }
        }

        tr:hover {
            background-color: #404040;
        }
    }
}

</style>
