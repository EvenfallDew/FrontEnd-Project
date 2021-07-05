/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/less/mine.less":
/*!****************************!*\
  !*** ./src/less/mine.less ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://fitness_app/./src/less/mine.less?");

/***/ }),

/***/ "./src/images/headerPic.jpg":
/*!**********************************!*\
  !*** ./src/images/headerPic.jpg ***!
  \**********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"images/7a661d86.jpg\";\n\n//# sourceURL=webpack://fitness_app/./src/images/headerPic.jpg?");

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
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	}();
/******/ 	
/************************************************************************/
!function() {
"use strict";
/*!************************!*\
  !*** ./src/js/mine.js ***!
  \************************/
eval("\n\n// 引入对应的less样式\n\n__webpack_require__(/*! ../less/mine.less */ \"./src/less/mine.less\");\n\ndocument.ready(function () {\n    // 底部封装\n    $utils.commonFooter();\n\n    // 接口地址\n    var BASE_URL = \"http://139.9.177.51:8099\";\n\n    // 获取元素\n    var userHead = document.querySelector(\"#userHead\");\n    var headPic = document.querySelector(\"#headPic\");\n    var uploadHead = document.querySelector(\"#uploadHead\");\n    var userName = document.querySelector(\"#userName\");\n    var signText = document.querySelector(\"#signText\");\n    var dataMin = document.querySelector(\"#dataMin\");\n    var dataCalory = document.querySelector(\"#dataCalory\");\n\n    // 获取数据\n    var userId = null;\n    if (JSON.parse(localStorage.getItem(\"user\")) == null) {\n        $utils.showToast(\"icon-toast-wrong\", \"请登录\", 3000);\n        // 跳转登录页面\n        setTimeout(function () {\n            location.href = \"./login.html\";\n        }, 3000);\n    } else {\n        // 获取本地存储\n        userId = JSON.parse(localStorage.getItem(\"user\")).userId;\n    }\n\n    // 修改头像\n    uploadHead.addEventListener(\"change\", function () {\n        var file = this.files[0];\n        // 创建一个FormData对象\n        var formData = new FormData();\n        // 添加内容\n        formData.append(\"imgurl\", file);\n        // 发送ajax请求\n        axios.post(BASE_URL + \"/users/upload\", formData).then(function (res) {\n            var result = res.data;\n            //上传成功\n            if (result.status == 0) {\n                // 把上传之后的图片显示在页面上\n                headPic.src = BASE_URL + result.data; //result.data是图片地址\n                // 发请求去修改后台的数据库\n                axios.post(BASE_URL + \"/users/userEdit\", {\n                    \"userId\": userId,\n                    \"imgurl\": result.data\n                }).then(function (res) {\n                    var result = res.data;\n                    if (result.status == 0) {\n                        // 修改成功\n                        console.log(\"修改成功\");\n                    } else {\n                        // 修改失败\n                        console.log(\"修改失败\");\n                    }\n                }).catch(function (error) {\n                    console.log(error);\n                });\n                $utils.showToast(\"icon-toast-correct\", \"上传成功\", 2000);\n            }\n        }).catch(function (error) {\n            console.log(error);\n        });\n    });\n\n    // 点击头像修改头像\n    userHead.addEventListener(\"click\", function () {\n        uploadHead.click();\n    });\n\n    // 获取信息\n    function getData() {\n        axios.get(BASE_URL + \"/users/accountinfo?userId=\" + userId).then(function (res) {\n            var result = res.data;\n            if (result.status == 0) {\n                // 覆盖本地数据\n                localStorage.setItem(\"user\", JSON.stringify(result.data));\n                // 显示在页面上\n                render(result.data);\n            }\n        }).catch(function (error) {\n            console.log(error);\n        });\n    }\n    getData();\n\n    // 定义一个显示数据的函数\n    function render(obj) {\n        // 头像\n        headPic.src = obj.imgurl ? BASE_URL + obj.imgurl : __webpack_require__(/*! ../images/headerPic.jpg */ \"./src/images/headerPic.jpg\");\n        // 昵称\n        userName.textContent = obj.nickname;\n        // 签名\n        signText.textContent = obj.sign ? obj.sign : \"这个人很懒，什么都没有留下\";\n    }\n\n    // 退出登录\n    var logoutBtn = document.querySelector(\"#logoutBtn\");\n    logoutBtn.addEventListener(\"click\", function () {\n        $utils.showToast(\"icon-toast-correct\", \"退出成功\", 2000);\n        localStorage.removeItem(\"user\");\n        // 跳转登录页面\n        setTimeout(function () {\n            location.href = \"./login.html\";\n        }, 2000);\n    });\n});\n\n//# sourceURL=webpack://fitness_app/./src/js/mine.js?");
}();
/******/ })()
;