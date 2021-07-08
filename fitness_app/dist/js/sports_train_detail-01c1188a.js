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

/***/ "./src/less/sports_train_detail.less":
/*!*******************************************!*\
  !*** ./src/less/sports_train_detail.less ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://fitness_app/./src/less/sports_train_detail.less?");

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
  !*** ./src/js/sports_train_detail.js ***!
  \***************************************/
eval("\n\n// 引入当前页面对应的样式文件\n\n__webpack_require__(/*! ../less/sports_train_detail.less */ \"./src/less/sports_train_detail.less\");\n\ndocument.ready(function () {\n    // 获取元素\n    var trainBtn = document.querySelector(\"#trainBtn\");\n\n    var courseImg = document.querySelector(\"#courseImg\");\n    var name = document.querySelector(\"#name\");\n    var calorie = document.querySelector(\"#calorie\");\n    var time = document.querySelector(\"#time\");\n    var peoplenum = document.querySelector(\"#peoplenum\");\n    var desc = document.querySelector(\"#desc\");\n    var frequency = document.querySelector(\"#frequency\");\n    var instrument = document.querySelector(\"#instrument\");\n\n    // 获取当前课程id\n    var cid = location.search.split(\"=\")[1];\n\n    // 发送请求获取课程详情\n    axios.get($utils.BASE_URL + \"/sports/courseDetail?id=\" + cid).then(function (res) {\n        var result = res.data;\n        if (result.status == 0) {\n            // 把当前课程的视频存到本地存储中\n            localStorage.setItem(\"fragments\", JSON.stringify(result.data.fragments));\n            // 把其它信息渲染到页面\n            courseImg.src = $utils.BASE_URL + result.data.imgurl;\n            name.textContent = result.data.name;\n            calorie.textContent = result.data.calorie;\n            time.textContent = result.data.time;\n            peoplenum.textContent = result.data.peoplenum;\n            desc.textContent = result.data.desc;\n            frequency.textContent = result.data.frequency;\n            instrument.textContent = result.data.instrument;\n        }\n    }).catch(function (error) {\n        console.log(error);\n    });\n\n    // 开心训练\n    trainBtn.addEventListener(\"click\", function () {\n        location.href = \"./sports_train_player.html?courseId=\" + cid;\n    });\n});\n\n//# sourceURL=webpack://fitness_app/./src/js/sports_train_detail.js?");
}();
/******/ })()
;