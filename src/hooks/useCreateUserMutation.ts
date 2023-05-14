import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { UserService } from 'services/user-service/user.service';
import { type CreateUserResponse } from 'services/user-service/user.service.types';
import { type User } from 'types/user';

export const useCreateUserMutation = (): UseMutationResult<
	CreateUserResponse,
	AxiosError,
	FormData
> => {
	const queryClient = useQueryClient();

	return useMutation<CreateUserResponse, AxiosError, FormData>({
		mutationFn: UserService.createUser,
		onSuccess: async () => {
			queryClient.setQueryData<{ pages: User[]; pageParams: number[] }>(['users'], prevData => {
				if (prevData) {
					return { ...prevData, pages: [prevData.pages[0]] };
				}
			});
			queryClient.invalidateQueries(['users']);
		},
	});
};
