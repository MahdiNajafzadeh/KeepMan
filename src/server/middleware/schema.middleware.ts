import type { Request, Response, NextFunction } from "express";
import type { ObjectSchema } from "joi";

export const validator = (schema: ObjectSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { value, error } = schema.validate(req.body);
		if (error) {
			return res.status(400).json({
				status: false,
				code: "INVALID_SCHEMA_ERR",
				message: error.message,
				details: error.details,
			});
		}
		next();
	};
};

export default {
	schema: validator,
};
