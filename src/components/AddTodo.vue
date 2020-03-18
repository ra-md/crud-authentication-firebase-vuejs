<template>
	<v-card class="mb-2">
			<v-text-field
				v-model="text"
				class="pa-2"
				placeholder="add todo..."
				hide-details
				append-outer-icon="add"
				@click:append-outer="addTodo"
				@keyup.enter="addTodo"
				:rules="[rules]"
			></v-text-field>
	</v-card>
</template>

<script>
	import firebase from '@/firebase.js'

	export default {
		data() {
			return {
				text: '',
				rules: value => {
					return /\S/.test(value)
				}
			}
		},
		computed: {
			notEmpty() {
				return /\S/.test(this.text)
			}
		},
		methods: {
			addTodo() {
				firebase.auth().onAuthStateChanged(user => {

					if(user && this.notEmpty) {
						firebase.firestore().collection('userCollection')
						.doc(user.uid).collection('todos').doc().set({
							title: this.text,
							date: new Date(),
							completed: false
						})

						this.text = ''
					}
				})
			}
		}
	}
</script>