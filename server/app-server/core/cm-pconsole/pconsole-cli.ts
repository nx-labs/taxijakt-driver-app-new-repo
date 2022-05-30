/**
 * Copyright (c) 2021 Netix AB. -  Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Socket }     from "socket.io-client";
import { injectable } from "tsyringe";
const io = require('socket.io-client');

@injectable()
export class PConsolCli {
	socket: Socket;

	constructor() {
		this.socket = io.connect("wss://127.0.0.1:", { reconnect: true, transports: [ "websocket" ] });

		// Add a connect listener
		this.socket.on('connect', function() {
			console.log('Connected!');
		});

		//	this.socket = io.connect('ws://localhost:3000', { reconnect: true });

	}

	public doConnect() {
		this.socket.emit('CH01', 'me', 'test msg');
	}
}

const app = new PConsolCli();
app.doConnect();
