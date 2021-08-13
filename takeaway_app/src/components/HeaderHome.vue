<template>
	<div class="header-home">
		<header :style="{ '--backgroundImage': 'url(' + sellerInfo.avatar + ')' }">
			<div class="left">
				<img :src="sellerInfo.avatar" class="avatar" />
			</div>
			<div class="right">
				<div class="title">{{ sellerInfo.name }}</div>
				<div class="dis">{{ sellerInfo.description }} / {{ sellerInfo.deliveryTime }}分钟送达</div>
				<div class="activeBox">
					<div class="box" v-if="sellerInfo.supports">
						{{ sellerInfo.supports[0] }}
					</div>
					<div @click="isShow = true" class="boxNum" v-if="sellerInfo.supports">
						{{ sellerInfo.supports.length }}个 >
					</div>
				</div>
			</div>
		</header>

		<div class="bottom" @click="isShow = true">bottom{{ sellerInfo.bulletin }}</div>

		<!-- 弹窗 -->
		<transition name="a">
			<Dialog @closeDialog="fn" v-if="isShow" :sellerInfo="sellerInfo" />
		</transition>
	</div>
</template>

<script>
// 引入弹窗组件
import Dialog from "@/components/Dialog.vue";
export default {
	components: {
		Dialog,
	},

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
		// 父组件接收子组件传递的函数名
		fn() {
			// 关闭弹窗
			this.isShow = false;
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

    header::before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -3;

        margin: -30px;

        background-image: var(--width);
        background-attachment: fixed;
        background-position: center top;
        background-size: cover;

        content: "";

        filter: blur(20px);
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

// 过渡动画的样式
.a-enter-active,
.a-leave-active {
    // 进入和离开 第一帧样式
    transition: all .5s;
    transform: translateY(0px);
}

.a-enter,
.a-leave-to /* 要执行到的动画效果 */ {
    transform: translateY(100%);
}

</style>
