/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { EventReceiver } from "./event-emitter";
import { Emitter }       from "./event-emitter";
import { EventKey }      from "./event-emitter";

export class CmEventEmitter<T extends Record<string, any>> implements Emitter<T> {
	private emitter = new CmEventEmitter();
	on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>) {
		this.emitter.on(eventName, fn);
	}

	off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>) {
		this.emitter.off(eventName, fn);
	}

	emit<K extends EventKey<T>>(eventName: K, params: T[K]) {
		this.emitter.emit(eventName, params);
	}
}
