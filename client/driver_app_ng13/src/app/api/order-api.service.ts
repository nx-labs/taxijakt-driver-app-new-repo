/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Injectable }       from '@angular/core';
import { ApiClientService } from "@core/services/api-client.service";
import { SocketService }    from "@core/services/socket.service";
import { NxEvent }          from "@nxApp/events/nx-event-types";
import { INxEvent }         from "@nxApp/events/nx-event";
import { NxEventService }   from "@nxApp/events/nx-event.service";
import { IApiResponse }     from "@shared/messages/message-types";
import { IMessage }         from "@shared/messages/message-types";
import { MsgType }          from "@shared/messages/message-types";
import { generateTag }      from "@utils/tag-generator";
import { Observable }       from "rxjs";
import { filter }           from "rxjs/operators";
import { ApiFactory }       from "./api-factory";

export enum OrderAction {
	Accept,
	Deny,
	Complete,
	CustomerNoShow,
	CantDeliver
}

@Injectable(
	{
		providedIn: 'root'
	})
export class OrderApiService {
	constructor(
		private nxEvents: NxEventService,
		private messageFactory: ApiFactory,
		private socketService: SocketService,
		private apiClient: ApiClientService
	) {
		nxEvents.onNewEvent().subscribe((value: INxEvent) => {
			switch (value.eventType) {
				case NxEvent.GetSessionOrders:
					this.getActiveOrdersBySession().subscribe(
						value => {
							let data: IApiResponse = value.data;

							if (data.success && data?.data) {
								nxEvents.pushNewEvent(NxEvent.ActiveOrders, data.data);
							}
						}
					);
					break;
			}
		});
	}

	public getOrders(): Observable<IMessage> {
		let msg = this.messageFactory.simpleMessage(
			MsgType.GetOrdersBySession
		);

		return this.socketService.sendMessage(msg);
	}

	public getActiveOrdersBySession(): Observable<IMessage> {
		let msg: IMessage = {
			type: MsgType.GetOrdersBySession,
		};

		const tag = generateTag();

		const res = this.socketService.cmStream.pipe(
			filter((value: IMessage) => {
				return value.type === MsgType.GetOrdersBySession;
			})
		);

		this.socketService.sendMessage(msg, tag);

		return res;
	}

	public acceptOrder(orderId: string, source: string = "MARKET") {
		let msg: IMessage = {
			type: MsgType.AcceptOrder,
			data: {
				id    : orderId,
				source: source
			}
		};

		console.log("\n\n ACCEPT ORDEAR :::", msg);

		const tag = generateTag();

		const res = this.socketService.cmStream.pipe(
			filter((value: IMessage) => {
				return value.type === MsgType.AcceptOrder;
			})
		);

		this.socketService.sendMessage(msg, tag);

		return res;
	}

	public completeOrder(orderId: string, forceFinish?: boolean): Observable<IMessage> {
		let msg = this.messageFactory.simpleMessage(
			MsgType.CompleteOrder,
			{
				id               : orderId,
				driverForceFinish: forceFinish ? 1 : 0
			}
		);

		return this.socketService.sendMessage(msg);
	}

	public cantDeliver(orderId: string): Observable<IMessage> {
		let msg = this.messageFactory.simpleMessage(
			MsgType.CantCompleteOrder, { id: orderId }
		);

		return this.socketService.sendMessage(msg);
	}

	public customerNoShow(orderId: string): Observable<IMessage> {
		let msg = this.messageFactory.simpleMessage(
			MsgType.CustomerNoShow, { id: orderId }
		);

		return this.socketService.sendMessage(msg);
	}

	public denyOrder(orderId: string): Observable<IMessage> {
		let msg = this.messageFactory.simpleMessage(
			MsgType.DenyOrder, { id: orderId }
		);

		return this.socketService.sendMessage(msg);
	}
}
