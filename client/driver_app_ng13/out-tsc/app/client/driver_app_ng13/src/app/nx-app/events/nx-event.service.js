/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { SocketService } from "@core/services/socket.service";
import { Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { tap } from "rxjs/operators";
import { NxEventTypes } from "./nx-event-types";
import { v4 as uuidv4 } from 'uuid';
export var NxEvent;
(function (NxEvent) {
    NxEvent[NxEvent["Login"] = 0] = "Login";
    NxEvent[NxEvent["GetSessionOrders"] = 1] = "GetSessionOrders";
    NxEvent[NxEvent["ActiveOrders"] = 2] = "ActiveOrders";
    NxEvent[NxEvent["ShowModal"] = 3] = "ShowModal";
    NxEvent[NxEvent["AppWideData"] = 4] = "AppWideData";
    NxEvent[NxEvent["NewOrder"] = 5] = "NewOrder";
    NxEvent[NxEvent["Heartbeat"] = 6] = "Heartbeat";
    NxEvent[NxEvent["DriverLogin"] = 7] = "DriverLogin";
    NxEvent[NxEvent["DriverData"] = 8] = "DriverData";
    NxEvent[NxEvent["DriverUpdate"] = 9] = "DriverUpdate";
    NxEvent[NxEvent["Orders"] = 10] = "Orders";
    NxEvent[NxEvent["SelectrCar"] = 11] = "SelectrCar";
})(NxEvent || (NxEvent = {}));
let NxEventService = class NxEventService {
    constructor(socketService) {
        this.socketService = socketService;
        this.appEvent = new Subject();
        this.eventStream = this.appEvent.asObservable();
        this.listeners = new Map();
        this.socketService.dataStream.subscribe(val => {
            this.handleMessageEvent(val);
            /*
             switch (val.type) {
             case MsgType.DriverUpdate:
             this.pushEvent(
             {
             eventType: NxEvent.DriverUpdate,
             eventData: val.data
             }
             )
             break;
             }
             */
        });
    }
    registerEventListener(listener, ...types) {
        this.listeners.set(listener, types);
    }
    unregisterEventListener(listener) {
        return this.listeners.delete(listener);
    }
    handleMessageEvent(msg) {
        //
        // This shouold really be re-worked
        /*
        this.onEvent({
                         eventType: msg.type,
                         eventData: msg
                     });
                     */
    }
    onNewEvent(...types) {
        const _func = "_EventService::onEvent";
        return this.eventStream.pipe(tap(val => {
            // console.log("NxEventService :: ON EVENT TAP :::", val);
        }), filter((val) => {
            return types.length ? types.indexOf(val.eventType) > -1 : true;
        }));
    }
    onEvent(...types) {
        const _func = "_EventService::onEvent";
        return this.eventStream.pipe(tap(val => {
            // console.log("NxEventService :: ON EVENT TAP :::", val);
        }), filter((val) => {
            return types.length ? types.indexOf(val.eventType) > -1 : true;
        }));
    }
    onEvent2(event) {
        console.log("NxEventService :: onEvent");
        for (let [listener, events] of this.listeners) {
            console.log("Listener ::", listener.name);
            let force = false;
            if (!events || events.length < 1) {
                force = true;
            }
            let trigger = events.length ? events.indexOf(event.eventType) > -1 : true;
            trigger = trigger || !event;
            if (trigger || force) {
                console.log("DO Trigger ::", event.eventType);
                listener.onEvent(event);
            }
            else {
                console.log("NxEventService :: this.listeners ::", this.listeners);
            }
        }
        /*
         const _func = "_EventService::onEvent";

         return this.eventStream.pipe(
         tap(
         val => {
         // console.log("NxEventService :: ON EVENT TAP :::", val);
         }
         ),

         filter((val: INxEvent) => {
         return types.length ? types.indexOf(val.eventType) > -1 : true
         }),
         );*/
    }
    pushNewEvent(type, data, message) {
        let event = {
            eventType: type,
            eventMessage: message,
            eventData: data
        };
        return this.pushEvent(event);
    }
    pushEvent(event) {
        event.eventTag = uuidv4();
        this.appEvent.next(event);
        return event.eventTag;
    }
    newBookingEvent(data) {
        let serviceEvent = {
            eventType: NxEventTypes.Booking.NewBooking,
            eventData: data
        };
        return this.pushEvent(serviceEvent);
    }
    acceptBooking(data) {
        let serviceEvent = {
            eventType: NxEventTypes.Booking.AcceptBooking,
            eventData: data
        };
        return this.pushEvent(serviceEvent);
    }
};
NxEventService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [SocketService])
], NxEventService);
export { NxEventService };
