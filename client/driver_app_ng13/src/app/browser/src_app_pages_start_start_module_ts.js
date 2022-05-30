"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_start_start_module_ts"],{

/***/ 4777:
/*!************************************************!*\
  !*** ./src/app/components/shell/data-store.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataStore": () => (/* binding */ DataStore),
/* harmony export */   "ShellModel": () => (/* binding */ ShellModel)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 6067);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 6562);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 1339);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 635);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 4874);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ 2340);



class ShellModel {
    constructor() {
        this.isShell = false;
    }
}
class DataStore {
    constructor(shellModel) {
        this.shellModel = shellModel;
        // We wait on purpose 2 secs on local environment when fetching from json to simulate the backend roundtrip.
        // However, in production you should set this delay to 0 in the environment.prod file.
        // eslint-disable-next-line max-len
        this.networkDelay = (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.appShellConfig && _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.appShellConfig.networkDelay) ? _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.appShellConfig.networkDelay : 0;
        this.timeline = new rxjs__WEBPACK_IMPORTED_MODULE_1__.ReplaySubject(1);
    }
    // Static function with generics
    // (ref: https://stackoverflow.com/a/24293088/1116959)
    // Append a shell (T & ShellModel) to every value (T) emmited to the timeline
    static AppendShell(dataObservable, shellModel, networkDelay = 400) {
        const delayObservable = (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(true).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.delay)(networkDelay));
        // Assign shell flag accordingly
        // (ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.combineLatest)([
            delayObservable,
            dataObservable
        ]).pipe(
        // Dismiss unnecessary delayValue
        (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(([delayValue, dataValue]) => Object.assign(dataValue, { isShell: false })), 
        // Set the shell model as the initial value
        (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.startWith)(Object.assign(shellModel, { isShell: true })));
    }
    load(dataSourceObservable, networkDelay) {
        // eslint-disable-next-line no-shadow, @typescript-eslint/no-shadow
        const delay = (typeof networkDelay === 'number') ? networkDelay : this.networkDelay;
        let processedDataSource;
        // If no network delay, then don't show shell
        if (delay === 0) {
            processedDataSource = dataSourceObservable;
        }
        else {
            processedDataSource = DataStore.AppendShell(dataSourceObservable, this.shellModel, delay);
        }
        processedDataSource
            .subscribe((dataValue) => {
            this.timeline.next(dataValue);
        });
    }
    get state() {
        return this.timeline.asObservable();
    }
}


/***/ }),

/***/ 9243:
/*!*********************************************!*\
  !*** ./src/app/pages/start/start.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StartPageModule": () => (/* binding */ StartPageModule)
/* harmony export */ });
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 4362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/components.module */ 5642);
/* harmony import */ var _nx_app_components_nx_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../nx-app/components/nx-components.module */ 7410);
/* harmony import */ var _start_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./start.page */ 2723);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */








const categoriesRoutes = [
    {
        path: '',
        component: _start_page__WEBPACK_IMPORTED_MODULE_2__.StartPage
    }
];
class StartPageModule {
}
StartPageModule.ɵfac = function StartPageModule_Factory(t) { return new (t || StartPageModule)(); };
StartPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: StartPageModule });
StartPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule,
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild(categoriesRoutes),
            _components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule,
            _nx_app_components_nx_components_module__WEBPACK_IMPORTED_MODULE_1__.NxComponentsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](StartPageModule, { declarations: [_start_page__WEBPACK_IMPORTED_MODULE_2__.StartPage], imports: [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule,
        _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule, _components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule,
        _nx_app_components_nx_components_module__WEBPACK_IMPORTED_MODULE_1__.NxComponentsModule] }); })();


/***/ }),

/***/ 2723:
/*!*******************************************!*\
  !*** ./src/app/pages/start/start.page.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StartPage": () => (/* binding */ StartPage)
/* harmony export */ });
/* harmony import */ var _core_services_logging_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/services/logging.service */ 5948);
/* harmony import */ var _nxApp_modals_driver_busy_modal_driver_busy_modal_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nxApp/modals/driver-busy-modal/driver-busy-modal.component */ 7658);
/* harmony import */ var _nxApp_nx_app_manager_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nxApp/nx-app-manager.service */ 8823);
/* harmony import */ var _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nxApp/events/nx-event-types */ 5022);
/* harmony import */ var _nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nxApp/events/nx-event.service */ 8354);
/* harmony import */ var _nxApp_services_app_nav_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nxApp/services/app-nav.service */ 2701);
/* harmony import */ var _nxApp_services_driver_driver_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nxApp/services/driver/driver.service */ 3898);
/* harmony import */ var _root_api_order_api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @root/api/order-api.service */ 371);
/* harmony import */ var _core_services_storage_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/services/storage.service */ 2323);
/* harmony import */ var _nxApp_modals_select_car_modal_select_car_modal_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @nxApp/modals/select-car-modal/select-car-modal.component */ 3648);
/* harmony import */ var _shared_utils_var_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @shared/utils/var.utils */ 1224);
/* harmony import */ var _user_profile_driver_model__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../user/profile/driver.model */ 580);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ionic/angular */ 4362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _nxApp_components_nx_header_nx_header_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @nxApp/components/nx-header/nx-header.component */ 6192);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _components_shell_text_shell_text_shell_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/shell/text-shell/text-shell.component */ 2148);



























