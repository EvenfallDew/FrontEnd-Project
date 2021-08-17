import Vue from "vue"; // 引入vue实例
import Vuex from "vuex"; // 引入状态机

Vue.use(Vuex); // 在vue中use一下状态机

export default new Vuex.Store({
	state: {
		nowColor: "",
	},

	mutations: {
		// 把改变后的颜色存入状态机
		GETBGCOLOR(state, data) {
			state.nowColor = data;
		},
	},

	getters: {},

	actions: {},

	modules: {},
});
