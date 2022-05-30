/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
export var DriverModeType;
(function (DriverModeType) {
    DriverModeType[DriverModeType["NotAvailable"] = 0] = "NotAvailable";
    DriverModeType[DriverModeType["Available"] = 1] = "Available";
    DriverModeType[DriverModeType["Busy"] = 2] = "Busy";
})(DriverModeType || (DriverModeType = {}));
export class DriverMode {
    constructor() {
        this.prevMode = DriverModeType.NotAvailable;
        this.currMode = DriverModeType.NotAvailable;
        this.prevStateTimeStamp = Date.now();
        this.stateSetTimeStamp = Date.now();
    }
    setMode(mode) {
        if (mode !== this.currMode) {
            this.prevMode = mode;
        }
    }
}
