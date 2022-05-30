/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export interface IHtml5GeoResult {
	success: boolean;
	geo?: IGeoPoint;
}

export interface IGeoPoint {
	latitude: number;
	longitude: number;
}

