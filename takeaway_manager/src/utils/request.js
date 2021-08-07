// 引入axios
import axios from "axios";
// 引入element-ui的方式  Message === this.$message
import { Message } from "element-ui";
// 引入local工具
import local from "@/utils/local";
import base from "@/utils/base";

// 请求默认地址
axios.defaults.baseURL = base.url;

// 请求超时
axios.defaults.timeout = 3000;

// 请求 拦截器  携带请求头 token
axios.interceptors.request.use(
	(config) => {
		// 取出本地存储
		let token = local.get("token");
		if (token) {
			// 如果token在本地存储还在，就携带在请求头中
			config.headers.Authorization = token;
		}
		return config;
	},
	(error) => {
		// 失败回调
		return Promise.reject(error);
	}
);

// 响应 拦截器
axios.interceptors.response.use(
	(response) => {
		let { code, msg } = response.data;
		// 判断 如果msg存在 才走弹窗 否则不走弹窗
		if (msg) {
			if (code === 0) {
				// 成功弹窗
				Message({
					type: "success",
					message: msg,
					center: true,
				});
			} else if (code == "00" || code == "11") {
			} else {
				// 错误弹窗
				Message({
					type: "error",
					message: msg,
					center: true,
				});
			}
		}
		return response;
	},
	(error) => {
		// 在失败回调获取到code 如果是401 说明是一个错误的token
		if (error.response.data.code == 401) {
			// 清空本地
			local.clear();
			// 退回登录
			router.push("/login");
		}
		// 失败回调
		return Promise.reject(error);
	}
);

// 暴露当前文件
export default axios;
