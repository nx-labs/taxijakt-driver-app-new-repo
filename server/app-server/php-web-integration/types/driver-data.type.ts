/**
 * Copyright (c) 2021 Netix AB. -  Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { ITJWebDriver } from "@taxijakt/types/login-response.type";

export interface ISrvDriverData {
	id: string,
	uuid: string,
	name: string,
	status: string,
	webSession: string,
	jadi?: string
	cardsIdent?: string,
	lastUpdated: number;
	lastPong: number;
	data: ITJWebDriver,
}
