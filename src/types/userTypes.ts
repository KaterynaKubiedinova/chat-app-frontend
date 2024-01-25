export interface User {
	email: string,
	name: string,
	surname: string
}

export interface UserDTO extends User {
	id: string,
};

type Password = string;

export interface UserRegister extends User {
	password: Password,
};

export type AuthState =  {
	user: UserDTO | null,
}