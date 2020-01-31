<template>
	<div class="flex">
		<div class="left">
			<div v-if="isOpenInput">
				<input @click="updateCheckbox" type="checkbox" :checked="todo.completed">
			</div>
			<div v-else>
				<button @click="updateTitle"><i class="fas fa-check fa-xs"></i></button>
			</div>
		</div>

		<div class="center">
			<div v-if="isOpenInput">
				<h3 class="title" :class="{'is-completed': todo.completed}">{{ todo.title }}</h3>
			</div>
			<div v-else>
				<input type="text" v-model="title" @keyup.enter="updateTitle">
			</div>
		</div>

		<div class="right">
			<button @click="openInput"><i class="fas fa-pen fa-xs"></i></button>
			<button @click="deleteTodo"><i class="fas fa-trash fa-xs"></i></button>
		</div>
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

<style scoped> 
	.flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.is-completed {
		text-decoration: line-through;
	}

	.title {
		margin: 0;
		padding: 0 1em;
	}

	.center input {
		text-align: center;
	}

	.right {
		margin: 1em 0;
	}

	.right button {
		padding: 5px;
	}
</style>