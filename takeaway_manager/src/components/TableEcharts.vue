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
				color: ["#fff", "#7183f1"],
				title: {
					text: this.msg.title,
					textStyle: {
						color: "#fff",
					},
				},
				legend: {
					data: this.msg.legend,
					textStyle: {
						color: "#fff",
					},
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
				// 提示框
				tooltip: {
					trigger: "axis", // 触发类型，默认数据触发，见下图，可选为：'item' ¦ 'axis'
					showDelay: 20, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
					hideDelay: 100, // 隐藏延迟，单位ms
					transitionDuration: 0.4, // 动画变换时间，单位s
					backgroundColor: "rgba(0,0,0,0.7)", // 提示背景颜色，默认为透明度为0.7的黑色
					borderColor: "#333", // 提示边框颜色
					borderRadius: 4, // 提示边框圆角，单位px，默认为4
					borderWidth: 0, // 提示边框线宽，单位px，默认为0（无边框）
					padding: 5, // 提示内边距，单位px，默认各方向内边距为5，
					// 接受数组分别设定上右下左边距，同css
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: "line", // 默认为直线，可选为：'line' | 'shadow'
						lineStyle: {
							// 直线指示器样式设置
							color: "#48b",
							width: 2,
							type: "solid",
						},
						shadowStyle: {
							// 阴影指示器样式设置
							width: "auto", // 阴影大小
							color: "rgba(150,150,150,0.3)", // 阴影颜色
						},
					},
					textStyle: {
						color: "#fff",
					},
				},
				xAxis: {
					type: "category",
					boundaryGap: false,
					data: this.msg.xData,
					axisLine: {
						lineStyle: {
							color: "#fff",
						},
					},
				},
				yAxis: {
					type: "value",
					axisLine: {
						lineStyle: {
							color: "#fff",
						},
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: ["#ccc"],
							width: 1,
							type: "solid",
						},
					},
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
