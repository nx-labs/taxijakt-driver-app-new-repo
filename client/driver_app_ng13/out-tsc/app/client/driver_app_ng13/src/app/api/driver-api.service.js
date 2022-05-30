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
import { DriverCarOptions } from "@shared/driver/driver-car-options";
import { MsgType } from "@shared/messages/message-types";
import { generateTag } from "@utils/tag-generator";
import { filter } from "rxjs";
import { ApiFactory } from "@api/api-factory";
let DriverApiService = class DriverApiService {
    constructor(nxEvents, messageFactory, socketService, apiClient) {
        this.nxEvents = nxEvents;
        this.messageFactory = messageFactory;
        this.socketService = socketService;
        this.apiClient = apiClient;
    }
    getDriverStatus(driverId) {
        let msg = this.messageFactory.newUserMessage(MsgType.DriverGetInfo, driverId);
        return this.socketService.emitMessage(msg);
    }
    getDriverOrder(orderId) {
        let msg = this.messageFactory.simpleMessage(MsgType.GetDriverOrder, {
            orderId: orderId
        });
        return this.socketService.sendMessage(msg);
    }
    /**
     * Get a list of cars registered to the driver
     * @param uuid
     * @param {number} driverId
     * @returns {<IMessage>}
     */
    getDriverCars() {
        let msg = {
            type: MsgType.GetCars
        };
        const tag = generateTag();
        const res = this.socketService.cmStream.pipe(filter((value) => {
            const res = value.type === MsgType.GetCars;
            if (res)
                console.log("getDriverCars :: PARSE TAG MESS ::", res, ":::", value);
            return res;
        }));
        this.socketService.sendMessage(msg, tag);
        return res;
    }
    /**
     * Select car
     * @returns {<any>}
     */
    setCurrentCar(options) {
        let msg = {
            type: MsgType.SetCurrentCar,
            data: !options ? new DriverCarOptions().compile() : options.compile()
        };
        const tag = generateTag();
        const res = this.socketService.cmStream.pipe(filter((value) => {
            return value.type === MsgType.SetCurrentCar && value.tag == tag;
        }));
        this.socketService.sendMessage(msg, tag);
        return res;
    }
    authenticate(username, password) {
        let msg = {
            type: MsgType.DriverLogin,
            data: {
                user: username,
                pass: password
            }
        };
        const tag = generateTag();
        const res = this.socketService.cmStream.pipe(filter((value) => {
            const res = value.type === MsgType.DriverLogin && value.tag == tag;
            try {
                if (res) {
                    const apiMessage = value.data;
                    if (apiMessage.success) {
                        this.nxEvents.pushNewEvent(NxEvent.DriverLogin);
                    }
                }
            }
            catch (e) {
                console.error("DriverApiService ::", e);
            }
            return res;
        }));
        this.socketService.sendMessage(msg, tag);
        return res;
    }
};
DriverApiService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [NxEventService,
        ApiFactory,
        SocketService,
        ApiClientService])
], DriverApiService);
export { DriverApiService };
