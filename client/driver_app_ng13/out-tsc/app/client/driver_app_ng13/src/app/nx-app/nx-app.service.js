/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable } from "@angular/core";
import { SocketService } from "@core/services/socket.service";
import { NxEvent } from "@nxApp/events/nx-event.service";
import { NxEventService } from "@nxApp/events/nx-event.service";
import { DriverStatus } from "@shared/driver/driver-status";
import { Subject } from "rxjs";
import { MsgType } from "../shared/messages/message-types";
export var UpdateType;
(function (UpdateType) {
    UpdateType[UpdateType["NotSet"] = 0] = "NotSet";
    UpdateType[UpdateType["Driver"] = 1] = "Driver";
    UpdateType[UpdateType["Orders"] = 2] = "Orders";
    UpdateType[UpdateType["Status"] = 3] = "Status";
})(UpdateType || (UpdateType = {}));
let NxAppService = class NxAppService {
    constructor(socket, nxEvents) {
        this.socket = socket;
        this.nxEvents = nxEvents;
        this.prevData = "";
        this.isLoggedIn = false;
        this.driverStatus = new DriverStatus();
        this.data = null;
        this.dataUpdated = new Subject();
        this.newOrder = new Subject();
        this.OnDataUpdate = this.dataUpdated.asObservable();
        this.OnNewOrder = this.newOrder.asObservable();
        this.messages = Array();
        this.marketOrders = Array();
        this.availableOrders = Array();
        this.mutedOrderIds = new Array();
        this.firstEvent = true;
        socket.dataStream.subscribe((msg) => {
            if (msg.type === MsgType.DriverUpdate && msg.data !== null) {
                this.handleResponseUpdate(msg.data);
            }
        });
        nxEvents.onNewEvent().subscribe((value) => {
            switch (value.eventType) {
                case NxEvent.SelectrCar:
                    break;
            }
        });
    }
    handleResponseUpdate(data) {
        const dataStr = JSON.stringify(data);
        if (dataStr !== this.prevData) {
            this.prevData = dataStr;
        }
        else {
            return;
        }
        console.log("****** DRIVER UPDATE ::::", data);
        this.nxEvents.pushNewEvent(NxEvent.DriverUpdate, data);
        if (this.firstEvent) {
            console.log("THI.DATA ::", this.data);
            this.firstEvent = false;
        }
        this.data = JSON.parse(JSON.stringify(data));
        if (Array.isArray(data.messages)) {
            this.messages = data.messages;
        }
        this.handleAvailOrders(data.availOrders);
        /*

        this.driver         = data.driverEntry;
        this.driverInfo     = data.info;
        this.driverData     = data.driverEntry.data;
        this.fullDriverData = data.driverEntry.data.data;
        */
        if (this.data !== null) {
            this.doDataChange(UpdateType.Driver, this.data);
        }
    }
    handleAvailOrders(orders) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("GANDLRE AVAIL ORDER ::", orders);
            if (!orders || !Array.isArray(orders) || orders.length < 1)
                return;
            for (let order of orders) {
                if (this.mutedOrderIds.indexOf(order.id) === -1) {
                    this.newOrder.next(order);
                    break;
                }
            }
        });
    }
    doDataChange(updateType, data) {
        let event = {
            type: updateType,
            data: data
        };
        this.dataUpdated.next(event);
    }
};
NxAppService = __decorate([
    Injectable({ providedIn: "root" }),
    __metadata("design:paramtypes", [SocketService,
        NxEventService])
], NxAppService);
export { NxAppService };
