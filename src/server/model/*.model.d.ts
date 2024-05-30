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
