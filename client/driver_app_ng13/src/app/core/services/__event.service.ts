/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 *

import { Injectable }   from '@angular/core';
import { Observable }   from "rxjs";
import { Subject }      from "rxjs";
import { tap }          from "rxjs/operators";
import { filter }       from "rxjs/operators";
import { v4 as uuidv4 } from 'uuid';

export enum EventType {
}

export interface IEvent {
	eventType: EventType;
	eventTag?: string;
	eventMessage?: string;
	eventData?: any
}


@Injectable(
	{
		providedIn: 'root'
	})
export class EventService {
	protected appEvent = new Subject<INxEvent>();

	public eventStream: Observable<INxEvent>;

	constructor() {
		this.eventStream = this.appEvent.asObservable();
	}

	public onEvent(...types: EventType[]): Observable<INxEvent> {
		const _func = "_EventService::onEvent";

		return this.eventStream.pipe(
			tap(
				val => {
					console.log("ON EVENT TAP :::", val);
				}
			),

			filter((val: INxEvent) => {
				return true; //types.length ? types.indexOf(val.eventType) > -1: true
			}),
		);
	}

	public publishEvent(type: EventType, data?: any, message?: string): string {
		let event: INxEvent = {
			eventType:    type,
			eventMessage: message,
			eventData:    data
		}

		return this.pushEvent(event);
	}


	public pushEvent(event: INxEvent): string {
		event.eventTag = uuidv4();
		console.log("EventService :: pushEvent ::", event);
		this.appEvent.next(event);
		return event.eventTag;
	}
}
*/
