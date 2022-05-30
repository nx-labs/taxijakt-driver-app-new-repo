/**
 * Copyright (c) 2021 Netix AB. -  Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { ISrvDriverData } from "@taxijakt/types/driver-data.type";

export interface ISrvDriverEntry {
	uuid: string;
	id: string;
	dataHash: string;
	messagesHash: string,
	ordersHash: string;
	availOrdersHash: string;
	lat?: number,
	lon?: number,
	accuracy?: number
	data: ISrvDriverData;
}

