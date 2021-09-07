"use strict";

//banner-轮播
$(function () {
	var bannerSlider = new Slider($("#banner_tabs"), {
		time: 2000,
		delay: 400,
		event: "hover",
		auto: true,
		mode: "fade",
		controller: $("#bannerCtrl"),
		activeControllerCls: "active",
	});
	$("#banner_tabs .flex-prev").click(function () {
		bannerSlider.prev();
	});
	$("#banner_tabs .flex-next").click(function () {
		bannerSlider.next();
	});
});

// 秒杀-跑马灯
var mySwiper = new Swiper(".mn-swiper", {
	autoplay: true,
	touchRatio: 1,
	speed: 3000, //匀速时间
	loop: true,
	freeMode: true, //设置为true则变为free模式
	slidesPerView: 4,
	slidesPerGroup: 1,
});
//--  如果需要前进后退按钮 --
$(".arrow-left").click(function () {
	mySwiper.swipePrev();
});
$(".arrow-right").click(function () {
	mySwiper.swipeNext();
});
//鼠标移入悬停
$(".swiper-container").on("mouseenter", function () {
	mySwiper.stopAutoplay();
});
//鼠标移出滚动
$(".swiper-container").on("mouseleave", function () {
	mySwiper.startAutoplay();
});

// 倒计时
function cutDown(targetTime, elementHour, elementMin, elementSec) {
	setInterval(function () {
		var d1 = new Date();
		var d2 = new Date(targetTime);
		//获取时间戳（秒）
		var s1 = Math.floor(d1.getTime() / 1000);
		var s2 = Math.floor(d2.getTime() / 1000);
		//得到时间，计算出时分秒
		var seconds = s2 - s1;
		if (seconds > 60) {
			var min = parseInt(seconds / 60);
			var sec = parseInt(seconds % 60);
			if (min > 60) {
				var hour = parseInt(min / 60);
				min = parseInt(min % 60);
			}
		}
		// 输出到指定地方
		document.querySelector(elementHour).innerText = hour;
		document.querySelector(elementMin).innerText = min;
		document.querySelector(elementSec).innerText = sec;
	}, 1000);
}
cutDown("2025/6/18 18:00:00", "#hour", "#minute", "#seconds");

// 切换标签
function contShow(tabElement, contElement, trigger, addTabClassName, speed) {
	$(tabElement).on(trigger, function () {
		$(tabElement).removeClass(); //移除所有标签的样式
		$(this).addClass(addTabClassName); //给鼠标移入的标签添加样式
		$(contElement).stop(true, false).fadeOut(speed); //所有内容收起
		$(contElement).eq($(this).index()).stop(true, false).fadeIn(speed); //鼠标移入的标签对应的内容展示
	});
}

contShow("#cloth-title li", "#cloth-conts .cloth-cont", "mouseover", "tabOn", 0);
contShow("#baby-title li", "#baby-conts .cloth-cont", "mouseover", "tabOn", 0);
contShow("#life-title li", "#life-conts .cloth-cont", "mouseover", "tabOn", 0);
contShow("#home-title li", "#home-conts .cloth-cont", "mouseover", "tabOn", 0);

//  内容里轮播
function contSwiper(tabs, ctrl, prevBtn, nextBtn) {
	$(function () {
		var bannerSlider = new Slider($(tabs), {
			time: 2000,
			delay: 400,
			event: "hover",
			auto: true,
			mode: "fade",
			controller: $(ctrl),
			activeControllerCls: "active",
		});
		$(prevBtn).click(function () {
			bannerSlider.prev();
		});
		$(nextBtn).click(function () {
			bannerSlider.next();
		});
	});
}

contSwiper(".cloth_tab11", ".clothCtrl11", ".cloth_tab11 .flex-prev", ".cloth_tab11 .flex-next");
contSwiper(".cloth_tab12", ".clothCtrl12", ".cloth_tab12 .flex-prev", ".cloth_tab12 .flex-next");
contSwiper(".cloth_tab13", ".clothCtrl13", ".cloth_tab13 .flex-prev", ".cloth_tab13 .flex-next");
contSwiper(".cloth_tab21", ".clothCtrl21", ".cloth_tab21 .flex-prev", ".cloth_tab21 .flex-next");
contSwiper(".cloth_tab22", ".clothCtrl22", ".cloth_tab22 .flex-prev", ".cloth_tab22 .flex-next");
contSwiper(".cloth_tab23", ".clothCtrl23", ".cloth_tab23 .flex-prev", ".cloth_tab23 .flex-next");
contSwiper(".cloth_tab31", ".clothCtrl31", ".cloth_tab31 .flex-prev", ".cloth_tab31 .flex-next");
contSwiper(".cloth_tab32", ".clothCtrl32", ".cloth_tab32 .flex-prev", ".cloth_tab32 .flex-next");
contSwiper(".cloth_tab33", ".clothCtrl33", ".cloth_tab33 .flex-prev", ".cloth_tab33 .flex-next");
contSwiper(".cloth_tab41", ".clothCtrl41", ".cloth_tab41 .flex-prev", ".cloth_tab41 .flex-next");
contSwiper(".cloth_tab42", ".clothCtrl42", ".cloth_tab42 .flex-prev", ".cloth_tab42 .flex-next");
contSwiper(".cloth_tab43", ".clothCtrl43", ".cloth_tab43 .flex-prev", ".cloth_tab43 .flex-next");

// 偷取搜索栏
$(window).on("scroll", function () {
	let sTop = parseInt($(this).scrollTop());
	if (sTop > 400) {
		$(".fixed-header").slideDown();
		$(".search-buy .search-box").appendTo($(".fixed-header"));

		$(".fixed-nav").slideDown();
		$(".fixed-code").slideDown();
	} else {
		$(".fixed-header").slideUp(0);
		$(".fixed-header .search-box").appendTo($(".search-buy"));

		$(".fixed-nav").slideUp(0);
		$(".fixed-code").slideUp(0);
	}
});

// 电梯导航
$(".lift li").on("click", function () {
	var index = $(this).index();
	var fl = $(".floor").eq(index);
	var fTop = fl.offset().top;
	$("html, body").animate({
		scrollTop: fTop - 50 + "px",
	});
});
