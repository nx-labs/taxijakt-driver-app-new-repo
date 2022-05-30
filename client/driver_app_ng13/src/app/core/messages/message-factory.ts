/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { IMessage } from "./message-types";

export class MessageFactory {
	public static compileMessage(messageType: number, messageData: any): IMessage {
		return {
			type:      messageType,
			data:      messageData,
			timestamp: Date.now()
		};
	}
}0
