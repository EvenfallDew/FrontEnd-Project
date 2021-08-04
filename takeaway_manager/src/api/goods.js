// 商品api模块
import request from "@/utils/request";
// 引入qs转post请求
import Qs from "qs";

// 获取 商品列表
export const getGoodsList_api = (data) => {
	return request({
		method: "get",
		url: "/goods/list",
		params: data,
	});
};

// 添加 商品
export const addGoods_api = (data) => {
	return request({
		method: "post",
		url: "/goods/add",
		data: Qs.stringify(data),
	});
};

// 删除 商品
export const delGoods_api = (data) => {
	return request({
		method: "get",
		url: "/goods/del",
		params: data,
	});
};

// 编辑 商品
export const editGoods_api = (data) => {
	return request({
		method: "post",
		url: "/goods/edit",
		data: Qs.stringify(data),
	});
};

// 获取 商品分类列表
export const getGoodsCateList_api = (data) => {
	return request({
		method: "get",
		url: "/goods/catelist",
		params: data,
	});
};

// 获取 商品分类
export const getGoodsCate_api = () => {
	return request({
		method: "get",
		url: "/goods/categories",
	});
};

// 添加 商品分类
export const addGoodsCate_api = (data) => {
	return request({
		method: "post",
		url: "/goods/addcate",
		data: Qs.stringify(data),
	});
};

// 删除 商品分类
export const delGoodsCate_api = (data) => {
	return request({
		method: "get",
		url: "/goods/delcate",
		params: data,
	});
};

// 编辑 商品分类
export const editGoodsCate_api = (data) => {
	return request({
		method: "post",
		url: "/goods/editcate",
		data: Qs.stringify(data),
	});
};
