<template>
	<div>
		<Card class="goods-type">
			<header slot="title">
				<span>商品分类</span>
				<el-button @click="isShow = true" type="primary" size="mini">添加分类</el-button>
			</header>

			<main slot="content">
				<el-table ref="goodsData" style="width: 100%" :data="goodsData">
					<el-table-column type="index" label="序号"></el-table-column>
					<el-table-column label="分类名称">
						<template slot-scope="scope">
							<div v-if="scope.row.isEdit">
								{{ scope.row.cateName }}
							</div>
							<el-input v-else size="mini" v-model="scope.row.cateName"></el-input>
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
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button v-if="scope.row.isEdit" size="mini" @click="edit(scope.row)">编辑</el-button>
							<el-button v-else type="success" size="mini" @click="ok(scope.row)">完成</el-button>
							<el-button @click="del(scope.row.id)" size="mini" type="danger">删除</el-button>
						</template>
					</el-table-column>
				</el-table>

				<!-- 分页器 -->
				<el-pagination
					layout="total, sizes, prev, pager, next, jumper"
					:current-page="currentPage"
					:page-size="pageSize"
					:total="total"
					:page-sizes="[1, 5, 10, 20]"
					@size-change="handleSizeChange($event)"
					@current-change="handleCurrentChange($event)"
				></el-pagination>
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
			goodsData: [], // 数据
			currentPage: 1, // 当前显示页数
			pageSize: 5, // 一页显示条数
			total: 0, // 总条数
			isShow: false, // 弹窗显示或者隐藏
			editForm: {}, // 弹窗数据
		};
	},

	created() {
		// 调用函数
		this.getList();
	},

	methods: {
		// 删除分类
		async del(id) {
			console.log(id);
			let res = await delGoodsCate_api({
				id,
			});
			let { code } = res.data;
			if (code == 0) {
				// 重绘视图
				this.getList();
			}
		},
		// 添加分类
		async addType() {
			let res = await addGoodsCate_api({
				cateName: this.editForm.cateName,
				state: this.editForm.state,
			});
			let { code } = res.data;
			if (code == 0) {
				// 调用函数 重绘视图
				this.getList();
				// 清空 弹窗表单的数据
				this.editForm = {};
			}
			// 关闭弹窗
			this.isShow = false;
		},
		// 点击完成按钮
		async ok(row) {
			// 发请求 并改变编辑状态
			let res = await editGoodsCate_api({
				id: row.id,
				cateName: row.cateName,
				state: row.state,
			});
			let { code } = res.data;
			if (code == 0) {
				// 调用函数
				this.getList();
				// 改变当前行的激活状态 关闭不可编辑
				row.isEdit = true;
			}
		},
		// 点击编辑的事件
		edit(row) {
			// 改变 当前这一行的编辑状态
			row.isEdit = false;
		},
		// 封装获取分类的函数
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
		// 当条数发生变化
		handleSizeChange(val) {
			this.pageSize = val;
			// 重绘视图
			this.getList();
		},
		// 当页数发生变化
		handleCurrentChange(val) {
			this.currentPage = val;
			// 重绘视图
			this.getList();
		},
	},
};
</script>

<style lang="less" scoped>
.goods-type {
    header {
        display: flex;

        justify-content: space-between;
        align-items: center;
    }

    main {
        // 分页器
        .el-pagination {
            margin-top: 20px;
        }
    }
}


</style>
