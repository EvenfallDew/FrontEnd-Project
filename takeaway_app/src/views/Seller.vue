<template>
	<div class="seller">
		<header>
			<section class="top">
				<div class="top-left">
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
						<span>月售{{ sellerInfo.sellCount }}单</span>
					</p>
				</div>
				<p class="top-right">
					<van-icon name="like" size="30" :color="collectColor" @click="collect()" />
					<br />
					<span ref="collectText">未收藏</span>
				</p>
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
			<section ref="box">
				<p class="picBox" :style="{ width: sellerInfo.pics.length * 150 + 'px' }">
					<van-image
						width="150px"
						height="100px"
						fit="cover"
						v-for="(item, index) in sellerInfo.pics"
						:key="index"
						:src="item"
						@click="showPic()"
					/>
				</p>
			</section>
		</div>

		<div class="shop-time">
			<h2>商家信息</h2>
			<p>该商家支持开发票，请在下单时填写好发票抬头</p>
			<p>品类：其他菜系</p>
			<p>地址：北京市昌平区回龙观西大街龙冠置业大厦底商B座102单元1340</p>
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
import BScroll from "better-scroll";

export default {
	data() {
		return {
			sellerInfo: {},
			imagesList: [
				require("./../assets/images/decrease.png"),
				require("./../assets/images/discount.png"),
				require("./../assets/images/special.png"),
			],
			imagesNone: require("./../assets/images/img_none.jpg"),
			checked: false,
			collectColor: "gray",
		};
	},

	created() {
		this.sellerInfo = local.get("sellerInfo");
		if (this.sellerInfo.pics.length == 0) {
			this.sellerInfo.pics[0] = this.imagesNone;
		}
	},

	mounted() {
		let box = new BScroll(this.$refs.box, {
			scrollX: true,
			click: true,
		});
	},

	filters: {
		filtime(val) {
			return moment(val).format("YYYY-MM-DD HH:mm");
		},
	},

	methods: {
		// 收藏
		collect() {
			if (this.collectColor == "gray") {
				this.collectColor = "red";
				this.$refs.collectText.textContent = "已收藏";
			} else {
				this.collectColor = "gray";
				this.$refs.collectText.textContent = "未收藏";
			}
		},
		// 图片预览
		showPic() {
			ImagePreview(this.sellerInfo.pics);
		},
	},
};
</script>

<style lang="less" scoped src="../assets/styles/seller.less"></style>
