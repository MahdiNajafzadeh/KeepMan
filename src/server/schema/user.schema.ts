import Joi from "joi";

export const update = Joi.object({
	firstName: Joi.string(),
	lastName: Joi.string(),
	username: Joi.string(),
}).or("firstName", "lastName", "username");

export default {
	update,
};
