import { type AxiosHeaders, type AxiosRequestConfig } from 'axios';
import { BASE_URL } from 'config/api';
import { AxiosClient } from './axios.service';
import { type HTTPClient } from './types';

export class HttpClient<K, O, T extends HTTPClient<O>> {
	public instance: T;

	constructor(
		Client: new (baseUrl: string, headers: K | undefined) => T,
		baseUrl: string,
		headers?: K
	) {
		this.instance = new Client(baseUrl, headers);
	}

	async get<R>(url: string, options?: O): Promise<R> {
		return await this.instance.get<R>(url, options);
	}

	async post<R, B>(url: string, body: B, options?: O): Promise<R> {
		return await this.instance.post(url, body, options);
	}
}

export const http = new HttpClient<
	AxiosHeaders,
	AxiosRequestConfig,
	InstanceType<typeof AxiosClient>
>(AxiosClient, BASE_URL);
