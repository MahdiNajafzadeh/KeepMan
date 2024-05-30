import { Router } from "express";
import sharing from "../../controller/sharing.controller";
import auth from "../../middleware/auth.middleware.ts";
import { validator } from "../../middleware/schema.middleware";
import schema from "../../schema/sharing.schema";

const router = Router();
// GET's
// GET SHARE * NOTE FROM * USER
router.get("/note/share", [auth.have.token], sharing.get.all);
// ---------------------------------------------------------------------
// UPSERT's ( CREATE & UPDATE )
router.put("/note/:noteId/share", [auth.have.token, validator(schema.upsert)], sharing.upsert);
// ---------------------------------------------------------------------
// DELETE's
// DELETE 1 NOTE FROM * USER
router.delete("/note/:noteId/share", [auth.have.token], sharing.delete);

export default router;
