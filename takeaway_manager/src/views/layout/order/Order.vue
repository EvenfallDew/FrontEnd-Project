<template>
	<div class="order">
		<Card>
			<header slot="title">订单管理</header>
			<main slot="content">
				<!-- 查询 -->
				<el-form class="demo-form-inline" :inline="true" :model="searchForm">
					<el-form-item label="订单号" label-width="80px">
						<el-input v-model="searchForm.orderNo" placeholder="订单号" size="small"></el-input>
					</el-form-item>
					<el-form-item label="收货人" label-width="80px">
						<el-input v-model="searchForm.consignee" placeholder="收货人" size="small"></el-input>
					</el-form-item>
					<el-form-item label="手机号" label-width="80px">
						<el-input v-model="searchForm.phone" placeholder="手机号" size="small"></el-input>
					</el-form-item>
					<el-form-item label="订单状态" label-width="80px">
						<el-select size="small" v-model="searchForm.orderState" placeholder="订单状态">
							<el-option label="已受理" value="已受理"></el-option>
							<el-option label="已完成" value="已完成"></el-option>
							<el-option label="派送中" value="派送中"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="选择时间" label-width="80px">
						<el-date-picker
							type="datetimerange"
							size="small"
							align="right"
							start-placeholder="开始日期"
							range-separator="至"
							end-placeholder="结束日期"
							v-model="searchForm.date"
							:picker-options="pickerOptions"
						></el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="small" @click="find()">查询</el-button>
						<el-button type="primary" size="small" @click="reset()">重置</el-button>
					</el-form-item>
				</el-form>

				<!-- 表格 -->
				<el-table :data="orderData" border style="width: 100%">
					<el-table-column fixed prop="orderNo" label="订单号" width="100px"></el-table-column>
					<el-table-column prop="orderTime" label="下单时间" width="170px"></el-table-column>
					<el-table-column prop="phone" label="手机号" width="120px"></el-table-column>
					<el-table-column prop="consignee" label="收货人" width="120px"></el-table-column>
					<el-table-column prop="deliverAddress" label="配送地址" width="300px"></el-table-column>
					<el-table-column prop="deliveryTime" label="送达时间" width="170px"></el-table-column>
					<el-table-column prop="remarks" label="用户备注"></el-table-column>
					<el-table-column prop="orderAmount" label="订单金额"></el-table-column>
					<el-table-column prop="orderState" label="订单状态"></el-table-column>
					<el-table-column fixed="right" label="操作" width="100px">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
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
				<el-dialog class="dialog" title="编辑订单" :visible.sync="isShow">
					<el-form :model="editForm">
						<el-form-item label="订单号" label-width="100px">
							<el-input v-model="editForm.orderNo" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="下单时间" label-width="100px">
							<el-input v-model="editForm.orderTime"></el-input>
						</el-form-item>
						<el-form-item label="手机号" label-width="100px">
							<el-input v-model="editForm.phone"></el-input>
						</el-form-item>
						<el-form-item label="收货人" label-width="100px">
							<el-input v-model="editForm.consignee"></el-input>
						</el-form-item>
						<el-form-item label="配送地址" label-width="100px">
							<el-input v-model="editForm.deliverAddress"></el-input>
						</el-form-item>
						<el-form-item label="送达时间" label-width="100px">
							<el-input v-model="editForm.deliveryTime"></el-input>
						</el-form-item>
						<el-form-item label="订单金额" label-width="100px">
							<el-input-number
								v-model="editForm.orderAmount"
								:min="1"
								:max="99999"
								:precision="2"
							></el-input-number>
						</el-form-item>

						<el-form-item label="用户备注" label-width="100px">
							<el-input type="textarea" v-model="editForm.remarks" :autosize="{ minRows: 5 }"></el-input>
						</el-form-item>
						<el-form-item label="订单状态" label-width="100px">
							<el-input v-model="editForm.orderState"></el-input>
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
import { getOrderList_api, getOrderDetail_api, editOrder_api } from "@/api/order";
import moment from "moment";

export default {
	components: {
		Card,
	},

	data() {
		return {
			// 查询
			searchForm: {
				num: "",
				name: "",
				tel: "",
				state: "",
				region: "",
				time: "",
			},
			// 时间选择
			pickerOptions: {
				shortcuts: [
					{
						text: "最近一周",
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit("pick", [start, end]);
						},
					},
					{
						text: "最近一个月",
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit("pick", [start, end]);
						},
					},
					{
						text: "最近三个月",
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit("pick", [start, end]);
						},
					},
				],
			},

			// 订单数据
			orderData: [],
			// 分页器
			currentPage: 1, // 当前页
			pageSize: 5, // 显示条数
			total: 0, // 总条数
			// 编辑弹窗
			isShow: false,
			editForm: {},
		};
	},

	created() {
		this.getList();
	},

	methods: {
		// 获取列表
		async getList() {
			let res = await getOrderList_api({
				orderNo: this.searchForm.orderNo,
				consignee: this.searchForm.consignee,
				phone: this.searchForm.phone,
				orderState: this.searchForm.orderState,
				date: this.searchForm.date == null ? "[]" : JSON.stringify(this.searchForm.date),
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
			data.forEach((item) => (item.orderTime = moment(item.orderTime).format("YYYY-MM-DD HH:mm:ss")));
			data.forEach((item) => (item.deliveryTime = moment(item.deliveryTime).format("YYYY-MM-DD HH:mm:ss")));
			// 数据
			this.orderData = data;
			// 总条数
			this.total = total;
		},
		// 查询
		find() {
			this.getList();
		},
		// 重置
		reset() {
			this.searchForm = {};
			this.getList();
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
			let res = await editOrder_api(this.editForm);
			if (res.data.code == 0) {
				this.isShow = false;
				this.getList();
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

<style lang="less" scoped>
.order {
	.el-table {
		margin-top: 40px;
	}

	// 分页器
	.el-pagination {
		margin-top: 20px;
	}
}
</style>
