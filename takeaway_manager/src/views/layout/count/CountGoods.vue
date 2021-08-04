<template>
	<div class="count-goods">
		<!-- 时间范围 -->
		<header>
			<span>时间范围</span>
			<el-time-picker
				start-placeholder="开始时间"
				range-separator="至"
				end-placeholder="结束时间"
				placeholder="选择时间范围"
				is-range
				v-model="value1"
			></el-time-picker>
			<el-button type="primary">查询</el-button>
		</header>

		<!-- 图表 -->
		<el-card class="main">
			<div ref="table"></div>
		</el-card>
	</div>
</template>

<script>
import * as echarts from "echarts";

export default {
	data() {
		return {
			value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
		};
	},
	mounted() {
		var myChart = echarts.init(this.$refs.table);
		var option = {
			title: {
				text: "堆叠区域图",
			},
			tooltip: {
				trigger: "axis",
				axisPointer: {
					type: "cross",
					label: {
						backgroundColor: "#6a7985",
					},
				},
			},
			legend: {
				data: ["邮件营销", "联盟广告"],
			},
			toolbox: {
				feature: {
					saveAsImage: {},
				},
			},
			grid: {
				left: "3%",
				right: "4%",
				bottom: "3%",
				containLabel: true,
			},
			xAxis: [
				{
					type: "category",
					boundaryGap: false,
					data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
				},
			],
			yAxis: [
				{
					type: "value",
				},
			],
			series: [
				{
					name: "邮件营销",
					type: "line",
					stack: "总量",
					areaStyle: {},
					emphasis: {
						focus: "series",
					},
					data: [120, 132, 101, 134, 90, 230, 210],
				},
				{
					name: "联盟广告",
					type: "line",
					stack: "总量",
					areaStyle: {},
					emphasis: {
						focus: "series",
					},
					data: [220, 182, 191, 234, 290, 330, 310],
				},
			],
		};
		// 把核心配置参数 噻进去
		myChart.setOption(option);
	},
};
</script>

<style lang="less" scoped src="../../../assets/styles/count.less"></style>
