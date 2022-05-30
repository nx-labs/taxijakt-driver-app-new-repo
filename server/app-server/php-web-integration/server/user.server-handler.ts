/**
 * Copyright (c) 2021 Netix AB. -  Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { injectable }     from "tsyringe";
import { PhpClient }      from "@taxijakt/php-web-integration/php-client";
import { IServerHandler } from "./server-handler";
import { IMessage }       from "@cmCore/messages/message-types";
import { CmEventService } from "@cmEvents/cm-event.service";
import { Logger }         from "@cmUtils/logger";

const log = Logger;

@injectable()
export class UserServerHandler implements IServerHandler {
	constructor(
		private eventService: CmEventService,
		private taxijaktPhpCli: PhpClient
	) {
	}

	public processMessage(msg: IMessage): Promise<IMessage> {
		return Promise.resolve(undefined);
	}

	public async loginUser(msg: IMessage): Promise<IMessage> {
		console.log("***** UserServerHandler ::: LOGIN :::: ********");
		try {
			let loginRes = await this.taxijaktPhpCli.loginUser(
				msg.data.user,
				msg.data.pass
			);

			msg.data = loginRes;

			log.callerLog(this, "loginUser", loginRes);
		}
		catch (e) {
			log.callerError(this, "loginUser", e);
		}

		return msg;
	}
}
