/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export enum NxEvent {
	Login,
	SetBusy,
	GetSessionOrders,
	ActiveOrders,
	ShowModal,
	AppWideData,
	NewOrder,
	Heartbeat,
	SetStatus,
	DriverLogin,
	DriverData,
	DriverUpdate,
	Orders,
	SelectrCar
}

export module NxEventTypes {
	export module Booking {
		export const NewBooking     = 100;
		export const AcceptBooking  = 101
		export const ShowBookingMap = 102
	}
}
