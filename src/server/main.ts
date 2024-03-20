import express from "express";
import cors from "cors";
import path from "path";

import routes from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../views", "index.html"));
});
app.use(express.static(path.join(__dirname, "../views")));

const initServer = async (port: number) => {
	app.listen(port, () => console.log(`SERVER LISTEN IN ${port}`));
};

export default initServer;
