/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { IUserMessage } from "./message-types";
import { IMessage }     from "./message-types";

export enum SocketEventTypes {
	Connection = 'connection',
	Message    = 'message',
	Disconnect = 'disconnect'
}

export class Message implements IMessage {
	public data: any;
	public timestamp: number;

	constructor(public type: number) {
		this.timestamp = Date.now();
	}
}

export class UserMessage implements IUserMessage {
	public timestamp: number;

	constructor(public type: number,
				public uid: number,
				public data: any
	) {
		this.timestamp = Date.now();
	}
}
