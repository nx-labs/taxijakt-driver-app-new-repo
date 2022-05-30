/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export enum MsgType {
	Ping                 = 222000,
	Pong                 = 100001,

	UpdateDriverData     = -40,
	DebugBooking         = -30,
	ShowDebug            = -20,
	Error                = -10,
	Connect              = 0,
	Disconnect           = 1,
	DriverLogin          = 2,
	DriverLogOut         = 3,
	DriverGetInfo        = 4,
	DriverUpdate         = 5,
	GetDriverOrder       = 6,
	GetOrdersBySession   = 7,
	GetMessagesBySession = 8,
	AcceptOrder          = 9,
	DenyOrder            = 10,
	CompleteOrder        = 11,
	CustomerNoShow       = 12,
	CantCompleteOrder    = 13,
	GetCars              = 14,
	SetCurrentCar        = 15,
	NeedReauthentication = 16,
	LoggedOut            = 17,
	SetDriverStatus      = 18,
	SetDriverBusy        = 19,
	GetRawData           = 544
}

export interface IBaseMessage {
	type: number,
}

export interface IMessage extends IBaseMessage {
	uuid?: string;
	tag?: string;
	data?: any;
	errorMessage?: string;
	timestamp?: number;
}

export interface IWebMessage extends IMessage {
	webCookie?: string;
}

export interface IUserMessage extends IBaseMessage, IMessage {
	uid?: number;
}

export class Message implements IBaseMessage {
	public type: number;

	public static ofType(value: number, msg: IMessage): boolean {
		return value === ( msg.type ? msg.type : "" );
	}
}

//////////////////////////////////////////////////
//
// Api Messages
//

export enum ApiAttributeType {
	Error       = 'error',
	Message     = 'information',
	Information = 'information'
}

export interface IApiEntity {
	name?: string
}

export interface IApiAttribute extends IApiEntity {
	type: ApiAttributeType | string,
	code?: number,
	text?: string
}

export interface IApiResponse {
	success: boolean,
	error?: Error | any,
	headers?: any,
	data?: any | IApiAttribute[]
}
