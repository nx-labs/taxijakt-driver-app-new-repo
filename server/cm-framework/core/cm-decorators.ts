/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

function annotateName(target, name, desc) {
	var method = desc.value;
	desc.value = function () {
		var prevMethod = this.currentMethod;
		this.currentMethod = name;
		method.apply(this, arguments);
		this.currentMethod = prevMethod;
	}
}
