/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
export interface IBaseMessage {
	type: number,
}

export interface IMessage extends IBaseMessage{
	uuid?: string,
	tag?: string,
	data?: any
	timestamp?: number
}

export interface IUserMessage extends IMessage {
	uid?: number;
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
