/**
 * Copyright (c) 2021 Netix AB. -  Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { LoggingService }     from "@cmCore/services/logging.service";
import { BaseRestController } from "@cmRest/common/base.rest-controller";
import { IRestApiController } from "@cmRest/types/api-controller.type";
import { RealtimeServer }     from "@app/api/realtime-server";
import { Logger }             from "@cmUtils/logger";
import { CmLogger }           from "@shared/logging/cm-logger";
import { PhpClient }          from "@taxijakt/php-web-integration/php-client";
import { Router }             from "express";
import { Response }           from "express";
import { Request }            from "express";
import { injectable }         from "tsyringe";

@injectable()
export class AppRestController extends BaseRestController implements IRestApiController {
	constructor(
		private log: CmLogger,
		private rtServer: RealtimeServer,
				private taxijaktApp: PhpClient
	) {
		super();
	}

	public initRoutes(routes: Router): IRestApiController {
		this.setupRoutes(this);
		routes.get("/status", this.getSystemStatus.bind(this));
		routes.get("/testOldApi", this.testOldApi.bind(this));

		return this;
	}

	private async getSystemStatus(req: Request, resp: Response): Promise<void> {
		resp.json(
			{
				"connectedClients": this.rtServer.clientCount()
			}
		);
	}

	private async testOldApi(req: Request, resp: Response): Promise<void> {
		log.logRed("Testing old API");

		try {
			let loginRes = await this.taxijaktApp.loginUser("+48888777657", "1");

			this.log.logCyan("AppRestController :: testOldApi :: HTTP RES :::", loginRes);

			resp.json(
				{
					loginResult: loginRes
				}
			);
		}
		catch (e) {
			log.error("AppRestController :: testOldApi :: Failed ::", e);
		}
	}
}
