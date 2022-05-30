/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export enum DataTypeName {
	String = "string",
	Symbol = "symbol",
	Undefined = "undefined",
	Boolean = "boolean",
	BigInt = "bigint",
	Function = "function",
	Number = "number",
	Object = "object",
	Null = "null"
}

export function dataTypeNameToVal(key: DataTypeName): string {
	for (let enumMember in DataTypeName) {
		let res = enumMember;
		console.log("enum member: ", enumMember);

		return "res";
	}
}

export function to<T>(data: any, defValue?: any): T {

	function toTypeStr(data: any, defValue?: any): DataTypeName {
		if (!data && defValue) {
			data = defValue;
		}

		let typeName: string = typeof data;
		let res = DataTypeName[typeName];

		return res;
	}

	let result: T;
	let typeName = toTypeStr(data, defValue);

	console.log("typeName ::", typeName);

	return data as T;

}

let cp = to<DataTypeName.Boolean>(null, false);

console.log("CP ::", cp);
console.log("CP :: type ::", typeof cp);
