"use strict";

// 所有全选，取消全选
$(".check-all").on("click", function () {
    //  点击全选框，如果全选框被选了
    if ($(this).prop("checked") == true) {
        //  把下边的复选框全选
        $(":checkbox").prop("checked", true);
        getTotal();
    } else {
        //  否则取消全选
        $(":checkbox").prop("checked", false);
        getTotal();
    }
});

// 店铺全选，取消店铺全选
$(".check-shop").on("click", function () {
    if ($(this).prop("checked") == true) {
        $(this).parent().parent().parent().find(".single-check").prop("checked", true);
        getTotal();
    } else {
        $(this).parent().parent().parent().find(".single-check").prop("checked", false);
        getTotal();
    }

    if ($(".check-shop:checked").length == $(".check-shop:checkbox").length) {
        $(".check-all").prop("checked", true);
        getTotal();
    } else {
        $(".check-all").prop("checked", false);
        getTotal();
    }
});

//  单体选择
$(".single-check").on("click", function () {
    getTotal();

    if ($(this).parent().parent().parent().find(".check-shop").prop("checked") == true) {
        $(".check-all").prop("checked", false);
        $(this).parent().parent().parent().find(".check-shop").prop("checked", false);
        getTotal();
    }

    if ($(".single-check:checked").length == $(".single-check:checkbox").length) {
        $(".check-all").prop("checked", true);
        $(".check-shop").prop("checked", true);
        getTotal();
    }

    var trueNum = 0;
    $(this).parent().parent().parent().find(".single-check").each(function (i, v) {
        if ($(v).prop("checked") == true) {
            trueNum = trueNum + 1;
            if (trueNum == $(this).parent().parent().parent().find(".single-check").length) {
                $(this).parent().parent().parent().find(".check-shop").prop("checked", true);
                getTotal();
            }
        }
    });
});

// 统计函数
function getSum(obj, num) {
    let singlePrice = obj.parents("td").siblings(".cart-price").children("p").html();
    let sum = (num * singlePrice).toFixed(2);
    obj.siblings(".sum").html(sum);
}

// 计算总量和总价的   
function getTotal() {
    let total = 0;
    let totalPrice = 0;
    $(".single-check:checked").each(function (i, item) {
        // 总量
        total = total + parseInt($(item).parents("td").siblings("td").children(".num").val());
        // 总价
        if ($(item).parents("td").siblings(".cart-count").find(".sum").html() == "") {
            let singlePrice = $(item).parents("td").siblings(".cart-price").children("p").html();
            $(item).parents("td").siblings(".cart-count").find(".sum").html(singlePrice);
        }
        totalPrice = totalPrice + parseFloat($(item).parents("td").siblings(".cart-count").find(".sum").html());
    })
    // 获取位置输出结果
    $(".total").html(total);
    $(".totalprice").html(totalPrice.toFixed(2));
}

// 换一批
changeLike(".guess-change", ".guess-like-pic", 1150);