// 账号api模块
import request from "@/utils/request";
// 引入qs转post请求
import Qs from "qs";

// 登录接口
export const login_api = (data) => {
	return request({
		method: "post",
		url: "/users/checkLogin",
		data: Qs.stringify(data),
	});
};

// 添加账号
export const addList_api = (data) => {
	return request({
		method: "post",
		url: "/users/add",
		data: Qs.stringify(data),
	});
};

// 获取账号列表
export const accList_api = (data) => {
	return request({
		method: "get",
		url: "/users/list",
		params: data,
	});
};

// 删除账号
export const delAcc_api = (data) => {
	return request({
		method: "get",
		url: "/users/del",
		params: data,
	});
};

// 批量删除账号
export const delAll_api = (data) => {
	return request({
		method: "get",
		url: "/users/batchdel",
		params: data,
	});
};

// 修改账号
export const changeGroup_api = (data) => {
	return request({
		method: "post",
		url: "/users/edit",
		data: Qs.stringify(data),
	});
};

// 检测旧密码正确
export const checkOldPwd_api = (data) => {
	return request({
		method: "get",
		url: "/users/checkoldpwd",
		params: data,
	});
};

// 修改密码
export const changePwd_api = (data) => {
	return request({
		method: "post",
		url: "/users/editpwd",
		data: Qs.stringify(data),
	});
};

// 获取个人信息
export const getInfo_api = () => {
	return request({
		method: "get",
		url: "/users/info",
	});
};

// 头像上传

// 修改头像
export const editImg_api = (data) => {
	return request({
		method: "get",
		url: "/users/avataredit",
		params: data,
	});
};

// 获取身份角色
export const getRole_api = () => {
	return request({
		method: "get",
		url: "/users/role",
	});
};
