import { __decorate, __metadata } from "tslib";
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 *
 * @Desc:
 * Main logic for the TaxiJakt Application, it´s mostly here
 * all the weird PHP stuff that originates from the current solution
 * is handled, muted and felt sorry for,,,
 *
 */
import { Injectable } from '@angular/core';
import { NxEvent } from "@nxApp/events/nx-event.service";
import { NxEventService } from "@nxApp/events/nx-event.service";
let NxAppService = class NxAppService {
    constructor(nxEvents) {
        this.nxEvents = nxEvents;
        this.name = "NxAppService";
        this.tickCount = 0;
        nxEvents.registerEventListener(this);
        this.heartMonitor = setInterval(() => {
            this.heartBeat();
        }, 6000);
    }
    onEvent(event) {
        switch (event.eventType) {
            case NxEvent.DriverLogin:
                console.log("DRIVER LOGIN EVNT ::", event.eventData);
                this.driverData = event.eventData;
                break;
        }
    }
    gpsError(error) {
    }
    heartBeat() {
        this.tickCount++;
        this.nxEvents.pushEvent({ eventType: NxEvent.Heartbeat });
    }
};
NxAppService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [NxEventService])
], NxAppService);
export { NxAppService };
