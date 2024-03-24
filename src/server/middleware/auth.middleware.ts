import type { Request, Response, NextFunction } from "express";
import libToken from "../lib/token";

function validate_token(req: Request, res: Response, next: NextFunction) {
	if (!req.cookies || !req.cookies?.token || !libToken.validate(req.cookies?.token)) {
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
		next();
	}
}

function not_token(req: Request, res: Response, next: NextFunction) {
	if (!req.cookies || !req.cookies?.token || !libToken.validate(req.cookies?.token)) {
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
		token : validate_token
	},
	not : {
		have : {
			token : not_token
		}
	}
};
