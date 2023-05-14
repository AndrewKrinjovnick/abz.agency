export interface HTTPClient<O> {
	get: <T>(url: string, options?: O) => Promise<T>;
	post: <T, K>(url: string, data: K, options?: O) => Promise<T>;
}

export interface GetTokenResponse {
	success: boolean;
	token: string;
}
