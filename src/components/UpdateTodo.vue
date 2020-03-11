<template>
	<v-dialog v-model="modal" max-width="290">
		<v-card class="py-2 px-3">
			<h3 class="text-center mt-2">Update Todo</h3>
			<v-text-field 
				v-model="title"
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
			todo: Object
		},
		data() {
			return {
				modal: false,
				title: this.todo.title,
			}
		},
		methods: {
			updateTodo() {
				firebase.auth().onAuthStateChanged(user => {
					firebase.firestore().collection('userCollection').doc(user.uid).collection('todos').doc(this.todo.id).update({
						title: this.title,
						completed: this.todo.completed,
						date: new Date()
					})
				})

				this.modal = false
			},
			showModal() {
				this.modal = true
			}
		}
	}

</script>