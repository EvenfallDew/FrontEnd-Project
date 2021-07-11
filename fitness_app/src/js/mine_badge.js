"use strict"

// 引入对应的less样式
require("../less/mine_badge.less");

$utils.load(1400);

document.ready(function () {
    // 跳转
    let mineLink = document.querySelector("#mineLink");
    mineLink.addEventListener("click", function (e) {
        e.preventDefault();
        $utils.out();
        setTimeout(() => {
            location.href = "./mine.html";
        }, 1000);
    });
});