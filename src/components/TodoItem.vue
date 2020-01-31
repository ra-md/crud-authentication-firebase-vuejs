<template>
	<div>
		<div v-if="isOpenInput">
			<h1 :class="{'isCompleted': todo.completed}">{{ todo.title }}</h1>
		</div>
		<div v-else>
			<input type="text" v-model="title" @keyup.enter="updateTitle">
			<button @click="updateTitle">update</button>
		</div>
		<input @click="updateCheckbox" type="checkbox" :checked="todo.completed">
		<button @click="openInput">gambar pengsil</button>
		<button @click="deleteTodo">gambar tongsampah</button>
	</div>
</template>

<script>
	import { todoCollection } from '@/firebase'

	export default {
		props: {
			todo: Object
		},
		data() {
			return {
				title: this.todo.title,
				isOpenInput: true,
				todoDataWithId: todoCollection.doc(this.todo.id)
			}
		},
		methods: {
			date() {
				return new Date()
			},
			openInput() {
				this.isOpenInput = !this.isOpenInput
			},
			updateCheckbox() {
				this.todoDataWithId.update({
					completed: !this.todo.completed
				})
			},
			updateTitle() {
				this.todoDataWithId.update({
					date: this.date(),
					title: this.title
				})

				this.isOpenInput = !this.isOpenInput
			},
			deleteTodo() {
				todoCollection.doc(this.todo.id).delete()	
			}
		}
	}
</script>

<style> 
	.isCompleted {
		text-decoration: line-through;
	}
</style>