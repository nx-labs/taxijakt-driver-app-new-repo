/**
 * Copyright (c) 2021 Netix AB. -  Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export class DriverCarOptions {
	public session: string;
	public carId: string; // car_id
	public babySeats: string // baby_seats
	public childSeats: string; // child_seats
	public boosterSeats: string; // booster_seats
	public hasShield: boolean; // has_shield
	public animalsInCage: boolean; // animals_in_cage
	public animalsWithoutCage: boolean; // &animals_without_cage

	public compile() {
		let result = new Array()
	}

}
