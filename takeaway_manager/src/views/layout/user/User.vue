<template>
	<div class="user">
		<Card>
			<header slot="title">管理员信息</header>
			<main slot="content">
				<div>管理员ID: {{ info.id }}</div>
				<el-divider></el-divider>
				<div>账号: {{ info.account }}</div>
				<el-divider></el-divider>
				<div>用户组: {{ info.userGroup }}</div>
				<el-divider></el-divider>
				<div>创建时间: {{ info.ctime | filtime }}</div>
				<el-divider></el-divider>
				<div>
					<el-upload
						class="avatar-uploader"
						action="http://127.0.0.1:5000/users/avatar_upload"
						:show-file-list="false"
						:on-success="handleAvatarSuccess"
						:before-upload="beforeAvatarUpload"
					>
						<img v-if="imageUrl" :src="baseUrl + imageUrl" class="avatar" />
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</div>
				<el-button @click="uploadImg()" type="primary">修改头像</el-button>
			</main>
		</Card>
	</div>
</template>

<script>
import Card from "@/components/Card.vue";
import local from "@/utils/local";
import moment from "moment";
import { getInfo_api, editImg_api } from "@/api/acc";

export default {
	components: {
		Card,
	},

	data() {
		return {
			baseUrl: "http://127.0.0.1:5000/upload/imgs/acc_img/",
			imageUrl: "",
			info: {
				id: "",
				account: "",
				userGroup: "",
				ctime: "",
			},
		};
	},

	created() {
		// 调用函数
		this.info = local.get("info");
	},

	// 过滤器
	filters: {
		filtime(val) {
			return moment(val).format("YYYY/MM/DD HH:mm");
		},
	},

	methods: {
		// 点击按钮修改头像
		async uploadImg() {
			let res = await editImg_api({
				imgUrl: this.imageUrl,
			});
			// 图片上传成功后乱传
			if (res.data.code == 0) {
				this.$bus.$emit("uploadImg");
				this.imageUrl = "";
			}
		},
		// 上传成功的回调函数
		handleAvatarSuccess(res) {
			// 上传成功后 对组件中的图片赋值
			this.imageUrl = res.imgUrl;
		},
		// 上传之前的回调函数
		beforeAvatarUpload() {},
	},
};
</script>

<style lang="less" scoped src="../../../assets/styles/user.less"></style>
