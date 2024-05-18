import type { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function reminder_get(req: Request, res: Response, next: NextFunction) {
	const noteId = Number(req.params.noteId);
	if (!noteId) {
		return res.status(400).json({
			status: false,
			code: "BAD_REQUEST_ERR",
			message: ":noteId is not valid",
		});
	}
	const reminder = await prisma.reminders.findFirst({
		where: { noteId: noteId },
		select: { expire: true },
	});
	return res.status(200).json({
		status: true,
		code: "SUCCESS",
		reminder: reminder || null,
	});
}
async function reminder_upsert(req: Request, res: Response, next: NextFunction) {
	const userId = res.locals.session.id;
	const noteId = Number(req.params.noteId);
	if (!noteId) {
		return res.status(400).json({
			status: false,
			code: "BAD_REQUEST_ERR",
			message: ":noteId is not valid",
		});
	}

	let expire;
	try {
		expire = new Date(req.body.expire);
	} catch (error) {
		return res.status(400).json({
			status: false,
			code: "BAD_REQUEST_ERR",
			message: "expire date is not a date number",
		});
	}

	let reminder;
	try {
		reminder = await prisma.reminders.upsert({
			where: {
				noteId: noteId,
			},
			update: {
				expire: expire,
			},
			create: {
				noteId: noteId,
				userId: userId,
				expire: expire,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server have some Problem",
		});
	}

	res.status(200).json({
		status: true,
		code: "SUCCESS",
		data: reminder,
	});
}
async function reminder_remove(req: Request, res: Response, next: NextFunction) {
	const userId = res.locals.session.id as number;
	const noteId = Number(req.params.noteId);
	if (!noteId) {
		return res.status(400).json({
			status: false,
			code: "BAD_REQUEST_ERR",
			message: ":noteId is not valid",
		});
	}
	let reminder;
	try {
		reminder = await prisma.reminders.delete({
			where: {
				noteId: noteId,
				userId: userId,
			},
		});
	} catch (error) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server have some Problem",
		});
	}

	res.status(200).json({
		status: true,
		code: "SUCCESS",
	});
}

export default {
	get: reminder_get,
	upsert: reminder_upsert,
	delete: reminder_remove,
};
