<template>
	<div>
		<v-btn 
			absolute
			top
			right
			color="red" 
			dark 
			small
			@click="signOut"
			class="mt-n2 z-index-10"
		>Sign Out</v-btn>
		<AddTodo/>
		<v-card height="400" style="overflow: auto">
			<div class="center-y" v-if="isLoading">
				<v-progress-circular
			    	color="primary"
			    	indeterminate
			    ></v-progress-circular>
			</div>
			<div v-else>
				<v-list class="py-1" flat v-for="todo in todos" :key="todo.id">
					<TodoItem :todo="todo"/>
				</v-list>
			</div>
		</v-card>
	</div>
</template>

<script>
	import AddTodo from '@/components/AddTodo.vue'
	import TodoItem from '@/components/TodoItem.vue'
	import firebase from '@/firebase.js'

	export default {
		data() {
			return {
				todos: [],
				isLoading: true,
				unsubscribe: null
			}
		},
		components: {
			AddTodo,
			TodoItem
		},
		created() {
			firebase.auth().onAuthStateChanged(user => {
				if(user) {

					this.unsubscribe = firebase.firestore().collection('userCollection')
					.doc(user.uid).collection('todos').orderBy('date', 'desc').onSnapshot(querySnapshot => {

						this.todos = []
						
						this.isLoading = false
						querySnapshot.docs.forEach(todo => {
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
		},
		methods: {
			signOut() {
				this.unsubscribe()
				firebase.auth().signOut().catch(error => console.log(error))
				this.$router.push('/')
			}
		}
	}
</script>

<style scoped>
	.center-y {
	    transform: translateY(-50%);
    	position: relative;
    	top: 50%;
	}

	.z-index-10 {
		z-index: 10;
	}
</style>