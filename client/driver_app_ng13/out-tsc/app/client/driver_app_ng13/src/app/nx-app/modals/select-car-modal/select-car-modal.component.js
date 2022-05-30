/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { DriverApiService } from "@api/driver-api.service";
import { SocketService } from "@core/services/socket.service";
import { StorageService } from "@core/services/storage.service";
import { ModalController } from "@ionic/angular";
import { NxEventService } from "@nxApp/events/nx-event.service";
import { NxEvent } from "@nxApp/events/nx-event.service";
import { DriverService } from "@nxApp/services/driver/driver.service";
import { DriverCarOptions } from "@shared/driver/driver-car-options";
import { EventEmitter } from "events";
let SelectCarModalComponent = class SelectCarModalComponent {
    constructor(modalController, driverService, apiService, storage, nxEvents, socketService) {
        this.modalController = modalController;
        this.driverService = driverService;
        this.apiService = apiService;
        this.storage = storage;
        this.nxEvents = nxEvents;
        this.socketService = socketService;
        this._optionsModel = new DriverCarOptions();
        this.onSelectCar = new EventEmitter();
        this.uuid = "";
        this.carSelected = false;
        this.carModel = null;
        this.uuid = socketService.uuid;
        this.onSelectCar.on(NxEvent.SelectrCar, (car) => {
            console.log("!SELECT CAR! :: ", car);
            return this.carModel;
        });
    }
    get cars() {
        return this._cars;
    }
    set cars(value) {
        this._cars = value;
        if (value.length === 1) {
            this.selectCar(value[0]);
        }
    }
    saveCar() {
        return __awaiter(this, void 0, void 0, function* () {
            this.apiService.setCurrentCar(this.carModel).subscribe((value) => {
            });
            this.onSelectCar.emit(NxEvent.SelectrCar, this.carModel);
            this.nxEvents.pushNewEvent(NxEvent.SelectrCar, this.carModel);
            this.dismiss();
            /*		if (!result) {
                        alert("Kunde inte spara bil med id: " + this.carModel.carId);
                    } else {
                        this.onSelectCar.emit(NxEvent.SelectrCar, this.carModel);
                        this.nxEvents.pushNewEvent(NxEvent.SelectrCar, this.carModel);
                    }
            
                    return result
            
             */
        });
    }
    optionsFn() {
        console.log("BALLE ::", this.test1);
    }
    getCars() {
        console.log("****************** ON INIT SELECT CAR ::");
        this.apiService.getDriverCars().subscribe((val) => {
            console.log("DRIVER CARS :::", val);
            if (val.data) {
                this.cars = val.data;
            }
        });
    }
    selectCar(car) {
        this.currentCar = car;
        this.carSelected = (car !== undefined);
        this.carModel = new DriverCarOptions().fromObj(car);
        this.carModel.driverCarData = car;
        console.log("carModel ::", this.carModel);
    }
    dismiss() {
        this.modalController.dismiss();
    }
    /**
     * Get at list of cars
     */
    ngOnInit() {
        this.getCars();
    }
};
SelectCarModalComponent = __decorate([
    Component({
        selector: 'app-select-car-modal',
        templateUrl: './select-car-modal.component.html',
        styleUrls: ['./select-car-modal.component.scss'],
    }),
    __metadata("design:paramtypes", [ModalController,
        DriverService,
        DriverApiService,
        StorageService,
        NxEventService,
        SocketService])
], SelectCarModalComponent);
export { SelectCarModalComponent };
