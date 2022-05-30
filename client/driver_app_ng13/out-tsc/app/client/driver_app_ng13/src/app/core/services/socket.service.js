/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { StorageService } from "@core/services/storage.service";
import { SocketEvents } from "@core/socket-events";
import { generateTag } from "@utils/tag-generator";
import { Socket } from 'ngx-socket-io';
import { of } from "rxjs";
import { Observable } from "rxjs";
import { Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { MsgType } from "../../shared/messages/message-types";
import { ApiFactory } from "@api/api-factory";
import { LoggingService } from "./logging.service";
import { v4 as uuidv4 } from 'uuid';
let SocketService = class SocketService {
    constructor(storageService, logger, socket) {
        this.storageService = storageService;
        this.logger = logger;
        this.socket = socket;
        this.prevMessage = { type: -1000 };
        this.subject = new Subject();
        this.dataStream = this.subject.asObservable();
        this.haveShownDriverData = false;
        const _funcName = 'SocketService::subscribe';
        this.ensureUUID();
        this.cmStream = new Observable(observer => {
            this.socket.fromEvent(SocketEvents.Message).subscribe((message) => {
                if (message.type === MsgType.DriverUpdate && !this.haveShownDriverData) {
                    console.log("NEW SOCKET MESSAGE :: DRIVET DATA ::", message);
                    this.haveShownDriverData = true;
                }
                else {
                    if (message.type !== this.prevMessage.type) {
                        this.prevMessage = message;
                        console.log("NEW SOCKET MESSAGE ::", message);
                    }
                }
                this.subject.next(message);
                observer.next(message);
            }, (error) => {
                this.logger.error(_funcName, "::", error);
            });
        });
    }
    oberveMessage(tag = null, ...msgTypes) {
        tag = !tag ? new Date().getMilliseconds().toString() : tag;
        return this.subject.asObservable().pipe((msg) => {
            let msgType = Number.isInteger(msg.type) && msgTypes.indexOf(Number(msg.type)) > -1 ? msg : null;
            return (msgType && tag === (msgType === null || msgType === void 0 ? void 0 : msgType.tag)) ? msg : null;
        });
    }
    ensureUUID() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.uuid) {
                let storedId = yield this.storageService.get("uuid");
                if (!storedId) {
                    storedId = uuidv4();
                    yield this.storageService.set("uuid", storedId);
                }
                this.uuid = storedId;
            }
            return !(!this.uuid);
        });
    }
    getStream() {
        return this.subject.asObservable();
    }
    handleError(operation = 'operation', result) {
        return (error) => {
            this.logger.error(error);
            this.logger.serverError('Error ::', error);
            this.logger.error(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(result);
        };
    }
    fake(type, data) {
        this.subject.next({
            type: type,
            data: data
        });
    }
    typedStream(type) {
        return this.cmStream.pipe(filter((val) => {
            return val && (val === null || val === void 0 ? void 0 : val.type) == type;
        }));
    }
    typedStreamByTag(type, tag) {
        return this.cmStream.pipe(filter((val) => {
            return (val && (val === null || val === void 0 ? void 0 : val.type) === type) && (tag === (val === null || val === void 0 ? void 0 : val.tag));
        }));
    }
    observeMessage(msg, tag) {
        return this.emitMessage(msg, tag);
    }
    emitMessage(msg, tag) {
        let msgType = Number.isInteger(msg) ? Number(msg) : msg === null || msg === void 0 ? void 0 : msg.type;
        tag = (!tag) ? generateTag() : tag;
        return this.oberveMessage(tag, msgType);
    }
    m2(msg, tag) {
        console.log("m2 ::", msg);
        msg.uuid = this.uuid;
        if (tag) {
            msg.tag = tag;
        }
        else {
            msg.tag = ApiFactory.newTag();
        }
        const filterStream = this.cmStream.pipe(filter((value) => {
            console.log("FILLE ::: FILTER", value);
            return value.tag ? value.tag === msg.tag : true;
        }));
        this.socket.emit(SocketEvents.Message, msg);
        return filterStream;
    }
    tagMsg(msg, tag) {
        msg.uuid = this.uuid;
        if (tag) {
            msg.tag = tag;
        }
        else {
            msg.tag = ApiFactory.newTag();
        }
        this.socket.emit(SocketEvents.Message, msg);
        return this.typedStreamByTag(msg.type, msg.tag);
    }
    sendMessage(msg, tag) {
        msg.uuid = this.uuid;
        if (tag) {
            msg.tag = tag;
        }
        else {
            msg.tag = ApiFactory.newTag();
        }
        this.socket.emit(SocketEvents.Message, msg);
        return this.typedStream(msg.type);
    }
    getMessage(msgType) {
        return this.dataStream.pipe(filter((value) => {
            return value.type == msgType;
        }));
    }
};
SocketService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [StorageService,
        LoggingService,
        Socket])
], SocketService);
export { SocketService };
