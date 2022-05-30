/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Component }         from '@angular/core';
import { FormControl }       from '@angular/forms';
import { FormGroup }         from '@angular/forms';
import { Validators }        from '@angular/forms';
import { Router }            from '@angular/router';
import { AlertController }   from "@ionic/angular";
import { LoadingController } from "@ionic/angular";
import { MenuController }    from '@ionic/angular';
import { NavigationOptions } from "@ionic/angular/providers/nav-controller";
import { DriverService }     from "@nxApp/services/driver/driver.service";
import { DriverApiService }  from "@api/driver-api.service";
import { IApiMessage }       from "@core/messages/message-types";
import { IMessage }          from "@core/messages/message-types";
import { StorageService }    from "@core/services/storage.service";
import { NxAppPages }        from "@nxApp/app.paths";
import { NxEventService }    from "@nxApp/events/nx-event.service";
import { AppNavService }     from "@nxApp/services/app-nav.service";
import { IApiLoginRes }      from "@nxApp/types/api-login-response.type";
import { AppComponent }      from "@root/app.component";

@Component(
	{
		selector   : 'app-login',
		templateUrl: './login.page.html',
		styleUrls  : [
			'./styles/login.page.scss'
		]
	})
export class LoginPage {
	loginForm: FormGroup;
	loadingCtrl: any | LoadingController;

	validation_messages = {
		'email'   : [
			{ type: 'required', message: 'Email is required.' },
			{ type: 'pattern', message: 'Enter a valid email.' }
		],
		'password': [
			{ type: 'required', message: 'Password is required.' },
			{ type: 'minlength', message: 'Password must be at least 5 characters long.' }
		]
	};

	constructor(
		public router: Router,
		public appNavService: AppNavService,
		public menu: MenuController,
		private storage: StorageService,
		private nxEvents: NxEventService,
		private appComponent: AppComponent,
		public loadingController: LoadingController,
		public alertController: AlertController,
		private driverApi: DriverApiService,
		private driverService: DriverService
	) {
		const emailValidator = Validators.compose(
			[
				Validators.required
				//  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
			]);
		this.loginForm       = new FormGroup(
			{
				'email'   : new FormControl('+48888777657', emailValidator),
				'password': new FormControl('1', Validators.compose([
																		Validators.minLength(1),
																		Validators.required
																	]))
			});
	}

	async dismissLoader() {
		if (!this.loadingCtrl) {
			console.log("NO LOADING CONTROLLER");
			return;
		}
		const { role, data } = await this.loadingCtrl.onDidDismiss();
		console.log('Loading dismissed!');
	}

	async presentLoadingWithOptions() {
		this.loadingCtrl = await this.loadingController.create(
			{
				spinner        : null,
				message        : 'Loggar in...',
				translucent    : true,
				cssClass       : 'custom-class custom-loading',
				backdropDismiss: false
			});

		await this.loadingCtrl.present();

		//const { role, data } = await this.loadingCtrl.onDidDismiss();
		//console.log('Loading dismissed with role:', role);
	}

	// Disable side menu for this page
	ionViewDidEnter(): void {
		this.menu.enable(false);
	}

	// Restore to default when leaving this page
	ionViewDidLeave(): void {
		this.menu.enable(true);
	}

	async showLoginFailed(): Promise<void> {
		const alert = await this.alertController.create(
			{
				cssClass : 'my-custom-class',
				header   : 'Inloggning',
				subHeader: 'Inloggning misslyckades',
				message  : 'Kontrollera användarnamn och lösenord.',
				buttons  : [ 'Ok' ]
			}
		);

		await alert.present();
	}

	async openDriverStart(data?: IApiLoginRes) {
		if (data && data.driver && data.driver.id) {
			let options: NavigationOptions = {
				queryParams: {
					fromLogin: true
				}
			}

			this.appNavService.navigateWithData(NxAppPages.Driver.url, options);
			//this.appNavService.navigateRoot(NxAppPages.Driver.url); // navigateWithData(NxAppPages.Driver.url, driverId);
		}
		else {
			this.appNavService.internalError("Invalid login data");
		}
	}

	async showTerms(): Promise<void> {

	}

	async doLogin() {
		console.log('do Log In');

		this.presentLoadingWithOptions();

		try {
			const username = this.loginForm.value[ 'email' ];
			const password = this.loginForm.value[ "password" ];

			await this.driverApi.authenticate(username, password).subscribe(
				(value: IMessage) => {
					console.log("Login res: ", value);

					const apiMessage: IApiMessage = value.data;

					console.log("authenticate :: apiMessage ::", apiMessage);

					this.loadingCtrl.dismiss();

					if (apiMessage.success) {
						this.driverService.driverLogin(apiMessage.data);
						this.openDriverStart(apiMessage.data);
					}
					else {
						alert("Login failed, please verify username and password");
					}
				}
			);
		}
		catch (err) {
			console.log("authenticate :: error ::", err);
		}
		finally {
			console.log("Dismiss");
			if (this.loadingCtrl) {
				this.loadingCtrl.dismiss();
			}
		}
	}

	goToForgotPassword(): void {
		console.log('redirect to forgot-password page');
	}
}
