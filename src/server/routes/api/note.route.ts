import { Router } from "express";
import note from "../../controller/note.controller";
import auth from "../../middleware/auth.middleware.ts";
import { validator } from "../../middleware/schema.middleware";
import schema from "../../schema/note.schema.ts";

const router = Router();
router.get("/note", [auth.have.token], note.get.all);
router.get("/note/:id", [auth.have.token], note.get.one);
router.post("/note", [auth.have.token, validator(schema.create)], note.create);
router.put("/note/:id", [auth.have.token, validator(schema.update)], note.update);
router.delete("/note/:id", [auth.have.token], note.delete);

export default router;
