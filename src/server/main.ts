import express from "express";
import cors from "cors";

import routes from './routes';
const PORT = process.env.PORT || 3000;

export default () => {
	const app = express();
	app.use(cors());
	app.use(express.json());
    app.use(routes)
	return app.listen(PORT, () => console.log(`SERVER LISTEN IN ${PORT}`));
};
