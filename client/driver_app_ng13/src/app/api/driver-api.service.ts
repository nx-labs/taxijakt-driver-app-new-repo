/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Injectable }       from '@angular/core';
import { IApiMessage }      from "@core/messages/message-types";
import { ApiClientService } from "@core/services/api-client.service";
import { SocketService }    from "@core/services/socket.service";
import { INxEvent }         from "@nxApp/events/nx-event";
import { NxEvent }          from "@nxApp/events/nx-event-types";
import { NxEventService }   from "@nxApp/events/nx-event.service";
import { DriverCarOptions } from "@shared/driver/driver-car-options";
import { IUserMessage }     from "@shared/messages/message-types";
import { MsgType }          from "@shared/messages/message-types";
import { IMessage }         from "@shared/messages/message-types";
import { generateTag }      from "@utils/tag-generator";
import { Observable }       from "rxjs";
import { filter }           from "rxjs";
import { ApiFactory }       from "@api/api-factory";

@Injectable(
	{
		providedIn: 'root'
	})
export class DriverApiService {

	constructor(
		private nxEvents: NxEventService,
		private messageFactory: ApiFactory,
		private socketService: SocketService,
		private apiClient: ApiClientService,
	) {
		nxEvents.onNewEvent().subscribe((value: INxEvent) => {
			switch (value.eventType) {
				case NxEvent.SetStatus:
					this.setDriverStatus(value.eventData);
					break;

				case NxEvent.SetBusy:
					this.setDriverBusy(value.eventData);
					break;
			}
		});
	}

	public getDriverStatus(driverId: number): Observable<IMessage> {
		let msg = this.messageFactory.newUserMessage(
			MsgType.DriverGetInfo,
			driverId
		);

		return this.socketService.emitMessage<IMessage>(msg);
	}

	public getDriverOrder(orderId: string): Observable<IMessage> {
		let msg = this.messageFactory.simpleMessage(
			MsgType.GetDriverOrder,
			{
				orderId: orderId
			}
		)

		return this.socketService.sendMessage(msg);
	}

	/**
	 * Get a list of cars registered to the driver
	 * @param uuid
	 * @param {number} driverId
	 * @returns {<IMessage>}
	 */
	public getDriverCars(): Observable<any> {
		let msg: IMessage = {
			type: MsgType.GetCars
		}

		const tag = generateTag();

		const res = this.socketService.cmStream.pipe(
			filter((value: IMessage) => {
				const res = value.type === MsgType.GetCars;
				if (res) console.log("getDriverCars :: PARSE TAG MESS ::", res, ":::", value);
				return res;
			})
		);

		this.socketService.sendMessage(msg, tag);

		return res;
	}

	/**
	 * Select car
	 * @returns {<any>}
	 */
	public setCurrentCar(options: DriverCarOptions): Observable<any> {
		let msg: IMessage = {
			type: MsgType.SetCurrentCar,
			data:  !options ? new DriverCarOptions().compile() : options.compile()
		}

		const tag = generateTag();

		const res = this.socketService.cmStream.pipe(
			filter((value: IMessage) => {
				return value.type === MsgType.SetCurrentCar && value.tag == tag;
			})
		);

		this.socketService.sendMessage(msg, tag);

		return res;
	}

	public authenticate(username: string, password: string): Observable<any> {
		let msg: IUserMessage = {
			type: MsgType.DriverLogin,
			data: {
				user: username,
				pass: password
			}
		}

		const tag = generateTag();

		const res = this.socketService.cmStream.pipe(
			filter((value: IMessage) => {
				const res = value.type === MsgType.DriverLogin && value.tag == tag;

				try {
					if (res) {
						const apiMessage: IApiMessage = value.data;
						if (apiMessage.success) {
							this.nxEvents.pushNewEvent(NxEvent.DriverLogin);
						}
					}
				} catch (e) {
					console.error("DriverApiService ::", e);
				}


				return res;

			})
		);

		this.socketService.sendMessage(msg, tag);

		return res;
	}

	public setDriverStatus(status: string): Observable<any> {
		let msg: IMessage = {
			type: MsgType.SetDriverStatus,
			data:  status
		}

		return  this.socketService.sendMessage(msg);
	}

	public setDriverBusy(min: number, reason?: string): Observable<any> {
		let msg: IMessage = {
			type: MsgType.SetDriverBusy,
			data:  { minutes: min }
		}

		return this.socketService.sendMessage(msg);
	}
}
