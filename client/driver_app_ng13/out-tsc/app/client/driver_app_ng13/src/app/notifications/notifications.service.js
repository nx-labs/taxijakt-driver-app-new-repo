import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
let NotificationsService = class NotificationsService {
    constructor(http) {
        this.http = http;
    }
    getData() {
        return this.http.get('./assets/sample-data/notifications.json');
    }
};
NotificationsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpClient])
], NotificationsService);
export { NotificationsService };
