/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export function RandomInt(min: number = 100, max: number = 5000) {
	return Math.floor(Math.random() * (max - min) ) + min;
}
