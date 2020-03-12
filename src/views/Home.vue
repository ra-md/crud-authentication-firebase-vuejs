<template>
		<v-card class="pa-3">
			<v-form class="mb-5">
				<h2 class="mb-3">{{changeName}}</h2>
				<p class="font-weight-light mb-3 red--text" v-show="errorMessage">{{ error.message }}</p>
				<v-text-field 
					type="email" 
					label="email" 
					dense 
					outlined 
					v-model="email"
					:error-messages="emailErrorMessage"
				></v-text-field>
				<v-text-field 
					type="password" 
					label="password" 
					dense 
					outlined 
					v-model="password"
					:error-messages="passwordErrorMessage"
				></v-text-field>
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

	export default {
		data() {
			return {
				email: '',
				password: '',
				error: {},
				switchToSignup: false,
				auth: firebase.auth(),
			}
		},
		computed: {
			changeName() {
				return this.switchToSignup ? 'Sign Up' : 'Sign In'
			},
			errorMessage() {
				return this.error.code === 'auth/user-not-found' || this.error.code === 'auth/email-already-in-use'
			},
			passwordErrorMessage() {
				return this.error.code === 'auth/wrong-password' || this.error.code === 'auth/weak-password' ? this.error.message : ''
			},
			emailErrorMessage() {
				return this.error.code === 'auth/invalid-email' ? this.error.message : ''
			}
		},
		watch: {
			switchToSignup() {
				this.email = ''
				this.password = ''
				this.error = {}
			}
		},
		methods: {
			signIn() {
				this.auth.signInWithEmailAndPassword(this.email, this.password)
				.then(() => {
					this.$router.push('/todo')
				})
				.catch(error => {
					this.error = error
					console.log(error)
				})
			},
			signUp() {
				this.auth.createUserWithEmailAndPassword(this.email, this.password)
				.then(() => {
					firebase.firestore().collection('userCollection').doc(this.auth.currentUser.uid).set({})
					this.$router.push('/todo')
				})
				.catch(error => {
					this.error = error
					console.log(error)
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