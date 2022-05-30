/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { ApiClientService } from "@core/services/api-client.service";
import { GeoService } from "@core/services/geo.service";
import { LoggingService } from "@core/services/logging.service";
import { SocketService } from "@core/services/socket.service";
import { StorageService } from "@core/services/storage.service";
import { StorageKeys } from "@nxApp/app.const";
import { Subject } from "rxjs";
import { MsgType } from "../../../shared/messages/message-types";
import { DriverApiService } from "@api/driver-api.service";
import { NxEvent } from "../../events/nx-event.service";
import { NxEventService } from "../../events/nx-event.service";
let DriverService = class DriverService {
    constructor(logger, storage, apiService, nxEvents, socketService, driverApiService, geoService) {
        this.logger = logger;
        this.storage = storage;
        this.apiService = apiService;
        this.nxEvents = nxEvents;
        this.socketService = socketService;
        this.driverApiService = driverApiService;
        this.geoService = geoService;
        this.driverMode = new Subject();
        this.isLoggedIn = false;
        this.bookings = new Map();
        this.firstUpdate = true;
        /*
        socketService.dataStream.subscribe(
            (mess: IMessage | any) => {
                if (mess.type === MsgType.DriverUpdate) {
                    let rawJson = JsonConverter.toString<string>(mess.data);
                    let driverUpdateData = JsonConverter.toType<IDriverUpdateResponse>(rawJson);

                    //console.log("DDDDRIVER UPDATE ::::", mess);

                    let driverData: ITJWebDriver;

                    if ((mess.data && !mess.data?.data) || (!mess.data)) {
                        return;
                    } else {
                        driverData = mess.data.data;

                        if (!driverData.id) {
                            return;
                        }
                    }

                    if (this.firstUpdate) {

                        console.log("driverService :: driverData ::", driverData);

                        let appEventData = {
                            driver: {
                                id: driverData.id,
                                status: driverData.status,
                                points: driverData.points,
                                likes: driverData.likes,
                                dislikes: driverData.dislikes,
                                fullData: driverData,
                        }}

                        nxEvents.pushNewEvent(NxEvent.AppWideData, appEventData);
                    }
                }
            }
        );
        */
        nxEvents.eventStream.subscribe((value) => {
            if (value.eventType === NxEvent.DriverLogin) {
                console.log("STORAGE :: SOCKET MESS ::", value.eventData);
            }
            if (value.eventType !== MsgType.DriverUpdate) {
                //console.log("DriverService :: NxEvent ::", value);
            }
            this.handleEvent(value);
        });
    }
    setDriverBusy() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    pushDriverDataEvent(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.nxEvents.pushNewEvent(NxEvent.DriverData, data);
        });
    }
    triggerStoredData() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.storage.getAs(StorageKeys.DriverData);
            if (!data) {
                console.log("DRIVER SERVICE ::: data MISSING", data);
            }
            else {
                this.pushDriverDataEvent(data);
            }
        });
    }
    /**
     * Driver auth functionality
     * @param {IApiLoginRes} data
     * @returns {Promise<void>}
     */
    driverLogin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data && data.driver && data.driver.id) {
                yield this.storage.set(StorageKeys.DriverData, data.driver);
                let driverId = data.driver.id;
                console.log("driverService :: openDriverStart ::", data);
                this.driverData = data.driver;
                this.driverId = data.driver.id;
                this.session = data.web_session;
                this.cardsIdent = data.cards_identifier;
                this.isLoggedIn = true;
                this.pushDriverDataEvent(data.driver);
            }
        });
    }
    logOut() {
        this.isLoggedIn = false;
        this.driverData = null;
        this.driverId = null;
        this.session = null;
        this.cardsIdent = null;
    }
    getDriverStatus(driverId) {
        this.driverApiService.getDriverStatus(driverId).subscribe(value => {
            console.log("SUBSCRIBED VALUE ::", value);
        });
        this.nxEvents.pushNewEvent(NxEvent.ShowModal);
    }
    /**
     * Push event to open new order modal
     * @param {IBookingEntry} entry
     */
    newOrder(entry) {
        this.nxEvents.pushEvent({
            eventType: NxEvent.NewOrder,
            eventData: entry
        });
    }
    storeOrders(orders) {
        for (let order of orders) {
            if (!this.bookings.get(order.id)) {
                this.bookings.set(order.id, order);
                this.newOrder(order);
            }
        }
    }
    handleEvent(event) {
        if (!this.isLoggedIn)
            return;
        switch (event.eventType) {
            case NxEvent.DriverLogin:
                console.log("DRIVER LOGIN ***", event);
                break;
            case NxEvent.DriverUpdate:
                if (event.eventData.availOrders) {
                    console.log("DriverService :: NxEvent.DriverUpdate ::", event.eventData.availOrders);
                    let orders = event.eventData.availOrders;
                    this.storeOrders(orders);
                    for (let order of orders) {
                        console.log(order.driver_popup_message);
                        break;
                    }
                }
                break;
            case NxEvent.Heartbeat:
                this.geoService.getPosition().then(res => {
                    let data = {
                        lat: res.coords.latitude,
                        lon: res.coords.longitude,
                        accuracy: res.coords.accuracy
                    };
                    this.socketService.sendMessage({
                        type: MsgType.DriverUpdate,
                        data: data
                    });
                }).catch(err => {
                    console.error("geoService.getPosition ::", err);
                });
        }
    }
    /**
     * Read back driver data stored upon login
     * @returns {Promise<boolean>}
     */
    restoreDriverData() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = true;
            try {
                this.driverData = yield this.storage.get(StorageKeys.DriverData);
                if (!this.driverData || !this.driverData.id) {
                    result = false;
                }
            }
            catch (e) {
                this.logger.error("restoreDriverData ::", e);
                result = false;
            }
            return result;
        });
    }
};
DriverService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [LoggingService,
        StorageService,
        ApiClientService,
        NxEventService,
        SocketService,
        DriverApiService,
        GeoService])
], DriverService);
export { DriverService };
