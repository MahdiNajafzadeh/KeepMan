import { Router } from "express";
import sharing from "../../controller/sharing.controller";
import auth from "../../middleware/auth.middleware.ts";
import { validator } from "../../middleware/schema.middleware";
import schema from "../../schema/sharing.schema";

const router = Router();
// GET's
// GET SHARE * NOTE FROM * USER
router.get("/note/share", [auth.have.token], sharing.get.all.note.all.user);
// GET SHARE 1 NOTE FROM * USER
router.get("/note/:noteId/share", [auth.have.token], sharing.get.one.note.all.user);
// GET SHARE * NOTE FROM 1 USER
router.get("/note/share/:username", [auth.have.token], sharing.get.all.note.one.user);
// GET SHARE 1 NOTE FROM 1 USER
router.get("/note/:noteId/share/:username", [auth.have.token], sharing.get.one.note.one.user);
// ---------------------------------------------------------------------
// CREATE's
// CREATE SHARE 1 NOTE FOR * OR [] USER
router.post("/note/:noteId/share", [auth.have.token, validator(schema.create)], sharing.create);
// ---------------------------------------------------------------------
// DELETE's
// DELETE 1 NOTE FROM * USER
router.delete("/note/:noteId/share", [auth.have.token], sharing.delete);

export default router;
