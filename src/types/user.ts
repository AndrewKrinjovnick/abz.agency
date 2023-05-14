import { type ID } from 'types';

export interface User {
	id: ID;
	name: string;
	email: string;
	phone: string;
	position: string;
	position_id: ID;
	registration_timestamp: number;
	photo: string;
}

export interface UserPosition {
	id: ID;
	name: string;
}
