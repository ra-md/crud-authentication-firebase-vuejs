<template>
	<div>
		<v-list class="py-1" flat v-for="todo in todos" :key="todo.id">
			<TodoItem 
				:titleFromTodoList="todo.title" 
				:idFromTodoList="todo.id" 
				:completedFromTodoList="todo.completed"
			/>
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