"use strict"

// 引入对应的less样式
require("../less/mine_data.less");

$utils.load(1400);

document.ready(function () {
    // 获取本地存储信息
    let user = JSON.parse(localStorage.getItem("user"));
    let userId = JSON.parse(localStorage.getItem("user")).userId;
    let userData = JSON.parse(localStorage.getItem("exerciseData"));
    let headPic = document.querySelector("#headPic");
    // 获取元素
    let times = document.querySelector("#times");
    let coursetims = document.querySelector("#coursetims");
    let calorie = document.querySelector("#calorie");
    let miles = document.querySelector("#miles");
    let punchin = document.querySelector("#punchin");

    // 加载头像
    headPic.src = user.imgurl ? $utils.BASE_URL + user.imgurl : require("../images/headerPic.jpg");

    // 加载运动数据
    function render(obj) {
        times.textContent = obj.times.toFixed(2);
        coursetims.textContent = obj.coursetims.toFixed(2);
        calorie.textContent = obj.calorie.toFixed(2);
        miles.textContent = obj.miles.toFixed(2);
        punchin.textContent = obj.punchin;
    }
    render(userData);

    // 跳转
    let mineLink = document.querySelector("#mineLink");
    mineLink.addEventListener("click", function (e) {
        e.preventDefault();
        $utils.out();
        setTimeout(() => {
            location.href = "./mine.html";
        }, 1000);
    });

    // 制图数据
    let xDataArr = ["7-1", "7-2", "7-3", "7-4", "7-5", "7-6", "7-7"];
    let yDataArr = [30, 60, 40, 120, 90, 80, 50];
    /*近7天运动时长 */
    // 柱状图
    function showBarCharts() {
        // 1 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById("sportTime"));
        // 2 指定图表的配置项和数据
        var option = {
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
            series: [{
                data: yDataArr,
                type: "bar",
                color: "#83a7d1"
            }]
        };
        myChart.setOption(option);
    }
    showBarCharts();

    // 饼状图
    function bing() {
        var chartDom = document.getElementById('sportTime2');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            title: {
                text: "近7天运动类型",
                textStyle: {
                    color: "#101010"
                }
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                bottom: '0px',
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
                        name: '跑步'
                    },
                    {
                        value: 535,
                        name: '骑行'
                    },
                    {
                        value: 580,
                        name: '课程'
                    }
                ]
            }]
        };
        option && myChart.setOption(option);
    }
    bing();

    // 折线图
    function zhexian() {
        var chartDom = document.getElementById('sportTime3');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            title: {
                text: '近7天运动类型',
                textStyle: {
                    color: "#101010"
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                bottom: 0,
                data: ['跑步', '骑行', '课程']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ["7-1", "7-2", "7-3", "7-4", "7-5", "7-6", "7-7"]
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                    name: '跑步',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '骑行',
                    type: 'line',
                    stack: '总量',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '课程',
                    type: 'line',
                    stack: '总量',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
            ]
        };

        option && myChart.setOption(option);

    }
    zhexian();
});