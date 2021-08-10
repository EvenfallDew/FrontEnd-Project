<template>
	<div class="goods-cate">
		<Card>
			<header slot="title">
				<span>商品分类</span>
				<el-button type="primary" size="mini" round @click="isShow = true">添加分类</el-button>
			</header>
			<!-- 表格 -->
			<main slot="content">
				<el-table ref="goodsData" style="width: 100%" :data="goodsData">
					<el-table-column type="index" label="序号"></el-table-column>
					<el-table-column label="分类名称">
						<template slot-scope="scope">
							<div v-if="scope.row.isEdit">
								{{ scope.row.cateName }}
							</div>
							<el-input size="mini" v-else v-model="scope.row.cateName"></el-input>
						</template>
					</el-table-column>

					<el-table-column label="是否启用">
						<template slot-scope="scope">
							<el-switch
								active-color="#13ce66"
								v-model="scope.row.state"
								:disabled="scope.row.isEdit"
							></el-switch>
						</template>
					</el-table-column>

					<el-table-column label="操作" width="150px">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" v-if="scope.row.isEdit" @click="edit(scope.row)">
								编辑
							</el-button>
							<el-button type="success" size="mini" v-else @click="finish(scope.row)">完成</el-button>
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
				<el-dialog class="dialog" title="添加分类" :visible.sync="isShow">
					<el-form :model="editForm">
						<el-form-item label="分类名称" label-width="100px">
							<el-input v-model="editForm.cateName"></el-input>
						</el-form-item>
						<el-form-item label="是否启用" label-width="100px">
							<el-switch active-color="#13ce66" v-model="editForm.state"></el-switch>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="isShow = false">取消</el-button>
						<el-button type="primary" @click="addCate()">确定</el-button>
					</div>
				</el-dialog>
			</main>
		</Card>
	</div>
</template>

<script>
import Card from "@/components/Card.vue";
import { getGoodsCateList_api, editGoodsCate_api, addGoodsCate_api, delGoodsCate_api } from "@/api/goods";

export default {
	components: {
		Card,
	},

	data() {
		return {
			goodsData: [], // 商品数据
			currentPage: 1, // 当前显示页数
			pageSize: 5, // 一页显示条数
			total: 0, // 总条数
			isShow: false, // 弹窗显示或者隐藏
			editForm: {}, // 弹窗编辑数据
		};
	},

	created() {
		this.getList();
	},

	methods: {
		// 获取分类列表
		async getList() {
			let res = await getGoodsCateList_api({
				currentPage: this.currentPage,
				pageSize: this.pageSize,
			});
			let { data, total } = res.data;
			data.forEach((item) => {
				item.state = item.state == 1 ? true : false;
				// 自己给自己加一个编辑状态
				item.isEdit = true;
			});
			// 赋值
			this.goodsData = data;
			this.total = total;
		},
		// 编辑
		edit(row) {
			row.isEdit = false;
		},
		// 编辑完成
		async finish(row) {
			// 发请求改变编辑状态
			let res = await editGoodsCate_api({
				id: row.id,
				cateName: row.cateName,
				state: row.state,
			});
			if (res.data.code == 0) {
				// 调用函数
				this.getList();
				// 改变当前行的激活状态 关闭不可编辑
				row.isEdit = true;
			}
		},
		// 删除分类
		del(row) {
			this.$confirm(`此操作将永久删除 ${row.cateName} ，是否继续？`, "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(async () => {
					// 确定
					let res = await delGoodsCate_api({
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
		// 添加分类
		async addCate() {
			if (this.editForm.state == undefined) {
				this.editForm.state = false;
			}
			let res = await addGoodsCate_api({
				cateName: this.editForm.cateName,
				state: this.editForm.state,
			});
			// 成功
			if (res.data.code == 0) {
				// 重绘
				this.getList();
				// 清空
				this.editForm = {};
			}
			// 关闭弹窗
			this.isShow = false;
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

<style lang="less" scoped>
.goods-cate {
    header {
        display: flex;

        justify-content: space-between;
        align-items: center;
    }
}

</style>
<style lang="less" scoped src="../../../assets/styles/common.less"></style>
