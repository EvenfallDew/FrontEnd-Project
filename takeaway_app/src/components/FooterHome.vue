<template>
	<div class="footer">
		<van-cell is-link @click="showPopup">
			<section class="cart"><van-icon name="shopping-cart" size="40" /></section>
			<section class="price">￥xx</section>
			<section class="take">另需配送费￥XX元</section>
			<section class="btns">
				<van-button type="primary" color="#2b343b">满XX起送</van-button>
				<van-button type="primary" color="#2b343b">还差XX钱起送</van-button>
				<van-button type="primary" color="#38ca73">结算</van-button>
			</section>
		</van-cell>

		<van-popup v-model="isShow" round position="bottom" :style="{ height: '50%' }">
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
					<div>
						<span class="single-price">￥{{ (item.price * item.num).toFixed(2) }}</span>
						<span class="admi-btns">
							<van-icon name="close" @click.stop="del(item.id, -1)" />
							<span class="good-num">{{ item.num }}</span>
							<van-icon name="add" @click.stop="del(item.id, +1)" />
						</span>
					</div>
				</li>
			</ul>
		</van-popup>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isShow: false,
		};
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
			this.showDialog = false;
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
    width: 100%;
    height: 60px;

    .van-cell {
        padding: 0;
        height: 100%;

        background-color: #131d26;

        .van-cell__value--alone {
            display: flex;

            color: #bbb;

            justify-content: space-between;

            .cart {
                position: relative;
                top: -20px;

                border-radius: 50%;
                width: 70px;
                height: 70px;

                background-color: #2d353e;

                .van-icon {
                    line-height: 70px;
                    text-align: center;
                }
            }

            .btns {
                width: 120px;
            }
        }

        // 去掉箭头
        .van-cell__right-icon {
            display: none;
        }
    }

    .buy-title {
        display: flex;

        padding: 10px 15px;
        height: 50px;

        font-size: 18px;
        line-height: 30px;

        color: #666;
        background-color: #eceff1;

        justify-content: space-between;

        button {
            border: none;

            font-size: 15px;
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

            font-size: 18px;
            line-height: 50px;

            justify-content: space-between;

            .good-name {
                width: 200px;

                color: #333;
            }

            .single-price {
                width: 100px;

                font-weight: 700;

                color: #ff5339;
            }

            .admi-btns {
                display: flex;

                text-align: right;

                background-color: aquamarine;

                justify-content: space-between;

                .van-icon {
                    font-size: 25px;
                    vertical-align: middle;

                    color: #3190e8;
                }

                .good-num {
                    margin: 0 5px;
                }
            }
        }
    }
}

</style>
