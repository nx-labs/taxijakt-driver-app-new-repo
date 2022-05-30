/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 *
 * @Desc:
 * Main logic for the TaxiJakt Application, it´s mostly here
 * all the weird PHP stuff that originates from the current solution
 * is handled, muted and felt sorry for,,,
 *
 */
import { Injectable }     from '@angular/core';
import { IEventReceiver } from "@core/event-receiver";
import { NxEvent }        from "@nxApp/events/nx-event-types";
import { INxEvent }       from "@nxApp/events/nx-event";
import { NxEventService } from "@nxApp/events/nx-event.service";
import { ITJWebDriver }   from "@nxApp/types/api-login-response.type";

export interface INxAppService {
}

@Injectable(
	{
		providedIn: 'root'
	})
export class NxAppService implements INxAppService, IEventReceiver {
	public name: string = "NxAppService";
	tickCount: number = 0;
	heartMonitor: any;

	driverData: ITJWebDriver;

	constructor(
		private nxEvents: NxEventService
	) {
		nxEvents.registerEventListener(this);

		this.heartMonitor = setInterval(() => {
			this.heartBeat();
		}, 6000);
	}

	public onEvent(event: INxEvent) {
		switch (event.eventType) {
			case NxEvent.DriverLogin:
				console.log("DRIVER LOGIN EVNT ::", event.eventData);
				this.driverData = event.eventData;
				break;
		}
	}


	public gpsError(error?: any): void {

	}

	public heartBeat(): void {
		this.tickCount++;
		this.nxEvents.pushEvent({ eventType: NxEvent.Heartbeat });
	}
}
