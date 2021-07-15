"use strict";

//展示内容块
$("main").on("click", ".change-hide2", function () {
    $(".login-cont2").stop(true, false).fadeOut("fast"); //所有内容收起
    $(".login-cont1").stop(true, false).fadeIn("fast"); //对应的内容展示
});
$("main").on("click", ".change-hide1", function () {
    $(".login-cont1").stop(true, false).fadeOut("fast"); //所有内容收起
    $(".login-cont2").stop(true, false).fadeIn("fast"); //对应的内容展示
});