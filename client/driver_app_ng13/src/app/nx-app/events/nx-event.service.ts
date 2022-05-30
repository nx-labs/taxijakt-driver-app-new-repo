/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Injectable }      from '@angular/core';
import { IEventReceiver }  from "@core/event-receiver";
import { LoggingService }  from "@core/services/logging.service";
import { INxEvent }        from "@nxApp/events/nx-event";
import { Subject }         from "rxjs";
import { Observable }      from "rxjs";
import { filter }          from "rxjs/operators";
import { tap }             from "rxjs/operators";
import { IMessage }        from "@shared/messages/message-types";
import { INxBookingEvent } from "./nx-booking.event";
import { NxEventTypes }    from "./nx-event-types";
import { v4 as uuidv4 }    from 'uuid';

@Injectable(
	{
		providedIn: 'root'
	})
export class NxEventService {
	protected appEvent = new Subject<INxEvent>();
	public eventStream: Observable<INxEvent>;
	public listeners: Map<IEventReceiver, number[]>;

	constructor(
		private logger: LoggingService
	) {
		this.eventStream = this.appEvent.asObservable();
		this.listeners = new Map<IEventReceiver, number[]>();
	}

	public registerEventListener(listener: IEventReceiver, ...types: number[]): void {
		this.listeners.set(listener, types);
	}

	public unregisterEventListener(listener: IEventReceiver): boolean {
		return this.listeners.delete(listener);
	}

	public onNewEvent(...types: number[]): Observable<INxEvent> {
		const _func = "_EventService::onEvent";

		return this.eventStream.pipe(
			tap(
				val => {
					// console.log("NxEventService :: ON EVENT TAP :::", val);
				}
			),

			filter((val: INxEvent) => {
				return types.length ? types.indexOf(val.eventType) > -1 : true
			}),
		);
	}

	public onEvent(...types: number[]): Observable<INxEvent> {
		const _func = "_EventService::onEvent";

		return this.eventStream.pipe(
			tap(
				val => {
					// console.log("NxEventService :: ON EVENT TAP :::", val);
				}
			),

			filter((val: INxEvent) => {
				return types.length ? types.indexOf(val.eventType) > -1 : true
			}),
		);
	}

	public onEvent2(event?: INxEvent): void {
		console.log("NxEventService :: onEvent");

		for (let [ listener, events ] of this.listeners) {
			console.log("Listener ::", listener.name);
			let force = false;

			if (!events || events.length < 1) {
				force = true;
			}

			let trigger = events.length ? events.indexOf(event.eventType) > -1 : true;
			trigger     = trigger || !event;

			if (trigger || force) {
				console.log("DO Trigger ::", event.eventType);
				listener.onEvent(event);
			}
			else {
				console.log("NxEventService :: this.listeners ::", this.listeners);

			}
		}
	}

	public pushNewEvent(type: number, data?: any, message?: string): string {
		let event: INxEvent = {
			eventType   : type,
			eventMessage: message,
			eventData   : data
		}

		return this.pushEvent(event);
	}

	public pushEvent(event: INxEvent): string {
		event.eventTag = uuidv4();
		this.appEvent.next(event);
		return event.eventTag;
	}

	public newBookingEvent(data: INxBookingEvent): string {
		let serviceEvent: INxEvent = {
			eventType: NxEventTypes.Booking.NewBooking,
			eventData: data
		}

		return this.pushEvent(serviceEvent);
	}

	public acceptBooking(data: INxBookingEvent): string {
		let serviceEvent: INxEvent = {
			eventType: NxEventTypes.Booking.AcceptBooking,
			eventData: data
		}

		return this.pushEvent(serviceEvent);
	}
}
