/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export class JsonConverter {
	public static toType<T>(json: string): T {
		return JSON.parse(json);
	}

	public static toString<T>(value: T): string {
		return JSON.stringify(value);
	}
}

