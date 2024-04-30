import { Router } from "express";
import authRoutes from "./api/auth.route";
import userRoutes from "./api/user.route";
import noteRoutes from "./api/note.route";
import friendRoutes from "./api/friend.route";

import clientRoutes from "./client.route";

const router = Router();

/*[ Logger Middleware ]*/
router.use((req, res, next) => {
	console.log("----------------------------");
	console.log("Method : ", req.method);
	console.log("URL    : ", req.url);
	console.log("Token  : ", req.header("Authorization"));
	console.log("----------------------------");
	next();
});

router.use("/api", authRoutes);
router.use("/api", userRoutes);
router.use("/api", noteRoutes);
router.use("/api", friendRoutes);
router.use(clientRoutes);

export default router;
