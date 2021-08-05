// 统计模块api
import request from "@/utils/request";
import Qs from "qs";

// 获取 商品统计
export const getGoodsData_api = (data) => {
	return request({
		method: "get",
		url: "/order/ordertotal",
		params: data,
	});
};

// 获取 订单统计
export const getOrderData_api = (data) => {
	return request({
		method: "get",
		url: "/order/ordertotal",
		params: data,
	});
};
