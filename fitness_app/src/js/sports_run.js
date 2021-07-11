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

    let nowDate = document.querySelector("#nowDate"); //卡片中日期
    let pace = document.querySelector("#mapSpeed"); //卡片中的配速
    let useTime = document.querySelector("#mapTakeTime"); //卡片中的用时
    let useCalorie = document.querySelector("#mapCalorie"); //卡片中的千卡

    let nowKm = document.querySelector("#nowKm"); //跑步距离
    let cardRunKm = document.querySelector("#cardRunKm"); //跑步距离
    let speed = document.querySelector("#speed"); //跑步距离
    let calorie = document.querySelector("#calorie"); //千卡

    let second = 0;
    let timerId = null;
    // 指定区域创建地图对象
    var map = new BMap.Map("mapMode");
    // 模拟跑步的距离
    let moveNumX = 0.0001;
    let moveNumY = 0.0001;
    // 存放点坐标的数组
    let pointArr = [];
    // 跑步的距离
    let km = 0;
    // 卡路里
    let calorieValue = 0;
    // 日期
    nowDate.textContent = $utils.formatDate(new Date());

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

    // go按钮
    goBtn.addEventListener("click", function () {
        // 显示倒计时蒙层
        maskTime.style.display = "block";
        let arr = [3, 2, 1, "GO"];
        let index = 0;
        timeNum.textContent = arr[index]; //初始化页面
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

    /* 定义跑步函数 */
    function startRun() {
        clearInterval(timerId);
        timerId = setInterval(function () {
            second++;
            //数据模式中的数据
            takeTime.textContent = $utils.secondToHms(second); //用时
            //渲染卡片中的数据
            useTime.textContent = $utils.secondToHms(second);
            //调用获取位置的函数
            getlocation();
        }, 1000);
    }

    /* 暂停按钮 */
    pauseBtn.addEventListener("click", function () {
        // 1 清除定时器
        clearInterval(timerId);
        // 2 隐藏自身
        pauseBtn.style.display = "none";
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

    // 结束按钮
    stopBtn.addEventListener("click", function () {
        mapMask.style.display = "block"; //显示地图模式蒙层
        finishBtn.style.display = "block"; //显示完成按钮
        backBtn.style.display = "none"; //隐藏返回按钮
        getlocation(false);
    });

    // 地图图标按钮 
    iconLocation.addEventListener("click", function () {
        mapMask.style.display = "block"; //显示地图模式蒙层
        backBtn.style.display = "block"; //显示返回按钮
        finishBtn.style.display = "none"; //隐藏完成按钮
        getlocation(false);
    });

    /* 返回按钮 */
    backBtn.addEventListener("click", function () {
        mapMask.style.display = "none"; //隐藏地图模式蒙层
    });

    // 完成按钮
    finishBtn.addEventListener("click", function () {
        mapMask.style.display = "none";
        maskData.style.display = "none";
        // 显示暂停
        pauseBtn.style.display = "flex"
        // 隐藏继续
        continueBtn.style.display = "none"
        // 隐藏结束
        stopBtn.style.display = "none"
        // 清除定时器
        clearInterval(timerId);
        // 用时
        takeTime.textContent = $utils.secondToHms(second);
        useTime.textContent = $utils.secondToHms(second);
        axios.post($utils.BASE_URL + "/sports/save", {
            id: userId, //用户id
            type: 1, //跑步
            takeTime: second, //用时
            miles: km, //跑步距离
            averagerate: (km / second).toFixed(2), //平均速度
            calorie: calorieValue //卡路里
        }).then(function (res) {
            let result = res.data;
            if (result.status == 0) {
                // 保存成功
                $utils.showToast("icon-toast-correct", "保存成功", 2000);
                setTimeout(() => {
                    location.reload();
                    // 重置时间
                    second = 0;
                }, 2000);
            } else {
                $utils.showToast("icon-toast-wrong", "保存失败", 2000);
            }
        }).catch(function (error) {
            console.log(error);
        });
    });

    // 获取位置的函数
    function getlocation(isAdd = true) {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                // 当前位置的经纬度
                let lng = parseFloat(r.longitude)
                let lat = parseFloat(r.latitude)
                if (isAdd == true) {
                    lng = lng + moveNumX; //经度
                    lat = lat + moveNumY; //纬度
                    // 随机乱逛
                    moveNumX += $utils.randomNum(0.0001, 0.0005);
                    moveNumY += $utils.randomNum(0.0001, 0.0005);
                    // 把当前的坐标存到数组中
                    pointArr.push({
                        lng: lng,
                        lat: lat
                    });
                    // 画线 
                    if (pointArr.length > 1) {
                        let startPoint = pointArr[pointArr.length - 2];
                        let endPoint = pointArr[pointArr.length - 1];
                        $utils.drawLine(map, startPoint, endPoint);
                        // 计算距离
                        km += $utils.calcDistance(startPoint, endPoint) * 1;
                        nowKm.textContent = km.toFixed(2);
                        cardRunKm.textContent = km.toFixed(2);
                        // 配速
                        let paceValue = $utils.calcPace(km, second);
                        speed.textContent = paceValue
                        pace.textContent = paceValue
                        // 千卡
                        calorieValue = $utils.calCalorie(km);
                        calorie.textContent = calorieValue;
                        useCalorie.textContent = calorieValue;
                    }
                }
                var point = new BMap.Point(lng, lat); //设置点坐标
                map.centerAndZoom(point, 18); //根据点坐标绘制地图
            } else {
                $utils.showToast("icon-toast-wrong", "获取位置失败", 2000);
            }
        });
    }
});