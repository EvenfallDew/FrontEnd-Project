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
									<button class="min-btn" v-if="v.num >= 1" @click.stop="del(v.id, -1)">-</button>
									<span v-if="v.num >= 1">{{ v.num }}</span>
									<button class="add-btn" @click.stop="add(v.id, +1)">+</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>

		<!-- 弹窗 -->
		<transition name="b">
			<div class="dialog" v-if="isShow">
				<div class="close-btn" @click="isShow = false">X</div>
				<van-image width="100%" height="400px" fit="cover" :src="goodsInfo.imgUrl">
					<template v-slot:loading>
						<van-loading type="spinner" size="20" />
					</template>
				</van-image>

				<div class="goods-des">
					<h2>{{ goodsInfo.name }}</h2>
					<p>月售{{ goodsInfo.sellCount }}份 &emsp; 好评率100%</p>
					<p class="goods-buy">
						<span class="now-price">
							<span>￥</span>
							{{ goodsInfo.price }}
						</span>
						<van-button round type="info">加入购物车</van-button>
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
						<van-button color="#00a0dc">全部</van-button>
						<van-button color="#ccecf7">推荐</van-button>
						<van-button color="#eaebed">吐槽</van-button>
					</p>

					<p class="only-conts">
						<van-checkbox v-model="checked" @click="onlyText()">只看有内容的评价</van-checkbox>
					</p>

					<ul>
						<li class="user-rate" v-if="isShow" v-for="(item, index) in goodsInfo.ratings" :key="item.id">
							<!-- 评价内容 -->
							<section class="user-info">
								<p>{{ item.rateTime | filtime }}</p>
								<div>
									<span>{{ item.username }}</span>
									<van-image round width="20px" height="20px" :src="item.avatar" />
								</div>
							</section>

							<section>
								<van-icon :name="item.rateType == 1 ? 'play' : 'good-job'" />
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

			isShow: false, // 模态框显示和隐藏
			curPage: "收藏门店超值专享",
			goodsInfo: {}, // 模态框需要的数据
			checked: false,
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
	},

	filters: {
		filtime(val) {
			return moment(val).format("YYYY-MM-DD HH:mm");
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
					let newArr = []; // 定义空数组 [{min,max,title},{min,max,title}...]
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
			this.isShow = true;
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
	},
};
</script>

<style lang="less" scoped src="../assets/styles/goods.less"></style>
