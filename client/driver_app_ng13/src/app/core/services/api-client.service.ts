/**
 * Copyright (c) 2019 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 *
 * This file is part of the TZ project
 */

import { Injectable }     from '@angular/core';
import { HttpClient }     from '@angular/common/http';
import { of }             from "rxjs";
import { Observable }     from "rxjs";
import { catchError }     from "rxjs/operators";
import { tap }            from "rxjs/operators";
import { environment }    from "../../../environments/environment";
import { LoggingService } from "./logging.service";

@Injectable(
	{
		providedIn: 'root'
	})
export class ApiClientService {
	baseUrl: string        = environment.apiEndpoint;
	public httpGetOptions  = { withCredentials: true };
	public httpPostOptions = { withCredentials: true };

	constructor(
		private logger: LoggingService,
		private httpClient: HttpClient
	) { }

	public postData<Type>(payload: any): Observable<Type[]> {
		const _funcName = 'ApiClientService::postData';
		return this.httpClient.post<Type[]>(`${ environment.webSocketUrl }`, payload, this.httpPostOptions).pipe(
			tap(data => {
					this.logger.debug(`${_funcName}`, 'data', data);
				},
				error => {
					this.logger.error(_funcName, error);
				}
			),
			catchError(this.handleError(_funcName, payload))
		);
	}

	public handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			this.logger.error(error);
			this.logger.serverError('Error ::', error);
			this.logger.error(`${ operation } failed: ${ error.message }`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}
