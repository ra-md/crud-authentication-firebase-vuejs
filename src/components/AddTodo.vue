<template>
	<div>
		<input type="text" v-model="title" @keyup.enter="addTodo">
		<button @click.prevent="addTodo">add</button>
	</div>
</template>
<script>
	import { todoCollection } from '@/firebase.js'

	export default {
		data() {
			return {
				title: ''
			}
		},
		methods: {
			date() {
				const date = new Date()
				return date
			},
			addTodo() {

				let newTodo = {
					title: this.title,
					date: this.date(),
					completed: false
				}

				todoCollection.add(newTodo)
				this.title = ''
			}
		}
	}
</script>