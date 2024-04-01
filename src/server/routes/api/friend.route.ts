import { Router } from "express";
import friend from "../../controller/friend.controller";
import auth from "../../middleware/auth.middleware";

const router = Router();

router.get("/friend", [auth.have.token], friend.get);
router.post("/friend/:username", [auth.have.token], friend.create);
router.put("/friend/:username/:status", [auth.have.token], friend.update);
router.delete("/friend/:username", [auth.have.token], friend.delete);

export default router;
