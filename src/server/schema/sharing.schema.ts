import joi from "joi";

const sharing_upsert = joi.object({
	usernames: joi.array().items(joi.string()).required(),
});

export default {
	upsert: sharing_upsert,
};
