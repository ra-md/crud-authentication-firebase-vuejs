<template>
	<div>
		<v-list-item-group>
			<v-list-item>
				<v-list-item-action>
					<v-checkbox v-model="isCompleted"></v-checkbox>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title :class="{'line-through': isCompleted}" v-text="title"></v-list-item-title>
				</v-list-item-content>
				<v-list-item-action class="ml-1">
					<v-btn icon @click="modal = !modal">
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

		<v-dialog v-model="modal" max-width="290">
			<v-card class="py-2 px-3">
				<h3 class="text-center mt-2">Update Todo</h3>
				<v-text-field 
					v-model="text"
					placeholder="Update todo"
					hide-details
				></v-text-field>
				<v-card-actions class="pa-0">
					<v-spacer></v-spacer>
					<v-btn
						class="mt-2"
		            	color="red"
		            	text
		            	@click="modal = !modal"
		          	>
		            Cancle
		        	</v-btn>
		        	<v-btn
						class="mt-2"
		            	color="green darken-1"
		            	text
		            	@click="updateTodo"
		          	>
		            Update
		        	</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
	import firebase from '@/firebase.js'

	export default {
		props: {
			title: String,
			id: String,
			completed: Boolean
		},
		data() {
			return {
				todo: firebase.firestore().collection('userCollection').doc(firebase.auth().currentUser.uid).collection('todos').doc(this.id),
				isCompleted: this.completed,
				text: this.title,
				modal: false
			}
		},
		watch: {
			isCompleted() {
				this.todo.update({
					completed: this.isCompleted
				})
			}
		},
		methods: {
			updateTodo() {
				this.todo.update({
					title: this.text,
					completed: this.isCompleted,
					date: new Date()
				})

				this.modal = !this.modal
			},
			deleteTodo() {
				this.todo.delete()
			}
		}
	}
</script>

<style>
	.line-through {
		text-decoration: line-through;
	}
</style>