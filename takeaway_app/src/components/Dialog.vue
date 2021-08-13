<template>
	<div class="dialog">
		<main>
			{{ sellerInfo.name }}
			<van-divider :style="{ color: '#fff', borderColor: '#fff', padding: '0 16px', fontSize: '20px' }">
				优惠信息
			</van-divider>
			{{ sellerInfo.supports[0] }}
			{{ sellerInfo.supports[1] }}

			<van-divider :style="{ color: '#fff', borderColor: '#fff', padding: '0 16px', fontSize: '20px' }">
				商家公告
			</van-divider>
			{{ sellerInfo.bulletin }}

			<div class="close" @click="close">X</div>
		</main>
	</div>
</template>

<script>
export default {
	props: ["sellerInfo"],

	created() {
		console.log(this.sellerInfo);
	},
	methods: {
		//  关闭弹窗
		close() {
			this.$emit("closeDialog");
		},
	},
};
</script>

<style lang="less" scoped>
.dialog {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: rgba(35, 73, 95, .9);

    main {
        overflow: hidden;

        z-index: 2;

        width: 100%;
        height: 100%;

        box-shadow: 0 10px 20px rgba(0, 0, 0, .5);
    }

    main::before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        background: inherit;
        background-attachment: fixed;

        content: "";

        filter: blur(4px);
    }

    main::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        background: rgba(0, 0, 0, .25);

        content: "";
    }

    .close {
        position: absolute;
        bottom: 10px;

        width: 100%;
        height: 30px;

        font-size: 30px;
        text-align: center;

        color: #fff;
    }
}

</style>
