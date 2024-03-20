import { Router } from "express";
import authRoutes from "./api/auth.route.ts";
import userRoutes from "./api/user.route.ts";
import noteRoutes from "./api/note.route.ts";
import friendRoutes from "./api/friend.route.ts";

const router = Router();
router.use("/api", authRoutes);
router.use("/api", userRoutes);
router.use("/api", noteRoutes);
router.use("/api", friendRoutes);

export default router;
