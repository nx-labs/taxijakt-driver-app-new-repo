"use strict";
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
exports.__esModule = true;
exports.to = exports.dataTypeNameToVal = exports.DataTypeName = void 0;
var DataTypeName;
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
})(DataTypeName = exports.DataTypeName || (exports.DataTypeName = {}));
function dataTypeNameToVal(key) {
    for (var enumMember in DataTypeName) {
        var res = enumMember;
        console.log("enum member: ", enumMember);
        return "res";
    }
}
exports.dataTypeNameToVal = dataTypeNameToVal;
function to(data, defValue) {
    function toTypeStr(data, defValue) {
        if (!data && defValue) {
            data = defValue;
        }
        var typeName = typeof data;
        var res = DataTypeName[typeName];
        return res;
    }
    var result;
    var typeName = toTypeStr(data, defValue);
    console.log("typeName ::", typeName);
    return data;
}
exports.to = to;
var cp = to(null, false);
console.log("CP ::", cp);
console.log("CP :: type ::", typeof cp);
