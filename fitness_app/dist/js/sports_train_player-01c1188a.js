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

/***/ "./src/less/sports_train_player.less":
/*!*******************************************!*\
  !*** ./src/less/sports_train_player.less ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://fitness_app/./src/less/sports_train_player.less?");

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
/*!***************************************!*\
  !*** ./src/js/sports_train_player.js ***!
  \***************************************/
eval("\n\n// 引入当前页面对应的样式文件\n\n__webpack_require__(/*! ../less/sports_train_player.less */ \"./src/less/sports_train_player.less\");\n\ndocument.ready(function () {\n    // 获取元素 \n    var video = document.querySelector(\"#video\"); //视频标签\n    var currentPart = document.querySelector(\"#currentPart\"); //当前视频\n    var countPart = document.querySelector(\"#countPart\"); //视频个数\n    var title = document.querySelector(\"#title\"); //视频标题\n    var progress = document.querySelector(\"#progress\"); //进度条\n    var prevBtn = document.querySelector(\"#prevBtn\"); //上一个按钮\n    var nextBtn = document.querySelector(\"#nextBtn\"); //下一个按钮\n    var mask = document.querySelector(\"#mask\"); //蒙层\n    var continuePlay = document.querySelector(\"#continuePlay\"); //继续训练按钮\n    var stopPlay = document.querySelector(\"#stopPlay\"); // 停止按钮\n    var pauseBtn = document.querySelector(\"#pauseBtn\"); //暂停按钮\n    var currentImg = document.querySelector(\"#currentImg\"); //当前视频的图片\n    var curTitle = document.querySelector(\"#curTitle\"); //当前视频标题\n    //从本地存储中获取视频\n    var frags = JSON.parse(localStorage.getItem(\"fragments\"));\n    var index = 0; //当前视频的索引\n    var videoCount = frags.length; //视频的总个数\n    // 屏幕的宽度\n    var screenWidth = screen.width;\n    var timerId = null;\n\n    /* 播放视频 */\n    function playVideo() {\n        video.src = $utils.BASE_URL + frags[index].videoUrl;\n        video.play();\n        progressBar();\n        // 显示视频信息\n        currentPart.textContent = index + 1;\n        countPart.textContent = videoCount;\n        title.textContent = frags[index].title;\n    }\n    playVideo();\n\n    /* 视频的结束事件 */\n    video.addEventListener(\"ended\", function () {\n        index++;\n        if (index < videoCount) {\n            playVideo();\n        } else {\n            clearInterval(timerId);\n        }\n    });\n\n    /* 下一个 */\n    nextBtn.addEventListener(\"click\", function () {\n        index++;\n        if (index <= videoCount - 1) {\n            playVideo();\n        } else {\n            index = videoCount - 1;\n        }\n    });\n\n    /* 上一个 */\n    prevBtn.addEventListener(\"click\", function () {\n        index--;\n        if (index < 0) {\n            index = 0;\n            return;\n        }\n        playVideo();\n    });\n\n    var timeArr = [];\n    // 进度条\n    function progressBar() {\n        clearInterval(timerId);\n        timerId = setInterval(function () {\n            timeArr[index] = video.currentTime; //把当前时间存在数组中\n            var curWidth = video.currentTime / video.duration * screenWidth;\n            progress.style.width = curWidth + \"px\";\n        }, 30);\n    }\n\n    /* 暂停按钮 */\n    pauseBtn.addEventListener(\"click\", function () {\n        //1 弹出蒙层\n        mask.style.display = \"block\";\n        //2 停止视频播放\n        video.pause();\n        //3 停止定时器\n        clearInterval(timerId);\n        if (index == videoCount) {\n            index = videoCount - 1;\n        }\n        //4 修改蒙层中的信息\n        currentImg.src = $utils.BASE_URL + frags[index].imgUrl;\n        curTitle.textContent = frags[index].title;\n    });\n\n    /* 继续训练 */\n    continuePlay.addEventListener(\"click\", function () {\n        // 隐藏蒙层\n        mask.style.display = \"none\";\n        // 开始视频播放\n        video.play();\n        // 进度条继续\n        progressBar();\n    });\n\n    // 结束训练\n    stopPlay.addEventListener(\"click\", function () {\n        // 隐藏蒙层\n        mask.style.display = \"none\";\n        // 存储数据\n        var cid = location.search.split(\"=\")[1]; //课程id\n        var userId = JSON.parse(localStorage.getItem(\"user\")).userId; //用户id\n        var countTime = 0; //训练的时间\n        timeArr.forEach(function (v) {\n            countTime += v;\n        });\n        axios.post($utils.BASE_URL + \"/sports/saveTrain\", {\n            id: cid, //课程id\n            userId: userId, //用户id\n            takeTime: countTime, //训练的时间\n            calorie: countTime * 1.2 //卡路里\n        }).then(function (res) {\n            var result = res.data;\n            if (result.status == 0) {\n                $utils.showToast(\"icon-toast-correct\", \"数据保存成功\", 2000);\n                setTimeout(function () {\n                    location.href = \"./sports_train.html\";\n                }, 2000);\n            } else {\n                $utils.showToast(\"icon-toast-wrong\", \"请联系后端\", 2000);\n                setTimeout(function () {\n                    location.href = \"./sports_train.html\";\n                }, 2000);\n            }\n        }).catch(function (error) {\n            console.log(error);\n        });\n    });\n});\n\n//# sourceURL=webpack://fitness_app/./src/js/sports_train_player.js?");
}();
/******/ })()
;