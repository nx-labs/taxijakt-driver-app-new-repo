/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
function haveItem(compareItem, compareArray) {
    for (var _i = 0, compareArray_1 = compareArray; _i < compareArray_1.length; _i++) {
        var item = compareArray_1[_i];
        if (item == compareItem)
            return true;
    }
    return false;
}
function mergeArrays() {
    var haveChanged = false;
    var array1 = [1, 2, 3, 4];
    var array2 = [3, 4, 8, 12];
    var newItems = [];
    var removedItems = [];
    var result = [];
    // Find New Orders
    for (var _i = 0, array2_1 = array2; _i < array2_1.length; _i++) {
        var item = array2_1[_i];
        if (haveItem(item, array1) === false) {
            haveChanged = true;
            newItems.push(item);
        }
        result.push(item);
    }
    // Find obsolete orders
    for (var _a = 0, array1_1 = array1; _a < array1_1.length; _a++) {
        var item = array1_1[_a];
        if (haveItem(item, array2) === false) {
            removedItems.push(item);
        }
    }
    console.log("Removed items ::", removedItems);
    console.log("New Items ::", newItems);
}
mergeArrays();
