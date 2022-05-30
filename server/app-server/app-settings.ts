/**
 * Copyright (c) 2021 Netix AB. -  Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { MsgType } from "@shared/messages/message-types";

export module CustomSettings {
	export const MuteDriverUpdateLog = true;
	export let MutedEvents: MsgType[] = [MsgType.DriverUpdate];
}
