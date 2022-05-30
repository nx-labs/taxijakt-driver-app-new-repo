/**
 * Copyright (c) 2019 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
let LoggingService = class LoggingService {
    constructor() { }
    debug(...data) {
    }
    error(...data) {
    }
    serverError(...data) {
    }
};
LoggingService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [])
], LoggingService);
export { LoggingService };
