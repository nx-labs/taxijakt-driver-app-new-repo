/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { ViewChild }              from "@angular/core";
import { OnInit }                 from "@angular/core";
import { Component }              from '@angular/core';
import { SplashScreen }           from '@capacitor/splash-screen';
import { SocketService }          from "@core/services/socket.service";
import { ModalController }        from "@ionic/angular";
import { TranslateService }       from '@ngx-translate/core';
import { NxAppComponent }         from "@nxApp/components/nx-app-component";
import { NxAppEvent }             from "@nxApp/events/nx-app-event";
import { INxEvent }               from "@nxApp/events/nx-event";
import { NxEventService }         from "@nxApp/events/nx-event.service";
import { NxEvent }                from "@nxApp/events/nx-event-types";
import { ModalDataType }          from "@nxApp/modals/modal-data.type";
import { NewOrderModalComponent } from "@nxApp/modals/new-order-modal/new-order-modal.component";
import { NxAppManagerService }    from "@nxApp/nx-app-manager.service";
import { AppNavService }          from "@nxApp/services/app-nav.service";
import { IBooking }               from "@nxApp/services/booking/booking-entry.type";
import { DriverService }          from "@nxApp/services/driver/driver.service";
import { NxAppService }           from "@nxApp/services/nx-app.service";
import { IMessage }               from "@shared/messages/message-types";
import { HistoryHelperService }   from '@utils/history-helper.service';
import { AccountPages }           from "@nxApp/app.paths";
import { AppPages }               from "@nxApp/app.paths";
import { AppTitle }               from "./app.settings";
import { LoginPage }              from "./pages/login/login.page";
import { MsgType }                from "./shared/messages/message-types";
import { OrderApiService }        from "@api/order-api.service";

@Component(
	{
		selector   : 'app-root',
		templateUrl: 'app.component.html',
		styleUrls  : [
			'./side-menu/styles/side-menu.scss',
			'./side-menu/styles/side-menu.shell.scss',
			'./side-menu/styles/side-menu.responsive.scss'
		]
	})
export class AppComponent extends NxAppComponent implements OnInit {
	@ViewChild('#appNav') nav;

	public rootPage: string      = "LoginPage";
	public appTitle: string      = AppTitle;
	public appPages              = AppPages;
	public accountPages          = AccountPages;
	public activeOrder: IBooking = null;
	public hackArray             = new Array<string>();
	public modalIsPresenting     = false;

	constructor(
		public appNavService: AppNavService,
		public translate: TranslateService,
		public eventService: NxEventService,
		public historyHelper: HistoryHelperService,
		private modalController: ModalController,
		private driverService: DriverService,
		private orderApiService: OrderApiService,
		private socketService: SocketService,
		private appDataService: NxAppManagerService,
		private nxAppService: NxAppService,
	) {
		super();

		if (this.nav) {
			this.nav.ngAfterViewInit.subscribe(

			);

			console.log("NAS IS NIL");
		}

		appDataService.OnNewOrder.subscribe((order: IBooking) => {
			//	if (this.activeOrder !== null) return;
			this.activeOrder = order;

			this.hackArray.push(order.orderData.id);

			let modalData: ModalDataType = {
				modal    : NewOrderModalComponent,
				bgDismiss: false,
				header   : "Ny bokning",
				data     : order
			}

			this.showModal(modalData);
		});

		this.initializeApp();
		this.setLanguage();

		socketService.dataStream.subscribe(
			(msg: IMessage) => {
				switch (msg.type) {
					case MsgType.DriverUpdate:
						break;
				}
			}
		)

		eventService.onNewEvent().subscribe(
			value => {
				this.onEvent(value);
			}
		);

	}

	ngOnInit(): void {
	}

	public async showModal(modalData: ModalDataType): Promise<void> {
		return await this.presentModal(modalData);
	}

	onEvent(event: INxEvent) {
		switch (event.eventType) {
			case NxEvent.ShowModal:
				this.presentModal(event.eventData);
				break;

			case NxEvent.AppWideData:
				this.updateAppData(event.eventData);
				break;

			case NxEvent.NewOrder:
				this.presentModal(event.eventData);
				break;
		}
	}

	/**
	 * Keep the App Data object updated
	 * @param {NxAppEvent} appEvent
	 * @returns {Promise<void>}
	 */
	private async updateAppData(appEvent: NxAppEvent): Promise<void> {
		console.log("AppEvent ::", appEvent);
	}

	routeTab(url: string) {
		console.log("NAV ::", url);
		this.appNavService.navigateRoot(url);
	}

	async initializeApp() {
		try {
			await SplashScreen.hide();
		}
		catch (err) {
			console.log('This is normal in a browser', err);
		}
	}

	doLogout() {
		this.driverService.logOut();
		this.appNavService.navigateRoot("/auth/login");
	}

	public async presentModal(data: ModalDataType, bgDismiss: boolean = false) {
		if (this.modalIsPresenting) return;
		this.modalIsPresenting = true;

		console.log("MODAL DATA :::", data)

		const modal = await this.modalController.create(
			{
				component      : data.modal,
				componentProps : {
					header: data.header,
					data  : data.data,
				},
				backdropDismiss: data.bgDismiss,
			});

		modal.onDidDismiss().then(data => {
			console.log('data came back from modal :: ', data);
			this.modalIsPresenting = false;
		});

		modal.present().then(() => {
			this.modalIsPresenting = true;
		}).catch(() => {
			this.modalIsPresenting = false;
		});
	}

	setLanguage() {
		// this language will be used as a fallback when a translation isn't found in the current language
		this.translate.setDefaultLang('en');

		// the lang to use, if the lang isn't available, it will use the current loader to get them
		this.translate.use('en');

		// this is to determine the text direction depending on the selected language
		// for the purpose of this example we determine that only arabic and hebrew are RTL.
		// this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
		//   this.textDir = (event.lang === 'ar' || event.lang === 'iw') ? 'rtl' : 'ltr';
		// });
	}
}
