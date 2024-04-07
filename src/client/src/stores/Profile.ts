import { defineStore } from "pinia";
import axios, { AxiosError } from "axios";

interface SignupData {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
}

export const useProfileStore = defineStore("Profile", {
	state: () => ({
		profile: {
			id: 0,
			firstName: "",
			lastName: "",
			username: "",
			email: ""
		},
		loaded: false,
		loading: false
	}),
	getters: {
		getProfile(state) {
			return state.profile;
		}
	},
	actions: {
		async signup(signupData: SignupData) {
			try {
				const response = await axios.post(
					"http://localhost:3000/api/auth/signup",
					signupData
				);
				if (response.data?.code !== "SUCCESS") {
					return { success: false, error: response.data?.code };
				} else {
					return { success: true };
				}
			} catch (error: any) {
				if (error instanceof AxiosError) {
					const data = error.response?.data;
					return { success: false, error: data?.code };
				} else {
					return { success: false, error: "UNKOWN" };
				}
			}
		}
	}
});
