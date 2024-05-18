import type { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function sharings_get_all_note_all_user(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const userId = res.locals.session.id;
	try {
		const sharings = await prisma.sharings.findMany({
			where: {
				userId: userId,
			},
			select: {
				id: true,
				note: true,
				sharedUser: {
					select: {
						username: true,
					},
				},
			},
		});
		res.status(200).json({
			status: true,
			code: "SUCCESS",
			data: sharings,
		});
	} catch (error) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}
}

export async function sharings_get_one_note_all_user(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const userId = res.locals.session.id;

	const noteId = Number(req.params.noteId);
	if (!noteId) {
		return res.status(400).json({
			status: false,
			code: "BAD_REQUEST_ERR",
			message: "Note Id is not valid",
		});
	}

	try {
		const note = await prisma.notes.findUnique({
			where: {
				id: noteId,
				userId: userId,
			},
		});
		if (!note) {
			return res.status(404).json({
				status: false,
				code: "NOT_FOUND_ERR",
				message: "Note is not exist",
			});
		}
	} catch (error) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}

	try {
		const sharings = await prisma.sharings.findMany({
			where: {
				noteId: noteId,
			},
			select: {
				id: true,
				note: true,
				sharedUser: {
					select: {
						username: true,
					},
				},
			},
		});
		return res.status(200).json({
			status: true,
			code: "SUCCESS",
			data: sharings,
		});
	} catch (error) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}
}

export async function sharings_get_all_note_one_user(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const userId = res.locals.session.id;

	try {
		const sharedUser = await prisma.users.findUnique({
			where: {
				username: req.params.username,
			},
		});
		if (!sharedUser) {
			return res.status(404).json({
				status: false,
				code: "NOT_FOUND_ERR",
				message: "username is not exist",
			});
		}
		const friendship = await prisma.friends.findMany({
			where: {
				OR: [
					{ sender: { id: userId }, receiver: { id: sharedUser.id } },
					{ sender: { id: sharedUser.id }, receiver: { id: userId } },
				],
				status: "accept",
			},
		});
		if (!friendship) {
			return res.status(400).json({
				status: false,
				code: "BAD_REQUEST_ERR",
				message: "this username is not your friend",
			});
		}
		const sharings = await prisma.sharings.findMany({
			where: {
				sharedUserId: sharedUser.id,
			},
			select: {
				id: true,
				note: true,
				sharedUser: {
					select: {
						username: true,
					},
				},
			},
		});
		return res.status(200).json({
			status: true,
			code: "SUCCESS",
			data: sharings,
		});
	} catch (error) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}
}

export async function sharings_get_one_note_one_user(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const userId = res.locals.session.id;
	const noteId = Number(req.params.noteId);
	if (!noteId) {
		return res.status(400).json({
			status: false,
			code: "BAD_REQUEST_ERR",
			message: "noteId is not valid",
		});
	}

	try {
		const note = await prisma.notes.findUnique({
			where: {
				id: noteId,
				userId: userId,
			},
		});
		if (!note) {
			return res.status(404).json({
				status: false,
				code: "NOT_FOUND_ERR",
				message: "note is not exist",
			});
		}

		const sharedUser = await prisma.users.findUnique({
			where: {
				username: req.params.username,
			},
		});
		if (!sharedUser) {
			return res.status(404).json({
				status: false,
				code: "NOT_FOUND_ERR",
				message: "username is not exist",
			});
		}
		const friendship = await prisma.friends.findMany({
			where: {
				OR: [
					{ sender: { id: userId }, receiver: { id: sharedUser.id } },
					{ sender: { id: sharedUser.id }, receiver: { id: userId } },
				],
				status: "accept",
			},
		});
		if (!friendship) {
			return res.status(400).json({
				status: false,
				code: "BAD_REQUEST_ERR",
				message: "this username is not your friend",
			});
		}
		const sharings = await prisma.sharings.findMany({
			where: {
				sharedUserId: sharedUser.id,
			},
			select: {
				id: true,
				note: true,
				sharedUser: {
					select: {
						username: true,
					},
				},
			},
		});
		return res.status(200).json({
			status: true,
			code: "SUCCESS",
			data: sharings,
		});
	} catch (error) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}
}
