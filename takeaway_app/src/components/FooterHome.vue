<template>
	<div class="footer">
		<van-cell is-link @click="showPopup">
			<section class="cart">
				<div class="cart-border">
					<van-icon
						class="target-cart"
						name="shopping-cart"
						size="30"
						:class="selNum > 0 ? 'cart-active' : ''"
					/>
				</div>
			</section>

			<section class="price">
				<p>￥{{ selPrice }}</p>
				<p class="take">另需配送费{{ sellerInfo.deliveryPrice | filtersPrice }}元</p>
			</section>

			<section class="btns">
				<van-button type="primary" color="#2b343b" v-if="selPrice == 0">
					满{{ sellerInfo.minPrice }}起送
				</van-button>
				<van-button type="primary" color="#fe9900" v-else-if="selPrice > 0 && selPrice < sellerInfo.minPrice">
					还差{{ (sellerInfo.minPrice - selPrice) | filtersPrice }}元起送
				</van-button>
				<van-button type="primary" color="#38ca73" v-else-if="selPrice >= sellerInfo.minPrice">
					结算
				</van-button>
			</section>
		</van-cell>

		<van-popup v-model="isShow" round position="bottom" :style="{ maxHeight: '50%' }">
			<h2 class="buy-title">
				<p>已选商品</p>
				<button type="button" @click="clear()">
					<van-icon name="failure" />
					清空
				</button>
			</h2>

			<ul class="buy-list">
				<li class="buy-good" v-for="(item, i) in sel" :key="i">
					<div class="van-ellipsis good-name">{{ item.name }}</div>
					<div class="operation">
						<span class="single-price">￥{{ (item.price * item.num) | filtersPrice }}</span>
						<span class="admi-btns">
							<span
								class="min-btn iconfont icon-minus"
								v-if="item.num >= 1"
								@click.stop="del(item.id, -1)"
							></span>
							<span class="good-num">{{ item.num }}</span>
							<span class="add-btn iconfont icon-add" @click.stop="del(item.id, +1)"></span>
						</span>
					</div>
				</li>
			</ul>
		</van-popup>
	</div>
</template>

<script>
import local from "@/utils/local";

export default {
	data() {
		return {
			isShow: false,
			sellerInfo: {},
		};
	},

	created() {
		this.sellerInfo = local.get("sellerInfo");
	},

	filters: {
		filtersPrice(val) {
			return val.toFixed(2);
		},
	},

	computed: {
		// 取出仓库中的计算出来的已选商品
		sel() {
			return this.$store.getters.selList;
		},
		// 计算总数
		selNum() {
			let total = 0;
			for (let obj of this.sel) {
				total += obj.num;
			}
			return total;
		},
		// 计算总价
		selPrice() {
			let total = 0;
			for (let obj of this.sel) {
				total += obj.num * obj.price;
			}
			return total.toFixed(2);
		},
	},

	methods: {
		// 弹窗 购物车
		showPopup() {
			this.isShow = true;
		},
		// 清空 购物车
		clear() {
			this.$store.commit("CLEAR");
			this.isShow = false;
		},
		// 点击加号和减号，往状态机中存入对应的数据
		del(id, num) {
			this.$store.commit("DEL", { id, num });
		},
	},
};
</script>

<style lang="less" scoped>
.footer {
	position: relative;

	width: 100%;
	height: 45px;

	.van-cell {
		overflow: visible;

		z-index: 2055;

		padding: 0;
		height: 100%;

		background-color: #505052;

		.van-cell__value--alone {
			display: flex;

			padding-left: 15px;

			color: #bbb;

			justify-content: space-between;

			.cart {
				display: flex;

				position: relative;
				top: -5px;

				border-radius: 50%;
				width: 50px;
				height: 50px;

				background-color: #444;

				justify-content: center;
				align-items: center;

				.cart-border {
					display: flex;

					border-radius: 50%;
					width: 40px;
					height: 40px;

					background-color: #3190e8;

					justify-content: center;
					align-items: center;
				}

				.cart-active {
					color: #fff;
				}
			}

			.price {
				display: flex;

				flex-direction: column;
				justify-content: space-around;

				p {
					font-size: 14px;
					line-height: 14px;
				}
			}

			.btns {
				width: 120px;

				.van-button {
					width: 100%;
					height: 100%;

					letter-spacing: 1px;
				}
			}
		}

		// 去掉箭头
		.van-cell__right-icon {
			display: none;
		}
	}

	.van-cell__value {
		overflow: visible;
	}

	// 去掉伪元素
	.van-cell::after {
		border-bottom: none;
	}

	.van-popup--bottom {
		bottom: 45px;
	}

	.buy-title {
		display: flex;

		padding: 10px 15px;
		height: 50px;

		font-size: 16px;
		line-height: 30px;

		color: #666;
		background-color: #eceff1;

		justify-content: space-between;

		button {
			border: none;

			font-size: 16px;
			line-height: 30px;

			outline: none;

			.van-icon {
				vertical-align: middle;
			}
		}
	}

	.buy-list {
		padding: 0 15px;

		.buy-good {
			display: flex;

			border-bottom: 1px solid #eceff1;
			width: 100%;
			height: 50px;

			font-size: 16px;
			line-height: 50px;

			justify-content: space-between;

			.good-name {
				width: 140px;

				color: #333;
			}

			.operation {
				display: flex;

				width: 180px;

				justify-content: space-between;

				.single-price {
					width: 120px;

					font-weight: 700;

					color: #ff5339;
				}

				.admi-btns {
					display: flex;

					margin-left: 10px;

					text-align: right;

					align-items: center;
					justify-content: space-between;

					.good-num {
						margin: 0 10px;

						color: #646464;
					}

					.min-btn {
						font-size: 20px;

						color: #2395ff;
					}

					.add-btn {
						margin-right: 10px;

						font-size: 20px;

						color: #2395ff;
					}
				}
			}
		}
	}
}
</style>
