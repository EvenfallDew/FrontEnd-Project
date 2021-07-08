"use strict"

// 引入当前页面对应的样式文件
require("../less/sports_run.less");

document.ready(function () {
    // 头部封装
    $utils.commonHeader();
    // 底部封装
    $utils.commonFooter();

    let goBtn = document.querySelector("#goBtn");
    let maskTime = document.querySelector("#maskTime");

    goBtn.addEventListener("click", function () {
        maskTime.style.display = "block";
    });
});