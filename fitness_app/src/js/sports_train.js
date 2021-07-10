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

    // 课程数组
    let saveCourseArr = [];

    // 获取当前用户的所有课程
    function getAllCourse() {
        axios.get($utils.BASE_URL + "/sports/courseList?id=" + userId).then(function (res) {
            let result = res.data;
            if (result.status == 0) {
                // 课程数组
                let courseArr = result.data;
                // 获取最新的课程
                let newCourse = courseArr.find(function (ele) {
                    return ele.latest == 1;
                });
                // 其它课程
                let oldCourseArr = courseArr.filter(function (ele) {
                    return ele.latest == 0;
                });
                // 渲染新课程 
                renderNewCourse(newCourse);
                // 渲染旧课程 
                renderOldCourse(oldCourseArr);
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
                <p class="course-title mt10"><span class="course-id">${obj.courseId}</span>${obj.name}</p>
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
                    <img class="info-img" src="${$utils.BASE_URL + v.imgurl}" alt="img">
                    <p class="course-title mt10"><span class="course-id">${v.courseId}</span>${v.name}</p>
                    <p class="desc mt10">${v.desc}</p>
                </a>
            `
        });
        oldCourse.innerHTML = str;
    }

    // ..................
    // 获取所有课程数据
    // 对比训练课程列表
    // 展现未加入的课程，主键为课程编号
    // 操作既是发送请求
    // 关闭既是刷新or跳转
    let changeMask = document.querySelector("#changeMask");
    let changeBtn = document.querySelector("#changeBtn");
    let saveBtn = document.querySelector("#saveBtn");

    // 获取课程ID
    function getCourseId() {
        // 课程ID数组
        let saveCourseEle = document.querySelectorAll(".course-id");
        for (let i = 0; i < saveCourseEle.length; i++) {
            saveCourseArr.push(saveCourseEle[i].innerHTML);
        }
        console.log(saveCourseArr);
    }

    // 渲染所有课程
    function renderChangeCourse(courseArr) {
        let str = "";
        courseArr.forEach((v) => {
            str += `
                    <a class="info mt10">
                        <img class="info-img" src="${$utils.BASE_URL + v.imgurl}" alt="img">

                        <p class="course-title mt10">
                            <span class="all-course-id">${v.courseId}</span>
                            ${v.name}
                            <span id="addCourse" class="add-course">添加课程</span>
                            <span id="delCourse" class="del-course">删除课程</span>
                        </p>
                        <p class="desc mt10">${v.desc}</p>
                    </a>
                `
        });
        changeCourse.innerHTML = str;
    }

    // 点击修改按钮
    changeBtn.addEventListener("click", function () {
        changeMask.style.display = "flex";
        // 获取所有课程
        axios.get($utils.BASE_URL + "/sports/allcourse").then(function (res) {
            let result = res.data;
            if (result.status == 0) {
                // 课程数组
                let courseArr = result.data;
                // 渲染新课程 
                renderChangeCourse(courseArr);
                // 获取已有课程ID
                getCourseId();
            }
        }).catch(function (error) {
            console.log(error);
        });
    });

    // 添加删除
    document.querySelector("#changeCourse").addEventListener("click", function (e) {
        // 点击添加
        if (e.target.className == "add-course") {
            let newCourseId = e.path[1].children[0].innerHTML;
            if (saveCourseArr.indexOf(newCourseId) == -1) {
                saveCourseArr.push(newCourseId);
            }
            console.log(saveCourseArr);
        }
        // 点击删除
        if (e.target.className == "del-course") {
            let newCourseId = e.path[1].children[0].innerHTML;
            if (saveCourseArr.indexOf(newCourseId) != -1) {
                let a = saveCourseArr.indexOf(newCourseId);
                saveCourseArr.splice(a, 1);
            }
            console.log(saveCourseArr);
        }
    });

    // 保存课程
    function saveCourse() {
        axios.post($utils.BASE_URL + "/sports/saveCourse", {
            "userId": userId,
            "courseIds": saveCourseArr,
        }).then(function (res) {
            let result = res.data;
            if (result.status == 0) {
                // 弹窗提示，修改成功
                $utils.showToast("icon-toast-correct", "修改成功", 2000);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    // 点击保存按钮
    saveBtn.addEventListener("click", function () {
        // 隐藏蒙层
        // changeMask.style.display = "none";
        // 保存修改
        saveCourse();
        // 跳转页面
        setTimeout(() => {
            location.href = "./sports_train.html";
        }, 2000);
    });
});