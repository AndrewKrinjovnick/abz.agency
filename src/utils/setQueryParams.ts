import { type Params } from 'types';

export const setQueryParams = (params: Params): URLSearchParams => {
	const newParams = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		newParams.append(key, value.toString());
	});

	return newParams;
};
