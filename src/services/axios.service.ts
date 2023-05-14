import axios, {
	AxiosError,
	type AxiosHeaders,
	type AxiosInstance,
	type AxiosRequestConfig,
} from 'axios';
import { BASE_URL } from 'config/api';
import Cookies from 'js-cookie';
import { type GetTokenResponse, type HTTPClient } from './types';

export class AxiosClient implements HTTPClient<AxiosRequestConfig> {
	public instance: AxiosInstance;

	constructor(baseURL: string, headers?: AxiosHeaders) {
		const newHeaders = headers ?? {};
		this.instance = axios.create({
			baseURL,
			headers: newHeaders,
		});

		this.instance.interceptors.request.use(config => {
			const token = Cookies.get('token');

			if (config.headers && token) {
				config.headers.Token = token;
			}

			return config;
		});

		this.instance.interceptors.response.use(
			config => config,
			async error => {
				const originRequest = error.config;

				if (error.response.status === 401 && !originRequest._isRetry) {
					originRequest._isRetry = true;

					try {
						const { data } = await axios.get<GetTokenResponse>(`${BASE_URL}/token`);
						Cookies.set('token', data.token);
						return await this.instance.request(originRequest);
					} catch (error) {
						Cookies.remove('token');
					}
				}

				throw error;
			}
		);
	}

	async get<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
		try {
			const { data } = await this.instance({
				method: 'GET',
				url,
				...options,
			});

			return data;
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err.response?.data.message);
			}

			throw err;
		}
	}

	async post<T, K>(url: string, body: K, options?: AxiosRequestConfig): Promise<T> {
		try {
			const { data } = await this.instance({
				method: 'POST',
				url,
				data: body,
				...options,
			});

			return data;
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err.response?.data.message);
			}

			throw err;
		}
	}
}
