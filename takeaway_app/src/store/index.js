import Vue from "vue"; // 引入vue实例
import Vuex from "vuex"; // 引入状态机

Vue.use(Vuex); // 在vue中use一下状态机

export default new Vuex.Store({
	// 仓库数据本身
	state: {
		list: [],
	},
	// 修改仓库的唯一方式
	mutations: {
		// 接收组件发过来的通知
		// 在事件中接收2个参数
		// 参数1： state仓库数据本身 参数2： 形参
		SETLIST(state, data) {
			// 把商品数据存入状态机
			state.list = data;
		},
		// 接收减号 加法 的通知
		DEL(state, data) {
			// 双重循环 遍历仓库数据
			for (let obj of state.list) {
				for (let item of obj.foods) {
					// 判断 如果传递的id和遍历的id相同 处理
					if (item.id == data.id) {
						item.num += data.num;
					}
				}
			}
		},
		// 清空功能
		CLEAR(state) {
			// 双重循环 遍历仓库数据
			for (let obj of state.list) {
				for (let item of obj.foods) {
					item.num = 0;
				}
			}
		},
	},
	// 仓库中的计算属性
	getters: {
		// 仓库中的计算属性
		selList(state) {
			let arr = [];
			for (let obj of state.list) {
				for (let item of obj.foods) {
					// 判断 如果每一项的num > 0 把它push到数组中
					if (item.num > 0) {
						arr.push(item);
					}
				}
			}
			return arr;
		},
	},
	// 异步修改仓库数据 但是最终还是通过mutations修改
	actions: {},
	// 合并状态机
	modules: {},
});
