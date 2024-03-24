import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

interface ModelRespose {
	success: boolean;
	from: string;
	exist?: boolean;
	data?: any;
	error?: any;
}

async function user_exist_by_username(username: string): Promise<ModelRespose> {
	try {
		const user = await prisma.users.findUnique({
			where: {
				username,
			},
		});
		return {
			success: true,
			from: "user.exist.by.username",
			exist: Boolean(user),
		};
	} catch (error) {
		return {
			success: false,
			from: "user.exist.by.username",
			error,
		};
	}
}

async function user_exist_by_email(email: string): Promise<ModelRespose> {
	try {
		const user = await prisma.users.findUnique({
			where: {
				email,
			},
		});
		return {
			success: true,
			from: "user.exist.by.email",
			exist: Boolean(user),
		};
	} catch (error) {
		return {
			success: false,
			from: "user.exist.by.email",
			error,
		};
	}
}

async function user_exist_by_id(id: number): Promise<ModelRespose> {
	try {
		const user = await prisma.users.findUnique({
			where: {
				id,
			},
		});
		return {
			success: true,
			from: "user.exist.by.id",
			exist: Boolean(user),
		};
	} catch (error) {
		return {
			success: false,
			from: "user.exist.by.id",
			error,
		};
	}
}

interface UserExitByAllArgs {
	id?: number;
	username?: string;
	email?: string;
}

async function user_exist_by_all(data: UserExitByAllArgs): Promise<ModelRespose> {
	try {
		const results = await Promise.all([
			data.id ? user_exist_by_id(data.id) : { success: true, exist: false },
			data.email ? user_exist_by_email(data.email) : { success: true, exist: false },
			data.username ? user_exist_by_username(data.username) : { success: true, exist: false },
		]);
		return {
			success: true,
			from: "user.exist.by.all",
			exist: Boolean(results.some((result) => result.exist)),
		};
	} catch (error) {
		return {
			success: false,
			from: "user.exist.by.all",
			error,
		};
	}
}

async function user_create(data: Prisma.UsersCreateInput): Promise<ModelRespose> {
	try {
		const user = prisma.users.create({
			data,
		});
		return {
			success: true,
			from: "user.create",
			data: user,
		};
	} catch (error) {
		return {
			success: false,
			from: "user.create",
			error,
		};
	}
}

export default {
	exist: {
		by: {
			id: user_exist_by_id,
			email: user_exist_by_email,
			username: user_exist_by_username,
			all: user_exist_by_all,
		},
	},
	create: user_create,
};
