import { http } from 'services/http.service';
import { type Params } from 'types';
import { setQueryParams } from 'utils/setQueryParams';
import {
	type CreateUserResponse,
	type GetUserPositionsResponse,
	type GetUsersResponse,
} from './user.service.types';

export const UserService = {
	async getUsers(params: Params = { page: 1, count: 6 }) {
		return await http.get<GetUsersResponse>('/users', {
			params: setQueryParams(params),
		});
	},

	async getUserPositions() {
		return await http.get<GetUserPositionsResponse>('/positions');
	},

	async createUser(body: FormData) {
		return await http.post<CreateUserResponse, FormData>('users', body);
	},
};
