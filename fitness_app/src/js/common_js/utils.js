// 工具函数集

// 手机号码验证
function isPhoneNum(n) {
    return /^1[3-9]\d{9}$/.test(n)
}

// 密码验证(以字母开头，长度在6~12之间，只能包含字母、数字和下划线)
function isPassword(str) {
    return /^[a-zA-Z]\w{5,11}$/.test(str);
}

// 弹窗提示信息
function showToast(flag = "icon-toast-correct", msg = "成功", time = 3000) {
    //1 创建一个盒子
    let box = document.createElement("div")
    //2 书写类名
    box.className = "msg-box";
    //3 添加内容
    box.innerHTML = `
     <i class="iconfont ${flag}"></i>
     <p>${msg}</p>
     `
    //4 添加到body中
    document.body.appendChild(box);
    // 若干秒后消失
    window.setTimeout(function () {
        box.remove();
    }, time);
}

// 底部封装
function commonFooter() {
    //1 创建一个盒子
    let footer = document.createElement("footer")
    //2 书写类名
    footer.className = "common-footer";
    //3 添加内容
    footer.innerHTML = `
    <div class="footer-btn">
        <span class="iconfont icon-footer-index"></span>
        <p>运动</p>
    </div>
    <div class="footer-btn">
        <span class="iconfont icon-footer-sports"></span>
        <p>运动</p>
    </div>
    <div class="footer-btn">
        <span class="iconfont icon-footer-social"></span>
        <p>圈子</p>
    </div>
    <div class="footer-btn">
        <span class="iconfont icon-footer-mine"></span>
        <p>我的</p>
    </div>
         `
    //4 添加到body中
    document.body.appendChild(footer);

    // 链接跳转
    let footerBtns = document.querySelectorAll(".footer-btn");
    let webArr = ["./index.html", "./sports.html", "./social.html", "./mine.html"];
    for (let i = 0; i < footerBtns.length; i++) {
        footerBtns[i].addEventListener("click", function () {
            location.href = webArr[i];
        });
    }
    // 当前页底部图标添加颜色
    let pageArr = location.pathname.split("/");
    let pageName = "./" + pageArr[pageArr.length - 1];
    let pageIndex = webArr.findIndex(function (item) {
        return item == pageName;
    });
    footerBtns[pageIndex].classList.add("on");
}

// 暴露出去
window.$utils = {
    isPhoneNum: isPhoneNum,
    isPassword: isPassword,
    showToast: showToast,
    commonFooter: commonFooter,
}