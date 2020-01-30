<template>
	<div>
		<h1 :class="{'isCompleted': todo.completed}">{{ todo.title }}</h1>
		<input type="checkbox" :checked="todo.completed">
	</div>
</template>

<script>
	export default {
		props: {
			todo: Object
		}
	}
</script>

<style> 
	.isCompleted {
		text-decoration: line-through;
	}
</style>