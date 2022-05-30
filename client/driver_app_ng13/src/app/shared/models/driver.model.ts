/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export class DriverModel {
	id?: string;
	name?: string;
	userImage?: string;
	status: any;
	membership?: string;
	job?: string;
	likes?: string;
	followers?: string;
	following?: string;
	about?: string;

	cars: CarModel[];
}

export class CarModel {
	regNumber: string;
	baySeats?: number;
	childSeats?: number;
	boosterSeats: number;
	shield: boolean;
	dogAllowed?: boolean;
}
