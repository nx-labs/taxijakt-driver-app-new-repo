/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __decorate, __metadata } from "tslib";
import { Input } from "@angular/core";
import { Component } from '@angular/core';
import { NxEvent } from "@nxApp/events/nx-event.service";
import { NxEventService } from "@nxApp/events/nx-event.service";
import { NxAppService } from "@nxApp/services/nx-app.service";
let NxHeaderComponent = class NxHeaderComponent {
    constructor(nxEvents, appService) {
        this.nxEvents = nxEvents;
        this.appService = appService;
        this.nxHeaderClass = "std";
        this.showWarning = false;
        this.driverActive = false;
        nxEvents.onNewEvent().subscribe((value) => {
            switch (value.eventType) {
                case NxEvent.DriverUpdate:
                    let driverData = value.eventData;
                    this.points = driverData.info.points;
                    this.membership = driverData.info.mode.is_basic ? "BASIC" : "PRO";
                    break;
            }
        });
    }
    ngOnInit() { }
    hideWarning(value) {
        this.showWarning = false;
        return true;
    }
    warningVisible() {
        return this.showWarning;
    }
    showGpsWarning() {
        this.showWarning = true;
        return true;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], NxHeaderComponent.prototype, "driverActive", void 0);
NxHeaderComponent = __decorate([
    Component({
        selector: 'nx-header',
        templateUrl: './nx-header.component.html',
        styleUrls: ['./nx-header.component.scss'],
    }),
    __metadata("design:paramtypes", [NxEventService,
        NxAppService])
], NxHeaderComponent);
export { NxHeaderComponent };
