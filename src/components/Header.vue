<template>
	<v-app-bar 
		absolute
		top 
		color="transparent" 
		flat
		dense
	>
		<v-switch 
			hide-details 
			v-model="dark" 
			inset
			label="dark mode"
		></v-switch>
	</v-app-bar>
</template>

<script>
	export default {
		data() {
			return {
				dark: localStorage.getItem('dark') === 'true',
			}
		},
		watch: {
			dark() {
				localStorage.setItem('dark', this.dark)
				this.dark ? this.$vuetify.theme.isDark = true : this.$vuetify.theme.isDark = false
			}
		},
		created() {
			this.$vuetify.theme.isDark = this.dark
		}
	}
</script>