/*
    本地存储的工具js
*/

export default {
	// 存
	set(key, val) {
		return localStorage.setItem(key, JSON.stringify(val));
	},
	// 取
	get(key) {
		return JSON.parse(localStorage.getItem(key));
	},
	// 删
	remove(key) {
		localStorage.removeItem(key);
	},
	// 清空
	clear() {
		localStorage.clear();
	},
};
