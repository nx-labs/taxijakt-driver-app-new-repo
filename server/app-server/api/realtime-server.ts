/**
 * Copyright (c) 2021 Netix AB. -  Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { IoServer }  from "@cmCore/websocket/io-server";
import { singleton } from "tsyringe";

export interface IRealtimeServer {
	clientCount(): number;
}

@singleton()
export class RealtimeServer extends IoServer implements IRealtimeServer {
	constructor() {
		super();
	}
}
