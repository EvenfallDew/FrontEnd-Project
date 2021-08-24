<template>
	<view class="report">
		<view class="content">
			<view class="top">
				<view class="content-title">投诉类型</view>
				<view class="tag-box">
					<view
						v-for="(item, index) in types"
						:key="index"
						:class="item.ischeck ? 'item cur' : 'item'"
						@click="changeTypes(index)"
					>
						{{ item.title }}
					</view>
				</view>
			</view>

			<view class="center">
				<hr />
				<textarea v-model="textarea" placeholder="请输入投诉内容" />
			</view>

			<view class="upbox">
				<view v-if="isshow">
					<image v-for="(item, i) in pics" :key="i" class="upimg" :src="item" mode=""></image>
				</view>
				<view @click="upimg" class="upimgbox">
					+
					<view>最多只能上传9张</view>
				</view>
			</view>
		</view>
		<button class="submit-btn" @click="submit">
			确认提交
		</button>
	</view>
</template>

<script>
import { baseUrl, imgUrl } from "@/utils/utils";
export default {
	data() {
		return {
			curPage: -1,
			sel: [], // 类型选中后
			textarea: "", // 投诉内容
			types: [
				{ title: "服务问题", ischeck: false },
				{ title: "菜品问题", ischeck: false },
				{ title: "付款问题", ischeck: false },
			],
			pics: [],
			isshow: false,
		};
	},
	methods: {
		// 点击提交
		submit() {
			if (this.sel.length == 0) {
				uni.showToast({
					title: "未选择类型",
					icon: "none",
					duration: 2000,
				});
			} else if (this.textarea == "") {
				uni.showToast({
					title: "请输入内容",
					icon: "none",
					duration: 2000,
				});
			} else if (this.pics == "") {
				uni.showToast({
					title: "请上传图片",
					icon: "none",
					duration: 2000,
				});
			} else {
			}
		},
		// 点击图片上传
		upimg() {
			let _this = this;
			uni.chooseImage({
				count: 9, //默认9 最多可以选中9张
				sizeType: ["original", "compressed"], //可以指定是original原图还是compressed压缩图，默认二者都有
				sourceType: ["album", "camera"], //从album相册选择 camera 选中相机
				success: function(res) {
					var tempFilePaths = res.tempFilePaths; // 提交的临时路径
					// 上传到服务器的 api
					tempFilePaths.forEach((item, i) => {
						uni.uploadFile({
							url: baseUrl + "/plugs/uploads", //仅为示例，非真实的接口地址
							filePath: tempFilePaths[i],
							name: "files",
							formData: {},
							success: (uploadFileRes) => {
								let res = JSON.parse(uploadFileRes.data);
								_this.pics.push(imgUrl + res.data);
							},
						});
					});
					console.log(_this.pics);
					// 显示照片
					_this.isshow = true;
				},
			});
		},
		// 点击事件
		changeTypes(i) {
			this.types[i].ischeck = !this.types[i].ischeck;
			// 选中后
			if (this.types[i].ischeck == true) {
				this.sel.push(i);
			} else {
				this.sel = this.sel.filter((item) => item != i);
			}
		},
	},
};
</script>

<style>
page,
.report {
    position: relative;

    width: 100%;
    height: 100%;
}

.content {
    padding: 0 20px;
}

.content-title {
    font: bold 18px/1em "微软雅黑";
}

.tag-box {
    margin: 20px auto;
    width: 100%;
}

.item {
    display: inline-block;

    margin: 5px 3px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 5px 10px;
    width: auto;

    color: #ccc;
}

.cur {
    border: 1px solid #ff5f55;

    color: #fff;
    background-color: #ff5f55;
}

.upbox {
    display: flex;

    width: 100%;

    flex-wrap: wrap;
}

.upimg,
.upimgbox {
    width: 80px;
    height: 80px;
}

.upimg {
    margin: 0 38rpx;
}

.upimgbox {
    display: flex;

    font-size: 14px;
    text-align: center;

    color: #646464;
    background-color: #f3f3f3;

    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.submit-btn {
    position: absolute;
    bottom: 0;

    border-radius: 0;
    width: 100%;
    height: 60px;

    line-height: 60px;
    letter-spacing: 2px;

    color: #fff;
    background-color: #ff5f55;
}

</style>
