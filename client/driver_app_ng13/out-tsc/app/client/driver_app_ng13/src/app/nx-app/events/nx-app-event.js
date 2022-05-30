/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { NxEvent } from "./nx-event.service";
export class NxAppEventData {
    constructor() {
        this.locale = "en";
        this.likes = 0;
        this.dislikes = 0;
        this.isBusy = false;
        this.isBusy = (this.busyUntil && this.busyUntil.getMilliseconds() > new Date().getMilliseconds());
        //		this.isPro =
    }
    getProLabel() {
        return this.isPro ? "PRO" : "BASIC";
    }
}
export class NxAppEvent {
    constructor(eventTag) {
        this.eventTag = eventTag;
        this.eventType = NxEvent.AppWideData;
        this.eventData = new NxAppEventData();
    }
    setDriverMode(mode) {
        this.eventData.isPro = mode && (!mode.is_basic || mode.is_temporary_pro);
    }
}
