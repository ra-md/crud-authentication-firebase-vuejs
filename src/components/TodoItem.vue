<template>
	<v-list-item-group>
		<v-list-item>
			<v-list-item-action>
				<v-checkbox v-model="isCompleted"></v-checkbox>
			</v-list-item-action>
			<v-list-item-content>
				<v-list-item-title :class="{'line-through': isCompleted}" v-text="title"></v-list-item-title>
			</v-list-item-content>
			<v-list-item-action class="ml-1">
				<v-btn icon>
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
				isCompleted: this.completed
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