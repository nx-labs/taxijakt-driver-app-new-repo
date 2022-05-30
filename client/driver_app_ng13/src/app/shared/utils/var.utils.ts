/**
 * Copyright (c) 2018 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { DataUtils }    from "./data.utils";

export class VarUtils {
	/**
	 * Returns a string of a given length filled with given char value
	 * @param {string} charValue - value to fill
	 * @param {number} length - number of repeats
	 * @returns {string}
	 */
	public static fillChar(charValue: string, length: number): string {
		let result: string = "";
		for (let i = 0; i < length; i++) { result += charValue; }
		return result;
	}

	public static typesEqual<T>(type1: any, type2: T): boolean {
		return type1 !== null && type2 && ( typeof type1 === typeof type2 );
	}

	/**
	 * Ensure a non null value of certain trype
	 * @param val
	 * @param {T} defValue
	 * @returns {T}
	 */
	public static ensure<T>(val: any, defValue?: T): T {
		val = !(val as T) && defValue ? defValue : val;
		let val2: T = val;
 		return VarUtils.typesEqual<T>(val, defValue) ? val : JSON.parse("");
	}

	public static isEmpty(str: string): boolean {
		return (str == null) || (VarUtils.typesEqual<string>(str, "") && str.length < 1);
	}

	/**
	 * Deterine if a string is of numeric value
	 * @param {string} value
	 * @returns {boolean}
	 */
	public static isNumeric(value: any): boolean {
		const dataType = DataUtils.getDataType(value);
		let strValue: string = "";

		if (value) {
			strValue = JSON.stringify(value);
		}

		return (!isNaN(Number(strValue)));
	}

	/**
	 * Wrapper metod for string replace
	 * @param {string} source
	 * @param {string} find
	 * @param replaceWith
	 * @returns {string}
	 */
	public static replaceStr(source: string, find: string, replaceWith: any): string {
		return source.replace(find, String(replaceWith));
	}

	public static replaceEx = function (originalString: string, oldValue: string, newValue: string, ignoreCase: boolean = false) {
		//
		// if invalid vendorBaskets, return the original string
		//
		if ((originalString == null) || (oldValue == null) || (newValue == null) || (oldValue.length == 0))
			return (originalString);
		//
		// replace oldValue with newValue
		//
		let Flags: string = ( ignoreCase ) ? "gi" : "g",
			pattern = oldValue.replace(/[-\[\]\/{}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"),
			str = originalString.replace(new RegExp(pattern, Flags), newValue);

		return str;
	}
}
