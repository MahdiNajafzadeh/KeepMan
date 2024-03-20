import { Router } from "express";
import auth from "../../controller/auth.controller.ts";

const router = Router();

router.post("/auth/signup", auth.signup);
router.post("/auth/login");
router.delete("/auth/logout");

export default router;
