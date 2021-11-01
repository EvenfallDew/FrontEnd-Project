// 首页api模块
import request from "@/utils/request";

// 获取 首页数据
export const getTotaldData_api = (data) => {
	return request({
		method: "get",
		url: "/order/totaldata",
		params: data,
	});
};
