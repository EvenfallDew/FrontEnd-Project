<template>
	<div class="seller">
		<header>
			<section class="top">
				<div>
					<h2>
						{{ sellerInfo.name }}
					</h2>
					<p>
						<van-rate
							color="#fe9900"
							void-icon="star"
							void-color="#eee"
							allow-half
							readonly
							v-model="sellerInfo.score"
							:size="16"
						/>
						<span>月售{{ sellerInfo.sellCount }}</span>
					</p>
				</div>
				<van-checkbox v-model="checked">
					<template #icon="props">
						<!-- <img class="img-icon" /> -->
						<van-icon name="like" />
					</template>
					<p>已收藏</p>
				</van-checkbox>
			</section>

			<section class="bottom">
				<div>
					<h3>起送价</h3>
					<p>
						{{ sellerInfo.minPrice }}
						<span>元</span>
					</p>
				</div>
				<div>
					<h3>商家配送</h3>
					<p>
						{{ sellerInfo.deliveryPrice }}
						<span>元</span>
					</p>
				</div>
				<div>
					<h3>平均配送时间</h3>
					<p>
						{{ sellerInfo.deliveryTime }}
						<span>分钟</span>
					</p>
				</div>
			</section>
		</header>

		<div class="shop-ad">
			<h2>公告与活动</h2>
			<p>
				{{ sellerInfo.bulletin }}
			</p>
			<ul>
				<li v-for="(item, index) in sellerInfo.supports" :key="index">
					<van-icon :name="imagesList[0]" />
					{{ item }}
				</li>
			</ul>
		</div>

		<div class="shop-pic">
			<h2>商家实景</h2>
			<van-image
				width="150px"
				height="100px"
				fit="cover"
				v-for="(item, index) in sellerInfo.pics"
				:key="index"
				:src="item"
				@click="showPic()"
			/>
		</div>

		<div class="time-info">
			<h2>商家信息</h2>
			<p>12121212</p>
			<p>1</p>
			<p>1</p>
			<p>
				营业时间：
				{{ sellerInfo.date[0].split(" ")[1] }}
				-
				{{ sellerInfo.date[1].split(" ")[1] }}
			</p>
		</div>
	</div>
</template>

<script>
import moment from "moment";
import local from "@/utils/local";
import { ImagePreview } from "vant";

export default {
	data() {
		return {
			sellerInfo: {},
			imagesList: [
				require("./../assets/images/decrease.png"),
				require("./../assets/images/discount.png"),
				require("./../assets/images/special.png"),
			],
			checked: false,
		};
	},

	created() {
		this.sellerInfo = local.get("sellerInfo");
	},
	// 过滤器
	filters: {
		filtime(val) {
			return moment(val).format("YYYY-MM-DD HH:mm");
		},
	},

	methods: {
		showPic() {
			ImagePreview(this.sellerInfo.pics);
		},
	},
};
</script>

<style lang="less" scoped src="../assets/styles/seller.less"></style>
