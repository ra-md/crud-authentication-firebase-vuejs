<template>
  <v-app>
    <Header/>
    <v-container class="fill-height mt-7">
      <v-row no-gutters justify="center">
        <v-col align="center" sm="6" md="4">
          <router-view/>
          <a rel="noopener" target="_blank" href="https://github.com/7yk/crud-authentication-firebase-vuejs">Source</a>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
  import Header from './components/Header.vue'

	export default {
		components: {
      Header
    }
	}
</script>
