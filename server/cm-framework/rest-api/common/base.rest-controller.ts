/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Crayon }             from "@cmUtils/crayon";
import { IRestApiController } from "../types/api-controller.type";
import { Router }             from "express";
import { Response }           from "express";

export class BaseRestController implements IRestApiController {
	constructor() {
	}

	protected init(controller?: IRestApiController) {
		if (controller) {
			console.log("*** Registering Rest Controller ::", controller.constructor.name);
		} else  {
			console.log("*** Registering Unknown Rest Controller");
		}
	}

	protected setupRoutes(controller: IRestApiController): void {
		Crayon.cyan("Initializing routes for ::", controller.constructor.name);
	}

	public initRoutes(routes: Router): IRestApiController {
		return this;
	}

	protected apiError(resp: Response, code?: number): void {
		resp.json(
			{
				code: !code ? 501 : code
			}
		);
	}
}
