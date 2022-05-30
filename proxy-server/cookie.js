/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var e_1, _a, e_2, _b;
var cookie = "jadi=12872606-52ff7d24ff1d8dc8cf7555d38838f0a2;eav=0; referer=https%3A%2F%2Fwww.google.com%2F; http_referer=https%3A%2F%2Fwww.google.com%2F; _gcl_au=1.1.1252104886.1645084783; customer_name=Kalle%20Kula; customer_phone=%2B46708633007; accept_cookies=true; converted_popup=true; payment_method=PAY_IN_CAR; PHPSESSID=52jvkbpgr6lsalmuthcn7rb4d4; _gaexp=GAX1.2.WH_f-LmsTqSN9DwcLgeQnw.19192.2; _clck=pppio3|1|f15|0; _uetvid=1c087a50f0be11eb8a18adeea1d90d37; session=13499188-152c3cd79f9e18af649e9cfba1fa20a5";
var cookieMap = new Map();
var rawList = [];
if (cookie.indexOf(";") < 0) {
    rawList.push(cookie);
}
else {
    rawList = cookie.split(";");
}
console.log("poj ::", rawList);
try {
    for (var rawList_1 = __values(rawList), rawList_1_1 = rawList_1.next(); !rawList_1_1.done; rawList_1_1 = rawList_1.next()) {
        var str = rawList_1_1.value;
        if (!str) {
            continue;
        }
        var keyVal = str.trim().split("=");
        console.log("A ::", str);
        cookieMap.set(keyVal[0], keyVal[1]);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (rawList_1_1 && !rawList_1_1.done && (_a = rawList_1["return"])) _a.call(rawList_1);
    }
    finally { if (e_1) throw e_1.error; }
}
try {
    for (var cookieMap_1 = __values(cookieMap), cookieMap_1_1 = cookieMap_1.next(); !cookieMap_1_1.done; cookieMap_1_1 = cookieMap_1.next()) {
        var _c = __read(cookieMap_1_1.value, 2), key = _c[0], value = _c[1];
        console.log("\"".concat(key, "\" has value \"\"").concat(value));
    }
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
    try {
        if (cookieMap_1_1 && !cookieMap_1_1.done && (_b = cookieMap_1["return"])) _b.call(cookieMap_1);
    }
    finally { if (e_2) throw e_2.error; }
}
console.log("RES ::", cookieMap);
