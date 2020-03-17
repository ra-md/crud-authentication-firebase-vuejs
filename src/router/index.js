import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import firebase from '@/firebase.js'

const Todo = () => import('@/views/Todo.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/todo',
    name: 'todo',
    component: Todo,
    meta: {requiresAuth: true}
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
	firebase.auth().onAuthStateChanged(user => {
		if(!user && requiresAuth) {
			next('/')
		} else {
			next()
		}
	})
})

export default router
