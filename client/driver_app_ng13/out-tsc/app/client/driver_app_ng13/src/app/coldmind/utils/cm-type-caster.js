/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
export var DataTypeName;
(function (DataTypeName) {
    DataTypeName["String"] = "string";
    DataTypeName["Symbol"] = "symbol";
    DataTypeName["Undefined"] = "undefined";
    DataTypeName["Boolean"] = "boolean";
    DataTypeName["BigInt"] = "bigint";
    DataTypeName["Function"] = "function";
    DataTypeName["Number"] = "number";
    DataTypeName["Object"] = "object";
    DataTypeName["Null"] = "null";
})(DataTypeName || (DataTypeName = {}));
export function dataTypeNameToVal(key) {
    for (let enumMember in DataTypeName) {
        let res = enumMember;
        console.log("enum member: ", enumMember);
        return "res";
    }
}
export function to(data, defValue) {
    function toTypeStr(data, defValue) {
        if (!data && defValue) {
            data = defValue;
        }
        let typeName = typeof data;
        let res = DataTypeName[typeName];
        return res;
    }
    let result;
    let typeName = toTypeStr(data, defValue);
    console.log("typeName ::", typeName);
    return data;
}
let cp = to(null, false);
console.log("CP ::", cp);
console.log("CP :: type ::", typeof cp);
