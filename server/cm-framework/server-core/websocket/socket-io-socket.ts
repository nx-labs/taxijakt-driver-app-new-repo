/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export interface ISocketIO {
	id?:           string;
	connected?:    boolean;
	disconnected?: boolean;
	handshake?:    Handshake;
}

export interface Handshake {
	headers?: Headers;
	time?:    string;
	address?: string;
	xdomain?: boolean;
	secure?:  boolean;
	issued?:  number;
	url?:     string;
}

export interface Headers {
	host?:                       string;
	connection?:                 string;
	pragma?:                     string;
	"cache-control"?:            string;
	"user-agent"?:               string;
	upgrade?:                    string;
	origin?:                     string;
	"sec-websocket-version"?:    string;
	"accept-encoding"?:          string;
	"accept-language"?:          string;
	cookie?:                     string;
	"sec-websocket-key"?:        string;
	"sec-websocket-extensions"?: string;
}

// Converts JSON strings to/from your types
export class IOTypes {
	public static toSocket(json: string): ISocketIO {
		return JSON.parse(json);
	}

	public static sockeJson(value: ISocketIO): string {
		return JSON.stringify(value);
	}
}
