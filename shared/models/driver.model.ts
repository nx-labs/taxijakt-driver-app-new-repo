/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { NxShellModel } from "./nx-model";

export class DriverModel extends NxShellModel {
	id?: string;
	name?: string;
	userImage?: string;
	status: string;
	membership?: string;
	job?: string;
	likes?: string;
	followers?: string;
	following?: string;
	about?: string;

	cars: Car[];

	constructor() {
		super();
	}
}

export class Car {
	regNumber: string;
	baySeats?: number;
	childSeats?: number;
	boosterSeats: number;
	shield: number;
	dogAllowed?: boolean;
}
