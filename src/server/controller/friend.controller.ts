import type { Request, Response, NextFunction } from "express";
import friendsModel from "../model/friends.model";
import usersModel from "../model/users.model.ts";

const friendsStatus = ["accept", "reject"];

async function friend_get(req: Request, res: Response, next: NextFunction) {
	const username = res.locals.session.username;
	const getFriends = await friendsModel.get(username);
	if (!getFriends.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}

	res.status(200).json({
		status: true,
		code: "SUCCESS",
		data: getFriends.data,
	});
}
async function friend_create(req: Request, res: Response, next: NextFunction) {
	const userId = res.locals.session.id;
	const friendUsername = req.params.username;

	const getFriend = await usersModel.get.by.username(friendUsername);

	if (!getFriend.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}

	if (!Boolean(getFriend.data)) {
		return res.status(404).json({
			status: false,
			code: "NOT_FOUND_ERR",
			message: "not found user with this username",
		});
	}

	const friendId = getFriend.data.id;

	if (userId === friendId) {
		return res.status(400).json({
			status: false,
			code: "BAD_REQUEST_ERR",
			message: "You dont make request to yourself",
		});
	}

	const existFriend = await friendsModel.exist(userId, friendId);

	if (!existFriend.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}

	if (existFriend.exist) {
		return res.status(409).json({
			status: false,
			code: "CONFLICT_ERR",
			message: "friend request is already created",
		});
	}

	const createFriend = await friendsModel.create(userId, friendId);

	if (!createFriend.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}

	res.status(200).json({
		status: true,
		code: "SUCCESS",
		data: createFriend.data,
	});
}
async function friend_update(req: Request, res: Response, next: NextFunction) {
	const status = req.params.status;

	if (!friendsStatus.includes(status.toLowerCase())) {
		res.status(400).json({
			status: false,
			code: "BAD_REQUEST_ERR",
			message: `status must be ${friendsStatus.map((v) => `'${v}'`).join(" or ")}`,
		});
	}

	const userId = res.locals.session.id as number;
	const friendUsername = req.params.username;
	const getFriend = await usersModel.get.by.username(friendUsername);

	if (!getFriend.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}

	if (!Boolean(getFriend.data)) {
		return res.status(404).json({
			status: false,
			code: "NOT_FOUND_ERR",
			message: "not found user with this username",
		});
	}

	const friendId = getFriend.data.id as number;

	if (userId === friendId) {
		return res.status(400).json({
			status: false,
			code: "BAD_REQUEST_ERR",
			message: "You dont make request to yourself",
		});
	}

	const existFriendship = await friendsModel.exist(friendId, userId);

	if (!existFriendship.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}

	if (!existFriendship.exist) {
		return res.status(404).json({
			status: false,
			code: "NOT_FOUND_ERR",
			message: "friend request is not exist",
		});
	}

	const updateFriendship = await friendsModel.update(friendId, userId, status);

	if (!updateFriendship.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}

	res.status(200).json({
		status: true,
		code: "SUCCESS",
		message: "Friendship Update successfuly",
	});
}
async function friend_delete(req: Request, res: Response, next: NextFunction) {
	const userId = res.locals.session.id as number;
	const friendUsername = req.params.username;
	const getFriend = await usersModel.get.by.username(friendUsername);

	if (!getFriend.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}

	if (!Boolean(getFriend.data)) {
		return res.status(404).json({
			status: false,
			code: "NOT_FOUND_ERR",
			message: "not found user with this username",
		});
	}

	const friendId = getFriend.data.id as number;

	if (userId === friendId) {
		return res.status(400).json({
			status: false,
			code: "BAD_REQUEST_ERR",
			message: "You dont make request to yourself",
		});
	}

	const existFriendship = await friendsModel.exist(friendId, userId);

	if (!existFriendship.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}

	if (!existFriendship.exist) {
		return res.status(404).json({
			status: false,
			code: "NOT_FOUND_ERR",
			message: "friend request is not exist",
		});
	}

	const deleteFriend = await friendsModel.delete(userId, friendId);

	if (!deleteFriend.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}

	res.status(200).json({
		status: true,
		code: "SUCCESS",
		message: "Friendship Delete successfuly",
	});
}

export default {
	get: friend_get,
	create: friend_create,
	update: friend_update,
	delete: friend_delete,
};
