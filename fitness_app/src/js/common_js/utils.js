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
     <p class="msg-text">${msg}</p>
     `
    //4 添加到body中
    document.body.appendChild(box);
    // 若干秒后消失
    setTimeout(function () {
        // box.remove();
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
    let footerWebs = ["./index.html", "./sports.html", "./social.html", "./mine.html"];
    for (let i = 0; i < footerBtns.length; i++) {
        footerBtns[i].addEventListener("click", function () {
            location.href = footerWebs[i];
        });
    }
    // 当前页底部图标添加颜色
    let footerPagesArr = location.pathname.split("/");
    let footerPagesName = "./" + footerPagesArr[footerPagesArr.length - 1];
    let footerPagesIndex = footerWebs.findIndex(function (item) {
        return item == footerPagesName;
    });
    if (footerPagesIndex == -1) {
        footerBtns[1].classList.add("footer-on");
    } else {
        footerBtns[footerPagesIndex].classList.add("footer-on");
    }
}

// 运动头部封装
function commonHeader() {
    let sportsHeader = document.querySelector("#sportsHeader");
    //1 创建一个盒子
    let header = document.createElement("div")
    //2 书写类名
    header.className = "common-header";
    //3 添加内容
    header.innerHTML = `
        <a class="header-btn" href="./sports_run.html">跑步</a>
        <a class="header-btn" href="./sports_ride.html">骑行</a>
        <a class="header-btn" href="./sports_train.html">课程训练</a>
    `
    //4 添加到body中
    sportsHeader.appendChild(header);
    let headerBtns = document.querySelectorAll(".header-btn");
    let headerWebs = ["./sports_run.html", "./sports_ride.html", "./sports_train.html"];
    let headerPagesArr = location.pathname.split("/");
    let headerPagesName = "./" + headerPagesArr[headerPagesArr.length - 1];
    let headerPagesIndex = headerWebs.findIndex(function (item) {
        return item == headerPagesName;
    });
    headerBtns[headerPagesIndex].classList.add("header-on");
}

// 格式化日期
function formatDate(str) {
    let now = new Date(str);
    let y = now.getFullYear();
    let m = now.getMonth() + 1;
    let d = now.getDate();
    let arr = [y, m, d].map(function (ele) {
        return padZero(ele)
    });
    return arr.join("-");
}
// 补零
function padZero(n) {
    return n < 10 ? "0" + n : n;
}
// 暴露出去
window.$utils = {
    isPhoneNum: isPhoneNum,
    isPassword: isPassword,
    showToast: showToast,
    commonFooter: commonFooter,
    commonHeader: commonHeader,
    padZero: padZero,
    formatDate: formatDate,
}