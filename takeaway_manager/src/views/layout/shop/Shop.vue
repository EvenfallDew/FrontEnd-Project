<template>
	<div class="shop">
		<Card>
			<header slot="title">
				<span>店铺管理</span>
				<el-button type="primary" size="mini" round @click="edit()">
					{{ disabled ? "编辑信息" : "完成编辑" }}
				</el-button>
			</header>
			<main slot="content">
				<el-form
					class="demo-shopForm"
					ref="shopForm"
					label-width="100px"
					:model="shopForm"
					:disabled="disabled"
				>
					<el-form-item label="店铺名称">
						<el-input v-model="shopForm.name"></el-input>
					</el-form-item>

					<el-form-item label="店铺公告">
						<el-input type="textarea" v-model="shopForm.bulletin" :autosize="{ minRows: 5 }"></el-input>
					</el-form-item>

					<el-form-item label="店铺头像">
						<el-upload
							class="avatar-uploader"
							:action="baseAction"
							:show-file-list="false"
							:on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload"
						>
							<img class="avatar" v-if="shopForm.avatar" :src="baseUrl + shopForm.avatar" />
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="店铺图片">
						<el-upload
							list-type="picture-card"
							:action="baseAction"
							:on-success="handleImgSuccess"
							:on-preview="handlePictureCardPreview"
							:on-remove="handleRemove"
							:file-list="fileList"
						>
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt />
						</el-dialog>
					</el-form-item>

					<el-form-item label="配送费">
						<el-input-number
							label="金额"
							v-model="shopForm.deliveryPrice"
							:min="0"
							:max="99999"
							:precision="2"
						></el-input-number>
					</el-form-item>

					<el-form-item label="配送时间">
						<el-input v-model="shopForm.deliveryTime"></el-input>
					</el-form-item>

					<el-form-item label="配送描述">
						<el-input v-model="shopForm.description"></el-input>
					</el-form-item>

					<el-form-item label="配送评分">
						<el-input v-model="shopForm.score"></el-input>
					</el-form-item>

					<el-form-item label="销量">
						<el-input v-model="shopForm.sellCount"></el-input>
					</el-form-item>

					<el-form-item label="活动">
						<el-checkbox-group v-model="shopForm.supports">
							<el-checkbox label="单人精彩套餐"></el-checkbox>
							<el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
							<el-checkbox label="在线支付满28减5"></el-checkbox>
							<el-checkbox label="单人豪华套餐"></el-checkbox>
							<el-checkbox label="限时优惠"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>

					<el-form-item label="营业时间">
						<el-date-picker
							type="datetimerange"
							start-placeholder="开始日期"
							range-separator="至"
							end-placeholder="结束日期"
							v-model="shopForm.date"
						></el-date-picker>
					</el-form-item>
				</el-form>
			</main>
		</Card>
	</div>
</template>

<script>
import Card from "@/components/Card.vue";
import { getShop_api, editShop_api } from "@/api/shop";
import base from "@/utils/base";

export default {
	components: {
		Card,
	},

	data() {
		return {
			disabled: true, // 表单禁用状态
			dialogVisible: false, // 控制弹窗
			dialogImageUrl: "", // 弹窗中的图片路径
			baseUrl: base.url + "upload/shop/", // 前半截路径
			baseAction: base.url + "shop/upload",
			shopForm: {
				avatar: "", // 店铺头像
				supports: [], // 活动
				pics: [], // 后台需要的数据数组
			},
			fileList: [], // 前端需要的数组 [{name:1,url: 2}]
		};
	},

	created() {
		this.getData();
	},

	methods: {
		// 获取店铺数据
		async getData() {
			let res = await getShop_api();
			let { data } = res.data;
			// 赋值
			this.shopForm = data;
			// 头像赋值
			this.shopForm.avatar = data.avatar;
			// 循环遍历data中的pics数组 把后台返回的数组改成前端需要的数据解构
			// 前端需要的数据解构 [{name,url},{name,url}]
			data.pics.forEach((item) => {
				this.fileList.push({
					name: item, // name属性不能重复
					url: this.baseUrl + item, // 把前半截路径拼完
				});
			});
		},
		// 编辑和完成
		async edit() {
			// 改变编辑状态
			if (this.disabled == false) {
				// 把数组转成字符串类型
				this.shopForm.pics = JSON.stringify(this.shopForm.pics);
				this.shopForm.date = JSON.stringify(this.shopForm.date);
				this.shopForm.supports = JSON.stringify(this.shopForm.supports);
				// 等于false 代表可以编辑表单的状态==完成按钮==发请求
				let res = await editShop_api(this.shopForm);
				// 关闭弹窗
				this.disabled = true;
			} else {
				// 全部禁用
				this.disabled = false;
			}
		},
		// 店铺头像上传成功
		handleAvatarSuccess(res) {
			let { code, imgUrl } = res;
			if (code == 0) {
				this.shopForm.avatar = imgUrl;
			}
		},
		// 店铺头像上传检测
		beforeAvatarUpload(file) {
			const isJPG = file.type.includes("image");
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isJPG) {
				this.$message.error("上传头像图片只能是 图片 格式!");
			}
			if (!isLt2M) {
				this.$message.error("上传头像图片大小不能超过 2MB!");
			}
			return isJPG && isLt2M;
		},
		// 店铺多图上传成功
		handleImgSuccess(res) {
			let { code, imgUrl } = res;
			if (code == 0) {
				this.shopForm.pics.push(imgUrl);
			}
		},
		// 图片预览
		handlePictureCardPreview(file) {
			// 显示弹窗
			this.dialogVisible = true;
			// 给图片赋值
			this.dialogImageUrl = file.url;
		},
		// 图片删除
		handleRemove(file) {
			let imgName = file.url.split("/");
			let imgTarget = imgName[imgName.length - 1];
			this.shopForm.pics.forEach((item, i) => {
				if (imgTarget == item) {
					this.shopForm.pics.splice(i, 1);
				}
			});
		},
	},
};
</script>

<style lang="less" scoped src="../../../assets/styles/shop.less"></style>
