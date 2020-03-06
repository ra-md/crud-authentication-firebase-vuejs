<template>
		<v-card class="pa-3">
			<v-form class="mb-5">
				<h2 class="mb-3">{{changeName}}</h2>
				<v-text-field label="email" dense outlined v-model="email"></v-text-field>
				<v-text-field label="password" dense outlined v-model="password"></v-text-field>
				<v-btn block @click="switchToSignup ? signUp() : signIn()">{{changeName}}</v-btn>
			</v-form>
			<div class="grid">
				<v-btn color="primary" @click="switchToSignup = false">Signin</v-btn>
				<v-btn @click="switchToSignup = true">Signup</v-btn>
			</div>
		</v-card>
</template>

<script>
	import signInFunction from '@/components/signInFunction.js'
	import signUpFunction from '@/components/signUpFunction.js'

	export default {
		data() {
			return {
				email: '',
				password: '',
				switchToSignup: false
			}
		},
		computed: {
			changeName() {
				return this.switchToSignup ? 'SignUp' : 'SignIn'
			}
		},
		methods: {
			signIn() {
				signInFunction(this.email, this.password, () => this.$router.push('/todo'))
			},
			signUp() {
				signUpFunction(this.email, this.password, () => this.$router.push('/todo'))
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