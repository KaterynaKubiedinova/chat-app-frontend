export interface User {
	id?: string,
	email: string,
	name: string,
	surname: string
}

export interface UserRegister extends User {
	password: string
}

export interface UserLogin {
	email: string,
	password: string
}

export interface AuthState {
	user: User | null,
}