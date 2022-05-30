/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export enum DataTypeInfo {
	string,
	object,
	undefined,
	boolean,
	function,
	number,
	bigint,
	symbol
}

export class DataUtils {
	public static getDataType(obj: any): DataTypeInfo {
		let result = DataTypeInfo.undefined;
		let typeName = typeof obj;

		switch (typeName) {
			case "string":
				result = DataTypeInfo.string;
				break;

			case "object":
				result = DataTypeInfo.object;
				break;

			case "undefined":
				result = DataTypeInfo.undefined;
				break;

			case "boolean":
				result = DataTypeInfo.boolean;
				break;

			case "function":
				result = DataTypeInfo.function;
				break;

			case "number":
				result = DataTypeInfo.number;
				break;

			case "bigint":
				result = DataTypeInfo.bigint;
				break;

			case "symbol":
				result = DataTypeInfo.symbol;
				break;
		}

		return result;
	}

	public static arrayIsEmpty(value: any) {
		let result = true;
		let arrVal: Array<any> = value as Array<any>;

		 if (!(Array.isArray(arrVal) && !arrVal[0])) {
			result = false;
		}

		return result;
	}

	public static ensureArray(value: any) {
		if (!Array.isArray(value)) {
			value = [];
		}

		return value;
	}

	/**
	 * Determine if provided object is of type string
	 * @param value
	 * @returns {boolean}
	 */
	public static isString(value: any): boolean {
		return DataUtils.getDataType(value) === DataTypeInfo.string;
	}

	/**
	 * Determine if provided object is of type string or number
	 * @param value
	 * @returns {boolean}
	 */
	public static isStrOrNum(value: any): boolean {
		const dataType = DataUtils.getDataType(value);
		let strValue: string = "";

		return (dataType === DataTypeInfo.string ||
			dataType === DataTypeInfo.number ||
			dataType === DataTypeInfo.bigint);
	}
}












