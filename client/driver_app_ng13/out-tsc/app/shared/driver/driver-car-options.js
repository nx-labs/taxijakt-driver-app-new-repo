/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
export class DriverCarOptions {
    constructor() {
    }
    fromObj(data) {
        this.carId = data === null || data === void 0 ? void 0 : data.id;
        this.babySeats = Number.parseInt(data.baby_seats);
        this.childSeats = Number.parseInt(data.child_seats);
        this.boosterSeats = Number.parseInt(data.booster_seats);
        this.hasShield = Number.parseInt(data.has_shield) >= 1;
        this.animalsInCage = Number.parseInt(data.animals_in_cage) >= 1;
        this.animalsWhitoutCaghe = Number.parseInt(data.animals_without_cage) >= 1;
        return this;
    }
    compile() {
        let values = new Array();
        values.push(`car_id=${this.carId}`);
        values.push(`baby_seats=${this.babySeats}`);
        values.push(`child_seats=${this.childSeats}`);
        values.push(`booster_seats=${this.boosterSeats}`);
        values.push(`has_shield=${this.hasShield}`);
        values.push(`animals_in_cage=${this.animalsInCage}`);
        values.push(`animals_without_cage=${this.animalsWhitoutCaghe}`);
        return values.join("&");
    }
    toSloppyJson(data) {
        return JSON.stringify(this);
    }
}
