import joi from "joi";

export const create = joi.object({
	title: joi.string(),
	content: joi.string(),
	render: joi.string(),
});
export const update = joi
	.object({
		title: joi.string(),
		content: joi.string(),
		render: joi.string(),
	})
	.or("title", "content", "render");

export default {
	create,
	update,
};
