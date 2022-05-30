import axios             from 'axios';
import { AxiosInstance } from 'axios';
import { AxiosPromise }  from 'axios';
import { HttpMethod }    from "./cm-http-common";
import { IRequestArgs }  from "./cm-http-common";
import { ICmHttpConfig } from "./cm-http-common";

export class RxAxios {
	private httpClient: AxiosInstance;

	constructor(options: ICmHttpConfig = {}) {
		this.httpClient = axios.create(options);
	}

	private doRequest<T>(args: IRequestArgs): AxiosPromise<T> {
		const { method, url, queryParams, payload } = args;
		let request: AxiosPromise<T>;

		switch (method) {
			case HttpMethod.GET:
				request = this.httpClient.get<T>(url, { params: queryParams });
				break;
			case HttpMethod.POST:
				request = this.httpClient.post<T>(url, payload);
				break;
			case HttpMethod.PUT:
				request = this.httpClient.put<T>(url, payload);
				break;
			case HttpMethod.PATCH:
				request = this.httpClient.patch<T>(url, payload);
				break;
			case HttpMethod.DELETE:
				request = this.httpClient.delete<T>(url);
				break;
		}

		return request;
	}

	public get<T>(url: string, queryParams?: object): AxiosPromise<T> {
		return this.doRequest<T>({ method: HttpMethod.GET, url, queryParams });
	}

	public post<T>(url: string, payload: object): AxiosPromise<T> {
		return this.doRequest<T>({
									 method: HttpMethod.POST,
									 url,
									 payload,
								 });
	}

	public put<T>(url: string, payload: object): AxiosPromise<T> {
		return this.doRequest<T>({
									 method: HttpMethod.PUT,
									 url,
									 payload,
								 });
	}

	public patch<T>(url: string, payload: object): AxiosPromise<T> {
		return this.doRequest<T>({
									 method: HttpMethod.PATCH,
									 url,
									 payload,
								 });
	}

	public delete<T>(url: string): AxiosPromise<T> {
		return this.doRequest<T>({
									 method: HttpMethod.DELETE,
									 url,
								 });
	}
}
