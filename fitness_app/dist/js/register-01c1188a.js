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

/***/ "./src/libs/captcha/captcha-mini.js":
/*!******************************************!*\
  !*** ./src/libs/captcha/captcha-mini.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\n\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\r\n * Created by saucxs on 2019/3/1.\r\n */\n\nfunction CaptchaMini() {\n    var _this = this;\n\n    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n    var middleParams = Object.assign({\n        lineWidth: 0.5, //线条宽度\n        lineNum: 2, //线条数量\n        dotR: 1, //点的半径\n        dotNum: 15, //点的数量\n        preGroundColor: [10, 80], //前景色区间\n        backGroundColor: [150, 250], //背景色区间\n        fontSize: 20, //字体大小\n        fontFamily: ['Georgia', '微软雅黑', 'Helvetica', 'Arial'], //字体类型\n        fontStyle: 'fill', //字体绘制方法，有fill和stroke\n        content: 'acdefhijkmnpwxyABCDEFGHJKMNPQWXY12345789', //验证码内容\n        length: 4 //验证码长度\n    }, params);\n    Object.keys(middleParams).forEach(function (item) {\n        _this[item] = middleParams[item];\n    });\n    this.canvas = null;\n    this.paint = null;\n};\n\n/*Captcha的原型上绑定方法\r\n* 获取区间的随机数\r\n* params []*/\nCaptchaMini.prototype.getRandom = function () {\n    for (var _len = arguments.length, arr = Array(_len), _key = 0; _key < _len; _key++) {\n        arr[_key] = arguments[_key];\n    }\n\n    arr.sort(function (a, b) {\n        return a - b;\n    });\n    return Math.floor(Math.random() * (arr[1] - arr[0]) + arr[0]);\n};\n\n/*Captcha的原型上绑定方法\r\n* 获取随机颜色\r\n* params []*/\nCaptchaMini.prototype.getColor = function (arr) {\n    var _this2 = this;\n\n    var colors = new Array(3).fill('');\n    colors = colors.map(function (item) {\n        return _this2.getRandom.apply(_this2, _toConsumableArray(arr));\n    });\n    return colors;\n};\n\n/*Captcha的原型上绑定方法\r\n* 获取验证码*/\nCaptchaMini.prototype.getText = function () {\n    var length = this.content.length;\n    var str = '';\n    for (var i = 0; i < this.length; i++) {\n        str += this.content[this.getRandom(0, length)];\n    }\n    return str;\n};\n\n/*Captcha的原型上绑定方法\r\n* 绘制线条*/\nCaptchaMini.prototype.line = function () {\n    for (var i = 0; i < this.lineNum; i++) {\n        /*随机获取线条的起始位置*/\n        var x = this.getRandom(0, this.canvas.width);\n        var y = this.getRandom(0, this.canvas.height);\n        var endX = this.getRandom(0, this.canvas.width);\n        var endY = this.getRandom(0, this.canvas.height);\n\n        this.paint.beginPath();\n        this.paint.lineWidth = this.lineWidth;\n\n        /*获取颜色路径*/\n        var colors = this.getColor(this.preGroundColor);\n        this.paint.strokeStyle = 'rgba(' + colors[0] + ',' + colors[1] + ',' + colors[2] + ',' + '0.8)';\n\n        /*绘制路径*/\n        this.paint.moveTo(x, y);\n        this.paint.lineTo(endX, endY);\n        this.paint.closePath();\n        this.paint.stroke();\n    }\n};\n\n/*Captcha的原型上绑定方法\r\n* 绘制圆点*/\nCaptchaMini.prototype.circle = function () {\n    for (var i = 0; i < this.dotNum; i++) {\n        /*随机获取圆心*/\n        var x = this.getRandom(0, this.canvas.width);\n        var y = this.getRandom(0, this.canvas.height);\n        this.paint.beginPath();\n        /*绘制圆*/\n        this.paint.arc(x, y, this.dotR, 0, Math.PI * 2, false);\n        this.paint.closePath();\n        /*随机获取路径颜色*/\n        var colors = this.getColor(this.preGroundColor);\n        this.paint.fillStyle = 'rgba(' + colors[0] + ',' + colors[1] + ',' + colors[2] + ',' + '0.8)';\n        /*绘制*/\n        this.paint.fill();\n    }\n};\n\n/*Captcha的原型上绑定方法\r\n* 绘制文字*/\nCaptchaMini.prototype.font = function () {\n    var str = this.getText();\n    this.callback(str);\n    /*指定文字风格*/\n    this.paint.font = this.fontSize + 'px ' + this.fontFamily[this.getRandom(0, this.fontFamily.length)];\n    this.paint.textBaseline = 'middle';\n    /*指定文字绘制风格*/\n    var fontStyle = this.fontStyle + 'Text';\n    var colorStyle = this.fontStyle + 'Style';\n    for (var i = 0; i < this.length; i++) {\n        var fontWidth = this.paint.measureText(str[i]).width;\n        var x = this.getRandom(this.canvas.width / this.length * i + 0.2 * fontWidth, this.canvas.width / this.length * i + 0.5 * fontWidth);\n        /*随机获取字体的旋转角度*/\n        var deg = this.getRandom(-6, 6);\n        /*随机获取文字颜色*/\n        var colors = this.getColor(this.preGroundColor);\n        this.paint[colorStyle] = 'rgba(' + colors[0] + ',' + colors[1] + ',' + colors[2] + ',' + '0.8)';\n        /*开始绘制*/\n        this.paint.save();\n        this.paint.rotate(deg * Math.PI / 180);\n        this.paint[fontStyle](str[i], x, this.canvas.height / 2);\n        this.paint.restore();\n    }\n};\n\n/*Captcha的原型上绑定方法\r\n* 绘制图形*/\nCaptchaMini.prototype.draw = function (dom) {\n    var _this3 = this;\n\n    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};\n\n    /*获取canvas的dom*/\n    if (!this.paint) {\n        this.canvas = dom;\n        if (!this.canvas) return;else this.paint = this.canvas.getContext('2d');\n        /*回调函数赋值给this*/\n        this.callback = callback;\n        this.canvas.onclick = function () {\n            _this3.drawAgain();\n        };\n    }\n    /*随机画布颜色，使用背景色*/\n    var colors = this.getColor(this.backGroundColor);\n    this.paint.fillStyle = 'rgba(' + colors[0] + ',' + colors[1] + ',' + colors[2] + ',' + '0.8)';\n\n    /*绘制画布*/\n    this.paint.fillRect(0, 0, this.canvas.width, this.canvas.height);\n\n    /*绘图*/\n    this.circle();\n    this.line();\n    this.font();\n};\n\n/*Captcha的原型上绑定方法\r\n* 清空画布*/\nCaptchaMini.prototype.clear = function () {\n    this.paint.clearRect(0, 0, this.canvas.width, this.canvas.height);\n};\n\n/*Captcha的原型上绑定方法\r\n* 重新绘制*/\nCaptchaMini.prototype.drawAgain = function () {\n    this.clear();\n    this.draw(this.callbak);\n};\n\nif ( true && !module.nodeType && module.exports) {\n    module.exports = CaptchaMini;\n}\n\n//# sourceURL=webpack://fitness_app/./src/libs/captcha/captcha-mini.js?");

/***/ }),

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
!function() {
/*!****************************!*\
  !*** ./src/js/register.js ***!
  \****************************/
eval("\n\n// 引入当前页面对应的样式文件\n\n__webpack_require__(/*! ../less/reg_log.less */ \"./src/less/reg_log.less\");\n\n//引入注册码的js\nvar CaptchaMini = __webpack_require__(/*! ../libs/captcha/captcha-mini.js */ \"./src/libs/captcha/captcha-mini.js\");\n\ndocument.ready(function () {\n    // 验证码设置\n    var captchaText = new CaptchaMini({\n        lineNum: 1, //线条的数量\n        dotNum: 5, //点的数量\n        length: 4 //验证码的个数\n    });\n\n    // 获取正确的验证码的值\n    var captCode = \"\";\n    captchaText.draw(document.querySelector('#captchaText'), function (r) {\n        captCode = r;\n    });\n\n    // 获取元素\n    var phone = document.querySelector(\"#phone\");\n    var captcha = document.querySelector(\"#captcha\");\n    var password = document.querySelector(\"#password\");\n    var rePassword = document.querySelector(\"#rePassword\");\n    var registerBtn = document.querySelector(\"#registerBtn\");\n    var msg = document.querySelector(\"#msg\");\n\n    // 测试专用\n    var testBtn = document.querySelector(\"#testBtn\");\n\n    // 表单验证\n    registerBtn.addEventListener(\"click\", function () {\n        // 获取输入内容\n        var phoneVal = phone.value;\n        var captchaVal = captcha.value;\n        var pwdVal = password.value;\n        var rePwdVal = rePassword.value;\n        // 逐条验证\n        if (!$utils.isPhoneNum(phoneVal)) {\n            msg.textContent = \"手机号码格式错误\";\n            return;\n        } else if (captchaVal.toLowerCase() != captCode.toLowerCase()) {\n            msg.textContent = \"验证码错误\";\n            return;\n        } else if (!$utils.isPassword(pwdVal)) {\n            msg.textContent = \"字母开头,6~12位,含字母、数字下划线\";\n            return;\n        } else if (pwdVal != rePwdVal) {\n            msg.textContent = \"两次输入密码不一致\";\n            return;\n        } else {\n            // 全部的格式通过，ajax注册传值验证是否已注册\n            axios.post(\"http://139.9.177.51:8099/users/add\", {\n                \"account\": phoneVal,\n                \"password\": pwdVal\n            }).then(function (res) {\n                // 获取返回数据\n                var result = res.data;\n                // 注册成功\n                if (result.status == 0) {\n                    // 弹窗提示\n                    $utils.showToast(\"icon-toast-correct\", \"注册成功\");\n                    // 按钮禁用\n                    registerBtn.disabled = true;\n                    // 3秒后跳转登录\n                    setTimeout(function () {\n                        location.href = \"./login.html\";\n                    }, 3000);\n                } else if (result.status == 1) {\n                    // 按钮禁用\n                    registerBtn.disabled = true;\n                    // 注册失败弹窗提示\n                    $utils.showToast(\"icon-toast-wrong\", \"注册失败\");\n                    // 3秒后恢复按钮\n                    setTimeout(function () {\n                        registerBtn.disabled = false;\n                    }, 3000);\n                }\n            }).catch(function (error) {\n                console.log(error);\n            });\n        }\n    });\n\n    // 测试专用\n    testBtn.addEventListener(\"click\", function () {\n        phone.value = \"13333333333\";\n        captcha.value = captCode;\n        password.value = \"a123123\";\n        rePassword.value = \"a123123\";\n    });\n});\n\n//# sourceURL=webpack://fitness_app/./src/js/register.js?");
}();
/******/ })()
;