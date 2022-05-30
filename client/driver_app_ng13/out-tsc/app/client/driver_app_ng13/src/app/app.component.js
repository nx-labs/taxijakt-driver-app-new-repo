/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __awaiter, __decorate, __metadata } from "tslib";
import { ViewChild } from "@angular/core";
import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { SocketService } from "@core/services/socket.service";
import { ModalController } from "@ionic/angular";
import { TranslateService } from '@ngx-translate/core';
import { NxAppComponent } from "@nxApp/components/nx-app-component";
import { NxEventService } from "@nxApp/events/nx-event.service";
import { NxEvent } from "@nxApp/events/nx-event.service";
import { NewOrderModalComponent } from "@nxApp/modals/new-order-modal/new-order-modal.component";
import { NxAppManagerService } from "@nxApp/nx-app-manager.service";
import { AppNavService } from "@nxApp/services/app-nav.service";
import { DriverService } from "@nxApp/services/driver/driver.service";
import { NxAppService } from "@nxApp/services/nx-app.service";
import { HistoryHelperService } from '@utils/history-helper.service';
import { AccountPages } from "@nxApp/app.paths";
import { AppPages } from "@nxApp/app.paths";
import { AppTitle } from "./app.settings";
import { MsgType } from "./shared/messages/message-types";
import { OrderApiService } from "@api/order-api.service";
let AppComponent = class AppComponent extends NxAppComponent {
    constructor(appNavService, translate, eventService, historyHelper, modalController, driverService, orderApiService, socketService, appDataService, nxAppService) {
        super();
        this.appNavService = appNavService;
        this.translate = translate;
        this.eventService = eventService;
        this.historyHelper = historyHelper;
        this.modalController = modalController;
        this.driverService = driverService;
        this.orderApiService = orderApiService;
        this.socketService = socketService;
        this.appDataService = appDataService;
        this.nxAppService = nxAppService;
        this.rootPage = "LoginPage";
        this.appPages = AppPages;
        this.accountPages = AccountPages;
        this.modalIsPresenting = false;
        // Inject HistoryHelperService in the app.components.ts so its available app-wide
        this.appTitle = AppTitle;
        if (this.nav) {
            this.nav.ngAfterViewInit.subscribe();
            console.log("NAS IS NIL");
        }
        appDataService.OnNewOrder.subscribe((order) => {
            console.log("ON NEW ORDER");
            let modalData = {
                modal: NewOrderModalComponent,
                bgDismiss: false,
                header: "Ny bokning",
                data: order
            };
            this.showModal(modalData);
        });
        this.initializeApp();
        this.setLanguage();
        socketService.dataStream.subscribe((msg) => {
            switch (msg.type) {
                case MsgType.DriverUpdate:
                    break;
            }
        });
        eventService.onNewEvent().subscribe(value => {
            this.onEvent(value);
        });
    }
    ngOnInit() {
    }
    showModal(modalData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.presentModal(modalData);
        });
    }
    onEvent(event) {
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
    updateAppData(appEvent) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("AppEvent ::", appEvent);
        });
    }
    routeTab(url) {
        console.log("NAV ::", url);
        this.appNavService.navigateRoot(url);
    }
    initializeApp() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield SplashScreen.hide();
            }
            catch (err) {
                console.log('This is normal in a browser', err);
            }
        });
    }
    doLogout() {
        this.driverService.logOut();
        this.appNavService.navigateRoot("/auth/login");
    }
    presentModal(data, bgDismiss = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.modalIsPresenting)
                return;
            console.log("MODAL DATA :::", data);
            const modal = yield this.modalController.create({
                component: data.modal,
                componentProps: {
                    header: data.header,
                    data: data.data,
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
};
__decorate([
    ViewChild('#appNav'),
    __metadata("design:type", Object)
], AppComponent.prototype, "nav", void 0);
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: 'app.component.html',
        styleUrls: [
            './side-menu/styles/side-menu.scss',
            './side-menu/styles/side-menu.shell.scss',
            './side-menu/styles/side-menu.responsive.scss'
        ]
    }),
    __metadata("design:paramtypes", [AppNavService,
        TranslateService,
        NxEventService,
        HistoryHelperService,
        ModalController,
        DriverService,
        OrderApiService,
        SocketService,
        NxAppManagerService,
        NxAppService])
], AppComponent);
export { AppComponent };
