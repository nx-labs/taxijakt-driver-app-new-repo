/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { AxiosResponse }       from "axios";
import axios                   from "axios";
import { AxiosPromise }        from "axios";
import { AxiosInstance }       from "axios";
import { injectable }          from "tsyringe";
import { ICmHttpApiClientOpt } from "./cm-http-common";
import { ICmHttpClient }       from "./cm-http-common";
import { HttpMethod }          from "./cm-http-common";
import { IRequestArgs }        from "./cm-http-common";


export interface CmHttpPromise<IApiResponse> extends AxiosPromise {}

@injectable()
export class CmPromiseHttpClient implements ICmHttpClient {
	protected baseHttpClient: AxiosInstance;

	constructor(options: ICmHttpApiClientOpt = {}) {
		this.baseHttpClient = axios.create(options);
		this.baseHttpClient.defaults.withCredentials = true;
	}

	protected request<T>(args: IRequestArgs): CmHttpPromise<T> {
		const { method, url, queryParams, payload } = args;
		const  config = {
			headers: { 'User-Agent': 'CmServer' }
		};

		let request: CmHttpPromise<T>;
		switch (method) {
			case HttpMethod.GET:
				request = this.baseHttpClient.get<T>(url, { params: queryParams, headers: config.headers });
				break;
			case HttpMethod.POST:
				request = this.baseHttpClient.post<T>(url, payload, config);
				break;
			case HttpMethod.PUT:
				request = this.baseHttpClient.put<T>(url, payload, config);
				break;
			case HttpMethod.PATCH:
				request = this.baseHttpClient.patch<T>(url, payload, config);
				break;
			case HttpMethod.DELETE:
				request = this.baseHttpClient.delete<T>(url, config);
				break;
		}

		return request;
	}

	public get<T>(url: string, queryParams?: any): CmHttpPromise<T> {
		return this.request<T>({ method: HttpMethod.GET, url, queryParams });
	}

	public post<T>(url: string, payload?: any): CmHttpPromise<T> {
		return this.request<T>({ method: HttpMethod.POST, url, payload });
	}

	public patch<T>(url: string, payload: object): CmHttpPromise<T> {
		return this.request<T>({
								  method: HttpMethod.PATCH,
								  url,
								  payload,
							  });
	}

	public delete<T>(url: string): CmHttpPromise<T> {
		return this.request<T>({
								  method: HttpMethod.DELETE,
								  url,
							  });
	}

	public put<T>(url: string, payload: object): CmHttpPromise<T> {
		return this.request<T>({
								  method: HttpMethod.PUT,
								  url,
							  });

	}
}
