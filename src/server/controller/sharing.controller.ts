import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import type { Request, Response, NextFunction } from "express";
import noteModel from "../model/note.model";
import usersModel from "../model/users.model";
import friendsModel from "../model/friends.model";

async function sharing_get_all(req: Request, res: Response, next: NextFunction) {
	const { username, id: userId } = res.locals?.session;

	const sharings = await prisma.sharings.findMany({
		where: {
			OR: [{ userId: Number(userId) }, { sharedUserId: Number(userId) }],
		},
		select: {
			noteId: true,
			user: {
				select: {
					username: true,
				},
			},
			sharedUser: {
				select: {
					username: true,
				},
			},
		},
	});

	const data = sharings.map((sharing) => {
		const status = sharing.user.username === username ? "send" : "receive";
		const users = status === "send" ? [sharing.sharedUser.username] : [sharing.user.username];

		return {
			noteId: sharing.noteId,
			status: status,
			users: users,
		};
	});

	res.json({
		success: true,
		data: data,
	});
}

async function sharing_upsert(req: Request, res: Response, next: NextFunction) {
	try {
		const { noteId } = req.params;
		const { usernames } = req.body;
		const { username, id: userId } = res.locals.session;

		// Check `NOTE`
		if (!Number(noteId)) {
			return res.json({
				success: false,
				message: ":noteId is must be number",
			});
		}
		const getNote = await noteModel.get.one(Number(userId), Number(noteId));
		if (!getNote.success) return res.status(500).json("server error");
		if (!getNote.exist) return res.status(404).json("note not found");
		const note = getNote.data;

		// Check `USER`
		const getUsers: ModelRespose[] = await Promise.all(
			usernames.map((username: string) => usersModel.get.by.username(username))
		);
		if (!getUsers.every((getUser) => getUser.success)) {
			return res.status(500).json("server error");
		}
		if (!getUsers.every((getUser) => getUser.exist)) {
			return res.status(404).json("one or more users is not exist");
		}

		// Check `FRIEND`
		const getFriends: ModelRespose[] = await Promise.all(
			getUsers.map((user) => friendsModel.exist(Number(userId), user.data.id))
		);
		if (!getFriends.every((getFriend) => getFriend.success)) {
			return res.status(500).json("server error");
		}
		if (!getFriends.every((getFriend) => getFriend.exist)) {
			return res.status(403).json("one or more users is not friend with you");
		}

		const sharings = await prisma.sharings.findMany({
			where: {
				noteId: Number(noteId),
				userId: Number(userId),
			},
			select: {
				sharedUser: {
					select: {
						username: true,
					},
				},
			},
		})

		for (const sharing of sharings) {
		}
		res.json(sharings);

		res.json({ success: true, message: "Sharings upserted successfully" });
	} catch (error) {
		next(error);
	}
}

async function sharing_delete(req: Request, res: Response, next: NextFunction) {}

export default {
	get: {
		all: sharing_get_all,
	},
	upsert: sharing_upsert,
	delete: sharing_delete,
};
