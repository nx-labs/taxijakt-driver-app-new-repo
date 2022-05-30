/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Injectable }            from '@angular/core';
import { IMessage }              from "@core/messages/message-types";
import { ApiClientService }      from "@core/services/api-client.service";
import { GeoService }            from "@core/services/geo.service";
import { LoggingService }        from "@core/services/logging.service";
import { SocketService }         from "@core/services/socket.service";
import { StorageService }        from "@core/services/storage.service";
import { StorageKeys }           from "@nxApp/app.const";
import { IBookingEntry }         from "@nxApp/services/booking/booking-entry.type";
import { INxAppService }         from "@nxApp/services/nx-app.service";
import { IApiLoginRes }          from "@nxApp/types/api-login-response.type";
import { ITJWebDriver }          from "@nxApp/types/api-login-response.type";
import { Subject }               from "rxjs";
import { MsgType }               from "@shared/messages/message-types";
import { DriverApiService }      from "@api/driver-api.service";
import { NxEvent }               from "@nxApp/events/nx-event-types";
import { INxEvent }              from "@nxApp/events/nx-event";
import { NxEventService }        from "@nxApp/events/nx-event.service";
import { DriverModeType }        from "./driver-mode";

@Injectable(
	{
		providedIn: 'root'
	}
)
export class DriverService implements INxAppService {
	driverMode = new Subject<DriverModeType>();

	isLoggedIn: boolean = false;
	driverId: number;
	driverData: ITJWebDriver;
	session: string;
	cardsIdent: string;
	orderActive: boolean = false;
	bookings = new Map<string, IBookingEntry>();

	firstUpdate = true;

	constructor(
		private logger: LoggingService,
		private storage: StorageService,
		private apiService: ApiClientService,
		private nxEvents: NxEventService,
		private socketService: SocketService,
		private driverApiService: DriverApiService,
		private geoService: GeoService
	) {
		/*
		socketService.dataStream.subscribe(
			(mess: IMessage | any) => {
				if (mess.type === MsgType.DriverUpdate) {
					let rawJson = JsonConverter.toString<string>(mess.data);
					let driverUpdateData = JsonConverter.toType<IDriverUpdateResponse>(rawJson);

					//console.log("DDDDRIVER UPDATE ::::", mess);

					let driverData: ITJWebDriver;

					if ((mess.data && !mess.data?.data) || (!mess.data)) {
						return;
					} else {
						driverData = mess.data.data;

						if (!driverData.id) {
							return;
						}
					}

					if (this.firstUpdate) {

						console.log("driverService :: driverData ::", driverData);

						let appEventData = {
							driver: {
								id: driverData.id,
								status: driverData.status,
								points: driverData.points,
								likes: driverData.likes,
								dislikes: driverData.dislikes,
								fullData: driverData,
						}}

						nxEvents.pushNewEvent(NxEvent.AppWideData, appEventData);
					}
				}
			}
		);
		*/
		nxEvents.eventStream.subscribe(
			(value: INxEvent) => {
				if (value.eventType === NxEvent.DriverLogin) {
					console.log("STORAGE :: SOCKET MESS ::", value.eventData);
				}

				if (value.eventType !== MsgType.DriverUpdate) {
					//console.log("DriverService :: NxEvent ::", value);
				}

				this.handleEvent(value);
			}
		);
	}

	public async setDriverBusy(): Promise<void> {
	}

	public async pushDriverDataEvent(data: ITJWebDriver): Promise<void> {
		this.nxEvents.pushNewEvent(NxEvent.DriverData, data);
	}

	public async triggerStoredData(): Promise<void> {
		let data = await this.storage.getAs<ITJWebDriver>(StorageKeys.DriverData);

		if (!data) {
			console.log("DRIVER SERVICE ::: data MISSING", data )
		} else {
			this.pushDriverDataEvent(data);
		}
	}

	/**
	 * Driver auth functionality
	 * @param {IApiLoginRes} data
	 * @returns {Promise<void>}
	 */
	public async driverLogin(data?: IApiLoginRes) {
		if (data && data.driver && data.driver.id) {
			await this.storage.set(StorageKeys.DriverData, data.driver);
			let driverId = data.driver.id;

			console.log("driverService :: openDriverStart ::", data);

			this.driverData = data.driver;
			this.driverId   = data.driver.id;
			this.session    = data.web_session;
			this.cardsIdent = data.cards_identifier;

			this.isLoggedIn = true;

			this.pushDriverDataEvent(data.driver);
		}
	}

	public logOut() {
		this.isLoggedIn = false;
		this.driverData = null;
		this.driverId   = null;
		this.session    = null;
		this.cardsIdent = null;
	}

	public getDriverStatus(driverId: number) {
		this.driverApiService.getDriverStatus(driverId).subscribe(
			value => {
				console.log("SUBSCRIBED VALUE ::", value);
			}
		);

		this.nxEvents.pushNewEvent(NxEvent.ShowModal);
	}

	/**
	 * Push event to open new order modal
	 * @param {IBookingEntry} entry
	 */
	private newOrder(entry: IBookingEntry): void {
		this.nxEvents.pushEvent(
			{
				eventType: NxEvent.NewOrder,
				eventData: entry
			}
		);
	}

	private storeOrders(orders: Array<IBookingEntry>): void {
		for (let order of orders) {
			if (!this.bookings.get(order.id)) {
				this.bookings.set(order.id, order);
				this.newOrder(order);
			}
		}
	}

	public handleEvent(event: INxEvent) {
		if (!this.isLoggedIn) return;

		switch (event.eventType) {
			case NxEvent.DriverLogin:
				console.log("DRIVER LOGIN ***", event);
				break;

			case NxEvent.DriverUpdate:
				if (event.eventData.availOrders) {
					// console.log("DriverService :: NxEvent.DriverUpdate ::", event.eventData.availOrders)

					let orders: Array<IBookingEntry> = event.eventData.availOrders;
					this.storeOrders(orders);

					for (let order of orders) {
						//console.log(order.driver_popup_message)
						break;
					}
				}

				break;

			case NxEvent.Heartbeat:
				this.geoService.getPosition().then(res => {

					let data = {
						lat     : res.coords.latitude,
						lon     : res.coords.longitude,
						accuracy: res.coords.accuracy
					}

					this.socketService.sendMessage(
						{
							type: MsgType.DriverUpdate,
							data: data
						}
					);
				}).catch(err => {
					console.error("geoService.getPosition ::", err);
				});
		}
	}

	/**
	 * Read back driver data stored upon login
	 * @returns {Promise<boolean>}
	 */
	private async restoreDriverData(): Promise<boolean> {
		let result = true;

		try {
			this.driverData = await this.storage.get(StorageKeys.DriverData);
			if (!this.driverData || !this.driverData.id
			) {
				result = false;
			}
		}
		catch
			(e) {
			this.logger.error("restoreDriverData ::", e);
			result = false;
		}

		return result;
	}

}
