/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import * as express from "express";

export class CommonRoutesConfig {
	app: express.Application;
	name: string;

	constructor(app: express.Application, name: string) {
		this.app  = app;
		this.name = name;
	}

	getName() {
		return this.name;
	}
}
