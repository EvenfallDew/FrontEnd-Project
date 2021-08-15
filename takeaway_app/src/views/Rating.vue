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
				<van-button color="#00a0dc">全部</van-button>
				<van-button color="#ccecf7">满意</van-button>
				<van-button color="#eaebed">不满意</van-button>
			</p>

			<p class="only-conts">
				<van-checkbox v-model="checked" @click="onlyText()">只看有内容的评价</van-checkbox>
			</p>

			<ul>
				<li class="user-rate" v-if="isShow" v-for="(item, index) in rateData" :key="item.id">
					<!-- 用户头像 -->
					<van-image round width="40px" height="40px" :src="item.avatar" />
					<!-- 评价内容 -->
					<div class="user-comment">
						<section class="user-info">
							<h4>{{ item.username }}</h4>
							<p>{{ item.rateTime | filtime }}</p>
						</section>

						<section class="user-score">
							<van-rate
								color="#fe9900"
								void-icon="star"
								void-color="#eee"
								v-model="item.score"
								readonly
								:size="14"
							/>
							<p>{{ item.deliveryTime }}分钟送达</p>
						</section>

						<section class="user-text">{{ item.text }}</section>

						<section class="user-type">
							<van-icon :name="item.rateType == 1 ? 'play' : 'good-job'" />

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
// 引入API
import { getRating_api } from "@/api/apis";
import moment from "moment";
import local from "@/utils/local";

export default {
	data() {
		return {
			rateData: [],
			sellerInfo: {},
			checked: false,
			activeIcon: "https://img01.yzcdn.cn/vant/user-active.png",
			inactiveIcon: "https://img01.yzcdn.cn/vant/user-inactive.png",
			isShow: true,
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
		onlyText() {},
	},
};
</script>

<style lang="less" scoped src="../assets/styles/rating.less"></style>
