"use strict"

// 引入当前页面对应的样式文件
require("../less/sports_train_detail.less");

document.ready(function () {
    // 获取元素
    let trainBtn = document.querySelector("#trainBtn");
    let courseImg = document.querySelector("#courseImg");
    let name = document.querySelector("#name");
    let calorie = document.querySelector("#calorie");
    let time = document.querySelector("#time");
    let peoplenum = document.querySelector("#peoplenum");
    let desc = document.querySelector("#desc");
    let frequency = document.querySelector("#frequency");
    let instrument = document.querySelector("#instrument");

    // 获取当前课程id
    let cid = location.search.split("=")[1];


    // 发送请求获取课程详情
    axios.get($utils.BASE_URL + "/sports/courseDetail?id=" + cid).then(function (res) {
        let result = res.data;
        if (result.status == 0) {
            // 把当前课程的视频存到本地存储中
            localStorage.setItem("fragments", JSON.stringify(result.data.fragments));
            // 把其它信息渲染到页面
            courseImg.src = $utils.BASE_URL + result.data.imgurl;
            name.textContent = result.data.name;
            calorie.textContent = result.data.calorie;
            time.textContent = result.data.time;
            peoplenum.textContent = result.data.peoplenum;
            desc.textContent = result.data.desc;
            frequency.textContent = result.data.frequency;
            instrument.textContent = result.data.instrument;
        }
    }).catch(function (error) {
        console.log(error);
    });

    // 开始训练
    trainBtn.addEventListener("click", function () {
        location.href = "./sports_train_player.html?courseId=" + cid;
    });
});