/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { AxiosPromise }       from "axios";
import { AxiosRequestConfig } from "axios";
import { Observable }         from "rxjs";

export interface ICmHttpConfig extends AxiosRequestConfig {}

export interface ICmHttpClient {
	get<T>(url: any): AxiosPromise<T>;
	post<T>(url: string, payload: object): AxiosPromise<T>;
	put<T>(url: string, payload: object): AxiosPromise<T>;
	patch<T>(url: string, payload: object): AxiosPromise<T>;
	delete<T>(url: string): AxiosPromise<T>;
}

export interface ICmRxHttpClient {
	get<T>(url: string, queryParams?: object): Observable<T>;
	post<T>(url: string, payload: object): Observable<T>;
	put<T>(url: string, payload: object): Observable<T>;
	patch<T>(url: string, payload: object): Observable<T>;
	delete<T>(url: string): Observable<T>;
}

export interface ICmHttpApiClientOpt  extends ICmHttpConfig {
	debugMode?: boolean
}

export interface IRequestArgs {
	method: HttpMethod;
	url: string;
	queryParams?: object;
	payload?: object;
}

export enum HttpMethod {
	GET    = 'GET',
	POST   = 'POST',
	PUT    = 'PUT',
	PATCH  = 'PATCH',
	DELETE = 'DELETE',
}
