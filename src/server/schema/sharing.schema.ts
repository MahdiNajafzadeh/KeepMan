import joi from "joi";

const sharing_create = joi.object({
	noteId: joi.number().required(),
	sharedUserId: joi.array().items(joi.string()).required(),
	expire: joi.number().required(),
});

export default {
	create: sharing_create,
};
