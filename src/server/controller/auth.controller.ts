import type { Request, Response, NextFunction } from "express";

function signup(req: Request, res: Response, next: NextFunction) {
	res.send("api/auth/signup");
}

export default {
	signup,
};
