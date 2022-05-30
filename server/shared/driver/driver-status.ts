/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export enum DriverStatusType {
	Unset          = "UNSET",
	Unknown        = "UNKNOWN",
	Available      = "AVAILABLE",
	LoggedIn       = "LOGGED IN",
	Busy            = "BUSY",
	SoonAvailable  = "SOON_AVAILABLE",
	HasCustomer    = "HAS_CUSTOMER",
	NotLoggedIn    = "NO_SESSION_SET",
	NoSessionFound = "NO_SESSION_FOUND_ERROR",
}

export class DriverStatus {
	private _prevStatus = DriverStatusType.Unset;
	private _status = DriverStatusType.Unset;

	public get prevStatus(): DriverStatusType {
		return this._prevStatus;
	}

	public get status(): DriverStatusType {
		return this._status;
	}

	public set status(newType: DriverStatusType) {
		if (newType === (DriverStatusType.Unset
						 || DriverStatusType.NoSessionFound
			)) {
			throw new Error(`Ststus "${DriverStatusType[newType]}" can not be manually set.`);
		}

		this._prevStatus = this.status;
		this._status = newType;
	}

	constructor(statusType?: DriverStatusType) {
		if (statusType) {
			this.status = statusType;
		}
	}


	public loggedIn(): boolean {
		return this.status !== (DriverStatusType.NotLoggedIn || DriverStatusType.NoSessionFound || DriverStatusType.Unset);
	}

	public static parseFromStr(str: string): DriverStatus {
		let aType : DriverStatusType = DriverStatusType[str];
		return new DriverStatus(aType); //JsonConverter.toType<DriverStatusType>(str);
	}
}

