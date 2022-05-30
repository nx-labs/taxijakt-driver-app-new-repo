/**
 * Copyright (c) 2021 Netix AB. -  Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export enum DriverStatus {
	available          = 'AVAILABLE',
	waitingForResponse = 'WAITING_FOR_RESPONSE',
	acceptingOrder     = 'ACCEPTING_ORDER',
	hasCustomer        = 'HAS_CUSTOMER'
}
