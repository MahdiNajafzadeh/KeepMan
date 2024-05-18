import joi from "joi";

export const upsert = joi.object({
	expire: joi.date().required(),
});

export default {
	upsert,
};
