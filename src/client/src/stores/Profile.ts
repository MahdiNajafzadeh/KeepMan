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
	state: () => {
		return {
			profile: {
				id: 0,
				firstName: "",
				lastName: "",
				username: "",
				email: ""
			}
		};
	},
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
				localStorage.setItem("token", data?.token);
				localStorage.setItem("tokenDate", new Date().getTime().toString());
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
				localStorage.setItem("token", data?.token);
				localStorage.setItem("tokenDate", new Date().getTime().toString());
				const profileResponse = await request.get("http://localhost:3000/api/user");
				const profileData = profileResponse.data?.data;
				this.profile = profileData;
				return { success: true, data };
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
				const data = response.data?.data;
				this.profile = data;
				return { success: true, data };
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
		},
		reset() {
			this.profile = {
				id: 0,
				firstName: "",
				lastName: "",
				username: "",
				email: ""
			};
		}
	},
});
