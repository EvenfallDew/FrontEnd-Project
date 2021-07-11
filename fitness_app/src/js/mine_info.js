"use strict"

// 引入对应的less样式
require("../less/common_css/weui.css");
require("../less/mine_info.less");

$utils.load(1400);

document.ready(function () {
    // 获取本地存储信息
    let userId = JSON.parse(localStorage.getItem("user")).userId;

    // 获取元素
    let showSexPicker = document.querySelector("#showSexPicker");
    let showBirthdayPicker = document.querySelector("#showBirthdayPicker");
    let showProvincePicker = document.querySelector("#showProvincePicker");
    let showCityPicker = document.querySelector("#showCityPicker");

    let sex = document.querySelector("#sex");
    let birthday = document.querySelector("#birthday");
    let province = document.querySelector("#province");
    let city = document.querySelector("#city");
    let nickName = document.querySelector("#nickName");
    let signArea = document.querySelector("#signArea");
    let signNum = document.querySelector("#signNum");
    let saveBtn = document.querySelector("#saveBtn");

    // 省份数组
    let provinceArr = [];
    // 城市数组
    let cityArr = [];

    // 显示性别
    showSexPicker.addEventListener('click', function () {
        weui.picker([{
            label: '男',
            value: 0
        }, {
            label: '女',
            value: 1
        }, {
            label: '不详',
            value: 2
        }], {
            // 确认事件
            onConfirm: function (result) {
                // 把用户选中的值显示到页面上。 
                sex.textContent = result[0].label;
            },
            title: '请选择性别'
        });
    });

    // 生日
    showBirthdayPicker.addEventListener('click', function () {
        weui.datePicker({
            start: 1949,
            end: new Date().getFullYear(),
            onConfirm: function (result) {
                birthday.textContent = result.map(function (obj) {
                    return $utils.padZero(obj.value);
                }).join("-");
            },
            title: '请选择生日'
        });
    });

    // 选择省份
    showProvincePicker.addEventListener('click', function () {
        weui.picker(
            provinceArr, {
                // 确认事件
                onConfirm: function (result) {
                    province.textContent = result[0].label;
                    city.textContent = "请选择";
                    // 去获取所管辖的城市的信息
                    axios.get($utils.BASE_URL + "/address/city/" + result[0].value).then(function (res) {
                        let result = res.data;
                        if (result.status == 0) {
                            cityArr = result.data.map(function (city) {
                                let obj = {
                                    label: city.name,
                                    value: city.addressId
                                }
                                return obj;
                            });
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                },
                title: '请选择省份'
            }
        );
    });

    // 选择城市
    showCityPicker.addEventListener('click', function () {
        weui.picker(
            cityArr, {
                // 确认事件
                onConfirm: function (result) {
                    city.textContent = result[0].label;
                },
                title: '请选择城市'
            }
        );
    });

    // 获取省份信息
    function getProCity() {
        axios.get($utils.BASE_URL + "/address/province").then(function (res) {
            let result = res.data;
            if (result.status == 0) {
                // 获取城市列表
                let user = JSON.parse(localStorage.getItem("user"));
                let proName = user.address.split(",")[0];
                let addressId = search(proName, result.data);
                axios.get($utils.BASE_URL + "/address/city/" + addressId).then(function (res) {
                    let result = res.data;
                    if (result.status == 0) {
                        cityArr = result.data.map(function (city) {
                            let obj = {
                                label: city.name,
                                value: city.addressId
                            }
                            return obj;
                        });
                    }
                }).catch(function (error) {
                    console.log(error);
                });
                provinceArr = result.data.map(function (pro) {
                    return {
                        label: pro.name,
                        value: pro.addressId
                    }
                });
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    // 查找省份id
    function search(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].name == nameKey) {
                return myArray[i].addressId;
            }
        }
    }
    getProCity();

    // 签名实时字数
    signArea.addEventListener("input", function () {
        signNum.textContent = this.value.length;
    });

    // 从本地存储中获取用户信息显示在页面上
    function getUserInfo() {
        let user = JSON.parse(localStorage.getItem("user"));
        // 昵称
        nickName.value = user.nickname;
        // 性别
        sex.textContent = user.gender ? user.gender : "请选择";
        // 生日
        birthday.textContent = user.birthday ? $utils.formatDate(user.birthday) : "请选择";
        // 所在省份
        province.textContent = user.address ? user.address.split(",")[0] : "请选择";
        // 所在城市
        city.textContent = user.address ? user.address.split(",")[1] : "请选择";
        // 签名
        signArea.value = user.sign;
        // 签名字数
        signNum.textContent = user.sign.length;
    }
    getUserInfo();

    // 保存按钮
    saveBtn.addEventListener("click", function () {
        axios.post($utils.BASE_URL + "/users/userEdit", {
            "nickname": nickName.value,
            "gender": sex.textContent,
            "birthday": birthday.textContent,
            "address": [province.textContent, city.textContent],
            "sign": signArea.value,
            "userId": userId
        }).then(function (res) {
            let result = res.data;
            if (result.status == 0) {
                // 弹窗提示，修改成功
                $utils.showToast("icon-toast-correct", "修改成功", 2000);
                // 跳转页面
                setTimeout(() => {
                    $utils.out();
                    setTimeout(() => {
                        location.href = "./mine.html";
                    }, 1000);
                }, 2000);
            }
        }).catch(function (error) {
            console.log(error);
        });
    });

    // 跳转
    let mineLink = document.querySelector("#mineLink");
    mineLink.addEventListener("click", function (e) {
        e.preventDefault();
        $utils.out();
        setTimeout(() => {
            location.href = "./mine.html";
        }, 1000);
    });
});