/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { IDriverCar }         from "../types/car.type";

export class DriverCarOptions {
	public carId: string | any;
	public babySeats?: number; // baby_seats
	public childSeats?: number; // child_seats
	public boosterSeats?: number; // booster_seats
	public hasShield?: boolean; // has_shield
	public animalsInCage?: boolean; // animals_in_cage
	public animalsWhitoutCaghe?: boolean;

	public driverCarData: IDriverCar;

	fromObj(data: IDriverCar): DriverCarOptions {
		this.carId               = data?.id;
		this.babySeats           = Number.parseInt(data.baby_seats);
		this.childSeats          = Number.parseInt(data.child_seats);
		this.boosterSeats        = Number.parseInt(data.booster_seats);
		this.hasShield           = Number.parseInt(data.has_shield) >= 1;
		this.animalsInCage       = Number.parseInt(data.animals_in_cage) >= 1;
		this.animalsWhitoutCaghe = Number.parseInt(data.animals_without_cage) >= 1;

		return this;
	}

	constructor() {
	}

	public compile(): string {
		let values = new Array<string>();
		values.push(`car_id=${ this.carId }`);
		values.push(`baby_seats=${ this.babySeats }`);
		values.push(`child_seats=${ this.childSeats }`);
		values.push(`booster_seats=${ this.boosterSeats }`);
		values.push(`has_shield=${ this.hasShield }`);
		values.push(`animals_in_cage=${ this.animalsInCage }`);
		values.push(`animals_without_cage=${ this.animalsWhitoutCaghe }`);

		return values.join("&");
	}

	public toSloppyJson(data: any): string {
		return JSON.stringify(this);
	}
}
