import firebase from '@/firebase.js'

export default {
	state: {
		user: null
	},
	getters: {
		user(state) {
			return state.user
		}
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload
		}
	},
	actions: {
		signInUser({commit}, payload) {
			commit('setUser', payload)
		}
	}
}