import { Router } from "express";
import reminder from "../../controller/reminder.controller";
import auth from "../../middleware/auth.middleware";
import schema from "../../schema/reminder.schema";
import { validator } from "../../middleware/schema.middleware";

const router = Router();

router.get("/note/:noteId/reminder", [auth.have.token], reminder.get);
router.post("/note/:noteId/reminder", [auth.have.token, validator(schema.upsert)], reminder.upsert);
router.delete("/note/:noteId/reminder", [auth.have.token], reminder.delete);

export default router;
