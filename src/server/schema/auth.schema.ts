import joi from "joi";

export const signup = joi.object({
	firstName: joi.string().required(),
	lastName: joi.string().required(),
	username: joi.string().required(),
	email: joi.string().email().required(),
	password: joi.string().min(8).required(),
});

export const login = joi.object({
	username: joi.string().required(),
	password: joi.string().min(8).required(),
});

export const changePassword = joi.object({
	password: joi.string().min(8).required(),
	newPassword: joi.string().min(8).required(),
});

export default {
	signup,
	login,
	changePassword
};
