import { Router } from "express";
import auth from "./api/auth.route.ts";
import user from "./api/user.route.ts";
import note from "./api/note.route.ts";
import friend from "./api/friend.route.ts";

const router = Router();
router.use("/api", auth);
router.use("/api", user);
router.use("/api", note);
router.use("/api", friend);

export default router;
