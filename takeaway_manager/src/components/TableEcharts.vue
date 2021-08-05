<template>
	<div ref="table"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
	props: {
		msg: {
			type: Object,
			default: () => {},
		},
	},

	mounted() {
		this.drawTable();
	},

	methods: {
		// 画图表
		drawTable() {
			let myCharts = echarts.init(this.$refs.table);
			let option = {
				title: {
					text: this.msg.title,
				},
				tooltip: {
					trigger: "axis",
				},
				legend: {
					data: this.msg.legend,
				},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "3%",
					containLabel: true,
				},
				toolbox: {
					feature: {
						saveAsImage: {},
					},
				},
				xAxis: {
					type: "category",
					boundaryGap: false,
					data: this.msg.xData,
				},
				yAxis: {
					type: "value",
				},
				series: [
					{
						name: this.msg.legend[0],
						type: "line",
						stack: "总量",
						smooth: true,
						data: this.msg.amountData,
					},
					{
						name: this.msg.legend[1],
						type: "line",
						stack: "总量",
						smooth: true,
						data: this.msg.orderData,
					},
				],
			};
			myCharts.setOption(option);
		},
	},
};
</script>

<style lang="less" scoped></style>
