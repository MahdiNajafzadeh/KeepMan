import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

interface ModelRespose {
	success: boolean;
	from: string;
	exist?: boolean;
	data?: any;
	error?: any;
}

interface AuthValidateByUsernameBody {
	username: string;
	password: string;
}

interface AuthValidateByIdBody {
	id: number;
	password: string;
}

interface AuthChangePasswordBody {
	id: number;
	password: string;
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
		const user = await prisma.users.create({
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

const user_auth_validate_by_username = async (
	data: AuthValidateByUsernameBody
): Promise<ModelRespose> => {
	try {
		const user = await prisma.users.findFirst({
			where: data,
		});
		return {
			success: true,
			from: "user.auth",
			data: user,
		};
	} catch (error) {
		return {
			success: false,
			from: "user.auth",
			error,
		};
	}
};

const user_auth_validate_by_id = async (data: AuthValidateByIdBody): Promise<ModelRespose> => {
	try {
		const user = await prisma.users.findFirst({
			where: data,
		});
		return {
			success: true,
			from: "user.auth",
			data: user,
		};
	} catch (error) {
		return {
			success: false,
			from: "user.auth",
			error,
		};
	}
};

const user_auth_changePassword = async (data: AuthChangePasswordBody): Promise<ModelRespose> => {
	try {
		console.log(data);

		const user = await prisma.users.update({
			where: {
				id: data.id,
			},
			data: {
				password: data.password,
			},
		});
		return {
			success: true,
			from: "user.auth.changePassword",
			data: user,
		};
	} catch (error) {
		return {
			success: false,
			from: "user.auth.changePassword",
			error,
		};
	}
};

async function user_get_by_id(id: number): Promise<ModelRespose> {
	try {
		const user = await prisma.users.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				firstName: true,
				lastName: true,
				username: true,
				email: true,
			},
		});
		return {
			success: true,
			from: "user.get.by.id",
			data: user,
		};
	} catch (error) {
		return {
			success: false,
			from: "user.get.by.id",
			error,
		};
	}
}

async function user_get_by_username(username: string): Promise<ModelRespose> {
	try {
		const user = await prisma.users.findUnique({
			where: {
				username,
			},
			select: {
				id: true,
				firstName: true,
				lastName: true,
				username: true,
				email: true,
			},
		});
		return {
			success: true,
			from: "user.get.by.username",
			data: user,
		};
	} catch (error) {
		return {
			success: false,
			from: "user.get.by.username",
			error,
		};
	}
}

async function user_get_by_email(email: string): Promise<ModelRespose> {
	try {
		const user = await prisma.users.findUnique({
			where: {
				email,
			},
			select: {
				id: true,
				firstName: true,
				lastName: true,
				username: true,
				email: true,
			},
		});
		return {
			success: true,
			from: "user.get.by.email",
			data: user,
		};
	} catch (error) {
		return {
			success: false,
			from: "user.get.by.email",
			error,
		};
	}
}

async function user_update_by_id(id: number, data: Prisma.UsersUpdateInput): Promise<ModelRespose> {
	try {
		const user = await prisma.users.update({
			where: {
				id,
			},
			data: data,
			select: {
				id: true,
				firstName: true,
				lastName: true,
				username: true,
				email: true,
			},
		});
		return {
			success: true,
			from: "user.get.by.id",
			data: user,
		};
	} catch (error) {
		return {
			success: false,
			from: "user.get.by.id",
			error,
		};
	}
}

async function user_update_by_username(
	username: string,
	data: Prisma.UsersUpdateInput
): Promise<ModelRespose> {
	try {
		const user = await prisma.users.update({
			where: {
				username,
			},
			data: data,
		});
		return {
			success: true,
			from: "user.get.by.username",
			data: user,
		};
	} catch (error) {
		return {
			success: false,
			from: "user.get.by.username",
			error,
		};
	}
}

async function user_update_by_email(
	email: string,
	data: Prisma.UsersUpdateInput
): Promise<ModelRespose> {
	try {
		const user = await prisma.users.update({
			where: {
				email,
			},
			data: data,
		});
		return {
			success: true,
			from: "user.get.by.email",
			data: user,
		};
	} catch (error) {
		return {
			success: false,
			from: "user.get.by.email",
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
	auth: {
		validate: {
			by: {
				id: user_auth_validate_by_id,
				username: user_auth_validate_by_username,
			},
		},
		changePassword: user_auth_changePassword,
	},
	get: {
		by: {
			id: user_get_by_id,
			username: user_get_by_username,
			email: user_get_by_email,
		},
	},
	update: {
		by: {
			id: user_update_by_id,
			username: user_update_by_username,
			email: user_update_by_email,
		},
	},
};
