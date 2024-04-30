import axios, { type AxiosRequestConfig } from "axios";

const request = axios.create();

function setupToken(config: AxiosRequestConfig): AxiosRequestConfig {
	if (!config) config = {};
	if (!config?.headers) config.headers = {};
	config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
	return config;
}

export default {
	get: async (url: string, config: AxiosRequestConfig = {}) => {
		config = setupToken(config);
		return await request.get(url, config);
	},
	post: async (url: string, data: any, config: AxiosRequestConfig = {}) => {
		config = setupToken(config);
		return await request.post(url, data, config);
	},
	put: async (url: string, data: any, config: AxiosRequestConfig = {}) => {
		config = setupToken(config);
		return await request.put(url, data, config);
	},
	delete: async (url: string, config: AxiosRequestConfig = {}) => {
		config = setupToken(config);
		return await request.get(url, config);
	}
};
