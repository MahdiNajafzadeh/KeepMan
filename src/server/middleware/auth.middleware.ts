import type { Request, Response, NextFunction } from "express";
import token from "../lib/token";

function have_token(req: Request, res: Response, next: NextFunction) {
	const cookieTokenValidation = token.validate(req.cookies?.token);
	const headerTokenValidation = token.validate(req.header("X-Auth") as string);
	if (cookieTokenValidation || headerTokenValidation) {
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
		console.log(cookieTokenValidation || headerTokenValidation);
		let session;
		if (cookieTokenValidation) {
			session = token.decrypt(req.cookies?.token);
		} else {
			session = token.decrypt(req.header("X-Auth") as string);
		}
		res.locals.session = session;
		next();
	}
}

function not_have_token(req: Request, res: Response, next: NextFunction) {
	const cookieTokenValidation = !token.validate(req.cookies?.token);
	const headerTokenValidation = !token.validate(req.header("X-Auth") as string);
	if (cookieTokenValidation && headerTokenValidation) {
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
