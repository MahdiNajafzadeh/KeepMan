import { defineStore } from "pinia";

export const useProfileStore = defineStore("Profile", {
	state: () => ({
		profile: {
			id: 1,
			firstName: "mahdi",
			lastName: "najafzadeh",
			username: "8ma8h3di3",
			email: "8ma8h3di3@gmail.com"
		},
		loaded: false,
		loading: false
	}),
	getters: {
		getProfile(state) {
			return state.profile;
		}
	}
});
