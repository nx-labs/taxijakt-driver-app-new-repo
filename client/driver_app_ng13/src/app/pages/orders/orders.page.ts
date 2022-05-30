/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { isPlatformBrowser }        from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { IEventReceiver }           from "@core/event-receiver";
import { IMessage }                 from "@core/messages/message-types";
import { NxEvent }                  from "@nxApp/events/nx-event-types";
import { INxEvent }                 from "@nxApp/events/nx-event";
import { NxEventService }           from "@nxApp/events/nx-event.service";
import { NxAppManagerService }      from "@nxApp/nx-app-manager.service";
import { OrderApiService }          from "@root/api/order-api.service";

@Component(
	{
		selector   : 'app-orders',
		templateUrl: './orders.page.html',
		styleUrls  : [
			'./styles/orders.page.scss'
		]
	})
export class OrdersPage implements AfterViewInit, IEventReceiver {
	public name: string = "OrdersPage";

	constructor(
		public nxAppService: NxAppManagerService,
		private nxEvents: NxEventService,
		private orderApiService: OrderApiService
	) {
		nxEvents.registerEventListener(this, NxEvent.Orders);

		orderApiService.getOrders().subscribe(
			(event: IMessage) => {
				console.log("GET ORDERS SUBSCRIPTION ::", event);
			}
		);
	}

	public onEvent(event: INxEvent): void {
		switch (event.eventType) {
			case NxEvent.Orders:
				console.log("OrdersPage :: ORDERS", event);
				break;
		}
	}
	// Disable side menu for this page
	ionViewDidEnter(): void {
	}

	// Restore to default when leaving this page
	ionViewDidLeave(): void {
	}

	ngAfterViewInit(): void {
	}
}
