/**
 * Copyright (c) 2021 Netix AB. -  Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

// customer-app/rest-api/controllers/app.rest-controller.ts:9

import { RealtimeServer } from "@app/api/realtime-server";
import { ISocketEvent }   from "@cmCore/websocket/socket-event";
import { Logger }         from "@cmUtils/logger";
import { AppConfig }      from "@shared/app.config";
import { MsgType }        from "@shared/messages/message-types";
import { PhpClient }     from "@taxijakt/php-web-integration/php-client";
import { TaxiAppServer } from "@app/app-server";
import { singleton }     from "tsyringe";
import { ICmApplication } from "@cmCore/cm-application";
import { WebApi }         from "@cmRest/webapi";

const log = Logger;

@singleton()
export class AppMain implements ICmApplication {
	constructor(
		private rtServer: RealtimeServer,
		private appWebApi: WebApi,
		private appServer: TaxiAppServer,
		private taxijaktApp: PhpClient
	) {
		/*
		 rtServer.eventStream.subscribe(
			 (event: ISocketEvent) => {
				 console.log("(SUB) eventStream Data ::", event);

				 if (event.jsonPayload) {
					 //this.processMessage(event.message);
				 }
			 }
		 )
		 */

		rtServer.listen(AppConfig.WebSocketPort);

		log.logGreen("App Main Started!");
	}
}
