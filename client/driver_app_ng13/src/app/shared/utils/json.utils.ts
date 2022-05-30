/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { DataUtils } from "./data.utils";

export class JsonUtils {
	/**
	 * Chech if the string consist if
	 * @param obj
	 * @returns {boolean}
	 */
	public static ofJsonStructure(obj: any): boolean {
		let jsonData: string = !DataUtils.isString(obj) ?
							   JSON.stringify(obj) :
							   ( obj as string )

		return JsonUtils.strIsJsonStruct(jsonData);
	}

	/**
	 * Checks whetwe a string has a JSON structure
	 * @param {string} str
	 * @returns {boolean}
	 */
	public static strIsJsonStruct(str: string): boolean {
		let result = true;

		if (!DataUtils.isString(str)) return false;

		try {
			const jsonStr = JSON.parse(str);
			const type    = Object.prototype.toString.call(jsonStr);
			return type === '[object Object]'
				   || type === '[object Array]';
		}
		catch (err) {
			result = false;
		}

		return result;
	}

	/**
	 * Takes an object of any kind and makes sure a vakj
	 * @param obj
	 * @returns {[boolean, object]}
	 */
	public static parseToJsonObj(obj: any): [ boolean, object ] {
		let jsonObj: object    = undefined;
		let jsonData: string   = undefined;
		let validJson: boolean = false;

		if (!DataUtils.isString(obj)) {
			jsonData = JSON.stringify(obj);
		}
		else if (DataUtils.isString(obj)) {
			jsonData = ( obj as string )
		}

		if (jsonData && JsonUtils.ofJsonStructure(obj)) {
			try {
				jsonObj = JSON.parse(jsonData);
				validJson = true;
			}
			catch (err) {
				validJson = false;
				jsonObj = null;
			}
		}

		return [validJson, jsonObj]
	}

	public static prettifyJson(obj: any, numSpaces: number = 4): string {
		return JSON.stringify(obj, null, numSpaces);
	}

	public static prettyPrintJson(obj: any, label?: string): void {
		if (label) {
			console.log(label, obj);
		}
		else {

		}
	}
}
