"use strict";

// 注册栏进度标签切换，仅限注册协议和信息切换
contShow(".register-tabs li:lt(2)", ".register-cont", "click", "tabOn");

//  注册下一步切换
nextShow(".register-cont1 .btn-next", ".register-cont", "click", "tabOn", ".register-tabs li", 0, 1);

// 密码强度
$("main").on("blur", ".user-psw", function () {
    var pswLen = $(".user-psw").val().length;
    console.log(pswLen);
    if (pswLen < 6 || pswLen > 18) {
        $(".register-cont2 .register-psw-safebox .register-psw-safe").css("display", "none");
        $(".register-cont2 .register-psw-safebox .register-psw-safe0")[0].style.display = "block";
    } else if (pswLen >= 6 && pswLen < 10) {
        $(".register-cont2 .register-psw-safebox .register-psw-safe").css("display", "none");
        $(".register-cont2 .register-psw-safebox .register-psw-safe1")[0].style.display = "block";
    } else if (pswLen >= 10 && pswLen < 14) {
        $(".register-cont2 .register-psw-safebox .register-psw-safe").css("display", "none");
        $(".register-cont2 .register-psw-safebox .register-psw-safe1")[0].style.display = "block";
        $(".register-cont2 .register-psw-safebox .register-psw-safe2")[0].style.display = "block";
    } else {
        $(".register-cont2 .register-psw-safebox .register-psw-safe").css("display", "none");
        $(".register-cont2 .register-psw-safebox .register-psw-safe1")[0].style.display = "block";
        $(".register-cont2 .register-psw-safebox .register-psw-safe2")[0].style.display = "block";
        $(".register-cont2 .register-psw-safebox .register-psw-safe3")[0].style.display = "block";
    }
});

// 验证码按钮禁用
$(".confirm-code-btn").on("click", function () {
    disabledState(this, 5, $(this).html());
});

// 表单规则
formConfirm(".real-name", ".register-inf-name", /^[\u4e00-\u9fa5]{2,6}$/, "中文，2-6个字");
formConfirm(".user-name", ".register-inf-user", /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/, "字母开头，5-16字节");
formConfirm(".user-psw", ".register-inf-psw", /^[a-zA-Z]\w{5,17}$/, "字母开头，长度为6-18");
formConfirm(".user-mail", ".register-inf-mail", /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/, "输入格式不正确");
formConfirm(".tel-num", ".register-inf-tel", /^(13[0-9]|14[5|7]|15[0-9]|17[0|7|9]|18[0|1|2|3|5|6|7|8|9]|19[1|9])\d{8}$/, "手机号码不正确");

// 表单提交
function confirm() {
    $(".real-name").focus();
    $(".user-name").focus();
    $(".user-psw").focus();
    $(".user-mail").focus();
    $(".tel-num").focus();
    $(".real-name").blur();
    $(".user-name").blur();
    $(".user-psw").blur();
    $(".user-mail").blur();
    $(".tel-num").blur();
}

// 表单验证
$(".submit").on("click", function () {
    confirm();
    if ($(".register-inf-name").html() == "" && $(".register-inf-user").html() == "" && $(".register-inf-psw").html() == "" && $(".register-inf-mail").html() == "" && $(".register-inf-tel").html() == "") {
        nextShow(".register-cont2 .btn-next", ".register-cont", "click", "tabOn", ".register-tabs li", 0, 2);
    } else {
        console.log("请按要求填写信息");
    }
});

// 注册完毕跳转
function cutDownOverToDo() {
    // $(".registerForm").submit();
    location.href = "login.html";
}

$("main").on("click", ".btn-next", function () {
    if ($(".register-cont3").css("display") == "block") {
        cutDown(2, "#time");
    }
});


// 测试专用
$(".foot-up-box").on("click", function () {
    $(".real-name").val("张三");
    $(".user-name").val("admin");
    $(".user-psw").val("qwerty12345611");
    $(".user-mail").val("admin");
    $(".tel-num").val("13312345678");
    $(".confirm-code").val("2234");
    confirm();
});