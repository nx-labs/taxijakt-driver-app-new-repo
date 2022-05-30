/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Injectable }          from "@angular/core";
import { SocketService }       from "@core/services/socket.service";
import { INxEvent }            from "@nxApp/events/nx-event";
import { NxEvent }             from "@nxApp/events/nx-event-types";
import { NxEventService }      from "@nxApp/events/nx-event.service";
import { IBooking }            from "@nxApp/services/booking/booking-entry.type";
import { IBookingEntry }       from "@nxApp/services/booking/booking-entry.type";
import { IDriverResponseData } from "@nxApp/types/update-response-data.type";
import { DriverCarOptions }    from "@shared/driver/driver-car-options";
import { DriverStatus }        from "@shared/driver/driver-status";
import { IMessage }            from "@shared/messages/message-types";
import { DriverModel }         from "@shared/models/driver.model";
import { IDriverCar }          from "@shared/types/car.type";
import { Subject }             from "rxjs";
import { DriverStatusType }    from "../shared/driver/driver-status";
import { MsgType }             from "../shared/messages/message-types";
import { ITJWebDriver }        from "./types/api-login-response.type";

export enum UpdateType {
	NotSet,
	Driver,
	Orders,
	Status
}

export interface IDataModelUpdate {
	type: UpdateType,
	data: any;
}

@Injectable(
	{
		providedIn: "root"
	}
)
export class NxAppManagerService {
	private prevData: string = "";
	isLoggedIn: boolean      = false;
	public haveActiveOrder   = false;
	driverStatus             = new DriverStatus();

	public selectedCar: DriverCarOptions = null;
	public selectedCarData: IDriverCar   = null;

	bookings = new Array<IBookingEntry>();

	data: IDriverResponseData = null;

	private dataUpdated = new Subject<any>();
	private newOrder    = new Subject<IBooking>();

	public OnDataUpdate = this.dataUpdated.asObservable();
	public OnNewOrder   = this.newOrder.asObservable();

	public messages        = Array<any>();
	public marketOrders    = Array<IBookingEntry>();
	public availableOrders = Array<IBookingEntry>();

	private mutedOrderIds = new Array<string>();

	constructor(
		private socket: SocketService,
		private nxEvents: NxEventService
	) {
		socket.dataStream.subscribe((msg: IMessage) => {
			if (msg.type === MsgType.DriverUpdate && msg.data !== null) {
				this.handleResponseUpdate(msg.data);
			}
		});

		nxEvents.onNewEvent().subscribe((value: INxEvent) => {
			switch (value.eventType) {
				case NxEvent.SelectrCar:
					this.nxEvents.pushNewEvent(NxEvent.GetSessionOrders);
					this.nxEvents.pushNewEvent(NxEvent.SetStatus, DriverStatusType.Available);
					break;

				case NxEvent.ActiveOrders:
					let activeOrders: IBookingEntry[] = value.eventData?.orders;
					if (Array.isArray(activeOrders) && activeOrders.length > 0) {
						this.newOrder.next({
											   active   : true,
											   orderData: activeOrders[ 0 ]
										   });
						console.log("****** ORDERS :::", value.eventData?.orders);
						this.haveActiveOrder = true;
					}

					break;
			}
		});

	}

	public muteOrder(orderId: string): void {
		if (this.mutedOrderIds.indexOf(orderId) === -1) {
			this.mutedOrderIds.push(orderId);
		}
	}

	firstEvent = true;

	private handleResponseUpdate(data: IDriverResponseData): void {
		const dataStr = JSON.stringify(data);

		if (dataStr !== this.prevData) {
			this.prevData = dataStr;
			console.log("****** DRIVER UPDATE ::::", data);
		}

		this.nxEvents.pushNewEvent(NxEvent.DriverUpdate, data);

		if (this.firstEvent) {
			this.firstEvent = false;
		}

		this.data = JSON.parse(
			JSON.stringify(data)
		);

		if (Array.isArray(data.messages)) {
			this.messages = data.messages;
		}

		if (Array.isArray(data.orders)) {
			this.marketOrders = data.orders;
		}

		this.handleAvailOrders(data.availOrders);

		/*

		 this.driver         = data.driverEntry;
		 this.driverInfo     = data.info;
		 this.driverData     = data.driverEntry.data;
		 this.fullDriverData = data.driverEntry.data.data;
		 */

		if (this.data !== null) {
			this.doDataChange(UpdateType.Driver, this.data);
		}
	}

	public async handleAvailOrders(orders: Array<IBookingEntry>) {
		if (!orders || !Array.isArray(orders) || orders.length < 1) return;

		for (let order of orders) {
			if (this.mutedOrderIds.indexOf(order.id) === -1) {
				this.newOrder.next({
									   active   : false,
									   orderData: order
								   });

				break;
			}
		}
	}

	private doDataChange(updateType: UpdateType, data: any): void {
		let event: IDataModelUpdate = {
			type: updateType,
			data: data
		};

		this.dataUpdated.next(event);
	}
}
