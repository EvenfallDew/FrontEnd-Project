"use strict"

// 引入对应的less样式
require("../less/mine.less");

$utils.load(1400);

document.ready(function () {
    // 底部封装
    $utils.commonFooter();

    // 获取元素
    let userHead = document.querySelector("#userHead");
    let headPic = document.querySelector("#headPic");
    let uploadHead = document.querySelector("#uploadHead");
    let userName = document.querySelector("#userName");
    let signText = document.querySelector("#signText");
    let times = document.querySelector("#times");
    let coursetims = document.querySelector("#coursetims");

    // 获取数据
    let userId = null;
    if (JSON.parse(localStorage.getItem("user")) == null) {
        $utils.showToast("icon-toast-wrong", "请登录", 3000);
        // 跳转登录页面
        setTimeout(() => {
            location.href = "./login.html";
        }, 3000);
    } else {
        // 获取本地存储
        userId = JSON.parse(localStorage.getItem("user")).userId;
    }

    // 修改头像
    uploadHead.addEventListener("change", function () {
        let file = this.files[0];
        // 创建一个FormData对象
        let formData = new FormData();
        // 添加内容
        formData.append("imgurl", file)
        // 发送ajax请求
        axios.post($utils.BASE_URL + "/users/upload", formData).then(function (res) {
            let result = res.data;
            //上传成功
            if (result.status == 0) {
                // 把上传之后的图片显示在页面上
                headPic.src = $utils.BASE_URL + result.data; //result.data是图片地址
                // 发请求去修改后台的数据库
                axios.post($utils.BASE_URL + "/users/userEdit", {
                    "userId": userId,
                    "imgurl": result.data
                }).then(function (res) {
                    let result = res.data;
                    if (result.status == 0) {
                        // 修改成功
                        console.log("修改成功");
                    } else {
                        // 修改失败
                        console.log("修改失败");
                    }
                }).catch(function (error) {
                    console.log(error);
                });
                $utils.showToast("icon-toast-correct", "上传成功", 2000);
            }
        }).catch(function (error) {
            console.log(error);
        });
    });

    // 点击头像修改头像
    userHead.addEventListener("click", function () {
        uploadHead.click();
    });

    // 获取信息
    function getData() {
        axios.get($utils.BASE_URL + "/users/accountinfo?userId=" + userId).then(function (res) {
            let result = res.data;
            if (result.status == 0) {
                // 覆盖本地数据
                localStorage.setItem("user", JSON.stringify(result.data));
                // 显示在页面上
                render(result.data);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    getData();

    // 定义一个显示数据的函数
    function render(obj) {
        // 头像
        headPic.src = obj.imgurl ? $utils.BASE_URL + obj.imgurl : require("../images/headerPic.jpg");
        // 昵称
        userName.textContent = obj.nickname;
        // 签名
        signText.textContent = obj.sign ? obj.sign : "这个人很懒，什么都没有留下"
    }

    // 加载运动数据
    function getExercuseData() {
        axios.get($utils.BASE_URL + "/sports/exerciseData?id=" + userId).then(function (res) {
            let result = res.data;
            if (result.status == 0) {
                // 覆盖本地数据
                localStorage.setItem("exerciseData", JSON.stringify(result.data));
                // 显示在页面上
                renderExercuseData(result.data);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    getExercuseData();

    // 定义一个显示数据的函数
    function renderExercuseData(obj) {
        times.textContent = obj.times.toFixed(2);
        coursetims.textContent = obj.coursetims.toFixed(2);
    }

    // 退出登录
    let logoutBtn = document.querySelector("#logoutBtn");
    logoutBtn.addEventListener("click", function () {
        $utils.showToast("icon-toast-correct", "退出成功", 2000);
        // 移出本地存储数据
        localStorage.removeItem("user");
        // 跳转登录页面
        setTimeout(() => {
            $utils.out();
            setTimeout(() => {
                location.href = "./login.html";
            }, 1000);
        }, 2000);
    });

    // 跳转
    let infoLink = document.querySelector("#infoLink");
    infoLink.addEventListener("click", function () {
        $utils.out();
        setTimeout(() => {
            location.href = "./mine_info.html";
        }, 1000);
    });
    let dataLink = document.querySelector("#dataLink");
    dataLink.addEventListener("click", function () {
        $utils.out();
        setTimeout(() => {
            location.href = "./mine_data.html";
        }, 1000);
    });
    let badgeLink = document.querySelector("#badgeLinks");
    badgeLink.addEventListener("click", function () {
        $utils.out();
        setTimeout(() => {
            location.href = "./mine_badge.html";
        }, 1000);
    });
});