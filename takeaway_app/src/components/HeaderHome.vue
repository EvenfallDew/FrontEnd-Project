<template>
	<div class="header-home">
		<header>
			<!-- 店铺背景 -->
			<div class="bg-img" :style="{ backgroundImage: 'url(' + sellerInfo.avatar + ')' }"></div>

			<!-- 店铺信息 -->
			<div class="shop-info">
				<!-- 店铺头像 -->
				<van-image class="shop-avatar" width="70px" height="70px " fit="cover" :src="sellerInfo.avatar">
					<template v-slot:loading>
						<van-loading type="spinner" size="20" />
					</template>
				</van-image>
				<!-- 店铺名称 -->
				<div class="info">
					<h3 class="title">{{ sellerInfo.name }}</h3>

					<p class="time">{{ sellerInfo.description }} / {{ sellerInfo.deliveryTime }}分钟送达</p>

					<div class="actives">
						<!-- 需要filter -->
						<div class="box" v-if="sellerInfo.supports">
							{{ sellerInfo.supports[0] }}
						</div>

						<div class="num" v-if="sellerInfo.supports" @click="openDialog()">
							{{ sellerInfo.supports.length }}个 >
						</div>
					</div>
				</div>
			</div>

			<!-- 店铺公告 -->
			<div class="van-ellipsis">{{ sellerInfo.bulletin }}</div>
		</header>
	</div>
</template>

<script>
export default {
	components: {},

	props: {
		sellerInfo: {
			type: Object,
			default: () => {
				{
				}
			},
		},
	},

	data() {
		return {
			isShow: false,
		};
	},

	methods: {
		openDialog() {
			this.isShow = true;
			this.$emit("open", this.isShow);
		},
	},
};
</script>

<style lang="less" scoped>
.header-home {
    overflow: scroll;

    width: 100%;
    height: 140px;

    color: #fff;

    header {
        overflow: hidden;

        position: relative;

        width: 100%;
        height: 100%;

        // 店铺背景
        .bg-img {
            position: absolute;
            z-index: -1;

            width: 100%;
            height: 100%;

            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;

            transform: scale(1.2);

            filter: blur(5px) brightness(.3);
        }

        // 店铺信息
        .shop-info {
            display: flex;

            padding: 20px;

            justify-content: space-between;

            .info {
                display: flex;

                margin-left: 20px;
                height: 70px;

                color: #bbb;

                flex: 1;
                flex-direction: column;
                justify-content: space-between;

                .title {
                    font-size: 20px;
                    font-weight: bold;

                    color: #fff;
                }

                .time {
                    font-size: 14px;
                }

                .actives {
                    display: flex;

                    position: relative;

                    font-size: 12px;

                    justify-content: space-between;

                    .num {
                        position: absolute;
                        right: 0;
                        bottom: -8px;

                        border-radius: 15px;
                        width: 50px;
                        height: 25px;

                        line-height: 25px;
                        text-align: center;

                        background-color: rgba(0, 0, 0, .4);
                    }
                }
            }
        }

        // 店铺公告
        .van-ellipsis {
            position: absolute;

            padding: 0 10px;
            width: 100%;
            height: 28px;

            font-size: 12px;
            line-height: 28px;

            color: #bbb;
            background-color: rgba(0, 0, 0, .5);
        }
    }
}

</style>
