<template>
  <v-app>
    <v-container class="fill-height">
      <v-row no-gutters justify="center">
        <v-col align="center" sm="6" md="4">
          <router-view/>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

	export default {
		components: {}
	}
</script>