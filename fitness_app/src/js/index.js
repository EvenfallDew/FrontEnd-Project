"use strict"

// 引入对应的less样式
require("../less/index.less");

// 引入swiper的样式文件
require("../libs/swiper/swiper-bundle.min.css");

// 引入swiper的js文件
const Swiper = require("../libs/swiper/swiper-bundle.min.js");

document.ready(function () {
    // 底部封装
    $utils.commonFooter();

    // 轮播
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },

        // 自动播放
        autoplay: {
            delay: 2000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
    });

    // 获取元素
    let rankNum = document.querySelector("#rankNum");
    let clockNum = document.querySelector("#clockNum");
    let badgeNum = document.querySelector("#badgeNum");
    let clockBtn = document.querySelector("#clockBtn");
    let userId = JSON.parse(window.localStorage.getItem("user")).userId;
    let isClock = true; //true 表示没有打卡，false表示已经打卡

    // 获取该账号的数据
    function getData() {
        axios.get("http://139.9.177.51:8099/headPageInfo?userId=" + userId).then(function (res) {
            let result = res.data;
            // 获取数据成功
            if (result.status == 0) {
                // 渲染数据
                rankNum.textContent = result.data.rank;
                clockNum.textContent = result.data.punchIn;
                badgeNum.textContent = result.data.insigniaNum;
                // 更改按钮文本
                clockBtn.textContent = result.data.isPunch == "true" ? "已打卡" : "今日打卡";
                // 标记是否打卡
                isClock = result.data.isPunch == "true" ? false : true;
            } else {
                // 获取数据失败,弹窗提示
                $utils.showToast("icon-toast-wrong", "加载失败");
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    // 页面加载完获取
    getData();

    // 打卡
    clockBtn.addEventListener("click", function () {
        if (isClock == true) {
            axios.get("http://139.9.177.51:8099/clockIn?userId=" + userId).then(function (res) {
                let result = res.data;
                // 获取数据成功
                if (result.status == 0) {
                    // 渲染数据
                    getData();
                    // 弹窗提示
                    $utils.showToast("icon-toast-correct", "打卡成功");
                }
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            // 弹窗提示
            $utils.showToast("icon-toast-wrong", "已打卡");
        }
    });
});