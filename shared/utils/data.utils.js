"use strict";
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
exports.__esModule = true;
exports.DataUtils = exports.DataTypeInfo = void 0;
var DataTypeInfo;
(function (DataTypeInfo) {
    DataTypeInfo[DataTypeInfo["string"] = 0] = "string";
    DataTypeInfo[DataTypeInfo["object"] = 1] = "object";
    DataTypeInfo[DataTypeInfo["undefined"] = 2] = "undefined";
    DataTypeInfo[DataTypeInfo["boolean"] = 3] = "boolean";
    DataTypeInfo[DataTypeInfo["function"] = 4] = "function";
    DataTypeInfo[DataTypeInfo["number"] = 5] = "number";
    DataTypeInfo[DataTypeInfo["bigint"] = 6] = "bigint";
    DataTypeInfo[DataTypeInfo["symbol"] = 7] = "symbol";
})(DataTypeInfo = exports.DataTypeInfo || (exports.DataTypeInfo = {}));
var DataUtils = /** @class */ (function () {
    function DataUtils() {
    }
    DataUtils.getDataType = function (obj) {
        var result = DataTypeInfo.undefined;
        var typeName = typeof obj;
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
                result = DataTypeInfo["function"];
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
    };
    DataUtils.arrayIsEmpty = function (value) {
        var result = true;
        var arrVal = value;
        if (!(Array.isArray(arrVal) && !arrVal[0])) {
            result = false;
        }
        return result;
    };
    DataUtils.ensureArray = function (value) {
        if (!Array.isArray(value)) {
            value = [];
        }
        return value;
    };
    /**
     * Determine if provided object is of type string
     * @param value
     * @returns {boolean}
     */
    DataUtils.isString = function (value) {
        return DataUtils.getDataType(value) === DataTypeInfo.string;
    };
    /**
     * Determine if provided object is of type string or number
     * @param value
     * @returns {boolean}
     */
    DataUtils.isStrOrNum = function (value) {
        var dataType = DataUtils.getDataType(value);
        var strValue = "";
        return (dataType === DataTypeInfo.string ||
            dataType === DataTypeInfo.number ||
            dataType === DataTypeInfo.bigint);
    };
    return DataUtils;
}());
exports.DataUtils = DataUtils;
