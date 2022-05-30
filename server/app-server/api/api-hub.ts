/**
 * Copyright (c) 2021 Netix AB. -  Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { singleton }      from "tsyringe";
import { IApiHub }        from "@cmCore/api/api-hub";
import { IMessage }       from "@cmCore/messages/message-types";
import { Logger }         from "@cmUtils/logger";
import { RealtimeServer } from "@app/api/realtime-server";

const log = Logger;

@singleton()
export class ApiHub implements IApiHub {
	constructor(
		private logger: Logger,
		protected rtServer: RealtimeServer
	) {
	}

	public initialize() {
	}

	public sendMessage(message: IMessage): Promise<void> {
		console.log("Send Message ::", message);

		this.rtServer.broadcast(message);

		return new Promise((resolve, reject) => {
			resolve();
		});
	}
}
