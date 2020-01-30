<template>
	<div>
		<form>
			<input type="text" v-model="title">
			<input type="button" @click.prevent="addTodo" value="add">
		</form>
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
			addTodo() {
				let newTodo = {
					title: this.title,
					completed: false
				}

				todoCollection.add(newTodo)
				this.title = ''
			}
		}
	}
</script>