<template>
	<div class="goods-add">
		<Card>
			<header slot="title">商品添加</header>
			<main slot="content">
				<el-form ref="addForm" label-width="100px" :model="addForm">
					<el-form-item label="商品名称">
						<el-input v-model="addForm.name"></el-input>
					</el-form-item>

					<el-form-item label="商品分类">
						<el-select placeholder="请选择商品分类" v-model="addForm.category">
							<el-option
								v-for="(item, index) in cateArr"
								:key="index"
								:label="item.cateName"
								:value="item.cateName"
							></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="商品价格">
						<el-input-number v-model="addForm.price" :min="1" :max="99999" :precision="2"></el-input-number>
					</el-form-item>

					<el-form-item label="商品图片">
						<el-upload
							class="avatar-uploader"
							:action="baseAction"
							:show-file-list="false"
							:on-success="handleAvatarSuccess"
						>
							<img class="avatar" v-if="addForm.imgUrl" :src="baseUrl + addForm.imgUrl" />
							<i class="el-icon-plus avatar-uploader-icon" v-else></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="商品描述">
						<el-input type="textarea" v-model="addForm.goodsDesc" :autosize="{ minRows: 5 }"></el-input>
					</el-form-item>

					<el-form-item>
						<el-button type="primary" size="medium" round @click="add()">添加商品</el-button>
					</el-form-item>
				</el-form>
			</main>
		</Card>
	</div>
</template>

<script>
import Card from "@/components/Card.vue";
import base from "@/utils/base";
import { addGoods_api, getGoodsCate_api } from "@/api/goods";

export default {
	components: {
		Card,
	},

	data() {
		return {
			cateArr: [], // 分类数组
			addForm: {}, // 添加数据
			baseUrl: base.url + "upload/imgs/goods_img/", // 图片地址
			baseAction: base.url + "goods/goods_img_upload", // 图片上传地址
		};
	},

	created() {
		this.getGoodsCate();
	},

	methods: {
		// 获取商品分类
		async getGoodsCate() {
			let res = await getGoodsCate_api();
			this.cateArr = res.data.categories;
		},
		// 添加商品
		async add() {
			let res = await addGoods_api(this.addForm);
			if (res.data.code == 0) {
				this.$router.push("/goods/goods-list");
			}
		},
		// 上传图片成功
		handleAvatarSuccess(res) {
			let { code, imgUrl } = res;
			if (code == 0) {
				this.addForm.imgUrl = imgUrl;
			}
		},
	},
};
</script>

<style lang="less" scoped src="../../../assets/styles/common.less"></style>
<style lang="less" scoped src="../../../assets/styles/goods_add.less"></style>
