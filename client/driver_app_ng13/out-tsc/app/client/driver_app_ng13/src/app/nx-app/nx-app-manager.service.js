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
let NxAppManagerService = class NxAppManagerService {
    constructor(socket, nxEvents) {
        this.socket = socket;
        this.nxEvents = nxEvents;
        this.prevData = "";
        this.isLoggedIn = false;
        this.haveActiveOrder = false;
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
            var _a, _b;
            switch (value.eventType) {
                case NxEvent.SelectrCar:
                    this.nxEvents.pushNewEvent(NxEvent.GetSessionOrders);
                    break;
                case NxEvent.ActiveOrders:
                    let activeOrders = (_a = value.eventData) === null || _a === void 0 ? void 0 : _a.orders;
                    if (Array.isArray(activeOrders) && activeOrders.length > 0) {
                        this.newOrder.next({
                            active: true,
                            orderData: activeOrders[0]
                        });
                        console.log("****** ORDERS :::", (_b = value.eventData) === null || _b === void 0 ? void 0 : _b.orders);
                        this.haveActiveOrder = true;
                    }
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
        }
        console.log("****** DRIVER UPDATE ::::", data);
        this.nxEvents.pushNewEvent(NxEvent.DriverUpdate, data);
        if (this.firstEvent) {
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
                    this.newOrder.next({
                        active: false,
                        orderData: order
                    });
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
NxAppManagerService = __decorate([
    Injectable({ providedIn: "root" }),
    __metadata("design:paramtypes", [SocketService,
        NxEventService])
], NxAppManagerService);
export { NxAppManagerService };
