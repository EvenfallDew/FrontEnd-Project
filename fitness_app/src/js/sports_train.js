"use strict"

// 引入当前页面对应的样式文件
require("../less/sports_train.less");

document.ready(function () {
    // 头部封装
    $utils.commonHeader();
    // 底部封装
    $utils.commonFooter();

    // 获取本地存储用户信息
    let userId = JSON.parse(localStorage.getItem("user")).userId;

    // 获取元素
    let newCourse = document.querySelector("#newCourse");
    let oldCourse = document.querySelector("#oldCourse");

    // 获取当前用户的所有课程
    function getAllCourse() {
        axios.get($utils.BASE_URL + "/sports/courseList?id=" + userId).then(function (res) {
            let result = res.data;
            if (result.status == 0) {
                // 课程数组
                let courseArr = result.data;
                // 获取最新的课程
                let newCourse = courseArr.find(function (ele) {
                    return ele.latest == 1
                });
                // 其它课程
                let oldCourseArr = courseArr.filter(function (ele) {
                    return ele.latest == 0
                });
                // 渲染新课程 
                renderNewCourse(newCourse)
                // 渲染旧课程 
                renderOldCourse(oldCourseArr)
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    getAllCourse();

    // 渲染新课程
    function renderNewCourse(obj) {
        let str = `
            <a class="info mt10" href="./sports_train_detail.html?courseId=${obj.courseId}">
                <img class="info-img" src="${$utils.BASE_URL + obj.imgurl}" alt="img">
                <p class="course-title mt10">${obj.name}</p>
                <p class="desc mt10">${obj.desc}</p>
            </a>
        `
        newCourse.innerHTML = str;
    }

    // 渲染旧课程
    function renderOldCourse(courseArr) {
        let str = "";
        courseArr.forEach((v) => {
            str += `
                <a class="info mt10" href="./sports_train_detail.html?courseId=${v.courseId}">
                    <img class="info-img" src="${$utils.BASE_URL + v.imgurl}" alt="">
                    <p class="course-title mt10">${v.name}</p>
                    <p class="desc mt10">${v.desc}</p>
                </a>
            `
        });
        oldCourse.innerHTML = str;
    }
});