<template>
	<div class="goods-list">
		<Card>
			<header slot="title">商品列表</header>
			<main slot="content">
				<el-table style="width: 100%" :data="goodsData">
					<!-- 下拉拓展 -->
					<el-table-column type="expand">
						<template slot-scope="props">
							<el-form class="demo-table-expand" label-position="left" inline>
								<el-form-item label="商品ID">
									<span>{{ props.row.id }}</span>
								</el-form-item>
								<el-form-item label="商品名称">
									<span>{{ props.row.name }}</span>
								</el-form-item>
								<el-form-item label="所属分类">
									<span>{{ props.row.category }}</span>
								</el-form-item>
								<el-form-item label="商品价格">
									<span>{{ props.row.price }}</span>
								</el-form-item>
								<el-form-item label="商品图片">
									<el-image
										style="width: 100px; height: 100px"
										fit="cover"
										:src="baseUrl + props.row.imgUrl"
										:preview-src-list="[baseUrl + props.row.imgUrl]"
									></el-image>
								</el-form-item>
								<el-form-item label="创建时间">
									<span>{{ props.row.ctime }}</span>
								</el-form-item>
								<el-form-item label="商品评价">
									<span>{{ props.row.rating }}</span>
								</el-form-item>
								<el-form-item label="商品销量">
									<span>{{ props.row.sellCount }}</span>
								</el-form-item>
								<el-form-item label="商品描述">
									<span>{{ props.row.goodsDesc }}</span>
								</el-form-item>
							</el-form>
						</template>
					</el-table-column>
					<!-- 表头 -->
					<el-table-column label="商品名称" prop="name"></el-table-column>
					<el-table-column label="所属分类" prop="category"></el-table-column>
					<el-table-column label="商品价格" prop="price"></el-table-column>
					<el-table-column label="商品图片">
						<template slot-scope="scope">
							<el-image
								style="width: 50px; height: 50px"
								fit="cover"
								:src="baseUrl + scope.row.imgUrl"
								:preview-src-list="[baseUrl + scope.row.imgUrl]"
							></el-image>
						</template>
					</el-table-column>
					<el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
					<el-table-column label="操作" prop="desc" width="150px">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
							<el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>

				<!-- 分页器 -->
				<el-pagination
					layout="total, sizes, prev, pager, next, jumper"
					:total="total"
					:page-size="pageSize"
					:current-page="currentPage"
					:page-sizes="[5, 10, 20]"
					@size-change="handleSizeChange($event)"
					@current-change="handleCurrentChange($event)"
				></el-pagination>

				<!-- 弹窗 -->
				<el-dialog class="dialog" title="编辑商品" :visible.sync="isShow">
					<el-form :model="editForm">
						<el-form-item label="商品名称" label-width="100px">
							<el-input v-model="editForm.name"></el-input>
						</el-form-item>

						<el-form-item label="所属分类" label-width="100px">
							<el-select placeholder="请选择商品分类" v-model="editForm.category">
								<el-option
									v-for="(item, index) in cateArr"
									:key="index"
									:label="item.cateName"
									:value="item.cateName"
								></el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="商品价格" label-width="100px">
							<el-input-number
								v-model="editForm.price"
								:min="1"
								:max="99999"
								:precision="2"
							></el-input-number>
						</el-form-item>

						<el-form-item label="商品描述" label-width="100px">
							<el-input
								type="textarea"
								v-model="editForm.goodsDesc"
								:autosize="{ minRows: 5 }"
							></el-input>
						</el-form-item>

						<el-form-item label="商品图片" label-width="100px">
							<el-upload
								class="avatar-uploader"
								action="http://127.0.0.1:5000/goods/goods_img_upload"
								:show-file-list="false"
								:on-success="handleAvatarSuccess"
							>
								<img
									class="avatar"
									style="width: 100px"
									v-if="editForm.imgUrl"
									v-model="editForm.imgUrl"
									:src="baseUrl + editForm.imgUrl"
								/>
								<i class="el-icon-plus avatar-uploader-icon" v-else></i>
							</el-upload>
						</el-form-item>
					</el-form>

					<div slot="footer" class="dialog-footer">
						<el-button @click="isShow = false">取消</el-button>
						<el-button type="primary" @click="finish()">确定</el-button>
					</div>
				</el-dialog>
			</main>
		</Card>
	</div>
</template>

<script>
import Card from "@/components/Card.vue";
import { getGoodsList_api, delGoods_api, editGoods_api, getGoodsCate_api } from "@/api/goods";
import moment from "moment";

export default {
	components: {
		Card,
	},

	data() {
		return {
			goodsData: [],
			currentPage: 1, // 当前页
			pageSize: 5, // 每页显示几条数据
			total: 0, // 总条数
			baseUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/", // 图片地址
			isShow: false,
			editForm: {},
			cateArr: [],
		};
	},

	created() {
		this.getList();
		this.getGoodsCate();
	},

	methods: {
		// 获取列表
		async getList() {
			let res = await getGoodsList_api({
				currentPage: this.currentPage,
				pageSize: this.pageSize,
			});
			let { data, total } = res.data;
			// 页码必须大于0
			if (data.length == 0 && this.currentPage > 1) {
				this.currentPage--;
				// 重绘
				this.getList();
			}
			// 转换时间
			data.forEach((item) => (item.ctime = moment(item.ctime).format("YYYY-MM-DD HH:mm:ss")));
			// 数据
			this.goodsData = data;
			// 总条数
			this.total = total;
		},
		// 获取分类
		async getGoodsCate() {
			let res = await getGoodsCate_api();
			let { categories } = res.data;
			this.cateArr = categories;
		},
		// 删除
		del(row) {
			this.$confirm(`此操作将永久删除 ${row.name} ，是否继续？`, "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(async () => {
					// 确定
					let res = await delGoods_api({
						id: row.id,
					});
					// 成功
					if (res.data.code == 0) {
						// 重绘
						this.getList();
					}
				})
				.catch(() => {});
		},
		// 编辑
		edit(row) {
			// 弹窗
			this.isShow = true;
			// 浅拷贝
			this.editForm = {
				...row,
			};
		},
		// 完成编辑
		async finish() {
			let res = await editGoods_api(this.editForm);
			if (res.data.code == 0) {
				this.isShow = false;
				this.getList();
			}
		},
		// 图片上传成功
		handleAvatarSuccess(res) {
			let { code, imgUrl } = res;
			if (code == 0) {
				this.editForm.imgUrl = imgUrl;
			}
		},
		// 条数
		handleSizeChange(val) {
			this.pageSize = val;
			this.getList();
		},
		// 页数
		handleCurrentChange(val) {
			this.currentPage = val;
			this.getList();
		},
	},
};
</script>

<style lang="less" scoped src="../../../assets/styles/goods_list.less"></style>
<style lang="less" scoped src="../../../assets/styles/common.less"></style>
