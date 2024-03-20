// init env values
import dotenv from "dotenv";
dotenv.config();

import server from "./server/main";

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`SERVER LISTEN IN ${PORT}`));
