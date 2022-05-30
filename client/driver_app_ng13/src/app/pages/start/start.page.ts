/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { OnInit }                   from "@angular/core";
import { Component }                from '@angular/core';
import { ActivatedRoute }           from "@angular/router";
import { IEventReceiver }           from "@core/event-receiver";
import { LoggingService }           from "@core/services/logging.service";
import { AlertController }          from "@ionic/angular";
import { DriverBusyModalComponent } from "@nxApp/modals/driver-busy-modal/driver-busy-modal.component";
import { NxAppManagerService }      from "@nxApp/nx-app-manager.service";
import { INxEvent }                 from "@nxApp/events/nx-event";
import { NxEvent }                  from "@nxApp/events/nx-event-types";
import { NxEventService }           from "@nxApp/events/nx-event.service";
import { AppNavService }            from "@nxApp/services/app-nav.service";
import { DriverService }            from "@nxApp/services/driver/driver.service";
import { IDriverData }              from "@nxApp/types/update-response-data.type";
import { IDriverResponseData }      from "@nxApp/types/update-response-data.type";
import { OrderApiService }          from "@root/api/order-api.service";
import { DriverCarOptions }         from "@shared/driver/driver-car-options";
import { IMessage }                 from "@shared/messages/message-types";
import { StorageService }           from "@core/services/storage.service";
import { ModalDataType }            from "@nxApp/modals/modal-data.type";
import { SelectCarModalComponent }  from "@nxApp/modals/select-car-modal/select-car-modal.component";
import { VarUtils }                 from "@shared/utils/var.utils";
import { DriverModel }              from "../user/profile/driver.model";

@Component(
	{
		selector   : 'app-start',
		templateUrl: './start.page.html',
		styleUrls  : [
			'./styles/start.page.scss',
			'./styles/start.shell.scss',
			'./styles/start.responsive.scss'
		]
	})
export class StartPage implements OnInit, IEventReceiver {
	public name: string              = "StartPage";
	driverModel                      = new DriverModel();
	driverData: IDriverData          = {};
	percentTilLowerComission: number = 0;
	percentTilLowerStyle: string     = "";

	constructor(
		private orderApiService: OrderApiService,
		private alertController: AlertController,
		private logger: LoggingService,
		private navService: AppNavService,
		private nxEvents: NxEventService,
		private driverService: DriverService,
		private storage: StorageService,
		private activeRoute: ActivatedRoute,
		private appData: NxAppManagerService
	) {
		this.driverModel.userImage = "/assets/nx-app/taxi-driver-128.png"

		nxEvents.onNewEvent().subscribe((value: INxEvent) => {
			switch (value.eventType) {
				case NxEvent.SelectrCar:
					console.log("****** START PAGE :: DRIVER DATA :::::", value);
					appData.selectedCar     = value.eventData as DriverCarOptions;
					appData.selectedCarData = appData.selectedCar.driverCarData;
					break;

				case NxEvent.DriverUpdate:
					let driverData: IDriverResponseData = value.eventData;

					this.driverData                    = driverData.driverEntry.data;
					this.driverModel.name              = driverData.driverEntry.data.name;
					this.driverModel.status            = driverData.driverEntry.data.status;
					this.driverModel.id                = driverData.driverEntry.data.id;
					this.driverModel.likes             = this.driverData.data?.likes;
					this.driverModel.dislikes          = this.driverData.data?.dislikes;
					this.driverModel.rating            = this.driverData.data?.rating;
					this.driverModel.succellfulOrders  = driverData.info.successful_orders;
					this.driverModel.hasLowerComission = driverData.info.has_lower_commission;
					this.driverModel.lowerCommissionTo = driverData.info.lower_commission_to;
					this.driverModel.points            = driverData.info.points;
					this.driverModel.isBasic           = driverData.info.mode.is_basic;

					if (VarUtils.isString(this.driverModel.lowerCommissionTo)) {

					}

					if (!this.driverModel.succellfulOrders) {
						this.driverModel.succellfulOrders = 0;
					}

					break;
			}
		});
	}

	buyPro() {
		this.alertController.create(
			{
				header   : 'Buy PRO',
				subHeader: 'Become an elite driver by puchasing PRO',
				message  : 'Choose one of the options available',
				buttons  : [
					{
						text   : 'Buy PRO 24 Hour for 100 SEK',
						handler: () => {
						}
					},
					{
						text   : 'Buy PRO 1 Week for 500 SEK',
						handler: () => {
							console.log('Let me think');
						}
					},
					{
						text   : 'Buy PRO 1 month for 2000 SEK',
						handler: () => {

						}
					},
					{
						text   : 'Later',
						handler: () => {
						}
					}
				]
			}).then(res => {
			res.present();
		});

	}

	setBusy() {
		let modalData: ModalDataType = {
			modal    : DriverBusyModalComponent,
			bgDismiss: false,
			header   : "Busy"
		}

		let cp = {
			eventType: NxEvent.ShowModal,
			eventData: modalData
		}

		this.nxEvents.pushEvent(cp);
	}

	public setPercentTilLowerCommission(value: number): void {
		this.percentTilLowerComission = value;
		this.percentTilLowerStyle     = `--value: ${ this.percentTilLowerComission }`;
	}

	public onEvent(event: NxEvent) {
		console.log("Start Page Event ::",)
	}

	editCar() {
		let modalData: ModalDataType = {
			modal    : SelectCarModalComponent,
			bgDismiss: false,
			header   : "Välj bil"
		}

		let cp = {
			eventType: NxEvent.ShowModal,
			eventData: modalData
		}

		this.nxEvents.pushEvent(cp);
	}

	public ngOnInit(): void {
		if (this.storage.get("fromLogin")) {
			this.storage.remove("fromLogin");

			if (!this.appData?.selectedCar)
				this.editCar();
		}

		this.driverService.triggerStoredData();
	}

	public tebb(): void {
		this.orderApiService.getActiveOrdersBySession().subscribe(
			(msg: IMessage) => {
				console.log("SESSION ORDERS ::", msg);
			}
		)
	}
}
