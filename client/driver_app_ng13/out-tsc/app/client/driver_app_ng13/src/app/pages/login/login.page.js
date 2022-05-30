/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";
import { MenuController } from '@ionic/angular';
import { DriverService } from "@nxApp/services/driver/driver.service";
import { DriverApiService } from "@api/driver-api.service";
import { StorageService } from "@core/services/storage.service";
import { NxAppPages } from "@nxApp/app.paths";
import { NxEventService } from "@nxApp/events/nx-event.service";
import { AppNavService } from "@nxApp/services/app-nav.service";
import { AppComponent } from "../../app.component";
let LoginPage = class LoginPage {
    constructor(router, appNavService, menu, storage, nxEvents, appComponent, loadingController, alertController, driverApi, driverService) {
        this.router = router;
        this.appNavService = appNavService;
        this.menu = menu;
        this.storage = storage;
        this.nxEvents = nxEvents;
        this.appComponent = appComponent;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.driverApi = driverApi;
        this.driverService = driverService;
        this.validation_messages = {
            'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'pattern', message: 'Enter a valid email.' }
            ],
            'password': [
                { type: 'required', message: 'Password is required.' },
                { type: 'minlength', message: 'Password must be at least 5 characters long.' }
            ]
        };
        const emailValidator = Validators.compose([
            Validators.required
            //  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ]);
        this.loginForm = new FormGroup({
            'email': new FormControl('+48888777657', emailValidator),
            'password': new FormControl('1', Validators.compose([
                Validators.minLength(1),
                Validators.required
            ]))
        });
    }
    dismissLoader() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.loadingCtrl) {
                console.log("NO LOADING CONTROLLER");
                return;
            }
            const { role, data } = yield this.loadingCtrl.onDidDismiss();
            console.log('Loading dismissed!');
        });
    }
    presentLoadingWithOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loadingCtrl = yield this.loadingController.create({
                spinner: null,
                message: 'Loggar in...',
                translucent: true,
                cssClass: 'custom-class custom-loading',
                backdropDismiss: false
            });
            yield this.loadingCtrl.present();
            //const { role, data } = await this.loadingCtrl.onDidDismiss();
            //console.log('Loading dismissed with role:', role);
        });
    }
    // Disable side menu for this page
    ionViewDidEnter() {
        this.menu.enable(false);
    }
    // Restore to default when leaving this page
    ionViewDidLeave() {
        this.menu.enable(true);
    }
    showLoginFailed() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Inloggning',
                subHeader: 'Inloggning misslyckades',
                message: 'Kontrollera användarnamn och lösenord.',
                buttons: ['Ok']
            });
            yield alert.present();
        });
    }
    openDriverStart(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data && data.driver && data.driver.id) {
                let options = {
                    queryParams: {
                        fromLogin: true
                    }
                };
                this.appNavService.navigateWithData(NxAppPages.Driver.url, options);
                //this.appNavService.navigateRoot(NxAppPages.Driver.url); // navigateWithData(NxAppPages.Driver.url, driverId);
            }
            else {
                this.appNavService.internalError("Invalid login data");
            }
        });
    }
    showTerms() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    doLogin() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('do Log In');
            this.presentLoadingWithOptions();
            try {
                const username = this.loginForm.value['email'];
                const password = this.loginForm.value["password"];
                yield this.driverApi.authenticate(username, password).subscribe((value) => {
                    console.log("Login res: ", value);
                    const apiMessage = value.data;
                    console.log("authenticate :: apiMessage ::", apiMessage);
                    this.loadingCtrl.dismiss();
                    if (apiMessage.success) {
                        this.driverService.driverLogin(apiMessage.data);
                        this.openDriverStart(apiMessage.data);
                    }
                    else {
                        alert("Login failed, please verify username and password");
                    }
                });
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
        });
    }
    goToForgotPassword() {
        console.log('redirect to forgot-password page');
    }
};
LoginPage = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.page.html',
        styleUrls: [
            './styles/login.page.scss'
        ]
    }),
    __metadata("design:paramtypes", [Router,
        AppNavService,
        MenuController,
        StorageService,
        NxEventService,
        AppComponent,
        LoadingController,
        AlertController,
        DriverApiService,
        DriverService])
], LoginPage);
export { LoginPage };
