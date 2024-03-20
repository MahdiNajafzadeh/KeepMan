import crypto from "node:crypto";
import jwt from "jsonwebtoken";

const secret = crypto.randomBytes(75).toString("hex");

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
		return jwt.sign(data, secret);
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
