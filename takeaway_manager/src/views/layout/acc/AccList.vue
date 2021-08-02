<template>
	<div class="acc-eidit">
		<Card>
			<header slot="title">账号列表</header>
			<main slot="content">
				<el-table
					ref="accData"
					:data="accData"
					tooltip-effect="dark"
					style="width: 100%"
					height="500"
					@selection-change="sel"
				>
					<!-- 选择框 -->
					<el-table-column type="selection" width="55"></el-table-column>
					<!-- 账号 -->
					<el-table-column label="账号">
						<template slot-scope="scope">
							{{ scope.row.account }}
						</template>
					</el-table-column>
					<!-- 用户组 -->
					<el-table-column label="用户组">
						<template slot-scope="scope">
							{{ scope.row.userGroup }}
						</template>
					</el-table-column>
					<!-- 创建时间 -->
					<el-table-column label="创建时间" show-overflow-tooltip>
						<template slot-scope="scope">
							{{ scope.row.ctime }}
						</template>
					</el-table-column>
					<!-- 操作 -->
					<el-table-column prop="name" label="操作" width="150">
						<template slot-scope="scope">
							<el-button size="mini" @click="edit(scope.row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>

				<!-- 分页器 -->
				<el-pagination
					:current-page="curPage"
					:page-size="pageSize"
					@size-change="handleSizeChange($event)"
					@current-change="handleCurrentChange($event)"
					:total="total"
					:page-sizes="[1, 5, 10, 20]"
					layout="total, sizes, prev, pager, next, jumper"
				></el-pagination>

				<!-- 操作按钮 -->
				<div class="operate-btn">
					<el-button type="danger" @click="delAll()">批量删除</el-button>
					<el-button type="primary" @click="cancel()">取消选择</el-button>
				</div>

				<!-- 弹窗 -->
				<div class="dialog">
					<el-dialog title="修改信息" :visible.sync="isshow">
						<el-form :model="eiditForm">
							<el-form-item label="账号" label-width="80px">
								<el-input v-model="eiditForm.account" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="用户组" label-width="80px">
								<el-select v-model="eiditForm.userGroup" placeholder="请选择用户组">
									<el-option label="超级管理员" value="超级管理员"></el-option>
									<el-option label="普通管理员" value="普通管理员"></el-option>
								</el-select>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="isshow = false">取 消</el-button>
							<el-button type="primary" @click="dialogOk()">确 定</el-button>
						</div>
					</el-dialog>
				</div>
			</main>
		</Card>
	</div>
</template>

<script>
import Card from "@/components/Card.vue";
import { accList_api, delAcc_api, delAll_api } from "@/api/acc";

export default {
	components: {
		Card,
	},

	data() {
		return {
			isshow: false, // 控制弹窗显示或者隐藏
			eiditForm: {
				name: "",
				group: "",
			}, //  编辑弹窗的数据
			curPage: 1, // 当前分页器要显示第几页数据
			pageSize: 5, // 每页显示几条数据
			total: 20, // 总条数
			accData: [],
			ids: [], // 批量删除需要的数组
		};
	},

	created() {
		// 调用函数
		this.getList();
	},

	// 准备函数
	methods: {
		// 封装获取账号列表的函数
		async getList() {
			let res = await accList_api({
				currentPage: this.curPage,
				pageSize: this.pageSize,
			});
			let { data, total } = res.data;
			// 判断 如果data的取值为[] 说明当前这一页已经没有数据了 找前一页的数据
			if (data.length == 0 && this.curPage > 1) {
				this.curPage--;
				// 减完页数 不要忘了重绘视图哦~~~
				this.getList();
			}
			// 把获取到的后台数据 赋值给组件
			this.accData = data;
			// 总条数
			this.total = total;
		},
		// 弹窗的确定按钮
		dialogOk() {
			this.isshow = false;
		},
		// 编辑按钮
		edit(row) {
			// 先打开弹窗  把值赋值给 eiditForm
			this.isshow = true;
			this.eiditForm = {
				...row,
			}; // 浅拷贝一份
		},
		// 删除按钮
		del(id) {
			this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(async () => {
					// 点的是弹窗的确定事件
					let res = await delAcc_api({
						id: id,
					});
					// 判断 如果res.data.code == 0 成功后 重绘视图
					if (res.data.code == 0) {
						// 调用重绘函数
						this.getList();
					}
				})
				.catch(() => {
					// 点击的是弹窗的取消事件
				});
		},
		// 批量删除
		async delAll() {
			this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(async () => {
					// 判断 数组是不是空数组
					if (this.ids.length != 0) {
						let res = await delAll_api({
							ids: JSON.stringify(this.ids),
						});
						// 判断一下 删除成功 重绘视图
						if (res.data.code == 0) {
							this.getList();
						}
					}
				})
				.catch(() => {
					// 点击的是弹窗的取消事件
				});
		},
		// 取消选择
		cancel() {
			// 清空
			this.$refs.accData.clearSelection();
		},
		// 条数发生变化触发的函数
		handleSizeChange(val) {
			// 赋值
			this.pageSize = val;
			// 重绘
			this.getList();
		},
		// 页数改变触发的函数
		handleCurrentChange(val) {
			// 赋值给组件的页数
			this.curPage = val;
			// 重绘视图 调用函数
			this.getList();
		},
		// 多选触发的方法
		sel(val) {
			this.ids = val.map((item) => item.id);
		},
	},
};
</script>

<style lang="less" scoped>
.acc-eidit {
	// 分页器
	.el-pagination {
		margin-top: 20px;
	}

	// 操作按钮
	.operate-btn {
		margin-top: 20px;
	}

	// 弹窗
	.dialog {
		/deep/ .el-input__inner {
			width: 240px;
		}
	}
}
</style>
