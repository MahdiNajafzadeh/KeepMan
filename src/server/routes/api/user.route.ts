import { Router } from "express";
import user from "../../controller/user.controller";
import auth from "../../middleware/auth.middleware";
import schema from "../../schema/user.schema";
import { validator } from "../../middleware/schema.middleware";

const router = Router();

router.get("/user", [auth.have.token], user.get);
router.put("/user", [auth.have.token , validator(schema.update) ], user.update);

export default router;
