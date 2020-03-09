<template>
	<div>
		<AddTodo/>
		<v-card height="400">
			<div class="center-y" v-if="isLoading">
				<v-progress-circular
			    	indeterminate
			    	color="primary"
			    ></v-progress-circular>
			</div>
			<div v-else>
				<TodoList :todos="todos"/>
			</div>
		</v-card>
	</div>
</template>

<script>
	import AddTodo from '@/components/AddTodo.vue'
	import TodoList from '@/components/TodoList.vue'
	import firebase from '@/firebase.js'

	export default {
		data() {
			return {
				todos: [],
				isLoading: true
			}
		},
		components: {
			AddTodo,
			TodoList
		},
		mounted() {
			firebase.auth().onAuthStateChanged(user => {
				if(user) {

					firebase.firestore().collection('userCollection')
					.doc(user.uid).collection('todos').orderBy('date', 'desc').onSnapshot(querySnapshot => {

						this.todos = []
						
						querySnapshot.docs.forEach(todo => {
							this.isLoading = false
							let obj = {
								id: todo.id,
								title: todo.data().title,
								completed: todo.data().completed
							}
							this.todos.push(obj)
						})
					})
				}
			})
		}
	}
</script>

<style scoped>
	.center-y {
	    transform: translateY(-50%);
    	position: relative;
    	top: 50%;
	}
</style>