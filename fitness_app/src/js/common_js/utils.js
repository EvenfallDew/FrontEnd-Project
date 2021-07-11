// 工具函数集

// 服务器地址
const BASE_URL = "http://139.9.177.51:8099";

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
    // 1 创建一个盒子
    let box = document.createElement("div")
    // 2 书写类名
    box.className = "msg-box";
    // 3 添加内容
    box.innerHTML = `
     <i class="iconfont ${flag}"></i>
     <p class="msg-text">${msg}</p>
     `
    // 4 添加到body中
    document.body.appendChild(box);
    // 若干秒后消失
    setTimeout(function () {
        box.remove();
    }, time);
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
        <a id="runLink" class="header-btn" href="./sports_run.html">跑步</a>
        <a id="rideLink" class="header-btn" href="./sports_ride.html">骑行</a>
        <a id="trainLink" class="header-btn" href="./sports_train.html">课程训练</a>
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
    // 链接跳转
    for (let i = 0; i < headerBtns.length; i++) {
        headerBtns[i].addEventListener("click", function (e) {
            e.preventDefault();
            $utils.out();
            setTimeout(() => {
                location.href = headerWebs[i];
            }, 1000);
        });
    }
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
    let footerWebs = ["./index.html", "./sports_run.html", "./social.html", "./mine.html"];
    for (let i = 0; i < footerBtns.length; i++) {
        footerBtns[i].addEventListener("click", function () {
            $utils.out();
            setTimeout(() => {
                location.href = footerWebs[i];
            }, 1000);
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

// 把秒转为时分秒
function secondToHms(n) {
    let h = Math.floor(n / 60 / 60); //小时
    let m = Math.floor(n / 60 % 60); //分钟
    let s = n % 60;
    let arr = [h, m, s].map((v) => {
        return padZero(v)
    });
    let str = arr.join(":")
    return str;
}

// 补零
function padZero(n) {
    return n < 10 ? "0" + n : n;
}

/* 画线函数 */
function drawLine(map, start, end) {
    var polyline = new BMap.Polyline([
        new BMap.Point(start.lng, start.lat),
        new BMap.Point(end.lng, end.lat)
    ], {
        strokeColor: "blue",
        strokeWeight: 6,
        strokeOpacity: 0.5
    });
    map.addOverlay(polyline);
}

// 根据经纬度计算距离
function calcDistance(startPoint, curPoint) {
    let lat1 = startPoint.lat
    let lng1 = startPoint.lng

    let lat2 = curPoint.lat
    let lng2 = curPoint.lng

    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s.toFixed(2) // 单位千米
}

// 计算配速函数 
function calcPace(d, s) {
    let distance = d
    let spendTime = s / 60
    if (distance > 0 && spendTime > 0) {
        let pace = parseFloat(spendTime / distance)
        let m = Math.floor(pace)
        let s = ((pace - m) * 60).toFixed(0)
        return `${m}'${s}"`

    }
    return "--"
}

// 计算卡路里
function calCalorie(miles) {
    if (miles > 0) {
        let calorie = 60 * miles * 1.036;
        return calorie.toFixed(2);
    }
    return "--"
}

// 随机正负数
function randomNum(m, n) {
    let a = Math.random() < 0.5 ? -1 : 1;
    let b = Math.random() * (m - n) + n;
    return a * b;
}

// 加载
function load(time = 1400) {
    let loadMask = document.querySelector("#loadMask");
    setTimeout(() => {
        loadMask.style.display = "none";
    }, time);
}

// 退出
function out() {
    let outMask = document.querySelector("#outMask");
    outMask.style.display = "block";
}

// 暴露出去
window.$utils = {
    BASE_URL: BASE_URL,
    isPhoneNum: isPhoneNum,
    isPassword: isPassword,
    showToast: showToast,
    commonFooter: commonFooter,
    commonHeader: commonHeader,
    padZero: padZero,
    formatDate: formatDate,
    secondToHms: secondToHms,
    drawLine: drawLine,
    calcDistance: calcDistance,
    calcPace: calcPace,
    calCalorie: calCalorie,
    randomNum: randomNum,
    load: load,
    out: out,
}