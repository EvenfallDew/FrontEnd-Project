"use strict";

// 切换标签
function contShow(tabElement, contElement, trigger, addTabClassName = "", speed = 0) {
    $(tabElement).on(trigger, function () {
        //移除所有标签的样式
        $(tabElement).removeClass(addTabClassName);
        //给鼠标移入的标签添加样式
        $(this).addClass(addTabClassName);
        //所有内容收起
        $(contElement).stop(true, false).fadeOut(speed);
        //鼠标移入的标签对应的内容展示
        $(contElement).eq($(this).index()).stop(true, false).fadeIn(speed);
    });
}

// 按钮执行下一步
function nextShow(tabElement, contElement, trigger, addTabClassName = "", addClassElement = "this", speed = 0, indexAdd = 0) {
    $(tabElement).on(trigger, function () {
        //移除所有标签的样式
        $(addClassElement).removeClass(addTabClassName);
        //给鼠标移入的标签添加样式
        $(addClassElement).eq($(this).index() + indexAdd).addClass(addTabClassName);
        //所有内容收起
        $(contElement).stop(true, false).fadeOut(speed);
        //鼠标移入的标签对应的内容展示
        $(contElement).eq($(this).index() + indexAdd).stop(true, false).fadeIn(speed);
    });
}

// 倒计时
function cutDown(sec, outputElement = "") {
    var startTime = new Date(); //开始时间
    var endTime = new Date();   //结束时间为当前时间
    var startTimeSec = startTime.getSeconds();//当前秒
    endTime.setSeconds(startTimeSec + sec); //结束秒+sec

    var timer = setInterval(function () {
        var nowTime = new Date();   //每秒更新的现在时间
        var nowTimeSec = Math.floor(nowTime.getTime() / 1000); //获取时间戳（秒）
        var endTimeSec = Math.floor(endTime.getTime() / 1000);//获取时间戳（秒）
        var resultSec = endTimeSec - nowTimeSec + 1;    //将计算差多少秒(优化显示+1s)
        document.querySelector(outputElement).innerText = resultSec + "秒";  //输出形式
        if (resultSec <= 0) {   //到点了,防止输入负数不结束计时
            cutDownOverToDo();
            clearInterval(timer);
        }
    }, 1000);   //每秒更新
}

// 表单验证
function formConfirm(inputElement, spanElement, regRule, alert) {
    let confirm = document.querySelector(inputElement);
    let confirmInfo = document.querySelector(spanElement);
    // 绑定失去光标事件
    confirm.onblur = function () {
        // 获取输入框的值
        let confirmVal = this.value;
        // 判断用户输入的内容
        if (confirmVal) {
            // 正则判断
            if (!regRule.test(confirmVal)) {
                confirmInfo.innerHTML = alert;
            } else {
                confirmInfo.innerHTML = "";
            }
        } else {
            confirmInfo.innerHTML = "输入不能为空";
        }
    }
}

// 换一批
function changeLike(changeBtn, changeConts, moveLength) {
    let num = 0;
    $(changeBtn).on("click", function () {
        num++;
        // 如果到了最右边（最后一个ul），瞬移到最左边（第一个ul）
        if (num >= 3) {
            num = 0;
        }
        $(changeConts).css("left", - moveLength * num + 'px');
    });
}

// 手风琴
function asideAppear(outElement, inElement, trigger, speed) {
    $(inElement).eq(0).slideDown(speed);
    //给dt绑定点击事件
    $(outElement).on(trigger, function () {
        //收起全部
        $(inElement).stop(true, false).slideUp(speed);
        //移入的dt展开
        $(this).next().stop(true, false).slideDown(speed);
    });
}

// 倒计时禁用
function disabledState(element, sec, elementText) {
    element.disabled = true;    //禁用
    var startTime = new Date(); //开始时间
    var endTime = new Date();   //结束时间为当前时间
    var startTimeSec = startTime.getSeconds();//当前秒
    endTime.setSeconds(startTimeSec + sec); //结束秒+sec

    var timer = setInterval(function () {
        var nowTime = new Date();   //每秒更新的现在时间
        var nowTimeSec = Math.floor(nowTime.getTime() / 1000); //获取时间戳（秒）
        var endTimeSec = Math.floor(endTime.getTime() / 1000); //获取时间戳（秒）
        var resultSec = endTimeSec - nowTimeSec + 1;    //将计算差多少秒
        element.innerText = " 请" + resultSec + "s后再试";    //改变元素文本显示为倒计时
        if (resultSec <= 0) {    //到点了,防止输入负数
            element.disabled = false;   //取消禁用
            element.innerText = elementText;    //恢复元素默认文本
            clearInterval(timer);   //清空计时器
        }
    }, 1000);   //每秒更新
}