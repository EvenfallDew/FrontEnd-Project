"use strict"

// 引入对应的less样式
require("../less/reg_log.less");

document.ready(function () {
    // 获取元素
    let phone = document.querySelector("#phone");
    let password = document.querySelector("#password");
    let loginBtn = document.querySelector("#loginBtn");
    let msg = document.querySelector("#msg");

    // 测试专用
    let testBtn = document.querySelector("#testBtn");

    // 表单验证
    loginBtn.addEventListener("click", function () {
        // 获取输入内容
        let phoneVal = phone.value;
        let pwdVal = password.value;
        // 逐条验证
        if (!$utils.isPhoneNum(phoneVal)) {
            msg.textContent = "手机号码格式错误";
            return;
        } else if (!$utils.isPassword(pwdVal)) {
            msg.textContent = "字母开头,6~12位,含字母、数字下划线"
            return;
        } else {
            // 全部的格式通过，ajax登录传值验证是否已注册
            msg.textContent = "";
            axios.post("http://139.9.177.51:8099/users/login", {
                "account": phoneVal,
                "password": pwdVal
            }).then(function (res) {
                // 获取返回数据
                let result = res.data;
                // 登录成功
                if (result.status == 0) {
                    // 弹窗提示
                    $utils.showToast("icon-toast-correct", "登录成功");
                    // 提示栏清空
                    msg.textContent = "";
                    // 按钮禁用
                    loginBtn.disabled = true;
                    // 获取数据到本地存储
                    localStorage.setItem("user", JSON.stringify(result.data.user));
                    // 3秒后跳转主页
                    setTimeout(function () {
                        location.href = "./index.html";
                    }, 3000);
                } else if (result.status == 555) {
                    // 按钮禁用
                    loginBtn.disabled = true;
                    // 提示栏显示失败原因
                    msg.textContent = res.data.msg;
                    // 失败弹窗提示
                    $utils.showToast("icon-toast-wrong", "登录失败");
                    // 3秒后恢复按钮
                    setTimeout(() => {
                        loginBtn.disabled = false;
                    }, 3000);
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    });

    // 测试专用
    testBtn.addEventListener("click", function () {
        phone.value = "13333333335";
        password.value = "a123123";
    });
});