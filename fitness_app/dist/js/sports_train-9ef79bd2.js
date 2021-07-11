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

/***/ "./src/less/sports_train.less":
/*!************************************!*\
  !*** ./src/less/sports_train.less ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://fitness_app/./src/less/sports_train.less?");

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
/*!********************************!*\
  !*** ./src/js/sports_train.js ***!
  \********************************/
eval("\n\n// 引入当前页面对应的样式文件\n\n__webpack_require__(/*! ../less/sports_train.less */ \"./src/less/sports_train.less\");\n\n$utils.load(1400);\n\ndocument.ready(function () {\n    // 头部封装\n    $utils.commonHeader();\n    // 底部封装\n    $utils.commonFooter();\n\n    // 获取本地存储用户信息\n    var userId = JSON.parse(localStorage.getItem(\"user\")).userId;\n\n    // 获取元素\n    var newCourse = document.querySelector(\"#newCourse\");\n    var oldCourse = document.querySelector(\"#oldCourse\");\n\n    // 获取当前用户的所有课程\n    function getAllCourse() {\n        axios.get($utils.BASE_URL + \"/sports/courseList?id=\" + userId).then(function (res) {\n            var result = res.data;\n            if (result.status == 0) {\n                // 课程数组\n                var courseArr = result.data;\n                // 没有课程不渲染\n                if (courseArr.length == 0) {\n                    return;\n                }\n                // 获取最新的课程\n                var _newCourse = courseArr.find(function (ele) {\n                    return ele.latest == 1;\n                });\n                // 其它课程\n                var oldCourseArr = courseArr.filter(function (ele) {\n                    return ele.latest == 0;\n                });\n                // 渲染新课程 \n                renderNewCourse(_newCourse);\n                // 渲染旧课程 \n                renderOldCourse(oldCourseArr);\n            }\n        }).catch(function (error) {\n            console.log(error);\n        });\n    }\n    getAllCourse();\n\n    // 渲染新课程\n    function renderNewCourse(obj) {\n        var str = \"\\n            <a class=\\\"info mt10\\\" href=\\\"./sports_train_detail.html?courseId=\" + obj.courseId + \"\\\">\\n                <img class=\\\"info-img\\\" src=\\\"\" + ($utils.BASE_URL + obj.imgurl) + \"\\\" alt=\\\"img\\\">\\n                <p class=\\\"course-title mt10\\\"><span class=\\\"course-id\\\">\" + obj.courseId + \"</span>\" + obj.name + \"</p>\\n                <p class=\\\"desc mt10\\\">\" + obj.desc + \"</p>\\n            </a>\\n        \";\n        newCourse.innerHTML = str;\n    }\n\n    // 渲染旧课程\n    function renderOldCourse(courseArr) {\n        var str = \"\";\n        courseArr.forEach(function (v) {\n            str += \"\\n                <a class=\\\"info mt10\\\" href=\\\"./sports_train_detail.html?courseId=\" + v.courseId + \"\\\">\\n                    <img class=\\\"info-img\\\" src=\\\"\" + ($utils.BASE_URL + v.imgurl) + \"\\\" alt=\\\"img\\\">\\n                    <p class=\\\"course-title mt10\\\"><span class=\\\"course-id\\\">\" + v.courseId + \"</span>\" + v.name + \"</p>\\n                    <p class=\\\"desc mt10\\\">\" + v.desc + \"</p>\\n                </a>\\n            \";\n        });\n        oldCourse.innerHTML = str;\n    }\n\n    // 修改课程\n    var changeMask = document.querySelector(\"#changeMask\");\n    var changeBtn = document.querySelector(\"#changeBtn\");\n    var saveBtn = document.querySelector(\"#saveBtn\");\n\n    // 课程数组，必载入最新课程：3号课程\n    var saveCourseArr = [\"3\"];\n\n    // 获取课程ID\n    function getCourseId() {\n        // 课程ID数组\n        var saveCourseEle = document.querySelectorAll(\".course-id\");\n        for (var i = 0; i < saveCourseEle.length; i++) {\n            if (saveCourseArr.indexOf(saveCourseEle[i].innerHTML) == -1) {\n                saveCourseArr.push(saveCourseEle[i].innerHTML);\n            }\n        }\n    }\n\n    // 渲染所有课程\n    function renderChangeCourse(courseArr) {\n        getCourseId();\n        var str = \"\";\n        courseArr.forEach(function (v) {\n            // 保留1个最新课程，辣鸡后端无法接收空数组\n            if (v.courseId != 3) {\n                if (saveCourseArr.indexOf(String(v.courseId)) == -1) {\n                    var needAdd = '<span id=\"addCourse\" class=\"add-course\">添加课程</span><span id=\"delCourse\" class=\"del-course\" style=\"display:none;\">删除课程</span>';\n                } else {\n                    var needAdd = '<span id=\"addCourse\" class=\"add-course\" style=\"display:none;\">添加课程</span><span id=\"delCourse\" class=\"del-course\">删除课程</span>';\n                }\n                str += \"\\n                    <a class=\\\"info mt10\\\">\\n                        <img class=\\\"info-img\\\" src=\\\"\" + ($utils.BASE_URL + v.imgurl) + \"\\\" alt=\\\"img\\\">\\n                        <p class=\\\"course-title mt10\\\">\\n                            <span>\\n                                <span class=\\\"all-course-id\\\">\" + v.courseId + \"</span>\\n                                <span>\" + v.name + \"</span>\\n                            </span>\\n                            \" + needAdd + \"\\n                        </p>\\n                        <p class=\\\"desc mt10\\\">\" + v.desc + \"</p>\\n                    </a>\\n                \";\n            }\n        });\n        changeCourse.innerHTML = str;\n    }\n\n    // 点击修改按钮\n    changeBtn.addEventListener(\"click\", function () {\n        changeMask.style.display = \"flex\";\n        // 获取所有课程\n        axios.get($utils.BASE_URL + \"/sports/allcourse\").then(function (res) {\n            var result = res.data;\n            if (result.status == 0) {\n                // 课程数组\n                var courseArr = result.data;\n                // 渲染新课程 \n                renderChangeCourse(courseArr);\n                // 获取已有课程ID\n                getCourseId();\n            }\n        }).catch(function (error) {\n            console.log(error);\n        });\n    });\n\n    // 添加或删除课程\n    document.querySelector(\"#changeCourse\").addEventListener(\"click\", function (e) {\n        // 点击添加\n        if (e.target.className == \"add-course\") {\n            // 获取课程编号\n            var newCourseId = e.path[1].children[0].children[0].innerHTML;\n            // 按钮切换\n            var addBtn = e.path[1].children[1];\n            addBtn.style.display = \"none\";\n            var delBtn = e.path[1].children[2];\n            delBtn.style.display = \"block\";\n            if (saveCourseArr.indexOf(newCourseId) == -1) {\n                saveCourseArr.push(newCourseId);\n            }\n        }\n        // 点击删除\n        if (e.target.className == \"del-course\") {\n            // 获取课程编号\n            var _newCourseId = e.path[1].children[0].children[0].innerHTML;\n            // 按钮切换\n            var _addBtn = e.path[1].children[1];\n            _addBtn.style.display = \"block\";\n            var _delBtn = e.path[1].children[2];\n            _delBtn.style.display = \"none\";\n            if (saveCourseArr.indexOf(_newCourseId) != -1) {\n                var a = saveCourseArr.indexOf(_newCourseId);\n                saveCourseArr.splice(a, 1);\n            }\n        }\n    });\n\n    // 保存课程\n    function saveCourse() {\n        axios.post($utils.BASE_URL + \"/sports/saveCourse\", {\n            \"userId\": userId,\n            \"courseIds\": saveCourseArr\n        }).then(function (res) {\n            var result = res.data;\n            if (result.status == 0) {\n                // 弹窗提示，修改成功\n                $utils.showToast(\"icon-toast-correct\", \"修改成功\", 2000);\n            }\n        }).catch(function (error) {\n            changeMask.style.display = \"none\";\n            // 弹窗提示，修改失败\n            $utils.showToast(\"icon-toast-correct\", \"修改失败\", 2000);\n            console.log(error);\n        });\n    }\n\n    // 点击保存按钮\n    saveBtn.addEventListener(\"click\", function () {\n        // 保存修改\n        saveCourse();\n        // 跳转页面\n        setTimeout(function () {\n            location.href = \"./sports_train.html\";\n        }, 2000);\n    });\n});\n\n//# sourceURL=webpack://fitness_app/./src/js/sports_train.js?");
}();
/******/ })()
;