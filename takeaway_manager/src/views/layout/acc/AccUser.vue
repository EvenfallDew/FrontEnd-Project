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
						:action="baseAction"
						:show-file-list="false"
						:on-success="handleAvatarSuccess"
					>
						<img class="avatar" v-if="imageUrl" :src="baseUrl + imageUrl" />
						<i class="el-icon-plus avatar-uploader-icon" v-else></i>
					</el-upload>
				</div>
				<el-button type="primary" @click="uploadImg()">修改头像</el-button>
			</main>
		</Card>
	</div>
</template>

<script>
import Card from "@/components/Card.vue";
import local from "@/utils/local";
import moment from "moment";
import { getInfo_api, editImg_api } from "@/api/acc";
import base from "@/utils/base";

export default {
	components: {
		Card,
	},

	data() {
		return {
			baseUrl: base.url + "upload/imgs/acc_img/",
			baseAction: base.url + "users/avatar_upload",
			imageUrl: "",
			// 信息
			info: {
				id: "",
				account: "",
				userGroup: "",
				ctime: "",
			},
		};
	},

	created() {
		this.info = local.get("info");
	},

	// 过滤器
	filters: {
		filtime(val) {
			return moment(val).format("YYYY/MM/DD HH:mm");
		},
	},

	methods: {
		// 修改头像
		async uploadImg() {
			let res = await editImg_api({
				imgUrl: this.imageUrl,
			});
			// 上传成功
			if (res.data.code == 0) {
				// 乱传
				this.$bus.$emit("uploadImg");
				this.imageUrl = "";
			}
		},
		// 成功回调
		handleAvatarSuccess(res) {
			// 对组件中的图片赋值
			this.imageUrl = res.imgUrl;
		},
	},
};
</script>

<style lang="less" scoped src="../../../assets/styles/acc_user.less"></style>
