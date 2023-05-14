import { type ID } from 'types';
import { type User, type UserPosition } from 'types/user';

export interface GetUsersResponse {
	success: boolean;
	total_pages: number;
	total_users: number;
	count: number;
	page: number;
	links: {
		next_url: string | null;
		prev_url: string | null;
	};
	users: User[];
}

export interface GetUserPositionsResponse {
	success: boolean;
	positions: UserPosition[];
}

export interface CreateUserResponse {
	success: boolean;
	user_id: number;
	message: string;
}

export interface CreateUserBody {
	name: string;
	email: string;
	phone: string;
	position_id: ID;
	photo: File;
}
