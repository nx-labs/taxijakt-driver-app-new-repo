/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export enum DriverModeType {
	NotAvailable,
	Available,
	Busy
}

export class DriverMode {
	prevMode = DriverModeType.NotAvailable;
	currMode = DriverModeType.NotAvailable;

	prevStateTimeStamp = Date.now();
	stateSetTimeStamp = Date.now();

	constructor() {}

	public setMode(mode: DriverModeType) {
		if (mode !== this.currMode) {
			this.prevMode = mode;
		}
	}
}
