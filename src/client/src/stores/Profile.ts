import { defineStore } from "pinia";
import { AxiosError } from "axios";
import request from "@/lib/request.js";

interface SignupData {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
}

interface LoginData {
	username: string;
	password: string;
}

interface Profile {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
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
		token: "",
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
				const response = await request.post(
					"http://localhost:3000/api/auth/signup",
					signupData
				);
				const data = response.data?.data;
				this.token = data?.token ? data?.token : "";
				localStorage.setItem("token", this.token);
				localStorage.setItem("tokenDate", new Date().getTime().toString());
				document.cookie = `token=${this.token};`;
				return { success: true, data: response.data };
			} catch (error: any) {
				if (error instanceof AxiosError) {
					const data = error.response?.data;
					return { success: false, code: data?.code, message: data?.message };
				} else {
					return { success: false, code: "UNKOWN", message: "UNKOWN_ERROR" };
				}
			}
		},
		async login(loginData: LoginData) {
			try {
				const response = await request.post(
					"http://localhost:3000/api/auth/login",
					loginData
				);
				const data = response.data?.data;
				this.token = data?.token ? data?.token : "";
				localStorage.setItem("token", this.token);
				localStorage.setItem("tokenDate", new Date().getTime().toString());
				document.cookie = `token=${this.token};`;
				return { success: true, data: response.data };
			} catch (error: any) {
				if (error instanceof AxiosError) {
					const data = error.response?.data;
					return {
						success: false,
						code: data?.code,
						short: data?.short,
						message: data?.message
					};
				} else {
					return { success: false, code: "UNKOWN", message: "UNKOWN_ERROR" };
				}
			}
		},
		async editProfile(newProfile: Profile) {
			try {
				const response = await request.put("http://localhost:3000/api/user", newProfile);
				const
			} catch (error) {
				if (error instanceof AxiosError) {
					const data = error.response?.data;
					return {
						success: false,
						code: data?.code,
						short: data?.short,
						message: data?.message
					};
				} else {
					return { success: false, code: "UNKOWN", message: "UNKOWN_ERROR" };
				}
			}
		}
	}
});
