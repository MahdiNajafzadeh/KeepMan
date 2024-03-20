import { Router } from "express";
import authController from "../../controller/auth.controller.ts";
import authMiddleware from "../../middleware/auth.middleware.ts";

const auth = {
	c: authController,
	m: authMiddleware,
};

const router = Router();

router.post("/auth/signup", [auth.m.token], auth.c.signup);
router.post("/auth/login", [auth.m.token], auth.c.login);
router.delete("/auth/logout", [auth.m.token], auth.c.logout);

export default router;
