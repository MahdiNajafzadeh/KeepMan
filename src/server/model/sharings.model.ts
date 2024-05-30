import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function sharing_get_all(userId: number): Promise<ModelRespose> {
	try {
		const sharings = await prisma.sharings.findMany({
			where: {
				userId: userId,
			},
		});
		return {
			success: true,
			from: "sharing.get.all",
			exist: Boolean(sharings.length),
			data: sharings,
		};
	} catch (error) {
		return {
			success: false,
			from: "sharing.get.all",
			error,
		};
	}
}

async function sharing_get_one(id: number, userId: number): Promise<ModelRespose> {
	try {
		const sharings = await prisma.sharings.findMany({
			where: {
				id: id,
				userId: userId,
			},
		});
		return {
			success: true,
			from: "sharing.get.all",
			exist: Boolean(sharings.length),
			data: sharings,
		};
	} catch (error) {
		return {
			success: false,
			from: "sharing.get.all",
			error,
		};
	}
}

async function sharings_create(data: Prisma.SharingsCreateInput): Promise<ModelRespose> {
	try {
		const sharings = await prisma.sharings.create({
			data: data,
		});
		return {
			success: true,
			from: "sharings.create",
			data: sharings,
		};
	} catch (error) {
		return {
			success: false,
			from: "sharings.create",
			error,
		};
	}
}

async function sharings_update(
	id: number,
	data: Prisma.SharingsUpdateInput
): Promise<ModelRespose> {
	try {
		const sharings = await prisma.sharings.update({
			where: {
				id: id,
			},
			data: data,
		});
		return {
			success: true,
			from: "sharings.update",
			data: sharings,
		};
	} catch (error) {
		return {
			success: false,
			from: "sharings.update",
			error,
		};
	}
}

async function sharings_delete(id: number): Promise<ModelRespose> {
	try {
		const sharings = await prisma.sharings.delete({
			where: {
				id: id,
			},
		});
		return {
			success: true,
			from: "sharings.delete",
			data: sharings,
		};
	} catch (error) {
		return {
			success: false,
			from: "sharings.delete",
			error,
		};
	}
}

export default {
	get: {
		all: sharing_get_all,
		one: sharing_get_one,
	},
	create: sharings_create,
	update: sharings_update,
	delete: sharings_delete,
};
