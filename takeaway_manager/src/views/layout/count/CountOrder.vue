<template>
	<div class="count-order">
		<!-- 时间范围 -->
		<header>
			<el-form ref="searchForm" label-width="80px" :model="searchForm">
				<el-form-item label="时间范围">
					<el-date-picker
						type="daterange"
						start-placeholder="开始日期"
						range-separator="至"
						end-placeholder="结束日期"
						value-format="yyyy-MM-dd HH:mm:ss"
						is-range
						v-model="searchForm.date"
					></el-date-picker>
					<el-button type="primary" size="medium" round @click="search()">查询</el-button>
					<el-button type="info" size="medium" round @click="reset()">重置</el-button>
				</el-form-item>
			</el-form>
		</header>

		<!-- 图表 -->
		<el-card class="main">
			<TableEcharts v-if="isShow" :msg="myOptions"></TableEcharts>
		</el-card>
	</div>
</template>

<script>
import TableEcharts from "@/components/TableEcharts.vue";
import { getOrderData_api } from "@/api/count";
import * as echarts from "echarts";
import moment from "moment";

export default {
	components: {
		TableEcharts,
	},

	data() {
		return {
			isShow: false,
			myOptions: {
				title: "订单统计",
				legend: ["订单统计"],
				xData: [], // x轴数据
				amountData: [], // y轴 金额数据
				orderData: [], // y轴 订单数据
			},
			searchForm: {
				date: "",
			},
		};
	},

	created() {
		this.getOrderData();
	},

	methods: {
		// 获取数据
		async getOrderData() {
			this.isShow = false;
			let res = await getOrderData_api({
				date: JSON.stringify(this.searchForm.date),
			});
			let timeArr = [];
			let amountArr = [];
			res.data.data.forEach((item) => {
				// 直接把数据 push到我们需要传给echarts的数据格式
				timeArr.push(moment(item.orderTime).format("YYYY-MM-DD HH:mm"));
				amountArr.push(item.orderAmount);
			});
			this.myOptions.xData = timeArr;
			this.myOptions.amountData = amountArr;
			// 数据获取完毕后，显示echarts组件
			this.isShow = true;
		},
		// 查询
		search() {
			this.getOrderData();
		},
		// 重置
		reset() {
			this.searchForm.date = "";
			this.getOrderData();
		},
	},
};
</script>

<style lang="less" scoped src="../../../assets/styles/count.less"></style>
