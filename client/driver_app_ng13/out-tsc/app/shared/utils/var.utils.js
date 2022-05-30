/**
 * Copyright (c) 2018 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { DataUtils } from "./data.utils";
export class VarUtils {
    /**
     * Returns a string of a given length filled with given char value
     * @param {string} charValue - value to fill
     * @param {number} length - number of repeats
     * @returns {string}
     */
    static fillChar(charValue, length) {
        let result = "";
        for (let i = 0; i < length; i++) {
            result += charValue;
        }
        return result;
    }
    static typesEqual(type1, type2) {
        return type1 !== null && type2 && (typeof type1 === typeof type2);
    }
    /**
     * Ensure a non null value of certain trype
     * @param val
     * @param {T} defValue
     * @returns {T}
     */
    static ensure(val, defValue) {
        val = !val && defValue ? defValue : val;
        let val2 = val;
        return VarUtils.typesEqual(val, defValue) ? val : JSON.parse("");
    }
    static isEmpty(str) {
        return (str == null) || (VarUtils.typesEqual(str, "") && str.length < 1);
    }
    /**
     * Deterine if a string is of numeric value
     * @param {string} value
     * @returns {boolean}
     */
    static isNumeric(value) {
        const dataType = DataUtils.getDataType(value);
        let strValue = "";
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
    static replaceStr(source, find, replaceWith) {
        return source.replace(find, String(replaceWith));
    }
}
VarUtils.replaceEx = function (originalString, oldValue, newValue, ignoreCase = false) {
    //
    // if invalid vendorBaskets, return the original string
    //
    if ((originalString == null) || (oldValue == null) || (newValue == null) || (oldValue.length == 0))
        return (originalString);
    //
    // replace oldValue with newValue
    //
    let Flags = (ignoreCase) ? "gi" : "g", pattern = oldValue.replace(/[-\[\]\/{}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), str = originalString.replace(new RegExp(pattern, Flags), newValue);
    return str;
};
