/**
 * Copyright (c) 2019 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 *
 * This file is part of the TZ project
 */
import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { LoggingService } from "./logging.service";
let ApiClientService = class ApiClientService {
    constructor(logger, httpClient) {
        this.logger = logger;
        this.httpClient = httpClient;
        this.baseUrl = environment.apiEndpoint;
        this.httpGetOptions = { withCredentials: true };
        this.httpPostOptions = { withCredentials: true };
    }
    postData(payload) {
        const _funcName = 'ApiClientService::postData';
        return this.httpClient.post(`${environment.webSocketUrl}`, payload, this.httpPostOptions).pipe(tap(data => {
            this.logger.debug(`${_funcName}`, 'data', data);
        }, error => {
            this.logger.error(_funcName, error);
        }), catchError(this.handleError(_funcName, payload)));
    }
    handleError(operation = 'operation', result) {
        return (error) => {
            this.logger.error(error);
            this.logger.serverError('Error ::', error);
            this.logger.error(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(result);
        };
    }
};
ApiClientService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [LoggingService,
        HttpClient])
], ApiClientService);
export { ApiClientService };
