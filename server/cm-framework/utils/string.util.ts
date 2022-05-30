/**
 * Copyright (c) 2017 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

declare global {
	interface String {
		format(...arguments: string[]): string;
	}
}


/*
String.prototype.format = ({ arguments }: { arguments?: string[] })  => {
	let args = arguments;
	return this.replace(/{(\d+)}/g, function(match: string, idx: number) {
		return typeof args[idx] != 'undefined'
			   ? args[idx]
			   : match
			;
	});
};
*/

export interface String {
	format(...replacements: string[]): string;
}

export class Str {
	public static ensureValue(value: any, def: any): void {
		if (!value) {
			value = def;
		}
	}

	public static boolToStr(value: boolean): string {
		return value ? "1" : "0";
	}

	public static isNullOrEmpty(val: any): boolean {
		return !(typeof val === "string" && val.trim().length >0)
	}

	public static titleCase(value: string): string {
		let splitStr = value.toLowerCase().split(' ');

		for (let i = 0; i < splitStr.length; i++) {
			splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
		}

		return splitStr.join(' ');
	}

	public static toInt(value: any): number {
		value = undefined;

		try {
			value = Number.parseInt(value);
		}
		catch (e) {
			if (process.env.VERBOSE) {
				console.error("toInt() ::", e);
			}
		}

		return value;
	}

	public init() {
		if (!String.prototype.format) {
			String.prototype.format = function() {
				var args = arguments;
				return this.replace(/{(\d+)}/g, function(match: any, number: number) {
					return typeof args[number] != 'undefined'
						   ? args[number]
						   : match
						;
				});
			};
		}
	}
}
