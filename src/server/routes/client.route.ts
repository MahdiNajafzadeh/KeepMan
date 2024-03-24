import { Router } from "express";
import path from "path";

const routes = ["/note/:id", "/profile", "/friends", "/about", '/auth'];

const router = Router();

router.use(routes, (req, res, next) => {
	res.sendFile(path.join(__dirname, "../../views", "index.html"));
});

export default router;
