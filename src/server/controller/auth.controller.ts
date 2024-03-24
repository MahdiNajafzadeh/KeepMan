import type { Request, Response, NextFunction } from "express";
import users from "../model/users.model";
import token from "../lib/token";

interface SignupBody {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
}

async function signup(req: Request, res: Response, next: NextFunction) {
	const body: SignupBody = req.body;
	const userExist = await users.exist.by.all({ email: body.email, username: body.username });
	if (!userExist.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server have some Problem",
		});
	}
	if (userExist.exist) {
		return res.status(400).json({
			status: false,
			code: "BAD_REQUEST_ERR",
			message: "User with this email or username is already exist",
		});
	}
	const userCreate = await users.create(body);
	if (!userCreate.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server have some Problem",
		});
	}
	res.status(200).json({
		status: true,
		code: "SUCCESS",
		message: "User signup successfuly",
	});
}

function login(req: Request, res: Response, next: NextFunction) {
	res.send("api/auth/login");
}

function logout(req: Request, res: Response, next: NextFunction) {
	res.send("api/auth/logout");
}

export default {
	signup,
	login,
	logout,
};
