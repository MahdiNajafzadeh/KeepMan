import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function friends_get(username: string): Promise<ModelRespose> {
	try {
		const friends = await prisma.friends.findMany({
			where: {
				OR: [
					{
						sender: {
							username: username,
						},
					},
					{
						receiver: {
							username: username,
						},
					},
				],
			},
			select: {
				id: true,
				sender: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						username: true,
					},
				},
				receiver: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						username: true,
					},
				},
				status: true,
			},
		});
		return {
			success: true,
			from: "friends.get",
			data: friends,
		};
	} catch (error) {
		return {
			success: false,
			from: "friends.get",
			error,
		};
	}
}

async function friends_create(senderId: number, receiverId: number): Promise<ModelRespose> {
	try {
		const friends = await prisma.friends.create({
			data: {
				senderId: senderId,
				receiverId: receiverId,
			},
			select: {
				id: true,
				sender: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						username: true,
					},
				},
				receiver: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						username: true,
					},
				},
				status: true,
			},
		});
		return {
			success: true,
			from: "friends.create",
			data: friends,
		};
	} catch (error) {
		return {
			success: false,
			from: "friends.create",
			error,
		};
	}
}

async function friends_exist(senderId: number, receiverId: number): Promise<ModelRespose> {
	try {
		const friendship = await prisma.friends.findFirst({
			where: {
				OR: [
					{ senderId, receiverId },
					{ senderId: receiverId, receiverId: senderId  }
				],
			},
		});
		return {
			success: true,
			from: "friends.exist",
			exist: Boolean(friendship),
		};
	} catch (error) {
		return {
			success: false,
			from: "friends.exist",
			error,
		};
	}
}

async function friends_update(
	senderId: number,
	receiverId: number,
	status: string
): Promise<ModelRespose> {
	try {
		let friendship = await prisma.friends.findFirst({
			where: {
				senderId,
				receiverId,
			},
		});

		friendship = await prisma.friends.update({
			where: {
				id: friendship?.id,
			},
			data: {
				status,
			},
		});
		return {
			success: true,
			from: "friends.update",
			data: friendship,
		};
	} catch (error) {
		return {
			success: false,
			from: "friends.update",
			error,
		};
	}
}

async function friends_delete(senderId: number, receiverId: number): Promise<ModelRespose> {
	try {
		let friendship = await prisma.friends.findFirst({
			where: {
				OR: [
					{ senderId, receiverId },
					{ senderId: receiverId, receiverId: senderId },
				],
			},
		});

		friendship = await prisma.friends.delete({
			where: {
				id: friendship?.id,
			},
		});
		return {
			success: true,
			from: "friends.delete",
			data: friendship,
		};
	} catch (error) {
		return {
			success: false,
			from: "friends.delete",
			error,
		};
	}
}

export default {
	get: friends_get,
	create: friends_create,
	exist: friends_exist,
	update: friends_update,
	delete: friends_delete,
};
