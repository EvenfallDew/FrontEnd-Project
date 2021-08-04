<template>
	<div class="count-order">
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
			value1: [new Date(2016, 9, 10, 8, 40), new Date()],
		};
	},

	mounted() {
		var myChart = echarts.init(this.$refs.table);
		var option = {
			tooltip: {
				trigger: "axis",
				axisPointer: {
					type: "cross",
					crossStyle: {
						color: "#999",
					},
				},
			},
			toolbox: {
				feature: {
					dataView: {
						show: true,
						readOnly: false,
					},
					magicType: {
						show: true,
						type: ["line", "bar"],
					},
					restore: {
						show: true,
					},
					saveAsImage: {
						show: true,
					},
				},
			},
			legend: {
				data: ["蒸发量", "降水量", "平均温度"],
			},
			xAxis: [
				{
					type: "category",
					data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
					axisPointer: {
						type: "shadow",
					},
				},
			],
			yAxis: [
				{
					type: "value",
					name: "水量",
					min: 0,
					max: 250,
					interval: 50,
					axisLabel: {
						formatter: "{value} ml",
					},
				},
				{
					type: "value",
					name: "温度",
					min: 0,
					max: 25,
					interval: 5,
					axisLabel: {
						formatter: "{value} °C",
					},
				},
			],
			series: [
				{
					name: "蒸发量",
					type: "bar",
					data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
				},
				{
					name: "降水量",
					type: "bar",
					data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
				},
				{
					name: "平均温度",
					type: "line",
					yAxisIndex: 1,
					data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
				},
			],
		};
		// 把核心配置参数 噻进去
		myChart.setOption(option);
	},
};
</script>

<style lang="less" scoped src="../../../assets/styles/count.less"></style>
