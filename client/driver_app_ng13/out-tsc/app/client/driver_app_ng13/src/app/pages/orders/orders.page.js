/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NxEvent } from "@nxApp/events/nx-event.service";
import { NxEventService } from "@nxApp/events/nx-event.service";
import { OrderApiService } from "../../api/order-api.service";
let OrdersPage = class OrdersPage {
    constructor(nxEvents, orderApiService) {
        this.nxEvents = nxEvents;
        this.orderApiService = orderApiService;
        this.name = "OrdersPage";
        nxEvents.registerEventListener(this, NxEvent.Orders);
        orderApiService.getOrders().subscribe((event) => {
            console.log("GET ORDERS SUBSCRIPTION ::", event);
        });
    }
    onEvent(event) {
        switch (event.eventType) {
            case NxEvent.Orders:
                console.log("OrdersPage :: ORDERS", event);
                break;
        }
    }
    // Disable side menu for this page
    ionViewDidEnter() {
    }
    // Restore to default when leaving this page
    ionViewDidLeave() {
    }
    ngAfterViewInit() {
    }
};
OrdersPage = __decorate([
    Component({
        selector: 'app-orders',
        templateUrl: './orders.page.html',
        styleUrls: [
            './styles/orders.page.scss'
        ]
    }),
    __metadata("design:paramtypes", [NxEventService,
        OrderApiService])
], OrdersPage);
export { OrdersPage };
