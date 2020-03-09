<template>
	<v-app-bar 
		fixed
		top 
		color="transparent" 
		flat
		dense
	>
		<v-switch 
			hide-details 
			v-model="dark" 
			inset
			:label="dark ? 'light':'dark'"
			class="ma-0"
		></v-switch>
		<v-spacer></v-spacer>
		<v-btn 
			v-show="showSignOut" 
			color="red" 
			dark 
			small
			@click="signOut"
		>Sign Out</v-btn>
	</v-app-bar>
</template>

<script>
	import firebase from '@/firebase.js'

	export default {
		data() {
			return {
				dark: false,
				showSignOut: false
			}
		},
		mounted() {
			firebase.auth().onAuthStateChanged(user => {
				if(user) {
					this.showSignOut = true
				} else {
					this.showSignOut = false
				}
			})
		},
		methods: {
			signOut() {
				firebase.auth().signOut()
					.then(() => {
						this.$router.push('/')
					})
					.catch(err => {
						console.log(err)
					})
			}
		}
	}
</script>