/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export interface INxBookingEvent {
	departureAddress: string;
	destinationAddress: string;
	geo: {
		lat: string;
		lng: string;
	},
	passenger: {
		name: string
	}
}
