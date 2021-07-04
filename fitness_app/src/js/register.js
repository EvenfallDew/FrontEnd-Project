"use strict"
// 引入当前页面对应的样式文件
require("../less/reg_log.less");
// 引入字体图标的样式文件
require("../fonts/iconfont.css");
//引入注册码的js
const CaptchaMini = require("../libs/captcha/captcha-mini.js");

document.ready(function () {
    // 验证码设置
    let captchaText = new CaptchaMini({
        lineNum: 1, //线条的数量
        dotNum: 5, //点的数量
        length: 4 //验证码的个数
    });

    // 获取正确的验证码的值
    let captCode = "";
    captchaText.draw(document.querySelector('#captchaText'), r => {
        captCode = r;
    });

    // 获取元素
    let phone = document.querySelector("#phone");
    let captcha = document.querySelector("#captcha");
    let password = document.querySelector("#password");
    let rePassword = document.querySelector("#rePassword");
    let registerBtn = document.querySelector("#registerBtn");
    let msg = document.querySelector("#msg");

    // 测试专用
    let testBtn = document.querySelector("#testBtn");

    // 表单验证
    registerBtn.addEventListener("click", function () {
        // 获取输入内容
        let phoneVal = phone.value;
        let captchaVal = captcha.value;
        let pwdVal = password.value;
        let rePwdVal = rePassword.value;
        // 逐条验证
        if (!$utils.isPhoneNum(phoneVal)) {
            msg.textContent = "手机号码格式错误";
            return;
        } else if (captchaVal.toLowerCase() != captCode.toLowerCase()) {
            msg.textContent = "验证码错误";
            return;
        } else if (!$utils.isPassword(pwdVal)) {
            msg.textContent = "字母开头,6~12位,含字母、数字下划线"
            return;
        } else if (pwdVal != rePwdVal) {
            msg.textContent = "两次输入密码不一致";
            return;
        } else {
            // 全部的格式通过，ajax注册传值验证是否已注册
            axios.post("http://139.9.177.51:8099/users/add", {
                "account": phoneVal,
                "password": pwdVal
            }).then(function (res) {
                // 获取返回数据
                let result = res.data;
                // 注册成功
                if (result.status == 0) {
                    // 弹窗提示
                    $utils.showToast("icon-toast-correct", "注册成功");
                    // 按钮禁用
                    registerBtn.disabled = true;
                    // 3秒后跳转登录
                    setTimeout(function () {
                        location.href = "./login.html";
                    }, 3000);
                } else if (result.status == 1) {
                    // 按钮禁用
                    registerBtn.disabled = true;
                    // 注册失败弹窗提示
                    $utils.showToast("icon-toast-wrong", "注册失败");
                    // 3秒后恢复按钮
                    setTimeout(() => {
                        registerBtn.disabled = false;
                    }, 3000);
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    });

    // 测试专用
    testBtn.addEventListener("click", function () {
        phone.value = "13333333333";
        captcha.value = captCode;
        password.value = "a123123";
        rePassword.value = "a123123";
    })
});