/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { LoggingService } from "@core/services/logging.service";
import { NxAppManagerService } from "@nxApp/nx-app-manager.service";
import { NxEvent } from "@nxApp/events/nx-event.service";
import { NxEventService } from "@nxApp/events/nx-event.service";
import { AppNavService } from "@nxApp/services/app-nav.service";
import { DriverService } from "@nxApp/services/driver/driver.service";
import { StorageService } from "@core/services/storage.service";
import { SelectCarModalComponent } from "@nxApp/modals/select-car-modal/select-car-modal.component";
import { OrderApiService } from "../../api/order-api.service";
import { DriverModel } from "../user/profile/driver.model";
let StartPage = class StartPage {
    constructor(orderApiService, logger, navService, nxEvents, driverService, storage, activeRoute, appData) {
        this.orderApiService = orderApiService;
        this.logger = logger;
        this.navService = navService;
        this.nxEvents = nxEvents;
        this.driverService = driverService;
        this.storage = storage;
        this.activeRoute = activeRoute;
        this.appData = appData;
        this.name = "StartPage";
        this.driverModel = new DriverModel();
        this.percentTilLowerComission = 0;
        this.percentTilLowerStyle = "";
        this.selectedCar = null;
        this.selectedCarData = null;
        this.driverModel.userImage = "/assets/nx-app/taxi-driver-128.png";
        nxEvents.onNewEvent().subscribe((value) => {
            switch (value.eventType) {
                case NxEvent.SelectrCar:
                    console.log("****** START PAGE :: DRIVER DATA :::::", value);
                    this.selectedCar = value.eventData;
                    this.selectedCarData = this.selectedCar.driverCarData;
                    break;
                case NxEvent.DriverUpdate:
                    let driverData = value.eventData;
                    this.driverModel.name = driverData.driverEntry.data.name;
                    this.driverModel.status = driverData.driverEntry.data.status;
                    this.driverModel.id = driverData.driverEntry.data.id;
                    break;
            }
        });
    }
    setPercentTilLowerCommission(value) {
        this.percentTilLowerComission = value;
        this.percentTilLowerStyle = `--value: ${this.percentTilLowerComission}`;
    }
    onEvent(event) {
        console.log("Start Page Event ::");
    }
    editCar() {
        let modalData = {
            modal: SelectCarModalComponent,
            bgDismiss: false,
            header: "Välj bil"
        };
        let cp = {
            eventType: NxEvent.ShowModal,
            eventData: modalData
        };
        this.nxEvents.pushEvent(cp);
    }
    ngOnInit() {
        if (this.storage.get("fromLogin")) {
            this.storage.remove("fromLogin");
            this.editCar();
        }
        this.driverService.triggerStoredData();
    }
    tebb() {
        this.orderApiService.getActiveOrdersBySession().subscribe((msg) => {
            console.log("SESSION ORDERS ::", msg);
        });
        /*
         let order: IBookingEntry = {
         id: "pokpokpok",
         from_formatted: "OOIIOJOJOIJOIJ",
         to_formatted: "OIJOIJOIJOIJ"
         }

         this.appData.handleAvailOrders([order, order]);
         */
    }
};
StartPage = __decorate([
    Component({
        selector: 'app-start',
        templateUrl: './start.page.html',
        styleUrls: [
            './styles/start.page.scss',
            './styles/start.shell.scss',
            './styles/start.responsive.scss'
        ]
    }),
    __metadata("design:paramtypes", [OrderApiService,
        LoggingService,
        AppNavService,
        NxEventService,
        DriverService,
        StorageService,
        ActivatedRoute,
        NxAppManagerService])
], StartPage);
export { StartPage };
