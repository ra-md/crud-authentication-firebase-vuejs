<template>
		<v-card class="pa-3">
			<v-form class="mb-5">
				<h2 class="mb-3">{{changeName}}</h2>
				<v-text-field type="email" label="email" dense outlined v-model="email"></v-text-field>
				<v-text-field type="password" label="password" dense outlined v-model="password"></v-text-field>
				<v-btn block @click="switchToSignup ? signUp() : signIn()">{{changeName}}</v-btn>
			</v-form>
			<div class="grid">
				<v-btn color="primary" @click="switchToSignup = false">Signin</v-btn>
				<v-btn @click="switchToSignup = true">Signup</v-btn>
			</div>
		</v-card>
</template>

<script>
	import firebase from '@/firebase.js'
	import { mapGetters, mapActions } from 'vuex'

	export default {
		data() {
			return {
				email: '',
				password: '',
				switchToSignup: false,
				auth: firebase.auth()
			}
		},
		computed: {
			changeName() {
				return this.switchToSignup ? 'SignUp' : 'SignIn'
			},
			...mapGetters([
				'user'
			])
		},
		watch: {
			user() {
				console.log(this.user)
			}
		},
		methods: {
			signIn() {
				this.auth.signInWithEmailAndPassword(this.email, this.password)
				.then(() => {
					this.$router.push('/todo')
				})
				.catch(err => {
					console.log(err)
				})
			},
			signUp() {
				this.auth.createUserWithEmailAndPassword(this.email, this.password)
				.then(() => {
					firebase.firestore().collection('userCollection').doc(this.auth.currentUser.uid).set({})
					this.$router.push('/todo')
				})
				.catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped>
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 1em;
	}
</style>