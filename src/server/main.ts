import express from "express";
import cors from "cors";
import path from "path";
import cookie from "cookie-parser";

import routes from "./routes";

const app = express();
app.use(cors());
app.use(cookie());
app.use(express.json());
app.use(routes);
app.use(express.static(path.join(__dirname, "../views")));

const initServer = async (port: number) => {
	app.listen(port, () => console.log(`SERVER LISTEN IN ${port}`));
};

export default initServer;
