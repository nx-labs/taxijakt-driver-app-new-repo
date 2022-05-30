/**
 * Copyright (c) 2021 Netix AB. -  Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { LoggingService }     from "@cmCore/services/logging.service";
import { BaseRestController } from "@cmRest/common/base.rest-controller";
import { IRestApiController } from "@cmRest/types/api-controller.type";
import { Logger }             from "@cmUtils/logger";
import { Response }           from "express";
import { Request }            from "express";
import { Router }             from "express";
import { injectable }         from "tsyringe";

@injectable()
export class AdminRestController extends BaseRestController implements IRestApiController {

	constructor(private logger: LoggingService) {
		super();
	}

	public initRoutes(routes: Router): IRestApiController {
		this.setupRoutes(this);
		routes.get("/getcars", this.getCars.bind(this));
		return this;
	}

	private async getCars(req: Request, resp: Response): Promise<void> {
		resp.json(
			{
				cars: [
					{
						name: "Kalles Bil"
					}
				]
			}
		);
	}
}
