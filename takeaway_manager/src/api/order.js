// 订单api模块
import request from "@/utils/request";
// 引入qs转post请求
import Qs from "qs";

// 获取 订单列表
export const getOrderList_api = (data) => {
	return request({
		method: "get",
		url: "/order/list",
		params: data,
	});
};

// 获取 订单详情
export const getOrderDetail_api = (data) => {
	return request({
		method: "get",
		url: "/order/detail",
		params: data,
	});
};

// 修改 订单
export const editOrder_api = (data) => {
	return request({
		method: "post",
		url: "/order/edit",
		data: Qs.stringify(data),
	});
};
