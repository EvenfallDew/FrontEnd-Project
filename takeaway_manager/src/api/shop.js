// 店铺api 模块
import request from "@/utils/request";
import Qs from "qs";

// 获取 店铺数据
export const getShop_api = () => {
	return request({
		method: "get",
		url: "/shop/info",
	});
};

// 修改 店铺数据
export const editShop_api = (data) => {
	return request({
		method: "post",
		url: "/shop/edit",
		data: Qs.stringify(data),
	});
};
