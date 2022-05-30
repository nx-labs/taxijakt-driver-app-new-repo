/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __decorate, __metadata } from "tslib";
import { EventEmitter, Output } from "@angular/core";
import { Input } from "@angular/core";
import { Component } from '@angular/core';
import { DriverStatusType } from "@shared/driver/driver-status";
import { VarUtils } from "@shared/utils/var.utils";
import { pipe } from "rxjs";
import { Subject } from "rxjs";
export class DriverStatusStorageBase extends Map {
    /**
     * Add new Status type
     * @param {DriverStatusType} statusType
     * @param {string} strVal
     * @returns {any}
     */
    set(statusType) {
        return this.add(DriverStatusType[statusType]);
    }
    add(strVal) {
        let val2 = !VarUtils.isEmpty(strVal) ? strVal : DriverStatusType[DriverStatusType.Unset];
        return DriverStatusType[this.setVal(val2)];
    }
    setVal(strVal) {
        let statusType = DriverStatusType[strVal];
        return this.set(statusType);
    }
    has(strVal) {
        return this.get(strVal) !== null;
    }
    /**
     * You guessed it
     * @returns {boolean}
     */
    isEmpty() {
        return this.size < 1;
    }
}
export class DriverStatusStorage extends DriverStatusStorageBase {
}
export var NxButtonType;
(function (NxButtonType) {
    NxButtonType[NxButtonType["Custom"] = 0] = "Custom";
    NxButtonType[NxButtonType["SetBusy"] = 1] = "SetBusy";
    NxButtonType[NxButtonType["DropDown"] = 2] = "DropDown";
})(NxButtonType || (NxButtonType = {}));
let NxDriverStatusComponent = class NxDriverStatusComponent {
    constructor() {
        this.initEvent = new EventEmitter();
        this.statusEventStream = new Subject().pipe((event) => {
            return event;
        });
        this.beforeStatusChange = this.statusEventStream.subscribe(pipe((event) => {
            let doCancel = !event.cancel;
            if (!doCancel || !this.beforeStatusChange.closed) {
                return event.type;
            }
        }));
        // This sucker is triggered when a server confirmation have beem reveived
        this.statusDidChange = new EventEmitter();
    }
    ngOnInit() {
        this.initEvent.emit(this);
    }
    triggerStatusChange(value) {
        this.statusDidChange.emit(value);
    }
    set buttonType(value) {
        let storage = this._choosableStatuses;
        if (value === NxButtonType.DropDown && (!storage || (storage === null || storage === void 0 ? void 0 : storage.isEmpty()))) {
        }
        else if (storage && !storage.isEmpty()) {
            this.button = value;
        }
    }
    set statuses(storage) {
        if (!storage) {
            storage = new DriverStatusStorage();
        }
        this._choosableStatuses = storage;
    }
    get statuses() {
        return this._choosableStatuses;
    }
    onClick() {
    }
};
__decorate([
    Input(),
    __metadata("design:type", Number)
], NxDriverStatusComponent.prototype, "button", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], NxDriverStatusComponent.prototype, "beforeStatusChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], NxDriverStatusComponent.prototype, "statusDidChange", void 0);
NxDriverStatusComponent = __decorate([
    Component({
        selector: 'nx-driver-status',
        templateUrl: 'nx-driver-status.component.html',
        styleUrls: ['nx-driver-status.component.scss'],
    })
], NxDriverStatusComponent);
export { NxDriverStatusComponent };
/*
export class NxDriverStatus implements Component {
}


export class NxDriverStatus implements ComponentDecorator{

    public set statusButton(val: ButtonType) {
        this.button = val;
    }
    public get statusButton(): ButtonType {
        return this.button | ButtonType.SetBusy;
    }
}
 */
