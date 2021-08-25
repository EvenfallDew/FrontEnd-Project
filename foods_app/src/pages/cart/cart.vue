<template>
	<view class="cart-box">
		<view class="goods">
			<!-- 左侧导航菜单 -->
			<scroll-view class="aside" scroll-y>
				<!-- 类名 -->
				<view
					class="aside-title"
					v-for="(item, i) in goods"
					:key="i"
					:class="curPage == item.title ? 'nav cur' : 'nav'"
					@click="changeType(item.title)"
				>
					{{ item.title }}
				</view>

				<view class="aside-block"></view>
			</scroll-view>
			<!-- 右侧内容菜单 -->
			<block v-for="(item, i) in goods" :key="i">
				<scroll-view class="content" scroll-y v-if="curPage == item.title">
					<view class="content-title">
						{{ item.title }}
					</view>

					<!-- 循环 拿到每一个商品 -->
					<view class="content-item" v-for="(obj, j) in item.child" :key="j">
						<image class="good-img" mode="aspectFill" :src="obj.img"></image>
						<view class="item-right">
							<view class="good-name">
								{{ obj.name }}
							</view>
							<view class="good-num">￥{{ obj.price }}/瓶</view>
							<view class="good-operate">
								<view v-if="obj.num > 0" class="btn" @click="operate(obj, -1, obj.id)">
									-
								</view>
								<text v-if="obj.num > 0" class="num">
									{{ obj.num }}
								</text>
								<view class="btn add-btn" :animation="animationData" @click="declick(j, $event)">
									<view @click="operate(obj, 1, obj.id)">+</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 导航栏底部占位 -->
					<view class="aside-block"></view>
				</scroll-view>
			</block>
		</view>
		<!-- 结算 -->
		<view class="buy">
			<view>
				<uni-icons :type="total > 0 ? 'cart-filled' : 'cart'" size="60" color="#ff654e"></uni-icons>
			</view>
			<view class="buy-left" @click="openCart()">￥{{ totalPrice }}</view>
			<view class="buy-btn" @click="pay">
				购买
			</view>
		</view>
		<!-- 弹窗 -->
		<uni-popup ref="popup" type="bottom" background-color="#fff">
			<view class="buy-goods">
				<view class="buy-good" v-for="(item, i) in selArr" :key="i">
					<image class="buy-img" mode="aspectFill" :src="item.img"></image>
					<view class="buy-text">{{ item.name }}</view>
					<view class="buy-text">{{ item.num }}</view>
					<view class="buy-text">{{ item.num * item.price }}</view>
					<view class="good-operate">
						<view v-if="item.num > 0" class="btn" @click="operate(item, -1, item.id)">
							-
						</view>
						<text v-if="item.num > 0" class="num">
							{{ item.num }}
						</text>
						<view class="btn" @click="operate(item, 1, item.id)">
							+
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import jsons from "@/json/static_data.json";

