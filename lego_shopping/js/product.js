"use strict";
// 图片放大
$(function () {
    $('#magnifier').magnifier();
});

//展示内容块
function contShow(tabElement, contElement, trigger, addTabClassName, speed) {
    $(tabElement).on(trigger, function () {
        $(tabElement).removeClass();    //移除所有标签的样式
        $(this).addClass(addTabClassName);      //给鼠标移入的标签添加样式
        $(contElement).stop(true, false).fadeOut(speed);   //所有内容收起
        $(contElement).eq($(this).index()).stop(true, false).fadeIn(speed); //鼠标移入的标签对应的内容展示
    });
}
contShow(".tabs li", ".product-inf-cont", "click", "tabOn", "fast");