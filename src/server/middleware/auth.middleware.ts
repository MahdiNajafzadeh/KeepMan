import type { Request, Response, NextFunction } from "express";
import token from "../lib/token";

/*[ Helper Functions ]*/
function sendUnAuthenResonse(res: Response) {
	res.status(401).json({
		status: false,
		code: "AUTH_ERR",
		message: "Authentication faild",
	});
}

/*[ Main Functions ]*/
function have_token(req: Request, res: Response, next: NextFunction) {
	const header = req.header("Authorization") as string;
	if (!header) return sendUnAuthenResonse(res);
	const tokenHeader = header.split(" ")[1];
	if (!tokenHeader) return sendUnAuthenResonse(res);
	const validattion = token.validate(tokenHeader);
	if (!validattion) return sendUnAuthenResonse(res);

	const session = token.decrypt(tokenHeader);
	res.locals.session = session;
	next();
}

function not_have_token(req: Request, res: Response, next: NextFunction) {
	const header = req.header("Authorization") as string;
	if (!header) return next();
	const tokenHeader = header.split(" ")[1];
	if (!tokenHeader) return next();
	const validattion = token.validate(tokenHeader);
	if (!validattion) return next();

	return sendUnAuthenResonse(res);
}

function already_have_token(req: Request, res: Response, next: NextFunction) {
	const header = req.header("Authorization") as string;
	if (!header) return next();
	const tokenHeader = header.split(" ")[1];
	if (!tokenHeader) return next();
	const validattion = token.validate(tokenHeader);
	if (!validattion) return next();

	return res.status(201).json({
		status: true,
		message: "you are alreay login",
	});
}

export default {
	already: {
		have: {
			token: already_have_token,
		},
	},
	have: {
		token: have_token,
	},
	not: {
		have: {
			token: not_have_token,
		},
	},
};