export default {
	data() {
		return {
			curPage: "白酒",
			goods: jsons.cartList,
			selArr: [], // 选中的商品
			animationData: {},
			off: false,
			setWidth: 0,
		};
	},
	mounted() {
		uni.getSystemInfo({
			success: (res) => {
				this.setWidth = res.windowWidth;
			},
		});
	},
	computed: {
		// 总数
		total() {
			let total = 0;
			for (let obj of this.selArr) {
				total += obj.num;
			}
			return total;
		},
		// 总价
		totalPrice() {
			let price = 0;
			for (let obj of this.selArr) {
				price += obj.num * obj.price;
			}
			return price.toFixed(2);
		},
	},

	methods: {
		// 点击分类
		changeType(name) {
			this.curPage = name;
		},
		// 点击加减
		operate(obj, num, id) {
			obj.num += num;
			// 先去重 再添加数据
			this.selArr.forEach((item, i) => {
				// 判断 如果传递的id和遍历的id相同， 删掉
				if (id == item.id) {
					this.selArr.splice(i, 1);
				}
			});
			// 添加进购物车
			this.selArr.push(obj);
			// 按照id排序
			this.selArr.sort(function(a, b) {
				return a.id - b.id;
			});
			// 如果点击减号 数据为0了 过滤一下
			this.selArr = this.selArr.filter((item) => item.num > 0);
		},
		// 微信支付
		pay() {
			// 1. 前端把数据 发给后台
			// uni.request({
			// 	url: "/api/v1/order/place",
			// 	data: { 用户id,商品id数组,.... },
			// 	method: "POST",
			// 	success: (res)=>{
			// 		// res 里面有订单id  金额改成1分钱
			//      2. 把订单id 重新给后台，后台才能返回必要参数
			// 		uni.request({
			// 			url: "/pay/pre_order",  // 生成时间戳 随机串的api
			// 			data: { openId, orderId },
			// 			method: "POST",
			// 			success: (res)=>{
			// 				// res  随机串 签名 时间戳 配置选项 签名算法 加密方式 等等
			// 				uni.requestPayment({
			// 				    provider: 'wxpay',  // 提供的运营商
			// 				    timeStamp: String(Date.now()),  // 时间戳
			// 				    nonceStr: 'A1B2C3D4E5',  // 随机串
			// 				    package: 'prepay_id=wx20180101abcdefg',  // 配置选项
			// 				    signType: 'MD5',  // 签名算法
			// 				    paySign: '',  // 签名
			// 				    success: function (res) {
			// 				        console.log('成功回调:' + JSON.stringify(res));
			// 						// 发一次请求 告诉后端 支付成功或者失败
			// 				    },
			// 				    fail: function (err) {
			// 				        console.log('失败回调:' + JSON.stringify(err));
			// 				    }
			// 				});
			// 			}
			// 		})
			// 	}
			// })

			// 直接调起微信支付
			uni.requestPayment({
				provider: "wxpay", // 提供的运营商
				timeStamp: "1536378375", // 时间戳
				nonceStr: "b8a7e04f54723c35e75d2b27109dc2be", // 随机串
				package: "prepay_id=wx081146152548827173cee9463972166291", // 配置选项
				signType: "MD5", // 签名算法
				paySign: "6815C06D715FC4B9FD4E1FA2E9B233FD", // 签名
				success: function(res) {
					console.log("成功回调:" + JSON.stringify(res));
				},
				fail: function(err) {
					console.log("失败回调:" + JSON.stringify(err));
				},
			});
		},
		// 打开购物车
		openCart() {
			this.$refs.popup.open("bottom");
		},

		// 获取点击位置坐标，动画曲线，endpoint=>getDetails.x.yaddInCart
		addInCart(e) {
			// 起点位置
			let x = e.detail.x;
			let y = e.detail.y;
			console.log(x, y);
			// 终点位置
			let xe = 55;
			let ye = 640;
			// 构建bezel曲线
			// 无法获取$refs.name的节点，在循环节点内创建一个view，点击v-if改为true，执行bezel曲线
		},

		declick(i, e) {
			// 起点位置
			let x = e.detail.x;
			let y = e.detail.y;
			console.log(x, y);
			// 终点位置
			let xe = 55;
			let ye = 640;
			// 绝对定位移动值
			let rightVal = this.setWidth - x;
			let topVal = ye - y;
			if (this.off) {
				// 使用动画
				this.rotateAndScale();
			} else {
				this.norotateAndScale();
			}
			this.off = !this.off;
		},
		// 定义动画内容
		rotateAndScale() {
			// 定义动画内容
			this.animation
				.rotate(45)
				.right(20)
				.top(0)
				.step();
			// 导出动画数据传递给data层
			this.animationData = this.animation.export();
		},
		norotateAndScale() {
			this.animation
				.rotate(0)
				.right(300)
				.top(640)
				.step();
			this.animationData = this.animation.export();
		},
	},
	onShow: function() {
		// 初始化一个动画
		var animation = uni.createAnimation({
			duration: 2000,
			timingFunction: "linear",
		});
		this.animation = animation;
	},
};
</script>

<style>
.cart-box {
    width: 100%;
    height: 100%;
}

page,
.goods {
    display: flex;

    width: 100%;
    height: 100%;
}

.aside {
    width: 100px;
    height: 100%;

    text-align: center;

    background-color: #f7f7f7;
}

.aside-title {
    height: 42px;

    line-height: 42px;
}

.nav {
    box-sizing: border-box;
}

.aside-block {
    width: 100%;
    height: 60px;
}

.cur {
    color: #ff654e;
    background-color: #fff;
}

.content {
    padding: 0 0 0 20px;
    height: 100%;

    flex: 1;
}

.content-title {
    box-sizing: border-box;
    width: 100%;
    height: 42px;

    line-height: 42px;
}

.content-item {
    display: flex;

    margin-bottom: 20px;
    width: 96%;
}

.good-img {
    margin-right: 10px;
    width: 80px;
    height: 80px;
}

.item-right {
    flex: 1;
}

.good-name {
    font-weight: 600;
}

.good-num {
    margin-top: 5px;
    margin-bottom: 10px;

    color: #ff654e;
}

.good-operate {
    display: flex;

    position: relative;

    justify-content: flex-end;
}

.num {
    margin: 0 5px;
}

.btn {
    border-radius: 50%;
    width: 20px;
    height: 20px;

    line-height: 20px;
    text-align: center;

    color: #fff;
    background-color: #ff654e;
}

.add-btn {
    position: absolute;
    top: 0;
    right: 20px;
}

.buy {
    display: flex;

    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 999;

    box-sizing: border-box;
    padding-left: 20px;
    width: 100%;
    height: 60px;

    background-color: #fff;

    box-shadow: 1px 1px 10px 1px #ccc;
}

.buy-left {
    padding-left: 20px;

    font-size: 20px;
    line-height: 60px;

    flex: 1;
}

.buy-btn {
    width: 150px;
    height: 60px;

    line-height: 60px;
    text-align: center;
    letter-spacing: 2px;

    color: #fff;
    background-color: #ff654e;
}

.buy-goods {
    padding: 10px 20px;
}

.buy-good {
    display: flex;

    margin-bottom: 5px;

    align-items: center;
    justify-content: space-between;
}

.buy-img {
    width: 50px;
    height: 50px;
}

.buy-text {
    width: 20%;
}

</style>
