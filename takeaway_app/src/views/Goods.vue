<template>
	<div class="goods">
		<!-- 左侧分类 -->
		<aside class="cate-left" ref="left">
			<div>
				<div
					v-for="(item, i) in list"
					:key="i"
					:class="curPage == item.name ? 'cate-item active' : 'cate-item'"
					@click="changeCate(item.name)"
				>
					{{ item.name }}
				</div>
			</div>
		</aside>
		<!-- 右侧商品 -->
		<main class="goods-right" ref="right">
			<div>
				<div class="cate-item" :id="item.name" v-for="(item, i) in list" :key="i">
					<h2 class="cate-title">{{ item.name }}</h2>
					<div class="goods-box" v-for="(v, j) in item.foods" :key="j" @click="showDialog(v)">
						<img class="goods-img" :src="v.imgUrl" />
						<div class="goods-info">
							<h3 class="goods-name">{{ v.name }}</h3>
							<p class="goods-desc">{{ v.goodsDesc }}</p>
							<p class="goods-sell">月售{{ v.sellCount }}份 好评率{{ v.rating }}%</p>
							<div class="goods-ctrl">
								<div class="goods-price">
									<span>￥</span>
									{{ v.price }}
								</div>
								<div class="ctrl-btns">
									<span
										class="min-btn iconfont icon-minus"
										v-if="v.num >= 1"
										@click.stop="del(v.id, -1)"
									></span>
									<span class="good-num" v-if="v.num >= 1">{{ v.num }}</span>
									<span
										class="add-btn iconfont icon-add"
										@click.stop="add(v.id, +1)"
										@click="addInCart"
									></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>

		<!-- 弹窗 -->
		<transition
			enter-active-class="animate__animated animate__slideInRight"
			leave-active-class="animate__animated animate__slideOutRight"
		>
			<div class="dialog" v-if="isDialogShow">
				<div class="close-btn" @click="isDialogShow = false">
					<van-icon name="arrow-left" />
				</div>
				<van-image width="100%" height="400px" fit="cover" :src="goodsInfo.imgUrl">
					<template v-slot:loading>
						<van-loading type="spinner" size="20" />
					</template>
				</van-image>

				<div class="goods-des">
					<h2>{{ goodsInfo.name }}</h2>
					<p>
						月售{{ goodsInfo.sellCount }}份 &emsp; 好评率{{
							((goodNum / goodsInfo.ratings.length) * 100) | filNumber
						}}%
					</p>
					<p class="goods-buy">
						<span class="now-price">
							<span>￥</span>
							{{ goodsInfo.price }}
						</span>
						<van-button round type="info" @click.stop="add(goodsInfo.id, +1)">加入购物车</van-button>
					</p>
				</div>

				<div class="goods-ad">
					<h2>商品介绍</h2>
					<p>
						{{ goodsInfo.goodsDesc }}
					</p>
				</div>

				<div class="goods-rate">
					<h2>商品评价</h2>
					<p class="btns">
						<van-button color="#00a0dc" @click="filterComment = 'all'">
							全部
							<span class="btn-size">{{ goodsInfo.ratings.length }}</span>
						</van-button>
						<van-button color="#ccecf7" @click="filterComment = 'good'">
							推荐
							<span class="btn-size">{{ goodNum }}</span>
						</van-button>
						<van-button color="#eaebed" @click="filterComment = 'bad'">
							吐槽
							<span class="btn-size">{{ badNum }}</span>
						</van-button>
					</p>

					<p class="only-conts">
						<van-checkbox v-model="checked" @click="onlyText()">只看有内容的评价</van-checkbox>
					</p>

					<ul v-if="isShow == true">
						<li class="user-rate" v-for="(item, index) in filterArr" :key="item.id">
							<!-- 评价内容 -->
							<section class="user-info">
								<p>{{ item.rateTime | filtime }}</p>
								<div>
									<span>{{ item.username }}</span>
									<van-image round width="20px" height="20px" :src="item.avatar" />
								</div>
							</section>

							<section class="user-type">
								<van-icon
									:class-prefix="item.rateType == 0 ? 'iconfont icon-good' : 'iconfont icon-bad'"
								/>
								<p class="user-text">{{ item.text }}</p>
							</section>
						</li>
					</ul>
					<ul v-if="isShow == false">
						<li class="user-rate" v-for="(item, index) in newArr" :key="item.id">
							<!-- 评价内容 -->
							<section class="user-info">
								<p>{{ item.rateTime | filtime }}</p>
								<div>
									<span>{{ item.username }}</span>
									<van-image round width="20px" height="20px" :src="item.avatar" />
								</div>
							</section>

							<section class="user-type">
								<van-icon
									:class-prefix="item.rateType == 0 ? 'iconfont icon-good' : 'iconfont icon-bad'"
								/>
								<p class="user-text">{{ item.text }}</p>
							</section>
						</li>
					</ul>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import { getGoods_api } from "@/api/apis";
import BScroll from "better-scroll";
import moment from "moment";

