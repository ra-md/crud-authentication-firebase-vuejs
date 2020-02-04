<template>
	<div class="addTodoStyle">
		<input type="text" v-model="title" @keyup.enter="addTodo" placeholder="add todo...">
		<button @click.prevent="addTodo"><i class="fas fa-plus fa-xs"></i></button>
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

				if(/\S/.test(this.title)) {
					todoCollection.add(newTodo)
					this.title = ''
				}

			}
		}
	}
</script>

<style scoped>
	button {
		padding: 0 0.5em;
		height: 100%;
		line-height: 50%;
	}

	input {
		border: none;
		outline: none;
		background-color: transparent;
		padding-left: 0.5em;
		height: 100%;
	}

	.addTodoStyle {
		display: flex;
		background-color: #f1f1f1;
		justify-content: center;
    	align-items: center;
		height: 2em;
	    border-radius: 5px;
	}
</style>