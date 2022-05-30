/**
 * Copyright (c) 2021 Netix AB. -  Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { singleton } from "tsyringe";

@singleton()
export class PConsole {
	private queue: Array<string>;
	constructor() {
	}

	public log(label: string, ...data: Array<any>) {
		console.log(label, data);
	}

}
