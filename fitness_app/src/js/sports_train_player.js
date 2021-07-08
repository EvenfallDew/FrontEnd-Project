"use strict"

// 引入当前页面对应的样式文件
require("../less/sports_train_player.less");

document.ready(function () {
    // 获取元素 
    let video = document.querySelector("#video"); //视频标签
    let currentPart = document.querySelector("#currentPart"); //当前视频
    let countPart = document.querySelector("#countPart"); //视频个数
    let title = document.querySelector("#title"); //视频标题
    let progress = document.querySelector("#progress"); //进度条
    let prevBtn = document.querySelector("#prevBtn"); //上一个按钮
    let nextBtn = document.querySelector("#nextBtn"); //下一个按钮
    let mask = document.querySelector("#mask"); //蒙层
    let continuePlay = document.querySelector("#continuePlay"); //继续训练按钮
    let stopPlay = document.querySelector("#stopPlay"); // 停止按钮
    let pauseBtn = document.querySelector("#pauseBtn"); //暂停按钮
    let currentImg = document.querySelector("#currentImg"); //当前视频的图片
    let curTitle = document.querySelector("#curTitle"); //当前视频标题
    //从本地存储中获取视频
    let frags = JSON.parse(localStorage.getItem("fragments"));
    let index = 0; //当前视频的索引
    let videoCount = frags.length; //视频的总个数
    // 屏幕的宽度
    let screenWidth = screen.width;
    let timerId = null;

    /* 播放视频 */
    function playVideo() {
        video.src = $utils.BASE_URL + frags[index].videoUrl;
        video.play();
        progressBar();
        // 显示视频信息
        currentPart.textContent = index + 1;
        countPart.textContent = videoCount;
        title.textContent = frags[index].title;
    }
    playVideo();

    /* 视频的结束事件 */
    video.addEventListener("ended", function () {
        index++;
        if (index < videoCount) {
            playVideo();
        } else {
            clearInterval(timerId);
        }
    });

    /* 下一个 */
    nextBtn.addEventListener("click", function () {
        index++;
        if (index <= videoCount - 1) {
            playVideo();
        } else {
            index = videoCount - 1;
        }
    });

    /* 上一个 */
    prevBtn.addEventListener("click", function () {
        index--;
        if (index < 0) {
            index = 0;
            return;
        }
        playVideo();
    });

    let timeArr = [];
    // 进度条
    function progressBar() {
        clearInterval(timerId);
        timerId = setInterval(function () {
            timeArr[index] = video.currentTime //把当前时间存在数组中
            let curWidth = video.currentTime / video.duration * screenWidth;
            progress.style.width = curWidth + "px";
        }, 30);
    }

    /* 暂停按钮 */
    pauseBtn.addEventListener("click", function () {
        //1 弹出蒙层
        mask.style.display = "block";
        //2 停止视频播放
        video.pause();
        //3 停止定时器
        clearInterval(timerId);
        if (index == videoCount) {
            index = videoCount - 1;
        }
        //4 修改蒙层中的信息
        currentImg.src = $utils.BASE_URL + frags[index].imgUrl;
        curTitle.textContent = frags[index].title;
    })

    /* 继续训练 */
    continuePlay.addEventListener("click", function () {
        // 隐藏蒙层
        mask.style.display = "none";
        // 开始视频播放
        video.play();
        // 进度条继续
        progressBar();
    })

    // 结束训练
    stopPlay.addEventListener("click", function () {
        // 隐藏蒙层
        mask.style.display = "none";
        // 存储数据
        let cid = location.search.split("=")[1]; //课程id
        let userId = JSON.parse(localStorage.getItem("user")).userId; //用户id
        let countTime = 0; //训练的时间
        timeArr.forEach((v) => {
            countTime += v;
        });
        axios.post($utils.BASE_URL + "/sports/saveTrain", {
            id: cid, //课程id
            userId: userId, //用户id
            takeTime: countTime, //训练的时间
            calorie: countTime * 1.2 //卡路里
        }).then(function (res) {
            let result = res.data;
            if (result.status == 0) {
                $utils.showToast("icon-toast-correct", "数据保存成功", 2000);
                setTimeout(() => {
                    location.href = "./sports_train.html";
                }, 2000);
            } else {
                $utils.showToast("icon-toast-wrong", "请联系后端", 2000);
                setTimeout(() => {
                    location.href = "./sports_train.html";
                }, 2000);
            }
        }).catch(function (error) {
            console.log(error);
        });
    })
});