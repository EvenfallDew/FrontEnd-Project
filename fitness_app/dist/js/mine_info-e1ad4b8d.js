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

/***/ "./src/less/mine_info.less":
/*!*********************************!*\
  !*** ./src/less/mine_info.less ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://fitness_app/./src/less/mine_info.less?");

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
/*!*****************************!*\
  !*** ./src/js/mine_info.js ***!
  \*****************************/
eval("\n\n// 引入对应的less样式\n\n__webpack_require__(/*! ../less/mine_info.less */ \"./src/less/mine_info.less\");\n\ndocument.ready(function () {\n    // 接口地址\n    var BASE_URL = \"http://139.9.177.51:8099\";\n\n    // 获取本地存储信息\n    var userId = JSON.parse(localStorage.getItem(\"user\")).userId;\n\n    // 获取元素\n    var showSexPicker = document.querySelector(\"#showSexPicker\");\n    var showBirthdayPicker = document.querySelector(\"#showBirthdayPicker\");\n    var showProvincePicker = document.querySelector(\"#showProvincePicker\");\n    var showCityPicker = document.querySelector(\"#showCityPicker\");\n\n    var sex = document.querySelector(\"#sex\");\n    var birthday = document.querySelector(\"#birthday\");\n    var province = document.querySelector(\"#province\");\n    var city = document.querySelector(\"#city\");\n    var nickName = document.querySelector(\"#nickName\");\n    var signArea = document.querySelector(\"#signArea\");\n    var signNum = document.querySelector(\"#signNum\");\n    var saveBtn = document.querySelector(\"#saveBtn\");\n\n    // 省份数组\n    var provinceArr = [];\n    // 城市数组\n    var cityArr = [];\n\n    // 显示性别\n    showSexPicker.addEventListener('click', function () {\n        weui.picker([{\n            label: '男',\n            value: 0\n        }, {\n            label: '女',\n            value: 1\n        }, {\n            label: '不详',\n            value: 2\n        }], {\n            // 确认事件\n            onConfirm: function onConfirm(result) {\n                // 把用户选中的值显示到页面上。 \n                sex.textContent = result[0].label;\n            },\n            title: '请选择性别'\n        });\n    });\n\n    // 生日\n    showBirthdayPicker.addEventListener('click', function () {\n        weui.datePicker({\n            start: 1949,\n            end: new Date().getFullYear(),\n            onConfirm: function onConfirm(result) {\n                birthday.textContent = result.map(function (obj) {\n                    return $utils.padZero(obj.value);\n                }).join(\"-\");\n            },\n            title: '请选择生日'\n        });\n    });\n\n    /* 省份 */\n    showProvincePicker.addEventListener('click', function () {\n        weui.picker(provinceArr, {\n            // 确认事件\n            onConfirm: function onConfirm(result) {\n                console.log(result);\n                province.textContent = result[0].label;\n                city.textContent = \"请选择\";\n                // 去获取所管辖的城市的信息\n                axios.get(BASE_URL + \"/address/city/\" + result[0].value).then(function (res) {\n                    var result = res.data;\n                    if (result.status == 0) {\n                        cityArr = result.data.map(function (city) {\n                            var obj = {\n                                label: city.name,\n                                value: city.addressId\n                            };\n                            return obj;\n                        });\n                    }\n                }).catch(function (error) {\n                    console.log(error);\n                });\n            },\n            title: '请选择省份'\n        });\n    });\n\n    // 城市 bug\n    showCityPicker.addEventListener('click', function () {\n        alert(2);\n        weui.picker(cityArr, {\n            // 确认事件\n            onConfirm: function onConfirm(result) {\n                city.textContent = result[0].label;\n            },\n            title: '请选择城市'\n        });\n    });\n\n    // 获取省份信息\n    function getProvince() {\n        axios.get(BASE_URL + \"/address/province\").then(function (res) {\n            var result = res.data;\n            if (result.status == 0) {\n                provinceArr = result.data.map(function (pro) {\n                    return {\n                        label: pro.name,\n                        value: pro.addressId\n                    };\n                });\n            }\n        }).catch(function (error) {\n            console.log(error);\n        });\n\n        // axios.get(BASE_URL + \"/address/city/\" + result[0].value).then(function (res) {\n        //     let result = res.data;\n        //     if (result.status == 0) {\n        //         cityArr = result.data.map(function (city) {\n        //             let obj = {\n        //                 label: city.name,\n        //                 value: city.addressId\n        //             }\n        //             return obj;\n        //         });\n        //     }\n        // }).catch(function (error) {\n        //     console.log(error);\n        // });\n    }\n    getProvince();\n    console.log(\"省份\", getProvince());\n\n    // 签名实时字数\n    signArea.addEventListener(\"input\", function () {\n        signNum.textContent = this.value.length;\n    });\n\n    // 从本地存储中获取用户信息显示在页面上\n    function getUserInfo() {\n        var user = JSON.parse(localStorage.getItem(\"user\"));\n        // 昵称\n        nickName.value = user.nickname;\n        // 性别\n        sex.textContent = user.gender ? user.gender : \"请选择\";\n        // 生日\n        birthday.textContent = user.birthday ? $utils.formatDate(user.birthday) : \"请选择\";\n        // 所在省份\n        province.textContent = user.address ? user.address.split(\",\")[0] : \"请选择\";\n        // 所在城市\n        city.textContent = user.address ? user.address.split(\",\")[1] : \"请选择\";\n        // 签名\n        signArea.value = user.sign;\n        // 签名字数\n        signNum.textContent = user.sign.length;\n    }\n    getUserInfo();\n\n    // 保存按钮\n    saveBtn.addEventListener(\"click\", function () {\n        axios.post(BASE_URL + \"/users/userEdit\", {\n            \"nickname\": nickName.value,\n            \"gender\": sex.textContent,\n            \"birthday\": birthday.textContent,\n            \"address\": [province.textContent, city.textContent],\n            \"sign\": signArea.value,\n            \"userId\": userId\n        }).then(function (res) {\n            var result = res.data;\n            if (result.status == 0) {\n                // 弹窗提示，修改成功\n                $utils.showToast(\"icon-toast-correct\", \"修改成功\", 2000);\n                // 跳转页面\n                setTimeout(function () {\n                    location.href = \"./mine.html\";\n                }, 2000);\n            }\n        }).catch(function (error) {\n            console.log(error);\n        });\n    });\n\n    // 测试专用\n    test.addEventListener(\"click\", function () {\n        console.log(\"city\", cityArr);\n    });\n});\n\n//# sourceURL=webpack://fitness_app/./src/js/mine_info.js?");
}();
/******/ })()
;