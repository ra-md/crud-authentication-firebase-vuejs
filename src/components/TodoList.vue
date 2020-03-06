<template>
	<div>
		<v-list class="py-1" flat v-for="todo in todos" :key="todo.id">
			<TodoItem :id="todo.id" :title="todo.title" :completed="todo.completed"/>
		</v-list>
	</div>
</template>

<script>
	import TodoItem from './TodoItem.vue'

	export default {
		props: {
			todos: Array
		},
		components: {
			TodoItem
		}
	}
</script>