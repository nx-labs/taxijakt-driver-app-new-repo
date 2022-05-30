/**
 * Copyright (c) 2021 Netix AB. -  Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export interface ITaxiAddress {
	streetName?:   string;
	city?:         string;
	zone?:         number;
	entrance?:     string;
	isNational?:   boolean;
	streetNumber?: number;
	latitude?:     number;
	longitude?:    number;
}

export interface IPassenger {
	name?:   string;
	phone?:  string;
	userId?: number;
}

export interface ITaxiBooking {
	departure: ITaxiAddress,
	destination: ITaxiAddress,
	passenger: IPassenger
}

export class BookingModel {

}
