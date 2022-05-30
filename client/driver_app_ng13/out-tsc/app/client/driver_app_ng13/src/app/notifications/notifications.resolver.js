import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { NotificationsService } from './notifications.service';
let NotificationsResolver = class NotificationsResolver {
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    resolve() {
        // Base Observable (where we get data from)
        const dataObservable = this.notificationsService.getData();
        return { source: dataObservable };
    }
};
NotificationsResolver = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NotificationsService])
], NotificationsResolver);
export { NotificationsResolver };
