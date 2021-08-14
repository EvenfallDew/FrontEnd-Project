<template>
	<div class="header-home">
		<header>
			<div class="bg-img" :style="{ backgroundImage: 'url(' + sellerInfo.avatar + ')' }">
				test
			</div>

			<div class="left">
				<img class="avatar" :src="sellerInfo.avatar" />
			</div>

			<div class="right">
				<div class="title">{{ sellerInfo.name }}</div>

				<div class="dis">{{ sellerInfo.description }} / {{ sellerInfo.deliveryTime }}分钟送达</div>

				<div class="activeBox">
					<!-- 需要filter -->
					<div class="box" v-if="sellerInfo.supports">
						{{ sellerInfo.supports[0] }}
					</div>

					<div class="boxNum" v-if="sellerInfo.supports" @click="openDialog()">
						{{ sellerInfo.supports.length }}个 >
					</div>
				</div>
			</div>
		</header>

		<div class="van-ellipsis">{{ sellerInfo.bulletin }}</div>
		<!-- <div class="bottom" @click="isShow = true">bottom{{ sellerInfo.bulletin }}</div> -->
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
    height: 130px;

    color: #cac8c5;

    header {
        display: flex;

        width: 100%;
        height: 100px;

        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;

        .left {
            width: 100px;
        }

        .avatar {
            margin: 15px;
            width: 70px;
            height: 70px;
        }

        .right {
            box-sizing: border-box;
            padding: 15px;

            flex: 1;

            .title {
                font-size: 18px;
                font-weight: 600;

                color: #fff;
            }

            .dis {
                line-height: 35px;
            }

            .activeBox {
                display: flex;

                justify-content: space-between;
                align-items: center;

                .boxNum {
                    border-radius: 20px;
                    padding: 5px 10px;

                    background: rgba(0, 0, 0, .6);
                }
            }
        }
    }

    .bottom {
        overflow: hidden;

        height: 30px;

        line-height: 30px;
        white-space: nowrap;
        text-overflow: ellipsis;

        background: rgba(0, 0, 0, .7);
    }
}

</style>
