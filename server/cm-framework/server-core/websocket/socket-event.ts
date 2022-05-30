/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { IMessage } from "@cmCore/messages/message-types";

export interface ISocketEvent {
	eventType?: string,
	socketId?: string,
	jsonPayload: IMessage
}
