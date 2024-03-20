import dotenv from "dotenv";
import init from "./server/main";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

init(PORT);
