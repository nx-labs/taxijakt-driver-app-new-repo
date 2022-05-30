/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { IUserMessage } from "@core/messages/message-types";
import { MsgType }      from "@shared/messages/message-types";

export class ApiFactory {
	constructor() {}

	public static newTag(): string {
		return Math.random().toString(36).substr(2, 9);
	}

	public simpleMessage(messageType: MsgType, body?: any): IUserMessage {
		return {
			type:      messageType,
			data:      body,
			timestamp: Date.now()
		}
	}

	public newUserMessage(messageType: MsgType, userId: number, body?: any): IUserMessage {
		return {
			type:      messageType,
			uid:       userId,
			data:      body,
			timestamp: Date.now()
		}
	}
}
