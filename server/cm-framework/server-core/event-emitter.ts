/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

type EventMap = Record<string, any>;
type EventKey<T extends EventMap> = string & keyof T;
type EventReceiver<T> = (params: T) => void;

interface Emitter<T extends EventMap> {
	on<K extends EventKey<T>>
	(eventName: K, fn: EventReceiver<T[K]>): void;
	off<K extends EventKey<T>>
	(eventName: K, fn: EventReceiver<T[K]>): void;
	emit<K extends EventKey<T>>
	(eventName: K, params: T[K]): void;
}

function createEmitter<T extends EventMap>(): Emitter<T> {
	//return new EventEmitter();
	return null;
}

export { EventMap, EventKey, EventReceiver, Emitter }
