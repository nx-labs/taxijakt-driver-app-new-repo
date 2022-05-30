/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Component, OnInit } from '@angular/core';
import { DriverApiService }  from "@api/driver-api.service";
import { SocketService }     from "@core/services/socket.service";
import { StorageService }    from "@core/services/storage.service";
import { ModalController }   from "@ionic/angular";
import { NxEventService }    from "@nxApp/events/nx-event.service";
import { NxEvent }           from "@nxApp/events/nx-event-types";
import { DriverService }     from "@nxApp/services/driver/driver.service";
import { DriverCarOptions }  from "@shared/driver/driver-car-options";
import { EventEmitter }      from "events";
import { IMessage }          from "@shared/messages/message-types";
import { IDriverCar }        from "@shared/types/car.type";

@Component(
	{
		selector   : 'app-select-car-modal',
		templateUrl: './select-car-modal.component.html',
		styleUrls  : [ './select-car-modal.component.scss' ],
	})
export class SelectCarModalComponent implements OnInit {
	private _optionsModel = new DriverCarOptions();

	private onSelectCar = new EventEmitter<DriverCarOptions>();

	public uuid: string = "";
	public carSelected: boolean = false;
	public currentCar: IDriverCar | any;

	public carModel: DriverCarOptions = null;

	private _cars: IDriverCar[];

	public get cars(): IDriverCar[] {
		return this._cars;
	}

	public set cars(value: IDriverCar[]) {
		this._cars = value;
		if (value.length === 1) {
			this.selectCar(value[0]);
		}
	}

	test1: string;

	constructor(
		private modalController: ModalController,
		private driverService: DriverService,
		private apiService: DriverApiService,
		private storage: StorageService,
		private nxEvents: NxEventService,
		private socketService: SocketService
	) {
		this.uuid = socketService.uuid;

		this.onSelectCar.on(NxEvent.SelectrCar, (car: DriverCarOptions) => {
			console.log("!SELECT CAR! :: ", car);
			return this.carModel;
		});
	}

	public async saveCar()  {
		this.apiService.setCurrentCar(this.carModel).subscribe(
			(value: IMessage) => {
			}
		);

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
	}

	public optionsFn() {
		console.log("BALLE ::", this.test1);
	}

	public getCars() {
		console.log("****************** ON INIT SELECT CAR ::");

		this.apiService.getDriverCars().subscribe(
			(val: IMessage) => {
				console.log("DRIVER CARS :::", val);

				if (val.data) {
					this.cars = val.data;
				}
			}
		);
	}

	public selectCar(car: IDriverCar): void {
		this.currentCar = car;
		this.carSelected = (car !== undefined);

		this.carModel = new DriverCarOptions().fromObj(car);
		this.carModel.driverCarData = car;

		console.log("carModel ::", this.carModel);
	}

	public dismiss() {
		this.modalController.dismiss();
	}

	/**
	 * Get at list of cars
	 */
	ngOnInit() {
		this.getCars();
	}
}
