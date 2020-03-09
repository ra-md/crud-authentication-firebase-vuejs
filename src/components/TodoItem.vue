<template>
	<div>
		<v-list-item-group>
			<v-list-item>
				<v-list-item-action>
					<v-checkbox v-model="completed"></v-checkbox>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title :class="{'line-through': completed}" v-text="titleFromTodoList"></v-list-item-title>
				</v-list-item-content>
				<v-list-item-action class="ml-1">
					<v-btn icon @click="openModal">
						<v-icon>mdi-pencil-outline</v-icon>
					</v-btn>
				</v-list-item-action>
				<v-list-item-action class="ml-1">
					<v-btn icon @click="deleteTodo">
						<v-icon>mdi-trash-can-outline</v-icon>
					</v-btn>
				</v-list-item-action>			
			</v-list-item>
		</v-list-item-group>

		<UpdateTodo 
			ref="modal" 
			:titleFromTodoItem="titleFromTodoList" 
			:idFromTodoItem="idFromTodoList" 
			:completedFromTodoItem="completed"
		/>
	</div>
</template>

<script>
	import UpdateTodo from './UpdateTodo.vue'

	import firebase from '@/firebase.js'

	export default {
		props: {
			titleFromTodoList: String,
			idFromTodoList: String,
			completedFromTodoList: Boolean
		},
		components: {
			UpdateTodo
		},
		data() {
			return {
				completed: this.completedFromTodoList,
				todo: ''
			}
		},
		mounted() {
			firebase.auth().onAuthStateChanged(user => {
				if(user) {
					this.todo = firebase.firestore().collection('userCollection').doc(user.uid).collection('todos').doc(this.idFromTodoList)
				}
			})
		},
		watch: {
			completed() {
				this.todo.update({
					completed: this.completed
				})
			}
		},
		methods: {
			deleteTodo() {
				this.todo.delete()
			},
			openModal() {
				this.$refs.modal.showModal() 
			}
		}
	}
</script>

<style>
	.line-through {
		text-decoration: line-through;
	}
</style>