function StartPage_ion_content_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "ion-content", 1)(1, "ion-card")(2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](3, "Loading data...");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
} }
function StartPage_ion_content_2_ion_card_16_h2_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"]("15% commission valid until ", ctx_r4.driverModel.lowerCommissionTo, "");
} }
function StartPage_ion_content_2_ion_card_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "ion-card")(1, "ion-card-header", 13)(2, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](3, "Get lower comission");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](4, "ion-card-content")(5, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](6, StartPage_ion_content_2_ion_card_16_h2_6_Template, 2, 1, "h2", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](7, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](9, "div", 15)(10, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](11, " Once your counter reaches 20 all your orders in the next 30 days will be charged with a lower fixed commission of 15% and the counter will reset to 0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](12, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](13, " If you reach 20 orders again your time will be extended to max 30 days in the future. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx_r2.driverModel.hasLowerComission);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", ctx_r2.driverModel.succellfulOrders, " / 20 ");
} }
function StartPage_ion_content_2_ion_card_37_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "ion-card")(1, "ion-list", 17)(2, "ion-item", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](3, "ion-img", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](4, "ion-label", 20)(5, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](7, "ion-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function StartPage_ion_content_2_ion_card_37_Template_ion_icon_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](2); return ctx_r5.editCar(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](8, "ion-item", 22)(9, "ion-chip");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](10, " Baby seats \u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](11, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](13, "ion-chip");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](14, " Child seats \u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](15, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](17, "ion-chip");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](18, " Booster seats \u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](19, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](21, "ion-chip");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](ctx_r3.appData.selectedCar.driverCarData.registration_number);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](ctx_r3.appData.selectedCar.childSeats);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](ctx_r3.appData.selectedCar.childSeats);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](ctx_r3.appData.selectedCar.boosterSeats);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", ctx_r3.appData.selectedCar.hasShield ? "Car with shield" : "Car without shield", " ");
} }
function StartPage_ion_content_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "ion-content", 1)(1, "ion-card")(2, "ion-row", 2)(3, "ion-col", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](4, "ion-img", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](5, "ion-col", 5)(6, "ion-row", 6)(7, "ion-col", 7)(8, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](10, "h3", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](11, "app-text-shell", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](13, "h5", 10)(14, "ion-button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function StartPage_ion_content_2_Template_ion_button_click_14_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](); return ctx_r7.setBusy(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](16, StartPage_ion_content_2_ion_card_16_Template, 14, 2, "ion-card", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](17, "ion-card")(18, "ion-card-header", 13)(19, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](20, "Get PRO");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](21, "ion-card-content")(22, "div", 14)(23, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](24, "You can buy PRO with a credit card right now. PRO gives you");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](25, "ul")(26, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](27, "Prebookings 24h");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](28, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](29, "Dispatch priority");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](30, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](31, "No points system");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](32, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](33, "No penalty for returning instant orders");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](34, "div", 15)(35, "ion-button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function StartPage_ion_content_2_Template_ion_button_click_35_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r8); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](); return ctx_r9.buyPro(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](36, " Buy PRO Now! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](37, StartPage_ion_content_2_ion_card_37_Template, 23, 5, "ion-card", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("src", ctx_r1.driverModel.userImage);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"]("Driver #", ctx_r1.driverModel.id, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("data", ctx_r1.driverModel.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" Your rating: ", ctx_r1.driverModel.rating, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](ctx_r1.driverModel.status);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx_r1.driverModel !== null);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx_r1.appData.selectedCar !== null);
} }
class StartPage {
    constructor(orderApiService, alertController, logger, navService, nxEvents, driverService, storage, activeRoute, appData) {
        this.orderApiService = orderApiService;
        this.alertController = alertController;
        this.logger = logger;
        this.navService = navService;
        this.nxEvents = nxEvents;
        this.driverService = driverService;
        this.storage = storage;
        this.activeRoute = activeRoute;
        this.appData = appData;
        this.name = "StartPage";
        this.driverModel = new _user_profile_driver_model__WEBPACK_IMPORTED_MODULE_11__.DriverModel();
        this.driverData = {};
        this.percentTilLowerComission = 0;
        this.percentTilLowerStyle = "";
        this.driverModel.userImage = "/assets/nx-app/taxi-driver-128.png";
        nxEvents.onNewEvent().subscribe((value) => {
            var _a, _b, _c;
            switch (value.eventType) {
                case _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_3__.NxEvent.SelectrCar:
                    console.log("****** START PAGE :: DRIVER DATA :::::", value);
                    appData.selectedCar = value.eventData;
                    appData.selectedCarData = appData.selectedCar.driverCarData;
                    break;
                case _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_3__.NxEvent.DriverUpdate:
                    let driverData = value.eventData;
                    this.driverData = driverData.driverEntry.data;
                    this.driverModel.name = driverData.driverEntry.data.name;
                    this.driverModel.status = driverData.driverEntry.data.status;
                    this.driverModel.id = driverData.driverEntry.data.id;
                    this.driverModel.likes = (_a = this.driverData.data) === null || _a === void 0 ? void 0 : _a.likes;
                    this.driverModel.dislikes = (_b = this.driverData.data) === null || _b === void 0 ? void 0 : _b.dislikes;
                    this.driverModel.rating = (_c = this.driverData.data) === null || _c === void 0 ? void 0 : _c.rating;
                    this.driverModel.succellfulOrders = driverData.info.successful_orders;
                    this.driverModel.hasLowerComission = driverData.info.has_lower_commission;
                    this.driverModel.lowerCommissionTo = driverData.info.lower_commission_to;
                    this.driverModel.points = driverData.info.points;
                    this.driverModel.isBasic = driverData.info.mode.is_basic;
                    if (_shared_utils_var_utils__WEBPACK_IMPORTED_MODULE_10__.VarUtils.isString(this.driverModel.lowerCommissionTo)) {
                    }
                    if (!this.driverModel.succellfulOrders) {
                        this.driverModel.succellfulOrders = 0;
                    }
                    break;
            }
        });
    }
    buyPro() {
        this.alertController.create({
            header: 'Buy PRO',
            subHeader: 'Become an elite driver by puchasing PRO',
            message: 'Choose one of the options available',
            buttons: [
                {
                    text: 'Buy PRO 24 Hour for 100 SEK',
                    handler: () => {
                    }
                },
                {
                    text: 'Buy PRO 1 Week for 500 SEK',
                    handler: () => {
                        console.log('Let me think');
                    }
                },
                {
                    text: 'Buy PRO 1 month for 2000 SEK',
                    handler: () => {
                    }
                },
                {
                    text: 'Later',
                    handler: () => {
                    }
                }
            ]
        }).then(res => {
            res.present();
        });
    }
    setBusy() {
        let modalData = {
            modal: _nxApp_modals_driver_busy_modal_driver_busy_modal_component__WEBPACK_IMPORTED_MODULE_1__.DriverBusyModalComponent,
            bgDismiss: false,
            header: "Busy"
        };
        let cp = {
            eventType: _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_3__.NxEvent.ShowModal,
            eventData: modalData
        };
        this.nxEvents.pushEvent(cp);
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
            modal: _nxApp_modals_select_car_modal_select_car_modal_component__WEBPACK_IMPORTED_MODULE_9__.SelectCarModalComponent,
            bgDismiss: false,
            header: "Välj bil"
        };
        let cp = {
            eventType: _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_3__.NxEvent.ShowModal,
            eventData: modalData
        };
        this.nxEvents.pushEvent(cp);
    }
    ngOnInit() {
        var _a;
        if (this.storage.get("fromLogin")) {
            this.storage.remove("fromLogin");
            if (!((_a = this.appData) === null || _a === void 0 ? void 0 : _a.selectedCar))
                this.editCar();
        }
        this.driverService.triggerStoredData();
    }
    tebb() {
        this.orderApiService.getActiveOrdersBySession().subscribe((msg) => {
            console.log("SESSION ORDERS ::", msg);
        });
    }
}
StartPage.ɵfac = function StartPage_Factory(t) { return new (t || StartPage)(_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_root_api_order_api_service__WEBPACK_IMPORTED_MODULE_7__.OrderApiService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_15__.AlertController), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_core_services_logging_service__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_nxApp_services_app_nav_service__WEBPACK_IMPORTED_MODULE_5__.AppNavService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_4__.NxEventService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_nxApp_services_driver_driver_service__WEBPACK_IMPORTED_MODULE_6__.DriverService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_core_services_storage_service__WEBPACK_IMPORTED_MODULE_8__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_16__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_nxApp_nx_app_manager_service__WEBPACK_IMPORTED_MODULE_2__.NxAppManagerService)); };
StartPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineComponent"]({ type: StartPage, selectors: [["app-start"]], decls: 3, vars: 2, consts: [["class", "user-profile-content", 4, "ngIf"], [1, "user-profile-content"], [1, "user-details-section", 2, "padding", "10px"], [1, "user-image-wrapper", 2, "max-width", "150px"], [2, "max-width", "128px", 3, "src"], [1, "user-info-wrapper"], [1, "user-data-row"], ["size", "9"], [1, "user-name"], [3, "data"], [1, "user-title"], [3, "click"], [4, "ngIf"], ["color", "tj"], [2, "margin-top", "1em"], [2, "margin-top", "2em"], ["expand", "block", "color", "tj", 1, "social-auth-btn", "facebook-auth-btn", 3, "click"], ["lines", "none", "no-lines", "", 1, "no-lines"], ["no-lines", ""], ["src", "/assets/nx-app/ico-taxi-64.png", 2, "max-width", "64px"], [2, "padding-left", "1em"], ["slot", "end", "name", "create", 3, "click"], [1, "no-lines"]], template: function StartPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](0, "nx-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](1, StartPage_ion_content_1_Template, 4, 0, "ion-content", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](2, StartPage_ion_content_2_Template, 38, 7, "ion-content", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx.driverModel === null);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx.driverModel !== null);
    } }, directives: [_nxApp_components_nx_header_nx_header_component__WEBPACK_IMPORTED_MODULE_12__.NxHeaderComponent, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonCard, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonImg, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonLabel, _components_shell_text_shell_text_shell_component__WEBPACK_IMPORTED_MODULE_13__.TextShellComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonCardHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonCardContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonChip], styles: [".user-name[_ngcontent-%COMP%] {\n  font-size: 11pt;\n}\n\n@-webkit-keyframes growProgressBar {\n  0%, 33% {\n    --pgPercentage: 0;\n  }\n  100% {\n    --pgPercentage: var(--value);\n  }\n}\n\n@keyframes growProgressBar {\n  0%, 33% {\n    --pgPercentage: 0;\n  }\n  100% {\n    --pgPercentage: var(--value);\n  }\n}\n\n@property --pgPercentage {\n  syntax: \"<number>\";\n  inherits: false;\n  initial-value: 0;\n}\n\ndiv[role=progressbar][_ngcontent-%COMP%] {\n  --size: 12rem;\n  --fg: #369;\n  --bg: #def;\n  --pgPercentage: var(--value);\n  -webkit-animation: growProgressBar 3s 1 forwards;\n          animation: growProgressBar 3s 1 forwards;\n  width: var(--size);\n  height: var(--size);\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n  background: radial-gradient(closest-side, white 80%, transparent 0 99.9%, white 0), conic-gradient(var(--fg) calc(var(--pgPercentage) * 1%), var(--bg) 0);\n  font-family: Helvetica, Arial, sans-serif;\n  font-size: calc(var(--size) / 5);\n  color: var(--fg);\n}\n\ndiv[role=progressbar][_ngcontent-%COMP%]::before {\n  counter-reset: percentage var(--value);\n  content: counter(percentage) \"%\";\n}\n\n[_nghost-%COMP%] {\n  --page-margin: var(--app-narrow-margin);\n  --page-categories-gutter: calc(var(--page-margin) / 4);\n  --page-category-background: var(--ion-color-medium);\n  --page-category-background-rgb: var(--ion-color-medium-rgb);\n}\n\n.categories-list[_ngcontent-%COMP%] {\n  --ion-grid-column-padding: var(--page-categories-gutter);\n  padding: calc(var(--page-categories-gutter) * 3);\n  height: 100%;\n  align-content: flex-start;\n  overflow: scroll;\n  -ms-overflow-style: none;\n  overflow: -moz-scrollbars-none;\n  scrollbar-width: none;\n}\n\n.categories-list[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n\n.categories-list[_ngcontent-%COMP%]   .category-item[_ngcontent-%COMP%]   .category-anchor[_ngcontent-%COMP%] {\n  height: 100%;\n  text-decoration: none;\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n}\n\n.categories-list[_ngcontent-%COMP%]   .category-item[_ngcontent-%COMP%]   .category-anchor[_ngcontent-%COMP%]   .category-title[_ngcontent-%COMP%] {\n  margin: auto;\n  text-transform: uppercase;\n  font-weight: 400;\n  font-size: 18px;\n  letter-spacing: 1px;\n  padding: calc(var(--page-margin) / 4 * 3) var(--page-margin);\n  color: var(--ion-color-lightest);\n  background-color: var(--page-category-background);\n  border-radius: var(--app-fair-radius);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXJ0LnBhZ2Uuc2NzcyIsIi4uLy4uLy4uLy4uL3RoZW1lL21peGlucy9zY3JvbGxiYXJzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0E7RUFDQyxlQUFBO0FBSkQ7O0FBT0E7RUFDQztJQUNDLGlCQUFBO0VBSkE7RUFNRDtJQUNDLDRCQUFBO0VBSkE7QUFDRjs7QUFGQTtFQUNDO0lBQ0MsaUJBQUE7RUFKQTtFQU1EO0lBQ0MsNEJBQUE7RUFKQTtBQUNGOztBQU9BO0VBQ0Msa0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUFMRDs7QUFRQTtFQUNDLGFBQUE7RUFDQSxVQUFBO0VBQ0EsVUFBQTtFQUNBLDRCQUFBO0VBQ0EsZ0RBQUE7VUFBQSx3Q0FBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHlKQUFBO0VBRUEseUNBQUE7RUFDQSxnQ0FBQTtFQUNBLGdCQUFBO0FBUEQ7O0FBVUE7RUFDQyxzQ0FBQTtFQUNBLGdDQUFBO0FBUEQ7O0FBZUE7RUFDQyx1Q0FBQTtFQUNBLHNEQUFBO0VBQ0EsbURBQUE7RUFDQSwyREFBQTtBQVpEOztBQWdCQTtFQUNDLHdEQUFBO0VBRUEsZ0RBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtFQy9EQyx3QkFBQTtFQUdBLDhCQUFBO0VBQ0EscUJBQUE7QURnREY7O0FDN0NFO0VBQ0UsYUFBQTtBRCtDSjs7QUFhRTtFQUNDLFlBQUE7RUFDQSxxQkFBQTtFQUNBLGFBQUE7RUFDQSwyQkFBQTtFQUNBLHVCQUFBO0FBWEg7O0FBYUc7RUFDQyxZQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLDREQUFBO0VBQ0EsZ0NBQUE7RUFDQSxpREFBQTtFQUNBLHFDQUFBO0FBWEoiLCJmaWxlIjoic3RhcnQucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uLy4uLy4uLy4uL3RoZW1lL21peGlucy9zY3JvbGxiYXJzXCI7XG5cbi8vXG4vLyBQcm9ncmVzcyBDaXJjbGVcbi8vXG4udXNlci1uYW1lIHtcblx0Zm9udC1zaXplOiAxMXB0O1xufVxuXG5Aa2V5ZnJhbWVzIGdyb3dQcm9ncmVzc0JhciB7XG5cdDAlLCAzMyUge1xuXHRcdC0tcGdQZXJjZW50YWdlOiAwO1xuXHR9XG5cdDEwMCUge1xuXHRcdC0tcGdQZXJjZW50YWdlOiB2YXIoLS12YWx1ZSk7XG5cdH1cbn1cblxuQHByb3BlcnR5IC0tcGdQZXJjZW50YWdlIHtcblx0c3ludGF4OiAnPG51bWJlcj4nO1xuXHRpbmhlcml0czogZmFsc2U7XG5cdGluaXRpYWwtdmFsdWU6IDA7XG59XG5cbmRpdltyb2xlPVwicHJvZ3Jlc3NiYXJcIl0ge1xuXHQtLXNpemU6IDEycmVtO1xuXHQtLWZnOiAjMzY5O1xuXHQtLWJnOiAjZGVmO1xuXHQtLXBnUGVyY2VudGFnZTogdmFyKC0tdmFsdWUpO1xuXHRhbmltYXRpb246IGdyb3dQcm9ncmVzc0JhciAzcyAxIGZvcndhcmRzO1xuXHR3aWR0aDogdmFyKC0tc2l6ZSk7XG5cdGhlaWdodDogdmFyKC0tc2l6ZSk7XG5cdGJvcmRlci1yYWRpdXM6IDUwJTtcblx0ZGlzcGxheTogZ3JpZDtcblx0cGxhY2UtaXRlbXM6IGNlbnRlcjtcblx0YmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGNsb3Nlc3Qtc2lkZSwgd2hpdGUgODAlLCB0cmFuc3BhcmVudCAwIDk5LjklLCB3aGl0ZSAwKSxcblx0Y29uaWMtZ3JhZGllbnQodmFyKC0tZmcpIGNhbGModmFyKC0tcGdQZXJjZW50YWdlKSAqIDElKSwgdmFyKC0tYmcpIDApO1xuXHRmb250LWZhbWlseTogSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcblx0Zm9udC1zaXplOiBjYWxjKHZhcigtLXNpemUpIC8gNSk7XG5cdGNvbG9yOiB2YXIoLS1mZyk7XG59XG5cbmRpdltyb2xlPVwicHJvZ3Jlc3NiYXJcIl06OmJlZm9yZSB7XG5cdGNvdW50ZXItcmVzZXQ6IHBlcmNlbnRhZ2UgdmFyKC0tdmFsdWUpO1xuXHRjb250ZW50OiBjb3VudGVyKHBlcmNlbnRhZ2UpICclJztcbn1cblxuLy9cbi8vXG5cbi8vIEN1c3RvbSB2YXJpYWJsZXNcbi8vIE5vdGU6ICBUaGVzZSBvbmVzIHdlcmUgYWRkZWQgYnkgdXMgYW5kIGhhdmUgbm90aGluZyB0byBkbyB3aXRoIElvbmljIENTUyBDdXN0b20gUHJvcGVydGllc1xuOmhvc3Qge1xuXHQtLXBhZ2UtbWFyZ2luOiB2YXIoLS1hcHAtbmFycm93LW1hcmdpbik7XG5cdC0tcGFnZS1jYXRlZ29yaWVzLWd1dHRlcjogY2FsYyh2YXIoLS1wYWdlLW1hcmdpbikgLyA0KTtcblx0LS1wYWdlLWNhdGVnb3J5LWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuXHQtLXBhZ2UtY2F0ZWdvcnktYmFja2dyb3VuZC1yZ2I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0tcmdiKTtcbn1cblxuLy8gTm90ZTogIEFsbCB0aGUgQ1NTIHZhcmlhYmxlcyBkZWZpbmVkIGJlbG93IGFyZSBvdmVycmlkZXMgb2YgSW9uaWMgZWxlbWVudHMgQ1NTIEN1c3RvbSBQcm9wZXJ0aWVzXG4uY2F0ZWdvcmllcy1saXN0IHtcblx0LS1pb24tZ3JpZC1jb2x1bW4tcGFkZGluZzogdmFyKC0tcGFnZS1jYXRlZ29yaWVzLWd1dHRlcik7XG5cblx0cGFkZGluZzogY2FsYyh2YXIoLS1wYWdlLWNhdGVnb3JpZXMtZ3V0dGVyKSAqIDMpO1xuXHRoZWlnaHQ6IDEwMCU7XG5cdGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG5cdG92ZXJmbG93OiBzY3JvbGw7XG5cblx0QGluY2x1ZGUgaGlkZS1zY3JvbGxiYXJzKCk7XG5cblx0LmNhdGVnb3J5LWl0ZW0ge1xuXHRcdC5jYXRlZ29yeS1hbmNob3Ige1xuXHRcdFx0aGVpZ2h0OiAxMDAlO1xuXHRcdFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xuXHRcdFx0ZGlzcGxheTogZmxleDtcblx0XHRcdGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcblx0XHRcdGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuXG5cdFx0XHQuY2F0ZWdvcnktdGl0bGUge1xuXHRcdFx0XHRtYXJnaW46IGF1dG87XG5cdFx0XHRcdHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG5cdFx0XHRcdGZvbnQtd2VpZ2h0OiA0MDA7XG5cdFx0XHRcdGZvbnQtc2l6ZTogMThweDtcblx0XHRcdFx0bGV0dGVyLXNwYWNpbmc6IDFweDtcblx0XHRcdFx0cGFkZGluZzogY2FsYygodmFyKC0tcGFnZS1tYXJnaW4pIC8gNCkgKiAzKSB2YXIoLS1wYWdlLW1hcmdpbik7XG5cdFx0XHRcdGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHRlc3QpO1xuXHRcdFx0XHRiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wYWdlLWNhdGVnb3J5LWJhY2tncm91bmQpO1xuXHRcdFx0XHRib3JkZXItcmFkaXVzOiB2YXIoLS1hcHAtZmFpci1yYWRpdXMpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuIiwiLy8gSGlkZSBzY3JvbGxiYXJzOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzg5OTQ4MzcvMTExNjk1OVxuQG1peGluIGhpZGUtc2Nyb2xsYmFycygpIHtcbiAgLy8gSUUgMTArXG4gIC1tcy1vdmVyZmxvdy1zdHlsZTogbm9uZTtcblxuICAvLyBGaXJlZm94XG4gIG92ZXJmbG93OiAtbW96LXNjcm9sbGJhcnMtbm9uZTtcbiAgc2Nyb2xsYmFyLXdpZHRoOiBub25lO1xuXG4gIC8vIFNhZmFyaSBhbmQgQ2hyb21lXG4gICY6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG59XG4iXX0= */", "app-image-shell.category-cover[_ngcontent-%COMP%] {\n  --image-shell-loading-background: rgba(var(--page-category-background-rgb), .25);\n  --image-shell-spinner-color: var(--ion-color-lightest);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXJ0LnNoZWxsLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnRkFBQTtFQUNBLHNEQUFBO0FBQ0YiLCJmaWxlIjoic3RhcnQuc2hlbGwuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImFwcC1pbWFnZS1zaGVsbC5jYXRlZ29yeS1jb3ZlciB7XG4gIC0taW1hZ2Utc2hlbGwtbG9hZGluZy1iYWNrZ3JvdW5kOiByZ2JhKHZhcigtLXBhZ2UtY2F0ZWdvcnktYmFja2dyb3VuZC1yZ2IpLCAuMjUpO1xuICAtLWltYWdlLXNoZWxsLXNwaW5uZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1saWdodGVzdCk7XG59XG4iXX0= */", "@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (device-aspect-ratio: 2/3) {\n  .categories-list[_ngcontent-%COMP%]   .category-item[_ngcontent-%COMP%]   .category-anchor[_ngcontent-%COMP%]   .category-title[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n}\n\n\n@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) {\n  .categories-list[_ngcontent-%COMP%]   .category-item[_ngcontent-%COMP%]   .category-anchor[_ngcontent-%COMP%]   .category-title[_ngcontent-%COMP%] {\n    font-size: 20px;\n    padding: var(--page-margin) calc(var(--page-margin) * 3 / 2);\n  }\n}\n\n@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) {\n  .categories-list[_ngcontent-%COMP%]   .category-item[_ngcontent-%COMP%]   .category-anchor[_ngcontent-%COMP%]   .category-title[_ngcontent-%COMP%] {\n    font-size: 20px;\n    padding: var(--page-margin) calc(var(--page-margin) * 3 / 2);\n  }\n}\n\n@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) {\n  .categories-list[_ngcontent-%COMP%]   .category-item[_ngcontent-%COMP%]   .category-anchor[_ngcontent-%COMP%]   .category-title[_ngcontent-%COMP%] {\n    font-size: 20px;\n    padding: var(--page-margin) calc(var(--page-margin) * 3 / 2);\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXJ0LnJlc3BvbnNpdmUuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSw0Q0FBQTtBQUNBO0VBYVE7SUFDRSxlQUFBO0VBaEJSO0FBQ0Y7QUFzQkEscURBQUE7QUFjQSxrREFBQTtBQUNBO0VBWVE7SUFDRSxlQUFBO0lBQ0EsNERBQUE7RUE1Q1I7QUFDRjtBQWtEQSxxQ0FBQTtBQUNBO0VBWVE7SUFDRSxlQUFBO0lBQ0EsNERBQUE7RUEzRFI7QUFDRjtBQWlFQSxpREFBQTtBQUNBO0VBWVE7SUFDRSxlQUFBO0lBQ0EsNERBQUE7RUExRVI7QUFDRiIsImZpbGUiOiJzdGFydC5yZXNwb25zaXZlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAoTm90ZTogRG9uJ3QgY2hhbmdlIHRoZSBvcmRlciBvZiB0aGUgZGV2aWNlcyBhcyBpdCBtYXkgYnJlYWsgdGhlIGNvcnJlY3QgY3NzIHByZWNlZGVuY2UpXG5cbi8vIChzZWU6IGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vc25pcHBldHMvY3NzL21lZGlhLXF1ZXJpZXMtZm9yLXN0YW5kYXJkLWRldmljZXMvI2lwaG9uZS1xdWVyaWVzKVxuLy8gKHNlZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ3NzUwMjYxLzExMTY5NTkpXG5cbi8qIC0tLS0tLS0tLS0tIGlQaG9uZSA0IGFuZCA0UyAtLS0tLS0tLS0tLSAqL1xuQG1lZGlhIG9ubHkgc2NyZWVuXG4gIGFuZCAobWluLWRldmljZS13aWR0aCA6IDMyMHB4KVxuICBhbmQgKG1heC1kZXZpY2Utd2lkdGggOiA0ODBweClcbiAgYW5kICgtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDIpXG4gIGFuZCAoZGV2aWNlLWFzcGVjdC1yYXRpbzogMi8zKVxuICAvLyB1bmNvbW1lbnQgZm9yIG9ubHkgcG9ydHJhaXQ6XG4gIC8vIGFuZCAob3JpZW50YXRpb246IHBvcnRyYWl0KVxuICAvLyB1bmNvbW1lbnQgZm9yIG9ubHkgbGFuZHNjYXBlOlxuICAvLyBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpXG57XG4gIC5jYXRlZ29yaWVzLWxpc3Qge1xuICAgIC5jYXRlZ29yeS1pdGVtIHtcbiAgICAgIC5jYXRlZ29yeS1hbmNob3Ige1xuICAgICAgICAuY2F0ZWdvcnktdGl0bGUge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKiAtLS0tLS0tLS0tLSBpUGhvbmUgNSwgNVMsIDVDIGFuZCA1U0UgLS0tLS0tLS0tLS0gKi9cbkBtZWRpYSBvbmx5IHNjcmVlblxuICBhbmQgKG1pbi1kZXZpY2Utd2lkdGggOiAzMjBweClcbiAgYW5kIChtYXgtZGV2aWNlLXdpZHRoIDogNTY4cHgpXG4gIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAyKVxuICBhbmQgKGRldmljZS1hc3BlY3QtcmF0aW86IDQwIC8gNzEpXG4gIC8vIHVuY29tbWVudCBmb3Igb25seSBwb3J0cmFpdDpcbiAgLy8gYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpXG4gIC8vIHVuY29tbWVudCBmb3Igb25seSBsYW5kc2NhcGU6XG4gIC8vIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSlcbntcblxufVxuXG4vKiAtLS0tLS0tLS0tLSBpUGhvbmUgNiwgNlMsIDcgYW5kIDggLS0tLS0tLS0tLS0gKi9cbkBtZWRpYSBvbmx5IHNjcmVlblxuICBhbmQgKG1pbi1kZXZpY2Utd2lkdGggOiAzNzVweClcbiAgYW5kIChtYXgtZGV2aWNlLXdpZHRoIDogNjY3cHgpXG4gIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAyKVxuICAvLyB1bmNvbW1lbnQgZm9yIG9ubHkgcG9ydHJhaXQ6XG4gIC8vIGFuZCAob3JpZW50YXRpb246IHBvcnRyYWl0KVxuICAvLyB1bmNvbW1lbnQgZm9yIG9ubHkgbGFuZHNjYXBlOlxuICAvLyBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpXG57XG4gIC5jYXRlZ29yaWVzLWxpc3Qge1xuICAgIC5jYXRlZ29yeS1pdGVtIHtcbiAgICAgIC5jYXRlZ29yeS1hbmNob3Ige1xuICAgICAgICAuY2F0ZWdvcnktdGl0bGUge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgICAgICBwYWRkaW5nOiB2YXIoLS1wYWdlLW1hcmdpbikgY2FsYygodmFyKC0tcGFnZS1tYXJnaW4pICogMykgLyAyKSA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyogLS0tLS0tLS0tLS0gaVBob25lIFggLS0tLS0tLS0tLS0gKi9cbkBtZWRpYSBvbmx5IHNjcmVlblxuICBhbmQgKG1pbi1kZXZpY2Utd2lkdGggOiAzNzVweClcbiAgYW5kIChtYXgtZGV2aWNlLXdpZHRoIDogODEycHgpXG4gIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvIDogMylcbiAgLy8gdW5jb21tZW50IGZvciBvbmx5IHBvcnRyYWl0OlxuICAvLyBhbmQgKG9yaWVudGF0aW9uOiBwb3J0cmFpdClcbiAgLy8gdW5jb21tZW50IGZvciBvbmx5IGxhbmRzY2FwZTpcbiAgLy8gYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKVxue1xuICAuY2F0ZWdvcmllcy1saXN0IHtcbiAgICAuY2F0ZWdvcnktaXRlbSB7XG4gICAgICAuY2F0ZWdvcnktYW5jaG9yIHtcbiAgICAgICAgLmNhdGVnb3J5LXRpdGxlIHtcbiAgICAgICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICAgICAgcGFkZGluZzogdmFyKC0tcGFnZS1tYXJnaW4pIGNhbGMoKHZhcigtLXBhZ2UtbWFyZ2luKSAqIDMpIC8gMikgO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qIC0tLS0tLS0tLS0tIGlQaG9uZSA2KywgNysgYW5kIDgrIC0tLS0tLS0tLS0tICovXG5AbWVkaWEgb25seSBzY3JlZW5cbiAgYW5kIChtaW4tZGV2aWNlLXdpZHRoIDogNDE0cHgpXG4gIGFuZCAobWF4LWRldmljZS13aWR0aCA6IDczNnB4KVxuICBhbmQgKC13ZWJraXQtbWluLWRldmljZS1waXhlbC1yYXRpbzogMylcbiAgLy8gdW5jb21tZW50IGZvciBvbmx5IHBvcnRyYWl0OlxuICAvLyBhbmQgKG9yaWVudGF0aW9uOiBwb3J0cmFpdClcbiAgLy8gdW5jb21tZW50IGZvciBvbmx5IGxhbmRzY2FwZTpcbiAgLy8gYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKVxue1xuICAuY2F0ZWdvcmllcy1saXN0IHtcbiAgICAuY2F0ZWdvcnktaXRlbSB7XG4gICAgICAuY2F0ZWdvcnktYW5jaG9yIHtcbiAgICAgICAgLmNhdGVnb3J5LXRpdGxlIHtcbiAgICAgICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICAgICAgcGFkZGluZzogdmFyKC0tcGFnZS1tYXJnaW4pIGNhbGMoKHZhcigtLXBhZ2UtbWFyZ2luKSAqIDMpIC8gMikgO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0= */"] });


/***/ }),

/***/ 580:
/*!****************************************************!*\
  !*** ./src/app/pages/user/profile/driver.model.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Car": () => (/* binding */ Car),
/* harmony export */   "DriverModel": () => (/* binding */ DriverModel)
/* harmony export */ });
/* harmony import */ var _components_shell_data_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/shell/data-store */ 4777);
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

class DriverModel extends _components_shell_data_store__WEBPACK_IMPORTED_MODULE_0__.ShellModel {
    constructor() {
        super();
    }
}
class Car {
}


/***/ })

}]);
//# sourceMappingURL=src_app_pages_start_start_module_ts.js.map