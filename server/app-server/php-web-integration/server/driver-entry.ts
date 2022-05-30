/**
 * Copyright (c) 2021 Netix AB. -  Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { ISrvDriverData }  from "@taxijakt/types/driver-data.type";
import { ISrvDriverEntry } from "@taxijakt/types/driver-entry.type";

export class DriverEntry implements ISrvDriverEntry {
	public dataHash: string        = null;
	public availOrdersHash: string = null;
	public messagesHash: string    = null;
	public ordersHash: string      = null;

	public data: ISrvDriverData;

	constructor(public uuid: string, public id: string, data: ISrvDriverData) {
		this.data = data;
	}
}
