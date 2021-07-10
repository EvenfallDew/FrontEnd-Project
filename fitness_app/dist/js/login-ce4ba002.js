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

/***/ "./src/less/reg_log.less":
/*!*******************************!*\
  !*** ./src/less/reg_log.less ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://fitness_app/./src/less/reg_log.less?");

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
/*!*************************!*\
  !*** ./src/js/login.js ***!
  \*************************/
eval("\n\n// 引入对应的less样式\n\n__webpack_require__(/*! ../less/reg_log.less */ \"./src/less/reg_log.less\");\n\ndocument.ready(function () {\n    // 获取元素\n    var phone = document.querySelector(\"#phone\");\n    var password = document.querySelector(\"#password\");\n    var loginBtn = document.querySelector(\"#loginBtn\");\n    var msg = document.querySelector(\"#msg\");\n\n    // 测试专用\n    var testBtn = document.querySelector(\"#testBtn\");\n\n    // 表单验证\n    loginBtn.addEventListener(\"click\", function () {\n        // 获取输入内容\n        var phoneVal = phone.value;\n        var pwdVal = password.value;\n        // 逐条验证\n        if (!$utils.isPhoneNum(phoneVal)) {\n            msg.textContent = \"手机号码格式错误\";\n            return;\n        } else if (!$utils.isPassword(pwdVal)) {\n            msg.textContent = \"字母开头,6~12位,含字母、数字下划线\";\n            return;\n        } else {\n            // 全部的格式通过，ajax登录传值验证是否已注册\n            msg.textContent = \"\";\n            axios.post($utils.BASE_URL + \"/users/login\", {\n                \"account\": phoneVal,\n                \"password\": pwdVal\n            }).then(function (res) {\n                // 获取返回数据\n                var result = res.data;\n                // 登录成功\n                if (result.status == 0) {\n                    // 弹窗提示\n                    $utils.showToast(\"icon-toast-correct\", \"登录成功\");\n                    // 提示栏清空\n                    msg.textContent = \"\";\n                    // 按钮禁用\n                    loginBtn.disabled = true;\n                    // 获取数据到本地存储\n                    localStorage.setItem(\"user\", JSON.stringify(result.data.user));\n                    // 3秒后跳转主页\n                    setTimeout(function () {\n                        location.href = \"./index.html\";\n                    }, 3000);\n                } else if (result.status == 555) {\n                    // 按钮禁用\n                    loginBtn.disabled = true;\n                    // 提示栏显示失败原因\n                    msg.textContent = res.data.msg;\n                    // 失败弹窗提示\n                    $utils.showToast(\"icon-toast-wrong\", \"登录失败\");\n                    // 3秒后恢复按钮\n                    setTimeout(function () {\n                        loginBtn.disabled = false;\n                    }, 3000);\n                }\n            }).catch(function (error) {\n                console.log(error);\n            });\n        }\n    });\n\n    // 测试专用\n    testBtn.addEventListener(\"click\", function () {\n        phone.value = \"13333333335\";\n        password.value = \"a123123\";\n    });\n});\n\n//# sourceURL=webpack://fitness_app/./src/js/login.js?");
}();
/******/ })()
;