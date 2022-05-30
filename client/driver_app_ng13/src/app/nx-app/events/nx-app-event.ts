/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { IDriverMode } from "@nxApp/types/driver-update-response.type";
import { NxEvent }     from "./nx-event-types";
import { INxEvent }    from "./nx-event";

export class NxAppEventData {
	public isPro?: boolean;
	public points?: number;
	public locale: string = "en";
	public likes: number = 0;
	public dislikes: number = 0;

	public readonly isBusy: boolean = false;
	public busyReason?: string;
	public busyUntil?: Date;

	constructor() {
		this.isBusy = (this.busyUntil && this.busyUntil.getMilliseconds() > new Date().getMilliseconds());
//		this.isPro =
	}

	public getProLabel(): string {
		return this.isPro ? "PRO" : "BASIC";
	}
}

export class NxAppEvent implements INxEvent{
	public eventType: number = NxEvent.AppWideData;
	public eventData = new NxAppEventData();

	constructor(public eventTag?: string) {}

	public setDriverMode(mode: IDriverMode): void {
		this.eventData.isPro = mode && (!mode.is_basic || mode.is_temporary_pro);
	}

}
