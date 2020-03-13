import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

Vue.use(Vuex)

const state= {
	data:[],
	num:1
}
const store = new Vuex.Store({
	state,
	mutations
		//尽量只做一件事
		//官方建议封装
	,
	getters,
	actions
})

export default store