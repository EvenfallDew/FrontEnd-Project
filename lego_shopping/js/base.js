"use strict";

// 增加数量
$(".add").on("click", function () {
    // 将减法按钮的鼠标变成手指 表示可点击状态
    $(".minus").css({
        cursor: "pointer"
    })
    let num = $(this).siblings(".num").val();
    num++;
    $(this).siblings(".num").val(num);
    getSum($(this), num);
    getTotal();
});

// 减少数量
$(".minus").on("click", function () {
    let num = $(this).siblings(".num").val();
    // 当商品只有一件时，不能继续点击减法按钮
    if (num == 1) {
        $(this).css({ cursor: "not-allowed" });
        return;
    }
    num--;
    $(this).siblings(".num").val(num);
    getSum($(this), num);
    getTotal();
});

// 当数量发生改变修改小计
$(".num").on("change", function () {
    if ($(this).val() < 1) {
        $(this).val(1);
    }
    // 小计
    getSum($(this), $(this).val());
    getTotal();
});