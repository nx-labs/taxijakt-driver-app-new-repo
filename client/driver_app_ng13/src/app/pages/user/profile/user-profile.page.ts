/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Component }              from '@angular/core';
import { OnInit }                 from '@angular/core';
import { HostBinding }            from '@angular/core';
import { ActivatedRoute }         from '@angular/router';
import { DriverApiService }       from "@root/api/driver-api.service";
import { LoggingService }         from "@core/services/logging.service";
import { SocketService }          from "@core/services/socket.service";
import { StorageService }         from "@core/services/storage.service";
import { NxEvent }                from "@nxApp/events/nx-event-types";
import { NxEventService }         from "@nxApp/events/nx-event.service";
import { NewOrderModalComponent } from "@nxApp/modals/new-order-modal/new-order-modal.component";
import { AppNavService }          from "@nxApp/services/app-nav.service";
import { DriverService }          from "@nxApp/services/driver/driver.service";
import { ITJWebDriver }           from "@nxApp/types/api-login-response.type";
import { DriverModel }            from './driver.model';
import { AlertController }        from '@ionic/angular';
import { LanguageService }        from '@core/language/language.service';
import { TranslateService }       from '@ngx-translate/core';

@Component(
	{
		selector   : 'app-user-profile',
		templateUrl: './user-profile.page.html',
		styleUrls  : [
			'./styles/user-profile.page.scss',
			'./styles/user-profile.shell.scss',
			'./styles/user-profile.ios.scss',
			'./styles/user-profile.md.scss'
		],
	})
export class UserProfilePage implements OnInit {
	driverModel: DriverModel;

	driverId: number;
	driverData: ITJWebDriver;

	availableLanguages = [];
	translations: any;

	counter: number = 0;

	@HostBinding('class.is-shell') get isShell() {
		return false; //( this.driverModel && this.driverModel.isShell );
	}

	constructor(
		private route: ActivatedRoute,
		public translate: TranslateService,
		public languageService: LanguageService,
		public alertController: AlertController,
		// Added from start
		private socketService: SocketService,
		private logger: LoggingService,
		private storage: StorageService,
		private navService: AppNavService,
		private nxEvents: NxEventService,
		private driverService: DriverService,
		private driverApiService: DriverApiService,
		private activeRoute: ActivatedRoute
	) {
		/*		this.driverModel            = new DriverModel();
		 this.driverModel.userImage  = "/assets/nx-app/taxi-driver-128.png"
		 this.driverModel.membership = "Basic";

		 nxEvents.onEvent(NxEvent.DriverLogin).subscribe(
		 value => {
		 console.log("LOGIN EVENT :::::", value);

		 }
		 );*/
	}

	sendTestEvent() {
		this.counter++;
		console.log("Sending test event... ::", this.counter);

		let cp = {
			eventType   : NxEvent.ShowModal,
			eventTag    : `EVENT-TAG-${ this.counter }`,
			eventMessage: "ev-ess :: hoho",
			eventData   : { header: "hoho", modal: NewOrderModalComponent }
		}

		this.nxEvents.pushEvent(cp);
	}

	goPro(proType: number): void {
		alert(`PRO :: ${ proType }`);
	}

	ngOnInit(): void {
		this.translate.onLangChange.subscribe(() => this.getTranslations());
	}

	// NOTE: Ionic only calls ngOnDestroy if the page was popped (ex: when navigating back)
	// Since ngOnDestroy might not fire when you navigate from the current page, use ionViewWillLeave to cleanup Subscriptions
	ionViewWillLeave(): void {
	}

	getTranslations() {
		// get translations for this page to use in the Language Chooser Alert
		this.translate.getTranslation(this.translate.currentLang)
			.subscribe((translations) => this.translations = translations);
	}

	newOrderOpen() {
		alert("oi");
	}

	async openLanguageChooser() {
		this.availableLanguages = this.languageService.getLanguages()
									  .map(item =>
											   ( {
												   name   : item.name,
												   type   : 'radio',
												   label  : item.name,
												   value  : item.code,
												   checked: item.code === this.translate.currentLang
											   } )
									  );

		const alert = await this.alertController.create({
															header  : this.translations.SELECT_LANGUAGE,
															inputs  : this.availableLanguages,
															cssClass: 'language-alert',
															buttons : [
																{
																	text    : this.translations.CANCEL,
																	role    : 'cancel',
																	cssClass: 'secondary',
																	handler : () => {
																	}
																}, {
																	text   : this.translations.OK,
																	handler: (data) => {
																		if (data) {
																			this.translate.use(data);
																		}
																	}
																}
															]
														});
		await alert.present();

	}
}
