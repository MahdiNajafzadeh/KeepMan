import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();


async function note_get_all(userId: number): Promise<ModelRespose> {
	try {
		const notes = await prisma.notes.findMany({
			where: {
				userId: userId,
			},
		});
		return {
			success: true,
			from: "note.get.all",
			exist: Boolean(notes.length),
			data: notes,
		};
	} catch (error) {
		return {
			success: false,
			from: "note.get.all",
			error,
		};
	}
}

async function note_get_one(userId: number, id: number): Promise<ModelRespose> {
	try {
		const note = await prisma.notes.findMany({
			where: {
				id: id,
				userId: userId,
			},
		});
		return {
			success: true,
			from: "note.get.one",
			exist: Boolean(note.length),
			data: note[0] ? note[0] : null,
		};
	} catch (error) {
		return {
			success: false,
			from: "note.get.one",
			error,
		};
	}
}

async function note_create(data: Prisma.NotesCreateInput): Promise<ModelRespose> {
	try {
		const note = await prisma.notes.create({
			data: data,
		});
		return {
			success: true,
			from: "note.create",
			data: note,
		};
	} catch (error) {
		return {
			success: false,
			from: "note.create",
			error,
		};
	}
}

async function note_update(
	userId: number,
	id: number,
	data: Prisma.NotesUpdateInput
): Promise<ModelRespose> {
	try {
		const note = await prisma.notes.update({
			where: {
				userId: userId,
				id: id,
			},
			data: data,
		});
		return {
			success: true,
			from: "note.update",
			data: note,
		};
	} catch (error) {
		return {
			success: false,
			from: "note.update",
			error,
		};
	}
}

async function note_delete(userId: number, id: number): Promise<ModelRespose> {
	try {
		const note = await prisma.notes.delete({
			where: {
				userId: userId,
				id: id,
			},
		});
		return {
			success: true,
			from: "note.delete",
			data: note,
		};
	} catch (error) {
		return {
			success: false,
			from: "note.delete",
			error,
		};
	}
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
