/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export interface INxEvent {
	eventType: number, // NxEvent;6
	eventTag?: string;
	eventMessage?: string;
	eventData?: any
}
