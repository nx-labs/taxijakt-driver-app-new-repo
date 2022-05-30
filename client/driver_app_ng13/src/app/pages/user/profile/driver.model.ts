/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { ShellModel } from '@components/shell/data-store';

export class DriverModel extends ShellModel {
	id?: string;
	points?: number;
	name?: string;
	userImage?: string;
	status: string;
	isBasic?: boolean;
	likes?: number;
	dislikes?: number;
	rating?: string;
	succellfulOrders?: number;
	hasLowerComission?: boolean;
	lowerCommissionTo?: string;

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
