import type { Request, Response, NextFunction } from "express";
import token from "../lib/token";

function have_token(req: Request, res: Response, next: NextFunction) {
	if (!req.cookies || !req.cookies?.token || !token.validate(req.cookies?.token)) {
		if (req.baseUrl.startsWith("/api")) {
			return res.status(401).json({
				status: false,
				code: "AUTH_ERR",
				message: "Authentication faild",
			});
		} else {
			res.redirect("/auth");
		}
	} else {
		const session = token.decrypt(req.cookies?.token);
		res.locals.session = session;
		next();
	}
}

function not_have_token(req: Request, res: Response, next: NextFunction) {
	if (!req.cookies || !req.cookies?.token || !token.validate(req.cookies?.token)) {
		next();
	} else {
		if (req.baseUrl.startsWith("/api")) {
			return res.status(401).json({
				status: false,
				code: "AUTH_ERR",
				message: "Authentication faild",
			});
		} else {
			res.redirect("/");
		}
	}
}

export default {
	have: {
		token: have_token,
	},
	not: {
		have: {
			token: not_have_token,
		},
	},
};
