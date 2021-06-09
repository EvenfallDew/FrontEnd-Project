"use strict";

// 支付的下一步切换
nextShow(".pay-cont1 .btn-next", ".pay-cont", "click", "tabOn", ".pay-tabs li div", 0, 1);
nextShow(".pay-cont2 .btn-next", ".pay-cont", "click", "tabOn", ".pay-tabs li div", 0, 2);
nextShow(".pay-cont3 .btn-next", ".pay-cont", "click", "tabOn", ".pay-tabs li div", 0, 3);
nextShow(".pay-cont4 .btn-next", ".pay-cont", "click", "tabOn", ".pay-tabs li div", 0, 4);

// 整个页面的小计计算
function getSum(obj, num) {
    let singlePrice = obj.parents("td").siblings(".pay-table-price").children("p").html();
    let sum = (num * singlePrice).toFixed(2);
    obj.parents().siblings(".pay-table-sum").children(".single-sum").html(sum);
    // 步骤3传值
    obj.parents().parents().parents().parents().parents().find(".pay-address-single-num").html(num);
    obj.parents().parents().parents().parents().parents().find(".pay-address-single-sum").html(sum);
    // 满减优惠
    if (sum >= 300) {
        obj.parents().parents().parents().parents().parents().find(".pay-address-real-pay").html(sum - 200);
    } else {
        obj.parents().parents().parents().parents().parents().find(".pay-address-real-pay").html(sum);
    }
}

function getTotal() {
}

// 评论完毕跳转指定页面
function cutDownOverToDo() {
    location.href = "index.html";
}

$("main").on("click", ".btn-next", function () {
    if ($(".pay-cont5").css("display") == "block") {
        cutDown(2, "#time");
    }
});

// 换一批
changeLike(".guess-change", ".guess-like-pic", 1150);

// 测试专用内容切换
contShow(".pay-tabs li:lt(3)", ".pay-cont", "click");