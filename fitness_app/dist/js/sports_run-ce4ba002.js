/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/less/sports_run.less":
/*!**********************************!*\
  !*** ./src/less/sports_run.less ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://fitness_app/./src/less/sports_run.less?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
!function() {
/*!******************************!*\
  !*** ./src/js/sports_run.js ***!
  \******************************/
eval("\n\n// 引入当前页面对应的样式文件\n\n__webpack_require__(/*! ../less/sports_run.less */ \"./src/less/sports_run.less\");\n\ndocument.ready(function () {\n    // 头部封装\n    $utils.commonHeader();\n    // 底部封装\n    $utils.commonFooter();\n    // 获取本地存储数据\n    var userId = JSON.parse(localStorage.getItem(\"user\")).userId;\n\n    var goBtn = document.querySelector(\"#goBtn\");\n    var runKm = document.querySelector(\"#runKm\");\n    var myMap = document.querySelector(\"#map\");\n\n    var maskTime = document.querySelector(\"#maskTime\"); //倒计时蒙层\n    var maskData = document.querySelector(\"#maskData\"); //数据模式蒙层\n    var mapMask = document.querySelector(\"#mapMask\"); //地图模式蒙层\n    var timeNum = document.querySelector(\"#timeNum\"); //倒计时数字\n    var takeTime = document.querySelector(\"#takeTime\"); //用时\n    var continueBtn = document.querySelector(\"#continueBtn\"); //继续按钮\n    var pauseBtn = document.querySelector(\"#pauseBtn\"); //暂停按钮\n    var stopBtn = document.querySelector(\"#stopBtn\"); //停止按钮\n    var iconLocation = document.querySelector(\"#iconLocation\"); //地图图标按钮\n    var backBtn = document.querySelector(\"#backBtn\"); //返回按钮\n    var finishBtn = document.querySelector(\"#finishBtn\"); //完成按钮\n\n    var nowDate = document.querySelector(\"#nowDate\"); //卡片中日期\n    var pace = document.querySelector(\"#mapSpeed\"); //卡片中的配速\n    var useTime = document.querySelector(\"#mapTakeTime\"); //卡片中的用时\n    var useCalorie = document.querySelector(\"#mapCalorie\"); //卡片中的千卡\n\n    var nowKm = document.querySelector(\"#nowKm\"); //跑步距离\n    var cardRunKm = document.querySelector(\"#cardRunKm\"); //跑步距离\n    var speed = document.querySelector(\"#speed\"); //跑步距离\n    var calorie = document.querySelector(\"#calorie\"); //千卡\n\n    var second = 0; //秒（用时）\n    var timerId = null;\n    // 指定区域创建地图对象\n    var map = new BMap.Map(\"mapMode\");\n    // 模拟跑步的距离\n    var moveNumX = 0.0001;\n    var moveNumY = 0.0001;\n    // 存放点坐标的数组\n    var pointArr = [];\n    // 跑步的距离\n    var km = 0;\n    // 卡路里\n    var calorieValue = 0;\n    // 日期\n    nowDate.textContent = $utils.formatDate(new Date());\n\n    // 获取累积跑步距离\n    function getRunKm() {\n        axios.get($utils.BASE_URL + \"/sports/exerciseData?id=\" + userId).then(function (res) {\n            var result = res.data;\n            if (result.status == 0) {\n                runKm.textContent = result.data.runkm;\n            }\n        }).catch(function (error) {\n            console.log(error);\n        });\n    }\n    getRunKm();\n\n    // 初始化地图\n    function initMap() {\n        var map = new BMap.Map(myMap); //实例化地图区域\n        var geolocation = new BMap.Geolocation();\n        geolocation.getCurrentPosition(function (r) {\n            if (this.getStatus() == BMAP_STATUS_SUCCESS) {\n                var lng = r.longitude; //经度\n                var lat = r.latitude; //纬度\n                var point = new BMap.Point(lng, lat); //根据经纬度设置坐标\n                map.centerAndZoom(point, 12); //根据经纬度绘制地图\n            } else {\n                alert('failed' + this.getStatus());\n            }\n            // 隐藏小图标\n            document.querySelector(\".anchorBL\").style.display = \"none\";\n        });\n    }\n    initMap();\n\n    /* go按钮的点击事件 */\n    goBtn.addEventListener(\"click\", function () {\n        // 显示倒计时蒙层\n        maskTime.style.display = \"block\";\n        var arr = [3, 2, 1, \"GO\"];\n        var index = 0;\n        timeNum.textContent = arr[index]; //初始化页面\n        /* 倒计时 */\n        var timerId = setInterval(function () {\n            index++;\n            timeNum.textContent = arr[index];\n            if (index == arr.length) {\n                // 清除定时器\n                clearInterval(timerId);\n                // 隐藏倒计时蒙层\n                maskTime.style.display = \"none\";\n                // 显示数据模式蒙层\n                maskData.style.display = \"block\";\n                // 开始跑步\n                startRun();\n            }\n        }, 1000);\n    });\n\n    /* 定义跑步函数 */\n    function startRun() {\n        clearInterval(timerId);\n        timerId = setInterval(function () {\n            second++;\n            //数据模式中的数据\n            takeTime.textContent = $utils.secondToHms(second); //用时\n            //渲染卡片中的数据\n            useTime.textContent = $utils.secondToHms(second);\n            //调用获取位置的函数\n            getlocation();\n        }, 1000);\n    }\n\n    /* 暂停按钮 */\n    pauseBtn.addEventListener(\"click\", function () {\n        // 1 清除定时器\n        clearInterval(timerId);\n        // 2 隐藏自身\n        pauseBtn.style.display = \"none\";\n        // 3 显示继续按钮\n        continueBtn.style.display = \"flex\";\n        // 4 显示结束按钮\n        stopBtn.style.display = \"flex\";\n    });\n\n    /* 继续按钮 */\n    continueBtn.addEventListener(\"click\", function () {\n        // 1 继续跑\n        startRun();\n        // 2 隐藏自己\n        this.style.display = \"none\";\n        // 3 隐藏结束\n        stopBtn.style.display = \"none\";\n        // 4 显示暂停\n        pauseBtn.style.display = \"flex\";\n    });\n\n    // 停止按钮\n    stopBtn.addEventListener(\"click\", function () {\n        mapMask.style.display = \"block\"; //显示地图模式蒙层\n        finishBtn.style.display = \"block\"; //显示完成按钮\n        backBtn.style.display = \"none\"; //隐藏返回按钮\n    });\n\n    /* 地图图标按钮 */\n    iconLocation.addEventListener(\"click\", function () {\n        mapMask.style.display = \"block\"; //显示地图模式蒙层\n        backBtn.style.display = \"block\"; //显示返回按钮\n        finishBtn.style.display = \"none\"; //隐藏完成按钮\n        getlocation();\n    });\n\n    /* 返回按钮 */\n    backBtn.addEventListener(\"click\", function () {\n        mapMask.style.display = \"none\"; //隐藏地图模式蒙层\n    });\n\n    // 完成按钮\n    finishBtn.addEventListener(\"click\", function () {\n        mapMask.style.display = \"none\";\n        maskData.style.display = \"none\";\n        // 显示暂停\n        pauseBtn.style.display = \"flex\";\n        // 隐藏继续\n        continueBtn.style.display = \"none\";\n        // 隐藏结束\n        stopBtn.style.display = \"none\";\n        // 清除定时器\n        clearInterval(timerId);\n        // 用时\n        takeTime.textContent = $utils.secondToHms(second);\n        useTime.textContent = $utils.secondToHms(second);\n        axios.post($utils.BASE_URL + \"/sports/save\", {\n            id: userId, //用户id\n            type: 1, //跑步\n            takeTime: second, //用时\n            miles: km, //跑步距离\n            averagerate: (km / second).toFixed(2), //平均速度\n            calorie: calorieValue //卡路里\n        }).then(function (res) {\n            var result = res.data;\n            if (result.status == 0) {\n                // 保存成功\n                $utils.showToast(\"icon-toast-correct\", \"保存成功\", 2000);\n                setTimeout(function () {\n                    location.reload();\n                    // 重置时间\n                    second = 0;\n                }, 2000);\n            } else {\n                $utils.showToast(\"icon-toast-wrong\", \"保存失败\", 2000);\n            }\n        }).catch(function (error) {\n            console.log(error);\n        });\n    });\n\n    /* 获取位置的函数 */\n    function getlocation() {\n        var geolocation = new BMap.Geolocation();\n        geolocation.getCurrentPosition(function (r) {\n            if (this.getStatus() == BMAP_STATUS_SUCCESS) {\n                // 当前位置的经纬度\n                var lng = parseFloat(r.longitude) + moveNumX; //经度\n                var lat = parseFloat(r.latitude) + moveNumY; //纬度\n                // 随机乱逛\n                moveNumX += $utils.randomNum(0.0001, 0.0005);\n                moveNumY += $utils.randomNum(0.0001, 0.0005);\n                // 把当前的坐标存到数组中\n                pointArr.push({\n                    lng: lng,\n                    lat: lat\n                });\n                // 画线 \n                if (pointArr.length > 1) {\n                    var startPoint = pointArr[pointArr.length - 2];\n                    var endPoint = pointArr[pointArr.length - 1];\n                    $utils.drawLine(map, startPoint, endPoint);\n                    // 计算距离\n                    km += $utils.calcDistance(startPoint, endPoint) * 1;\n                    nowKm.textContent = km.toFixed(2);\n                    cardRunKm.textContent = km.toFixed(2);\n                    // 配速\n                    var paceValue = $utils.calcPace(km, second);\n                    speed.textContent = paceValue;\n                    pace.textContent = paceValue;\n                    // 千卡\n                    calorieValue = $utils.calCalorie(km);\n                    calorie.textContent = calorieValue;\n                    useCalorie.textContent = calorieValue;\n                }\n                var point = new BMap.Point(lng, lat); //设置点坐标\n                map.centerAndZoom(point, 18); //根据点坐标绘制地图\n            } else {\n                $utils.showToast(\"icon-toast-wrong\", \"获取位置失败\", 2000);\n            }\n        });\n    }\n});\n\n//# sourceURL=webpack://fitness_app/./src/js/sports_run.js?");
}();
/******/ })()
;