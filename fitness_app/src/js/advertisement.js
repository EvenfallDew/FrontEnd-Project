"use strict";

// 引入对应的less样式
require("../less/advertisement.less");

document.ready(function () {
    let skipBtnCutDown = document.querySelector("#skipBtnCutDown");
    let num = 5;
    skipBtnCutDown.textContent = num;
    // 倒计时自动跳过
    let timer = setInterval(() => {
        num = num - 1;
        if (num == 0) {
            clearInterval(timer);
            // 跳转登录页
            location.href = "./login.html";
        } else {
            skipBtnCutDown.textContent = num;
        }
    }, 1000);

    // 手动跳过广告
    let skipBtn = document.querySelector("#skipBtn");
    skipBtn.addEventListener("click", () => {
        location.href = "./login.html";
    });
});