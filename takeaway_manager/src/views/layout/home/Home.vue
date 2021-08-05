<template>
	<div class="home">
		<!-- 数据 -->
		<header>
			<el-card class="box-card">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-home-orders"></use>
				</svg>
				<div class="data-name">
					<h3>总订单数</h3>
					<p>{{ totalData.totalOrder }}</p>
				</div>
			</el-card>
			<el-card class="box-card">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-home-moneys"></use>
				</svg>
				<div class="data-name">
					<h3>总销售额</h3>
					<p>{{ totalData.totalAmount }}</p>
				</div>
			</el-card>
			<el-card class="box-card">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-home-order"></use>
				</svg>
				<div class="data-name">
					<h3>今日订单数</h3>
					<p>{{ totalData.todayOrder }}</p>
				</div>
			</el-card>
			<el-card class="box-card">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-home-money"></use>
				</svg>
				<div class="data-name">
					<h3>今日销售额</h3>
					<p>{{ totalData.totayAmount }}</p>
				</div>
			</el-card>
		</header>

		<!-- 图表 -->
		<el-card class="main">
			<TableEcharts v-if="isShow" :msg="myOptions"></TableEcharts>
		</el-card>
	</div>
</template>

<script>
import TableEcharts from "@/components/TableEcharts.vue";
import iconfont from "../../../assets/fonts/iconfont";
import { getTotaldData_api } from "@/api/home";
import * as echarts from "echarts";

export default {
	components: {
		TableEcharts,
	},

	data() {
		return {
			totalData: {},
			isShow: false,
			myOptions: {
				title: "首页数据",
				legend: ["金额数据", "订单数据"],
				xData: [], // x轴数据
				amountData: [], // y轴 金额数据
				orderData: [], // y轴 订单数据
			},
		};
	},

	created() {
		this.getTotaldData();
	},

	methods: {
		// 获取首页数据
		async getTotaldData() {
			let res = await getTotaldData_api();
			this.totalData = res.data;
			let {
				xData, // x轴数据
				amountData, // y轴数据
				orderData, // y轴数据
			} = res.data;
			// 赋值
			this.myOptions.xData = xData; // x轴数据
			this.myOptions.amountData = amountData; // y轴数据1
			this.myOptions.orderData = orderData; // y轴数据2
			this.isShow = true;
		},
	},
};
</script>

<style lang="less" scoped src="../../../assets/styles/home.less"></style>
