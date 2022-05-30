/**
 * Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

import { LoggingService }     from "@cmCore/services/logging.service";
import { BaseRestController } from "@cmRest/common/base.rest-controller";
import { IRestApiController } from "@cmRest/types/api-controller.type";
import { Router }             from "express";
import { Response }           from "express";
import { Request }            from "express";
import { injectable }         from "tsyringe";

@injectable()
export class MessagesRestController extends BaseRestController implements IRestApiController {
	constructor(private logger: LoggingService) {
		super();
	}

	public initRoutes(routes: Router): IRestApiController {
		this.setupRoutes(this);
		routes.get("/message", this.sendMessage.bind(this));

		return this;
	}

	private async sendMessage(req: Request, resp: Response): Promise<void> {
		let id: any   = req.query.id;
		let body: any = req.query.body;

		resp.json(
			{
				"id": id,
				"body": body
			}
		);
	}
}
