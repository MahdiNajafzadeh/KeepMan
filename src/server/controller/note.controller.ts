import type { Request, Response, NextFunction } from "express";
import noteModel from "../model/note.model";

async function note_get_all(req: Request, res: Response, next: NextFunction) {
	const userId = res.locals.session.id as number;
	const getNotes = await noteModel.get.all(userId);
	if (!getNotes.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}
	res.status(200).json({
		status: true,
		code: "SUCCESS",
		data: getNotes.data,
	});
}
async function note_get_one(req: Request, res: Response, next: NextFunction) {
	const userId = res.locals.session.id;
	const noteId = Number(req.params.id);
	if (!noteId) {
		return res.status(400).json({
			status: false,
			code: "BAD_REQUEST_ERR",
			message: "Note Id is not valid",
		});
	}
	const getNote = await noteModel.get.one(userId, noteId);
	if (!getNote.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}
	if (!getNote.exist) {
		return res.status(404).json({
			status: false,
			code: "NOT_FOUND_ERR",
			message: "Note is not found",
		});
	}
	res.status(200).json({
		status: true,
		code: "SUCCESS",
		data: getNote.data,
	});
}
async function note_create(req: Request, res: Response, next: NextFunction) {
	const userId = res.locals.session.id;
	const createNote = await noteModel.create({
		...req.body,
		userId: userId,
		createAt: new Date(),
		updateAt: new Date(),
	});
	if (!createNote.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}
	res.status(200).json({
		status: true,
		code: "SUCCESS",
		data: createNote.data,
	});
}
async function note_update(req: Request, res: Response, next: NextFunction) {
	const userId = res.locals.session.id;
	const noteId = Number(req.params.id);
	if (!noteId) {
		return res.status(400).json({
			status: false,
			code: "BAD_REQUEST_ERR",
			message: "Note Id is not valid",
		});
	}
	const getNote = await noteModel.get.one(userId, noteId);
	if (!getNote.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}
	if (!getNote.exist) {
		return res.status(404).json({
			status: false,
			code: "NOT_FOUND_ERR",
			message: "Note is not found",
		});
	}
	const updateNote = await noteModel.update(userId, noteId, req.body);
	if (!updateNote.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}
	res.status(200).json({
		status: true,
		code: "SUCCESS",
		data: updateNote.data,
	});
}
async function note_delete(req: Request, res: Response, next: NextFunction) {
	const userId = res.locals.session.id;
	const noteId = Number(req.params.id);
	if (!noteId) {
		return res.status(400).json({
			status: false,
			code: "BAD_REQUEST_ERR",
			message: "Note Id is not valid",
		});
	}
	const getNote = await noteModel.get.one(userId, noteId);
	if (!getNote.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}
	if (!getNote.exist) {
		return res.status(404).json({
			status: false,
			code: "NOT_FOUND_ERR",
			message: "Note is not found",
		});
	}
	const deleteNote = await noteModel.delete(userId, noteId);
	if (!deleteNote.success) {
		return res.status(500).json({
			status: false,
			code: "INTERNAL_ERR",
			message: "Server has some problems",
		});
	}
	res.status(200).json({
		status: true,
		code: "SUCCESS",
		message: "Note Delete is successfuly",
	});
}

export default {
	get: {
		all: note_get_all,
		one: note_get_one,
	},
	create: note_create,
	update: note_update,
	delete: note_delete,
};
