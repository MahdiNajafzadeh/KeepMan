import { Router } from "express";
import authController from "../../controller/auth.controller";
import authMiddleware from "../../middleware/auth.middleware";
import { validator } from "../../middleware/schema.middleware";
import authSchema from "../../schema/auth.schema";

const auth = {
	controller: authController,
	middleware: authMiddleware,
	schema: authSchema,
};

const router = Router();

router.post(
	"/auth/signup",
	[auth.middleware.not.have.token, validator(auth.schema.signup)],
	auth.controller.signup
);
router.post(
	"/auth/login",
	[auth.middleware.not.have.token, validator(auth.schema.login)],
	auth.controller.login
);
router.delete("/auth/logout", [auth.middleware.have.token], auth.controller.logout);
router.post(
	"/auth/change-password",
	[auth.middleware.have.token, validator(auth.schema.changePassword)],
	auth.controller.changePassword
);

export default router;
