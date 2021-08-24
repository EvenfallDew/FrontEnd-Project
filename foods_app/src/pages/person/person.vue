<template>
	<view class="person">
		<view class="person-info">
			<view>
				<view class="person-name">{{ userInfo.nickName }}</view>
				<view class="person-welcome">欢迎您光临四海香！</view>
			</view>
			<view class="person-avatar">
				<image class="person-avatar-img" :src="userInfo.avatarUrl"></image>
			</view>
		</view>

		<uni-list v-for="(item, i) in listContent" :key="i">
			<uni-list-item
				thumb-size="medium"
				link
				:title="item.title"
				:thumb="item.img"
				:to="item.url"
			></uni-list-item>
		</uni-list>

		<button class="share-btn" open-type="share">分享</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: {},
			listContent: [
				{ title: "烹饪历史", img: "/static/images/icon_order.png", url: "" },
				{ title: "支付记录", img: "/static/images/icon_money.png", url: "" },
				{ title: "举报投诉", img: "/static/images/icon_msg.png", url: "/pages/report/report" },
			],
		};
	},

	onLoad() {
		this.userInfo = uni.getStorageSync("userInfo");
	},
	// 分享
	onShareAppMessage(res) {
		return {
			title: "欢迎光临四海香！",
			imageUrl: "../../static/images/logo.png",
			path: "/pages/person/person?id=1",
		};
	},
	methods: {},
};
</script>

<style>
.person {
    color: #333;
}

.person-info {
    display: flex;

    padding: 25px 20px;

    justify-content: space-between;
    align-items: center;
}

.person-name {
    font: 500 28px/1.5em "微软雅黑";

    color: #000;
}

.person-welcome {
    font: 500 18px/1.5em "微软雅黑";

    color: #bbb;
}

.person-avatar,
.person-avatar-img {
    border-radius: 50%;
    width: 80px;
    height: 80px;
}

.share-btn {
    margin-top: 50px;

    font-size: 14px;
    letter-spacing: 2px;

    color: #646464;
}

</style>
