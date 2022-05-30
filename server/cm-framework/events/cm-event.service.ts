/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Logger } from "@cmUtils/logger";
import { filter } from "rxjs";
import { tap }          from "rxjs";
import { Subject }      from "rxjs";
import { Observable }   from "rxjs";
import { singleton }    from "tsyringe";
import { v4 as uuidv4 } from 'uuid';

export interface ICmEvent {
	eventType: number;
	eventTag?: string;
	eventMessage?: string;
	eventData?: any
}

export enum CmEventType {
	Bootstrap
}

export interface ICmEventService {
	eventStream: Observable<ICmEvent>;
	onEvent(...types: number[]): Observable<ICmEvent>;
	publishEvent(type: number, data?: any, message?: string): string;
	pushEvent(event: ICmEvent): string;
}

@singleton()
export class CmEventService implements ICmEventService {
	protected appEvent = new Subject<ICmEvent>();
	public eventStream: Observable<ICmEvent>;

	constructor() {
		this.eventStream = this.appEvent.asObservable();
	}

	public onEvent(...types: number[]): Observable<ICmEvent> {
		const _func = "_EventService::onEvent";

		return this.eventStream.pipe(
			tap(
				val => {
					Logger.log("CmEventService :: ON EVENT TAP :::", val);
				}
			),

			filter((val: ICmEvent) => {
				return types.length ? types.indexOf(val.eventType) > -1 : true
			}),
		);
	}

	public publishEvent(type: number, data?: any, message?: string): string {
		let event: ICmEvent = {
			eventType   : type,
			eventMessage: message,
			eventData   : data
		}

		return this.pushEvent(event);
	}

	public pushEvent(event: ICmEvent): string {
		console.log("<<< SERVICE >>> EventServiceTs :: pushEvent");
		event.eventTag = uuidv4();
		console.log("EventServiceTs :: pushEvent ::", event);
		this.appEvent.next(event);
		return event.eventTag;
	}
}
