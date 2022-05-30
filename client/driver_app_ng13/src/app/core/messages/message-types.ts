/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export enum MessageType {
	Ping,
	Pong
}

export enum MsgType {
	Connect = 0,
	Disconnect= 1,
	DriverLogin= 2,
	DriverGetInfo= 3,
	DriverUpdate = 4,
	GetOrders= 5,
	OrderAction= 6,
	NeedReauthentication= 15
}

export interface IMessage {
	type: number,
	uuid?: string,
	tag?: string,
	data: any
	timestamp?: number
}

export interface IUserMessage extends IMessage {
	uid?: number;
}

export interface IApiMessage {
	success: boolean,
	data?: any,
	error?: any | Error
}

