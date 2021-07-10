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
/*!*********************************!*\
  !*** ./src/js/common_js/dom.js ***!
  \*********************************/
eval("\n\n/**\r\n * 对 DOM 操作的封装\r\n */\n\n// 原生实现 JQuery 的 $(function() {})\ndocument.ready = function (callback) {\n  // 兼容 Chrome、FireFox 等\n  if (document.addEventListener) {\n    // DOMContentLoaded | MDN：https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded\n    // 当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完全加载。\n    document.addEventListener('DOMContentLoaded', function () {\n      callback();\n    });\n  }\n  // 兼容 IE - 了解\n  else if (document.attachEvent) {\n      document.attachEvent('onreadystatechange', function () {\n        if (document.readyState === 'complete') {\n          callback();\n        }\n      });\n    } else if (document.lastChild === document.body) {\n      callback();\n    }\n};\n\n//# sourceURL=webpack://fitness_app/./src/js/common_js/dom.js?");
/******/ })()
;