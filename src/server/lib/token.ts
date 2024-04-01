import crypto from "node:crypto";
import jwt from "jsonwebtoken";

// const secret = crypto.randomBytes(75).toString("hex");
const secret =
	"c89fa4ab69572448dfc9c3f63367583902c8850964dd25c9adb947ecd92dc99c779c4234ec9eae7b478cf43a2b176901f1b22ddc549105835d6246af0a92fbca09115389b8ddc47bf3bcc7";

export default {
	validate(token: string): boolean {
		try {
			jwt.verify(token, secret);
			return true;
		} catch (error) {
			return false;
		}
	},
	encrypt(data: Object) {
		return jwt.sign(data, secret, { expiresIn: "12h" });
	},
	decrypt(token: string) {
		try {
			const data = jwt.decode(token);
			return data;
		} catch (error) {
			return false;
		}
	},
};
