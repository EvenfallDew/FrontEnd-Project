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
                // 没有课程不渲染
                if (courseArr.length == 0) {
                    return;
                }
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

    // 修改课程
    let changeMask = document.querySelector("#changeMask");
    let changeBtn = document.querySelector("#changeBtn");
    let saveBtn = document.querySelector("#saveBtn");

    // 课程数组，必载入最新课程：3号课程
    let saveCourseArr = ["3"];

    // 获取课程ID
    function getCourseId() {
        // 课程ID数组
        let saveCourseEle = document.querySelectorAll(".course-id");
        for (let i = 0; i < saveCourseEle.length; i++) {
            if (saveCourseArr.indexOf(saveCourseEle[i].innerHTML) == -1) {
                saveCourseArr.push(saveCourseEle[i].innerHTML);
            }
        }
    }

    // 渲染所有课程
    function renderChangeCourse(courseArr) {
        getCourseId()
        let str = "";
        courseArr.forEach((v) => {
            // 保留1个最新课程，辣鸡后端无法接收空数组
            if (v.courseId != 3) {
                if (saveCourseArr.indexOf(String(v.courseId)) == -1) {
                    var needAdd = '<span id="addCourse" class="add-course">添加课程</span><span id="delCourse" class="del-course" style="display:none;">删除课程</span>'
                } else {
                    var needAdd = '<span id="addCourse" class="add-course" style="display:none;">添加课程</span><span id="delCourse" class="del-course">删除课程</span>'
                }
                str += `
                    <a class="info mt10">
                        <img class="info-img" src="${$utils.BASE_URL + v.imgurl}" alt="img">
                        <p class="course-title mt10">
                            <span>
                                <span class="all-course-id">${v.courseId}</span>
                                <span>${v.name}</span>
                            </span>
                            ${needAdd}
                        </p>
                        <p class="desc mt10">${v.desc}</p>
                    </a>
                `
            }
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

    // 添加或删除课程
    document.querySelector("#changeCourse").addEventListener("click", function (e) {
        // 点击添加
        if (e.target.className == "add-course") {
            // 获取课程编号
            let newCourseId = e.path[1].children[0].children[0].innerHTML;
            // 按钮切换
            let addBtn = e.path[1].children[1];
            addBtn.style.display = "none";
            let delBtn = e.path[1].children[2];
            delBtn.style.display = "block";
            if (saveCourseArr.indexOf(newCourseId) == -1) {
                saveCourseArr.push(newCourseId);
            }
        }
        // 点击删除
        if (e.target.className == "del-course") {
            // 获取课程编号
            let newCourseId = e.path[1].children[0].children[0].innerHTML;
            // 按钮切换
            let addBtn = e.path[1].children[1];
            addBtn.style.display = "block";
            let delBtn = e.path[1].children[2];
            delBtn.style.display = "none";
            if (saveCourseArr.indexOf(newCourseId) != -1) {
                let a = saveCourseArr.indexOf(newCourseId);
                saveCourseArr.splice(a, 1);
            }
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
            changeMask.style.display = "none";
            // 弹窗提示，修改失败
            $utils.showToast("icon-toast-correct", "修改失败", 2000);
            console.log(error);
        });
    }

    // 点击保存按钮
    saveBtn.addEventListener("click", function () {
        // 保存修改
        saveCourse();
        // 跳转页面
        setTimeout(() => {
            location.href = "./sports_train.html";
        }, 2000);
    });
});