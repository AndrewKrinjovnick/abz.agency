export const getNumbers = (phone: string): string => {
	return phone.replace(/\D/g, '');
};
