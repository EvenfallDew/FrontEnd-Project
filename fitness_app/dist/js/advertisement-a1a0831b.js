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

/***/ "./src/less/advertisement.less":
/*!*************************************!*\
  !*** ./src/less/advertisement.less ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://fitness_app/./src/less/advertisement.less?");

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
/*!*********************************!*\
  !*** ./src/js/advertisement.js ***!
  \*********************************/
eval("\n\n// 引入对应的less\n\n__webpack_require__(/*! ../less/advertisement.less */ \"./src/less/advertisement.less\");\n\ndocument.ready(function () {\n    var skipBtnCutDown = document.querySelector(\"#skipBtnCutDown\");\n    var num = 3;\n    skipBtnCutDown.textContent = num;\n    // 倒计时自动跳过\n    var timer = setInterval(function () {\n        num = num - 1;\n        if (num == 0) {\n            clearInterval(timer);\n            // 跳转登录页\n            location.href = \"./login.html\";\n        } else {\n            skipBtnCutDown.textContent = num;\n        }\n    }, 1000);\n\n    // 手动跳过广告\n    var skipBtn = document.querySelector(\"#skipBtn\");\n    skipBtn.addEventListener(\"click\", function () {\n        location.href = \"./login.html\";\n    });\n});\n\n//# sourceURL=webpack://fitness_app/./src/js/advertisement.js?");
}();
/******/ })()
;