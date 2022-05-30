/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Input }               from "@angular/core";
import { Component }           from '@angular/core';
import { OnInit }              from '@angular/core';
import { NxEvent }             from "@nxApp/events/nx-event-types";
import { INxEvent }            from "@nxApp/events/nx-event";
import { NxEventService }      from "@nxApp/events/nx-event.service";
import { NxAppService }        from "@nxApp/services/nx-app.service";
import { IDriverResponseData } from "@nxApp/types/update-response-data.type";

@Component(
	{
		selector   : 'nx-header',
		templateUrl: './nx-header.component.html',
		styleUrls  : [ './nx-header.component.scss' ],
	})
export class NxHeaderComponent implements OnInit {
	public nxHeaderClass = "std";
	public title: string;
	private showWarning: boolean = false;

	points: number;
	membership: string;

	@Input() driverActive: boolean = false;
	@Input() onlyLogo: boolean = false;

	constructor(
		private nxEvents: NxEventService,
		private appService: NxAppService) {

		nxEvents.onNewEvent().subscribe((value: INxEvent) => {
			switch (value.eventType) {
				case NxEvent.DriverUpdate:
					let driverData: IDriverResponseData = value.eventData;

					this.points = driverData.info.points;
					this.membership = driverData.info.mode.is_basic ? "BASIC" : "PRO";

					break;
			}
		});

	}

	ngOnInit() { }

	public hideWarning(value: boolean): boolean {
		this.showWarning = false;
		return true;
	}

	public warningVisible(): boolean {
		return this.showWarning;
	}

	public showGpsWarning(): boolean {
		this.showWarning = true;

		return true;
	}
}
