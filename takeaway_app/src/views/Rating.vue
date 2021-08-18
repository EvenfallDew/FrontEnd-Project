<template>
	<div class="rating">
		<header>
			<div class="shop-rate">
				<h2>{{ sellerInfo.score }}</h2>
				<h3>综合评分</h3>
				<p>高于周边商家</p>
			</div>

			<div class="shop-star">
				<p>
					店铺评分：
					<van-rate
						color="#fe9900"
						void-icon="star"
						void-color="#eee"
						allow-half
						readonly
						v-model="sellerInfo.score"
						:size="16"
					/>
					<span>{{ sellerInfo.score }}</span>
				</p>
				<p>
					服务态度：
					<van-rate
						color="#fe9900"
						void-icon="star"
						void-color="#eee"
						allow-half
						readonly
						v-model="sellerInfo.score"
						:size="16"
					/>
					<span>{{ sellerInfo.score }}</span>
				</p>
				<p>
					送达时间：
					<span class="time">{{ sellerInfo.deliveryTime }}分钟</span>
				</p>
			</div>
		</header>

		<main>
			<p class="btns">
				<van-button color="#00a0dc" @click="filterComment = 'all'">
					全部
					<span class="btn-size">{{ rateData.length }}</span>
				</van-button>
				<van-button color="#ccecf7" @click="filterComment = 'good'">
					满意
					<span class="btn-size">{{ goodNum }}</span>
				</van-button>
				<van-button color="#eaebed" @click="filterComment = 'bad'">
					不满意
					<span class="btn-size">{{ badNum }}</span>
				</van-button>
			</p>

			<p class="only-conts">
				<van-checkbox v-model="checked" @click="onlyText()">只看有内容的评价</van-checkbox>
			</p>

			<ul v-if="isShow == true">
				<li class="user-rate" v-for="(item, index) in filterArr" :key="index">
					<!-- 用户头像 -->
					<van-image round width="40px" height="40px" :src="item.avatar" />
					<!-- 评价内容 -->
					<div class="user-comment">
						<section class="user-info">
							<h4>{{ item.username }}</h4>
							<p>{{ item.rateTime | filtime }}</p>
						</section>
						<!-- 用户评分 -->
						<section class="user-score">
							<van-rate
								color="#fe9900"
								void-icon="star"
								void-color="#eee"
								v-model="item.score"
								readonly
								:size="14"
							/>
							<!-- 送达时间 -->
							<p>
								{{
									item.deliveryTime == "" || item.deliveryTime == undefined
										? "已"
										: item.deliveryTime + "分钟"
								}}送达
							</p>
						</section>
						<!-- 用户评论 -->
						<section class="user-text">{{ item.text }}</section>

						<section class="user-type">
							<!-- 点赞点踩 -->
							<van-icon :class-prefix="item.rateType == 0 ? 'iconfont icon-good' : 'iconfont icon-bad'" />
							<!-- 商品标签 -->
							<p>
								<van-tag
									class="tag"
									type="primary"
									color="#aaa"
									plain
									v-for="(item, index) in item.recommend"
									:key="index"
								>
									{{ item }}
								</van-tag>
							</p>
						</section>
					</div>
				</li>
			</ul>
			<ul v-if="isShow == false">
				<li class="user-rate" v-for="(item, index) in newArr" :key="index">
					<!-- 用户头像 -->
					<van-image round width="40px" height="40px" :src="item.avatar" />
					<!-- 评价内容 -->
					<div class="user-comment">
						<section class="user-info">
							<h4>{{ item.username }}</h4>
							<p>{{ item.rateTime | filtime }}</p>
						</section>
						<!-- 用户评分 -->
						<section class="user-score">
							<van-rate
								color="#fe9900"
								void-icon="star"
								void-color="#eee"
								v-model="item.score"
								readonly
								:size="14"
							/>
							<!-- 送达时间 -->
							<p>
								{{
									item.deliveryTime == "" || item.deliveryTime == undefined
										? "已"
										: item.deliveryTime + "分钟"
								}}送达
							</p>
						</section>
						<!-- 用户评论 -->
						<section class="user-text">{{ item.text }}</section>

						<section class="user-type">
							<!-- 点赞点踩 -->
							<van-icon :class-prefix="item.rateType == 0 ? 'iconfont icon-good' : 'iconfont icon-bad'" />
							<!-- 商品标签 -->
							<p>
								<van-tag
									class="tag"
									type="primary"
									color="#aaa"
									plain
									v-for="(item, index) in item.recommend"
									:key="index"
								>
									{{ item }}
								</van-tag>
							</p>
						</section>
					</div>
				</li>
			</ul>
		</main>
	</div>
</template>

<script>
import { getRating_api } from "@/api/apis";
import moment from "moment";
import local from "@/utils/local";

export default {
	data() {
		return {
			rateData: [],
			sellerInfo: {},
			checked: false,
			isShow: true,
			filterComment: "all",
			newArr: [], // 监听到值变化的数组
		};
	},

	created() {
		this.getRating();
	},
	// 过滤器
	filters: {
		filtime(val) {
			return moment(val).format("YYYY-MM-DD HH:mm");
		},
	},
	watch: {
		// 监听到计算属性 过滤出来的数组值的变化
		filterArr(newVal) {
			this.newArr = newVal;
		},
	},
	computed: {
		goodNum() {
			return this.rateData.filter((item) => item.rateType == 0).length;
		},
		badNum() {
			return this.rateData.filter((item) => item.rateType == 1).length;
		},
		filterArr() {
			this.isShow = true;
			this.checked = false;
			if (this.filterComment == "all") {
				return this.rateData;
			} else if (this.filterComment == "good") {
				return this.rateData.filter((item) => item.rateType == 0);
			} else {
				return this.rateData.filter((item) => item.rateType == 1);
			}
		},
	},

	methods: {
		// 获取 评价
		async getRating() {
			let res = await getRating_api();
			let { data } = res.data;
			this.rateData = data;
			this.sellerInfo = local.get("sellerInfo");
			local.set("rateData", data);
		},

		// 只看有内容
		onlyText() {
			this.isShow = !this.isShow;
			if (this.checked == true) {
				this.newArr = this.newArr.filter((item) => item.text != "");
			}
		},
	},
};
</script>

<style lang="less" scoped src="../assets/styles/rating.less"></style>
