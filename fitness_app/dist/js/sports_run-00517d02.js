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
eval("\n\n// 引入当前页面对应的样式文件\n\n__webpack_require__(/*! ../less/sports_run.less */ \"./src/less/sports_run.less\");\n\ndocument.ready(function () {\n    // 头部封装\n    $utils.commonHeader();\n    // 底部封装\n    $utils.commonFooter();\n\n    var userId = JSON.parse(localStorage.getItem(\"user\")).userId;\n\n    var goBtn = document.querySelector(\"#goBtn\");\n    var runKm = document.querySelector(\"#runKm\");\n    var myMap = document.querySelector(\"#map\");\n\n    var maskTime = document.querySelector(\"#maskTime\"); //倒计时蒙层\n    var maskData = document.querySelector(\"#maskData\"); //数据模式蒙层\n    var mapMask = document.querySelector(\"#mapMask\"); //地图模式蒙层\n    var timeNum = document.querySelector(\"#timeNum\"); //倒计时数字\n    var takeTime = document.querySelector(\"#takeTime\"); //用时\n    var continueBtn = document.querySelector(\"#continueBtn\"); //继续按钮\n    var pauseBtn = document.querySelector(\"#pauseBtn\"); //暂停按钮\n    var stopBtn = document.querySelector(\"#stopBtn\"); //停止按钮\n    var iconLocation = document.querySelector(\"#iconLocation\"); //地图图标按钮\n    var backBtn = document.querySelector(\"#backBtn\"); //返回按钮\n    var finishBtn = document.querySelector(\"#finishBtn\"); //完成按钮\n\n    // 获取累积跑步距离\n    function getRunKm() {\n        axios.get($utils.BASE_URL + \"/sports/exerciseData?id=\" + userId).then(function (res) {\n            var result = res.data;\n            if (result.status === 0) {\n                runKm.textContent = result.data.runkm;\n            }\n        }).catch(function (error) {\n            console.log(error);\n        });\n    }\n    getRunKm();\n\n    // 初始化地图\n    function initMap() {\n        var map = new BMap.Map(myMap); //实例化地图区域\n        var geolocation = new BMap.Geolocation();\n        geolocation.getCurrentPosition(function (r) {\n            if (this.getStatus() == BMAP_STATUS_SUCCESS) {\n                var lng = r.longitude; //经度\n                var lat = r.latitude; //纬度\n                var point = new BMap.Point(lng, lat); //根据经纬度设置坐标\n                map.centerAndZoom(point, 12); //根据经纬度绘制地图\n            } else {\n                alert('failed' + this.getStatus());\n            }\n            // 隐藏小图标\n            document.querySelector(\".anchorBL\").style.display = \"none\";\n        });\n    }\n    initMap();\n\n    /* go按钮的点击事件 */\n    goBtn.addEventListener(\"click\", function () {\n        //显示倒计时蒙层\n        maskTime.style.display = \"block\";\n        var arr = [3, 2, 1, \"GO\"];\n        var index = 0;\n        timeNum.textContent = arr[index]; //初始化页面\n        /* 倒计时 */\n        var timerId = setInterval(function () {\n            index++;\n            timeNum.textContent = arr[index];\n            if (index == arr.length) {\n                // 清除定时器\n                clearInterval(timerId);\n                // 隐藏倒计时蒙层\n                maskTime.style.display = \"none\";\n                // 显示数据模式蒙层\n                maskData.style.display = \"block\";\n                // 开始跑步\n                startRun();\n            }\n        }, 1000);\n    });\n\n    var i = 0;\n    var timerId = null;\n    /* 定义跑步函数 */\n    function startRun() {\n        clearInterval(timerId);\n        timerId = setInterval(function () {\n            i++;\n            takeTime.textContent = $utils.secondToHms(i);\n        }, 1000);\n    }\n\n    /* 暂停按钮 */\n    pauseBtn.addEventListener(\"click\", function () {\n        // 1 清除定时器\n        clearInterval(timerId);\n        // 2 隐藏自身\n        this.style.display = \"none\";\n        // 3 显示继续按钮\n        continueBtn.style.display = \"flex\";\n        // 4 显示结束按钮\n        stopBtn.style.display = \"flex\";\n    });\n\n    /* 继续按钮 */\n    continueBtn.addEventListener(\"click\", function () {\n        // 1 继续跑\n        startRun();\n        // 2 隐藏自己\n        this.style.display = \"none\";\n        // 3 隐藏结束\n        stopBtn.style.display = \"none\";\n        // 4 显示暂停\n        pauseBtn.style.display = \"flex\";\n    });\n\n    // 停止按钮\n    stopBtn.addEventListener(\"click\", function () {\n        mapMask.style.display = \"block\"; //显示地图模式蒙层\n        finishBtn.style.display = \"block\"; //显示完成按钮\n        backBtn.style.display = \"none\"; //隐藏返回按钮\n    });\n\n    /* 地图图标按钮 */\n    iconLocation.addEventListener(\"click\", function () {\n        mapMask.style.display = \"block\"; //显示地图模式蒙层\n        backBtn.style.display = \"block\"; //显示返回按钮\n        finishBtn.style.display = \"none\"; //隐藏完成按钮\n    });\n\n    /* 返回按钮 */\n    backBtn.addEventListener(\"click\", function () {\n        mapMask.style.display = \"none\"; //隐藏地图模式蒙层\n    });\n\n    // 完成按钮\n    finishBtn.addEventListener(\"click\", function () {\n        $utils.showToast(\"icon-toast-correct\", \"完成跑步\", 2000);\n        setTimeout(function () {\n            location.href = \"./sports_run.html\";\n        }, 2000);\n    });\n});\n\n//# sourceURL=webpack://fitness_app/./src/js/sports_run.js?");
}();
/******/ })()
;