export default {
	data() {
		return {
			goodsData: [],
			isDialogShow: false, // 模态框显示和隐藏
			curPage: "收藏门店超值专享",
			goodsInfo: {}, // 模态框需要的数据
			checked: false,
			isShow: true,
			filterComment: "all",
			newArr: [], // 监听到值变化的数组
		};
	},

	created() {
		this.getGoods();
	},

	computed: {
		// 取出状态机中的数据
		list() {
			return this.$store.state.list;
		},
		goodNum() {
			return this.goodsInfo.ratings.filter((item) => item.rateType == 0).length;
		},
		badNum() {
			return this.goodsInfo.ratings.filter((item) => item.rateType == 1).length;
		},
		filterArr() {
			this.isShow = true;
			this.checked = false;
			if (this.filterComment == "all") {
				return this.goodsInfo.ratings;
			} else if (this.filterComment == "good") {
				return this.goodsInfo.ratings.filter((item) => item.rateType == 0);
			} else {
				return this.goodsInfo.ratings.filter((item) => item.rateType == 1);
			}
		},
	},

	filters: {
		filtime(val) {
			return moment(val).format("YYYY-MM-DD HH:mm");
		},
		filNumber(val) {
			return val.toFixed(2);
		},
	},

	watch: {
		// 监听到计算属性 过滤出来的数组值的变化
		filterArr(newVal) {
			this.newArr = newVal;
		},
	},

	methods: {
		// 获取 商品
		async getGoods() {
			let res = await getGoods_api();
			let { goodsList } = res.data;
			for (let obj of goodsList) {
				for (let item of obj.foods) {
					item.num = 0;
				}
			}
			this.goodsData = goodsList;
			// 存入状态机
			this.$store.commit("SETLIST", goodsList);
			// 在created生命周期中  获取dom节点的方式
			this.$nextTick(() => {
				// 左边的分类滚动
				let leftScroll = new BScroll(this.$refs.left, {
					// 允许点击事件
					click: true,
				});
				// 右侧商品滚动
				this.rightScroll = new BScroll(this.$refs.right, {
					// 派发事件
					probeType: 3,
					click: true,
				});
				// 直接派发滚动事件
				this.rightScroll.on("scroll", (pos) => {
					let newArr = []; // 定义空数组
					let start = 0; // 初始值
					// 取出y轴的绝对值
					let y = Math.abs(pos.y);
					// 循环数组 拿到每一个元素对应的高度heght
					for (let obj of this.goodsData) {
						let hArr = document.getElementById(obj.name).offsetHeight;
						// 往数组中push对象
						newArr.push({
							min: start,
							max: start + hArr,
							title: obj.name,
						});
						// 每一次循环结束后，把下一个元素的高度 加等于 start === 上一个元素的终点位置
						start += hArr;
					}
					// 循环遍历新数组 判断y是否在区间范围内，如果在对应区间，就赋值给左侧
					for (let obj of newArr) {
						if (y >= obj.min && y <= obj.max) {
							this.curPage = obj.title;
						}
					}
				});
			});
		},
		// 分类切换
		changeCate(cate) {
			this.curPage = cate;
			// 点击左边让右边滚动
			this.rightScroll.scrollToElement(document.getElementById(cate), 300);
		},
		// 商品弹窗
		showDialog(goodsInfo) {
			// 显示
			this.isDialogShow = true;
			// 赋值
			this.goodsInfo = goodsInfo;
		},
		// 点击加号和减号，往状态机中存入对应的数据
		del(id, num) {
			// 发通知
			this.$store.commit("DEL", { id, num });
		},
		add(id, num) {
			// 发通知
			this.$store.commit("DEL", { id, num });
		},
		// 只看有内容
		onlyText() {
			this.isShow = !this.isShow;
			if (this.checked == true) {
				this.newArr = this.newArr.filter((item) => item.text != "");
			}
		},
		// 添加动画
		addInCart() {
			let x = event.pageX - 10;
			let y = event.pageY - 10;
			this.createBall(x, y);
		},
		createBall(left, top) {
			let bar = document.createElement("div");
			bar.style.position = "absolute";
			bar.style.left = left + "px";
			bar.style.top = top + "px";
			bar.style.width = "25px";
			bar.style.height = "25px";
			bar.style.borderRadius = "50%";
			bar.style.backgroundColor = "#2395ff";
			bar.style.transition = "left .5s linear, top .5s cubic-bezier(0.5, -0.5, 1, 1)";

			document.body.appendChild(bar);
			// 添加动画属性
			setTimeout(() => {
				let target = document.querySelector(".target-cart");
				let content = document.querySelector(".content");
				bar.style.left = target.offsetLeft + target.offsetWidth / 2 + "px";
				bar.style.top = content.offsetHeight - target.offsetHeight / 2 + "px";
			}, 0);

			// 动画结束后，删除自己
			bar.ontransitionend = function() {
				this.remove();
			};
		},
	},
};
</script>

<style lang="less" scoped src="../assets/styles/goods.less"></style>
