/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

function haveItem(compareItem: any, compareArray: Array<any>): boolean {
	for (let item of compareArray) {
		if (item == compareItem) return true;
	}

	return false;
}


function mergeArrays() {
	let haveChanged = false;

	let array1 = [ 1, 2, 3, 4 ];
	let array2 = [ 3, 4, 8, 12 ];

	let newItems  = [];
	let removedItems  = [];

	let result = [];

	// Find New Orders
	for (let item of array2) {
		if (haveItem(item, array1) === false) {
			haveChanged = true;
			newItems.push(item);
		}

		result.push(item);
	}

	// Find obsolete orders
	for (let item of array1) {
		if (haveItem(item, array2) === false) {
			removedItems.push(item);
		}
	}

	console.log("Removed items ::", removedItems);
	console.log("New Items ::", newItems);

}

mergeArrays();
