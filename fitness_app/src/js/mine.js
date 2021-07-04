"use strict"

// 引入对应的less样式
require("../less/mine.less");

document.ready(function () {
    // 底部封装
    $utils.commonFooter();

    // 退出登录
    let logoutBtn = document.querySelector("#logoutBtn");
    logoutBtn.addEventListener("click", function () {

    });
});