/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
export var DriverStatusType;
(function (DriverStatusType) {
    DriverStatusType["Unset"] = "UNSET";
    DriverStatusType["Unknown"] = "UNKNOWN";
    DriverStatusType["Available"] = "AVAILABLE";
    DriverStatusType["LoggedIn"] = "LOGGED IN";
    DriverStatusType["Busy"] = "BUSY";
    DriverStatusType["SoonAvailable"] = "SOON_AVAILABLE";
    DriverStatusType["HasCustomer"] = "HAS_CUSTOMER";
    DriverStatusType["NotLoggedIn"] = "NO_SESSION_SET";
    DriverStatusType["NoSessionFound"] = "NO_SESSION_FOUND_ERROR";
})(DriverStatusType || (DriverStatusType = {}));
export class DriverStatus {
    constructor(statusType) {
        this._prevStatus = DriverStatusType.Unset;
        this._status = DriverStatusType.Unset;
        if (statusType) {
            this.status = statusType;
        }
    }
    get prevStatus() {
        return this._prevStatus;
    }
    get status() {
        return this._status;
    }
    set status(newType) {
        if (newType === (DriverStatusType.Unset
            || DriverStatusType.NoSessionFound)) {
            throw new Error(`Ststus "${DriverStatusType[newType]}" can not be manually set.`);
        }
        this._prevStatus = this.status;
        this._status = newType;
    }
    loggedIn() {
        return this.status !== (DriverStatusType.NotLoggedIn || DriverStatusType.NoSessionFound || DriverStatusType.Unset);
    }
    static parseFromStr(str) {
        let aType = DriverStatusType[str];
        return new DriverStatus(aType); //JsonConverter.toType<DriverStatusType>(str);
    }
}
