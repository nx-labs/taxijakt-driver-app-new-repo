/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { MsgType }          from "@shared/messages/message-types";
import { IMessage }         from "@cmCore/messages/message-types";
import { SocketEventTypes } from "@cmCore/messages/socket-message";
import { ISocketEvent }     from "@cmCore/websocket/socket-event";
import { ISocketIO }        from "@cmCore/websocket/socket-io-socket";
import { SocketRepository } from "@cmCore/websocket/socket-repository";
import { Observable }       from "rxjs";
import { Subject }          from "rxjs";
import { log }              from "@cmUtils/logger";

const app    = require('express')();
const server = require('http').createServer(app);
const io     = require('socket.io')(server, {
	cors: { origin: '*' }
});

let sck = require('socket.io');

const socketOpt = {
	cors: {
		origin: [ "*" ],
	}
}

export class IoServer {
	private messageEvents = new Subject<IMessage>();
	private socketEvents  = new Subject<ISocketEvent>();
	private socketRepo    = new SocketRepository();

	public messageStream: Observable<IMessage>;
	public eventStream: Observable<ISocketEvent>;

	constructor() {
		this.initializeEvents();
		this.messageStream = this.messageEvents.asObservable();
		this.eventStream   = this.socketEvents.asObservable();
	}

	public listen(port: number): Promise<boolean> {
		return new Promise((resolve, reject) => {
			try {
				server.listen(port, () => {
					resolve(true);
				});
			}
			catch (e) {
				reject(e);
			}
		});
	}

	public clientCount(): number {
		return this.socketRepo.clientCount()
	}

	public async sendTo(socketId: string, data: any): Promise<void> {
		const cliSocket: any = io.sockets.sockets.get(socketId);

		if (cliSocket) {
			cliSocket.emit(SocketEventTypes.Message, data);
		}
		else {
			log("ioServer :: emitById ::", "SOCKET NOT COUNT ::", socketId);
		}
	}

	public broadcast(msg: IMessage): void {
		console.log("Broadcast Message ::", msg);
		io.emit(SocketEventTypes.Connection, msg);
	}

	public async sendMessage(type: MsgType, uuid: string, payload?: any, tag?: string): Promise<void> {
		let message: IMessage = {
			type: type,
			uuid: uuid,
			data: payload,
			tag : tag
		}

		return await this.emit("sendMessage", message);
	}

	public async reply(msg: IMessage, payload?: any): Promise<void> {
		return await this.sendMessage(msg.type, msg.uuid, payload, msg.tag);
	}

	//
	// 11 nov 2014, 30 jan 2015

	public async emit(from: string, msg: IMessage, socketId?: string): Promise<void> {
		if (msg.uuid) {
			socketId = await this.socketRepo.findByUUID(msg.uuid);

			//if (msg.type == 5)
			//console.log(`IoServer :: emit :: socket id for UUID ${ msg.uuid }  ::`, msg);
		}

		if (socketId) {
			this.sendTo(socketId, msg);
		}
		else {
			if (msg.type != 5)
				console.log("ioServer :: emit ::", "UUID and Socket ID Missing ::", msg);
		}
	}

	private serverSocketEvent(eventType: string, socketId: string, payload?: any) {
		console.log('EVENT ::', eventType, ' :: ', socketId, ' :: Payload ::', payload);

		let event: ISocketEvent = {
			eventType  : eventType,
			socketId   : socketId,
			jsonPayload: payload
		}

		if (eventType === SocketEventTypes.Disconnect) {
			this.socketRepo.disconnect(socketId);
		}

		if (eventType === SocketEventTypes.Message) {
			let uuid = ( payload as IMessage )?.uuid;

			this.socketRepo.storeUUID(uuid, socketId);

			if (event.jsonPayload as IMessage) {
				this.messageEvents.next(event.jsonPayload);
			}
		}

		this.socketEvents.next(event);
	}

	protected initializeEvents(): void {
		io.on(SocketEventTypes.Connection, (socket: ISocketIO | any) => {
			this.serverSocketEvent(SocketEventTypes.Connection, socket.id);

			socket.on(SocketEventTypes.Disconnect, () => {
				this.serverSocketEvent(SocketEventTypes.Disconnect, socket.id);
			});

			socket.on(SocketEventTypes.Message, (msg: IMessage) => {
				this.serverSocketEvent(SocketEventTypes.Message, socket.id, msg);
			});
		});
	}
}

const port = process.env.PORT || 3001;

