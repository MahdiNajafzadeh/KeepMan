import { Router } from "express";
import authRoutes from "./api/auth.route";
import userRoutes from "./api/user.route";
import noteRoutes from "./api/note.route";
import friendRoutes from "./api/friend.route";

import clientRoutes from "./client.route";

const router = Router();
router.use("/api", authRoutes);
router.use("/api", userRoutes);
router.use("/api", noteRoutes);
router.use("/api", friendRoutes);
router.use(clientRoutes);

export default router;
