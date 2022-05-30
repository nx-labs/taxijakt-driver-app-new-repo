"use strict";
exports.__esModule = true;
exports.VarUtils = void 0;
/**
 * Copyright (c) 2018 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
var data_utils_1 = require("./data.utils");
var VarUtils = /** @class */ (function () {
    function VarUtils() {
    }
    /**
     * Returns a string of a given length filled with given char value
     * @param {string} charValue - value to fill
     * @param {number} length - number of repeats
     * @returns {string}
     */
    VarUtils.fillChar = function (charValue, length) {
        var result = "";
        for (var i = 0; i < length; i++) {
            result += charValue;
        }
        return result;
    };
    VarUtils.isEmpty = function (str) {
        return (str === undefined) || (!str || 0 === str.length);
    };
    /**
     * DEterine if a string is of numeric value
     * @param {string} value
     * @returns {boolean}
     */
    VarUtils.isNumeric = function (value) {
        var dataType = data_utils_1.DataUtils.getDataType(value);
        var strValue = "";
        if (value) {
            strValue = JSON.stringify(value);
        }
        return (!isNaN(Number(strValue)));
    };
    /**
     * Wrapper metod for string replace
     * @param {string} source
     * @param {string} find
     * @param replaceWith
     * @returns {string}
     */
    VarUtils.replaceStr = function (source, find, replaceWith) {
        return source.replace(find, String(replaceWith));
    };
    VarUtils.replaceEx = function (originalString, oldValue, newValue, ignoreCase) {
        if (ignoreCase === void 0) { ignoreCase = false; }
        //
        // if invalid vendorBaskets, return the original string
        //
        if ((originalString == null) || (oldValue == null) || (newValue == null) || (oldValue.length == 0))
            return (originalString);
        //
        // replace oldValue with newValue
        //
        var Flags = (ignoreCase) ? "gi" : "g", pattern = oldValue.replace(/[-\[\]\/{}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), str = originalString.replace(new RegExp(pattern, Flags), newValue);
        return str;
    };
    return VarUtils;
}());
exports.VarUtils = VarUtils;
