/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import axios               from 'axios';
import { AxiosInstance }   from 'axios';
import { AxiosPromise }    from 'axios';
import { Observable }      from 'rxjs';
import { injectable }      from "tsyringe";
import { ICmRxHttpClient } from "./cm-http-common";
import { HttpMethod }      from "./cm-http-common";
import { ICmHttpConfig }   from "./cm-http-common";
import { IRequestArgs }    from "./cm-http-common";

export class RxAxios {
	private httpClient: AxiosInstance;

	constructor(private options: ICmHttpConfig = {}) {
		this.httpClient = axios.create(options);
	}

	private _doReq<T>(args: IRequestArgs): Observable<T> {
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

		return new Observable<T>(subscriber => {
			request
				.then(response => {
					subscriber.next(response.data);
				})
				.catch((err: Error) => {
					subscriber.error(err);
				})
				.finally(() => {
					subscriber.complete();
				});
		});
	}

	public get<T>(url: string, queryParams?: object): Observable<T> {
		return this._doReq<T>({ method: HttpMethod.GET, url, queryParams });
	}

	public post<T>(url: string, payload: object): Observable<T> {
		return this._doReq<T>({
								  method: HttpMethod.POST,
								  url,
								  payload,
							  });
	}

	public put<T>(url: string, payload: object): Observable<T> {
		return this._doReq<T>({
								  method: HttpMethod.PUT,
								  url,
								  payload,
							  });
	}

	public patch<T>(url: string, payload: object): Observable<T> {
		return this._doReq<T>({
								  method: HttpMethod.PATCH,
								  url,
								  payload,
							  });
	}

	public delete<T>(url: string): Observable<T> {
		return this._doReq<T>({
								  method: HttpMethod.DELETE,
								  url,
							  });
	}
}

@injectable()
export class CmHttpClient extends RxAxios implements ICmRxHttpClient {
	constructor(config: ICmHttpConfig = {}) {
		super();
	}
}
