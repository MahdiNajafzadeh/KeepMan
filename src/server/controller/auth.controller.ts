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
			short: "USER_EXIST_WITH_EMAIL_OR_USERNAME",
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

	const userToken = token.encrypt({
		id: userCreate.data?.id,
		username: userCreate.data?.username,
	});
	res.status(200).json({
		status: true,
		code: "SUCCESS",
		message: "User signup successfuly",
		data: {
			token: userToken,
		},
	});
}

async function login(req: Request, res: Response, next: NextFunction) {
	const userAuth = await users.auth.validate.by.username(req.body);
	if (!userAuth.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			short: "DB_VALIDATE_ERROR",
			message: "Server have some Problem",
		});
	}
	if (!Boolean(userAuth.data)) {
		return res.status(401).json({
			status: false,
			code: "AUTH_ERR",
			short: "AUTH_FAILD",
			message: "Authentication faild",
		});
	}
	const userToken = token.encrypt({ id: userAuth.data?.id, username: userAuth.data?.username });
	res.status(200).json({
		status: true,
		code: "SUCCESS",
		message: "User login successfuly",
		data: {
			token: userToken,
		},
	});
}

async function logout(req: Request, res: Response, next: NextFunction) {
	res.status(200).json({
		status: true,
		code: "SUCCESS",
		message: "User logout successfuly",
	});
}

async function changePassword(req: Request, res: Response, next: NextFunction) {
	const session = res.locals.session;

	const userAuth = await users.auth.validate.by.id({
		id: session.id,
		password: req.body.password,
	});

	if (!userAuth.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}

	if (!Boolean(userAuth.data)) {
		return res.status(401).json({
			status: false,
			code: "AUTH_ERR",
			message: "Authentication failed",
		});
	}

	const userChangePassword = await users.auth.changePassword({
		id: session.id,
		password: req.body.newPassword,
	});

	if (!userChangePassword.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}

	res.status(200).json({
		status: true,
		code: "SUCCESS",
		message: "User Change Password successfully",
	});
}

export default {
	signup,
	login,
	logout,
	changePassword,
};
