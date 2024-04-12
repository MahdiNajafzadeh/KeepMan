import axios, { type AxiosRequestConfig } from "axios";

const request = axios.create();

export default {
	get: async (url: string, config?: AxiosRequestConfig) => {
		if (!config) config = {};
		if (!config?.headers) config.headers = {};
		config.headers["X-Auth"] = localStorage.getItem("token");
		return await request.get(url, config);
	},
	post: async (url: string, data: any, config?: AxiosRequestConfig) => {
		if (!config) config = {};
		if (!config?.headers) config.headers = {};
		config.headers["X-Auth"] = localStorage.getItem("token");
		return await request.post(url, data, config);
	},
	put: async (url: string, data: any, config?: AxiosRequestConfig) => {
		if (!config) config = {};
		if (!config?.headers) config.headers = {};
		config.headers["X-Auth"] = localStorage.getItem("token");
		return await request.put(url, data, config);
	},
	delete: async (url: string, config?: AxiosRequestConfig) => {
		if (!config) config = {};
		if (!config?.headers) config.headers = {};
		config.headers["X-Auth"] = localStorage.getItem("token");
		return await request.get(url, config);
	}
};
