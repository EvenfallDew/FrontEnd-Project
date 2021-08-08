import request from "@/utils/request";

// 搜索
export const search_api = (data) => {
	return request({
		method: "get",
		url: "/search",
		params: data,
	});
};

// 播放
export const play_api = (data) => {
	return request({
		method: "get",
		url: "/song/url",
		params: data,
	});
};

// 评论
export const comment_api = (data) => {
	return request({
		method: "get",
		url: "/comment/hot/url",
		params: data,
	});
};
