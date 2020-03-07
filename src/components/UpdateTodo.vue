<template>
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
</template>

<script>
	import firebase from '@/firebase.js'

	export default {
		props: {
			titleFromTodoItem: String,
			idFromTodoItem: String,
			completedFromTodoItem: Boolean
		},
		data() {
			return {
				modal: false,
				text: this.titleFromTodoItem,
				id: this.idFromTodoItem,
				completed: this.completedFromTodoItem
			}
		},
		methods: {
			updateTodo() {
				firebase.auth().onAuthStateChanged(user => {
					firebase.firestore().collection('userCollection').doc(user.uid).collection('todos').doc(this.id).update({
						title: this.text,
						completed: this.completed,
						date: new Date()
					})
				})

				this.modal = !this.modal
			},
			showModal() {
				this.modal = !this.modal
			}
		}
	}

</script>