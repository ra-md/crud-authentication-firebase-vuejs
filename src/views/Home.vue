<template>
		<v-card class="pa-3">
			<v-form class="mb-5">
				<h2 class="mb-3">{{changeName}}</h2>
				<p class="font-weight-light mb-3 red--text" v-if="errorMessageUser">{{ error.message }}</p>
				<v-text-field 
					type="email" 
					label="email" 
					dense 
					outlined 
					v-model="email"
					:error-messages="emailErrorMessage"
					:rules="[rules.required, rules.email]"
				></v-text-field>
				<v-text-field 
					:append-icon="showPassword ? 'visibility' : 'visibility_off'"
					:type="showPassword ? 'text' : 'password'"
					@click:append="showPassword = !showPassword"
					label="password" 
					dense 
					outlined 
					v-model="password"
					:error-messages="passwordErrorMessage"
					:rules="switchToSignup ? [rules.counter] : [rules.required]"
					minlength="6"
				></v-text-field>
				<v-btn 
					block 
					color="primary" 
					@click="switchToSignup ? signUp() : signIn()"
					:loading="isLodaing"
				>{{changeName}}</v-btn>
			</v-form>
			<div class="grid">
				<v-btn 
					:dark="!switchToSignup" 
					outlined 
					:class="{'secondary': !switchToSignup}" 
					@click="switchToSignup = false"
				>Signin</v-btn>
				<v-btn 
					:dark="switchToSignup" 
					outlined
					:class="{'secondary': switchToSignup}" 
					@click="switchToSignup = true"
				>Signup</v-btn>
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
				showPassword: false,
				isLodaing: false,
				rules: {
		          required: value => !!value || 'Required.',
		          counter: value => value.length >= 6 || 'Min 6 characters',
		          email: value => {
		            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		            return pattern.test(value) || 'Invalid e-mail.'
		          },
		        },
			}
		},
		computed: {
			changeName() {
				return this.switchToSignup ? 'Sign Up' : 'Sign In'
			},
			errorMessageUser() {
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
				this.error = {}
			},
			error() {
				this.isLodaing = false
			}
		},
		methods: {
			signIn() {
				this.isLodaing = true
				firebase.auth().signInWithEmailAndPassword(this.email, this.password)
				.then(() => {
					this.$router.push('/todo')
				})
				.catch(error => {
					this.error = error
				})
			},
			signUp() {
				this.isLodaing = true
				firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
				.then(user => {
					firebase.firestore().collection('userCollection').doc(user.user.uid).set({})
					this.$router.push('/todo')
				})
				.catch(error => {
					this.error = error
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
