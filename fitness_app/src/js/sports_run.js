"use strict"

// 引入当前页面对应的样式文件
require("../less/sports_run.less");

document.ready(function () {
    // 头部封装
    $utils.commonHeader();
    // 底部封装
    $utils.commonFooter();
    // 获取本地存储数据
    let userId = JSON.parse(localStorage.getItem("user")).userId;

    let goBtn = document.querySelector("#goBtn");
    let runKm = document.querySelector("#runKm");
    let myMap = document.querySelector("#map");

    let maskTime = document.querySelector("#maskTime"); //倒计时蒙层
    let maskData = document.querySelector("#maskData"); //数据模式蒙层
    let mapMask = document.querySelector("#mapMask"); //地图模式蒙层
    let timeNum = document.querySelector("#timeNum"); //倒计时数字
    let takeTime = document.querySelector("#takeTime"); //用时
    let continueBtn = document.querySelector("#continueBtn"); //继续按钮
    let pauseBtn = document.querySelector("#pauseBtn"); //暂停按钮
    let stopBtn = document.querySelector("#stopBtn"); //停止按钮
    let iconLocation = document.querySelector("#iconLocation"); //地图图标按钮
    let backBtn = document.querySelector("#backBtn"); //返回按钮
    let finishBtn = document.querySelector("#finishBtn"); //完成按钮

    // 获取累积跑步距离
    function getRunKm() {
        axios.get($utils.BASE_URL + "/sports/exerciseData?id=" + userId).then(function (res) {
            let result = res.data;
            if (result.status == 0) {
                runKm.textContent = result.data.runkm;
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    getRunKm();

    // 初始化地图
    function initMap() {
        var map = new BMap.Map(myMap); //实例化地图区域
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                let lng = r.longitude; //经度
                let lat = r.latitude; //纬度
                var point = new BMap.Point(lng, lat); //根据经纬度设置坐标
                map.centerAndZoom(point, 12); //根据经纬度绘制地图
            } else {
                alert('failed' + this.getStatus());
            }
            // 隐藏小图标
            document.querySelector(".anchorBL").style.display = "none";
        });
    }
    initMap();

    /* go按钮的点击事件 */
    goBtn.addEventListener("click", function () {
        //显示倒计时蒙层
        maskTime.style.display = "block";
        let arr = [3, 2, 1, "GO"];
        let index = 0;
        timeNum.textContent = arr[index]; //初始化页面
        /* 倒计时 */
        let timerId = setInterval(function () {
            index++;
            timeNum.textContent = arr[index];
            if (index == arr.length) {
                // 清除定时器
                clearInterval(timerId);
                // 隐藏倒计时蒙层
                maskTime.style.display = "none";
                // 显示数据模式蒙层
                maskData.style.display = "block";
                // 开始跑步
                startRun();
            }
        }, 1000);
    });

    let i = 0
    let timerId = null;
    /* 定义跑步函数 */
    function startRun() {
        clearInterval(timerId);
        timerId = setInterval(function () {
            i++;
            takeTime.textContent = $utils.secondToHms(i);
        }, 1000);
    }

    /* 暂停按钮 */
    pauseBtn.addEventListener("click", function () {
        // 1 清除定时器
        clearInterval(timerId);
        // 2 隐藏自身
        this.style.display = "none";
        // 3 显示继续按钮
        continueBtn.style.display = "flex";
        // 4 显示结束按钮
        stopBtn.style.display = "flex";
    });

    /* 继续按钮 */
    continueBtn.addEventListener("click", function () {
        // 1 继续跑
        startRun();
        // 2 隐藏自己
        this.style.display = "none";
        // 3 隐藏结束
        stopBtn.style.display = "none";
        // 4 显示暂停
        pauseBtn.style.display = "flex";
    });

    // 停止按钮
    stopBtn.addEventListener("click", function () {
        mapMask.style.display = "block"; //显示地图模式蒙层
        finishBtn.style.display = "block"; //显示完成按钮
        backBtn.style.display = "none"; //隐藏返回按钮
    });

    /* 地图图标按钮 */
    iconLocation.addEventListener("click", function () {
        mapMask.style.display = "block"; //显示地图模式蒙层
        backBtn.style.display = "block"; //显示返回按钮
        finishBtn.style.display = "none"; //隐藏完成按钮
    });

    /* 返回按钮 */
    backBtn.addEventListener("click", function () {
        mapMask.style.display = "none"; //隐藏地图模式蒙层
    });

    // 完成按钮
    finishBtn.addEventListener("click", function () {
        $utils.showToast("icon-toast-correct", "完成跑步", 2000);
        setTimeout(() => {
            location.href = "./sports_run.html";
        }, 2000);
    });
});