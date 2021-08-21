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
			<uni-list-item :title="item.title" :thumb="item.img" thumb-size="medium" rightText=">"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
import uniList from "@dcloudio/uni-ui/lib/uni-list/uni-list.vue";
import uniListItem from "@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue";

export default {
	components: { uniList, uniListItem },

	data() {
		return {
			userInfo: {},
			listContent: [
				{ title: "烹饪历史", img: "/static/images/icon_order.png" },
				{ title: "支付记录", img: "/static/images/icon_money.png" },
				{ title: "举报投诉", img: "/static/images/icon_msg.png" },
			],
		};
	},

	onLoad() {
		this.userInfo = uni.getStorageSync("userInfo");
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
    font: 500 20px/1.5em "微软雅黑";

    color: #bbb;
}

.person-avatar,
.person-avatar-img {
    border-radius: 50%;
    width: 80px;
    height: 80px;
}

</style>
