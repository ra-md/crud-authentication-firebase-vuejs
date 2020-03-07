<template>
	<v-card class="mb-2">
			<v-text-field
				v-model="text"
				class="pa-2"
				placeholder="add todo..."
				hide-details
				append-outer-icon="mdi-plus"
				@click:append-outer="addTodo"
			></v-text-field>
	</v-card>
</template>

<script>
	import firebase from '@/firebase.js'

	export default {
		data() {
			return {
				text: '',
			}
		},
		methods: {
			addTodo() {
				firebase.auth().onAuthStateChanged(user => {

					firebase.firestore().collection('userCollection')
					.doc(user.uid).collection('todos').doc().set({
						title: this.text,
						date: new Date(),
						completed: false
					})
					.catch(err => {
						console.log(err)
					})

					this.text = ''
				})
			}
		}
	}
</script>