export const createLogo = (email: string | undefined) => {
	return email && email[0].toUpperCase();
}