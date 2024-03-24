<script>
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router';

export default defineComponent({
	name: 'NavBar',
	components: {
		RouterLink
	},
	data() {
		return {
			brandIcon: '/favicon.ico',
			brandName: 'Keepman',
			searchContent: ""
		}
	},
	methods: {
		logout(v) {
			console.log(v)
		}
	},
	watch: {
		searchContent(v) {
			console.log(v);
		}
	}
})
</script>

<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<!-- Nav brand (icon + brand name) -->
		<a class="navbar-brand mx-3" href="#">
			<img :src="brandIcon" width="30" height="30" class="d-inline-block align-top" alt="">
			{{ brandName }}
		</a>

		<!-- Search bar (text input) -->
		<form class="form-inline my-2 my-lg-0 mx-auto search-form">
			<input id="searchBarInput" class="form-control mr-sm-2" type="search" placeholder="Search"
				aria-label="Search" v-model="searchContent">
		</form>

		<!-- Account bar (profile with dropdown) -->
		<div class="dropdown mx-4">
			<button style="justify-content: center; align-items: center;" class="btn btn-secondary dropdown-toggle"
				type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true"
				aria-expanded="false">
				<img :src="brandIcon" width="30" height="30" class="d-inline-block align-top">
				@{{ brandName }}&ThinSpace;
			</button>
			<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
				<router-link class="dropdown-item" to="/profile">Profile</router-link>
				<router-link class="dropdown-item" to="/friends">Friends</router-link>
				<router-link class="dropdown-item" to="/">Notes</router-link>
				<router-link class="dropdown-item" to="/about">About</router-link>
				<div class="dropdown-divider"></div>
				<div class="dropdown-item" @click="logout">Logout</div>
			</div>
		</div>
	</nav>
</template>

<style scoped>
.search-form {
	max-width: 75%;
	width: 50%
}
</style>