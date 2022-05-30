/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { ApiClientService } from "@core/services/api-client.service";
import { SocketService } from "@core/services/socket.service";
import { NxEvent } from "@nxApp/events/nx-event.service";
import { NxEventService } from "@nxApp/events/nx-event.service";
import { MsgType } from "@shared/messages/message-types";
import { generateTag } from "@utils/tag-generator";
import { filter } from "rxjs/operators";
import { ApiFactory } from "./api-factory";
export var OrderAction;
(function (OrderAction) {
    OrderAction[OrderAction["Accept"] = 0] = "Accept";
    OrderAction[OrderAction["Deny"] = 1] = "Deny";
    OrderAction[OrderAction["Complete"] = 2] = "Complete";
    OrderAction[OrderAction["CustomerNoShow"] = 3] = "CustomerNoShow";
    OrderAction[OrderAction["CantDeliver"] = 4] = "CantDeliver";
})(OrderAction || (OrderAction = {}));
let OrderApiService = class OrderApiService {
    constructor(nxEvents, messageFactory, socketService, apiClient) {
        this.nxEvents = nxEvents;
        this.messageFactory = messageFactory;
        this.socketService = socketService;
        this.apiClient = apiClient;
        nxEvents.onNewEvent().subscribe((value) => {
            switch (value.eventType) {
                case NxEvent.GetSessionOrders:
                    this.getActiveOrdersBySession().subscribe(value => {
                        let data = value.data;
                        if (data.success && (data === null || data === void 0 ? void 0 : data.data)) {
                            nxEvents.pushNewEvent(NxEvent.ActiveOrders, data.data);
                        }
                    });
                    break;
            }
        });
    }
    getOrders() {
        let msg = this.messageFactory.simpleMessage(MsgType.GetOrdersBySession);
        return this.socketService.sendMessage(msg);
    }
    getActiveOrdersBySession() {
        let msg = {
            type: MsgType.GetOrdersBySession,
        };
        const tag = generateTag();
        const res = this.socketService.cmStream.pipe(filter((value) => {
            return value.type === MsgType.GetOrdersBySession;
        }));
        this.socketService.sendMessage(msg, tag);
        return res;
    }
    acceptOrder(orderId, source = "MARKET") {
        let msg = {
            type: MsgType.AcceptOrder,
            data: {
                id: orderId,
                source: source
            }
        };
        console.log("\n\n ACCEPT ORDEAR :::", msg);
        const tag = generateTag();
        const res = this.socketService.cmStream.pipe(filter((value) => {
            return value.type === MsgType.AcceptOrder;
        }));
        this.socketService.sendMessage(msg, tag);
        return res;
    }
    completeOrder(orderId, forceFinish) {
        let msg = this.messageFactory.simpleMessage(MsgType.CompleteOrder, {
            id: orderId,
            driverForceFinish: forceFinish ? 1 : 0
        });
        return this.socketService.sendMessage(msg);
    }
    cantDeliver(orderId) {
        return this.socketService.sendMessage({ type: MsgType.CantCompleteOrder, data: null });
    }
    customerNoShow(orderId) {
        return this.socketService.sendMessage({ type: MsgType.CustomerNoShow, data: null });
    }
    denyOrder(orderId) {
        return this.socketService.sendMessage({ type: MsgType.DenyOrder, data: null });
    }
};
OrderApiService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [NxEventService,
        ApiFactory,
        SocketService,
        ApiClientService])
], OrderApiService);
export { OrderApiService };
