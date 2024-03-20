import type { Request, Response, NextFunction } from "express";

function signup(req: Request, res: Response, next: NextFunction) {
	res.send("api/auth/signup");
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
