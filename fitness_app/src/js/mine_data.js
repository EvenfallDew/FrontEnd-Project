"use strict"

// 引入对应的less样式
require("../less/mine_data.less");
document.ready(function () {
    let xDataArr = ["7-1", "7-2", "7-3", "7-4", "7-5", "7-6", "7-7"];
    let yDataArr = [30, 60, 40, 120, 90, 80, 50];
    /*近7天运动时长 */
    showBarCharts();
    /* 绘制柱状图 */
    function showBarCharts() {
        // 1 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById("sportTime"));
        // 2 指定图表的配置项和数据
        var option = {
            // 标题
            title: {
                text: "近7天运动时长",
                textStyle: {
                    color: "#101010"
                }
            },
            xAxis: {
                type: "category",
                data: xDataArr
            },
            yAxis: {
                type: "value",
                max: 0,
                max: 140,
                scale: true,
            },
            // 系列
            series: [{
                data: yDataArr,
                type: "bar",
                color: "#83a7d1"
            }]
        };
        //3 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    bing();

    function bing() {
        var chartDom = document.getElementById('sportTime2');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [{
                name: '访问来源',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '40',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [{
                        value: 1048,
                        name: '搜索引擎'
                    },
                    {
                        value: 735,
                        name: '直接访问'
                    },
                    {
                        value: 580,
                        name: '邮件营销'
                    },
                    {
                        value: 484,
                        name: '联盟广告'
                    },
                    {
                        value: 300,
                        name: '视频广告'
                    }
                ]
            }]
        };

        option && myChart.setOption(option);
    }
});