import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

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
    component: Todo
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
