// 第二层 接口层  统一管理接口 方便后期维护

// 引入第一层
import request from "@/utils/request.js";

// 商品接口
export const getGoods_api = () => {
	return request({
		method: "get",
		url: "/goods/goods_list",
	});
};

// 商家接口
export const getSeller_api = () => {
	return request({
		method: "get",
		url: "/shop/seller",
	});
};

// 评价接口
export const getRating_api = () => {
	return request({
		method: "get",
		url: "/shop/ratings",
	});
};
