import type { Request, Response, NextFunction } from "express";
import users from "../model/users.model";

async function get(req: Request, res: Response, next: NextFunction) {
	const userId = res.locals.session.id;
	const userGet = await users.get.by.id(userId);
	if (!userGet.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}
	res.status(200).json({
		status: true,
		code: "SUCCESS",
		data: userGet.data,
	});
}

async function update(req: Request, res: Response, next: NextFunction) {
	const userId = res.locals.session.id;
	const userUpdate = await users.update.by.id(userId , req.body);
	if (!userUpdate.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}
	res.status(200).json({
		status: true,
		code: "SUCCESS",
		data: userUpdate.data,
	});
}

export default {
	get,
	update,
};
