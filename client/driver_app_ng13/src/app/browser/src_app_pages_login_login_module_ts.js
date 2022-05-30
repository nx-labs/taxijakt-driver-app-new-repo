"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_login_login_module_ts"],{

/***/ 1053:
/*!*********************************************!*\
  !*** ./src/app/pages/login/login.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginPageModule": () => (/* binding */ LoginPageModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 4362);
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/components.module */ 5642);
/* harmony import */ var _nxApp_components_nx_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nxApp/components/nx-components.module */ 7410);
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.page */ 3058);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);










const routes = [
    {
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_2__.LoginPage
    }
];
class LoginPageModule {
}
LoginPageModule.ɵfac = function LoginPageModule_Factory(t) { return new (t || LoginPageModule)(); };
LoginPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: LoginPageModule });
LoginPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule.forChild(routes),
            _components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule,
            _nxApp_components_nx_components_module__WEBPACK_IMPORTED_MODULE_1__.NxComponentsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](LoginPageModule, { declarations: [_login_page__WEBPACK_IMPORTED_MODULE_2__.LoginPage], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule, _components_components_module__WEBPACK_IMPORTED_MODULE_0__.ComponentsModule,
        _nxApp_components_nx_components_module__WEBPACK_IMPORTED_MODULE_1__.NxComponentsModule] }); })();


/***/ }),

/***/ 3058:
/*!*******************************************!*\
  !*** ./src/app/pages/login/login.page.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginPage": () => (/* binding */ LoginPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _nxApp_services_driver_driver_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nxApp/services/driver/driver.service */ 3898);
/* harmony import */ var _api_driver_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @api/driver-api.service */ 1302);
/* harmony import */ var _core_services_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/services/storage.service */ 2323);
/* harmony import */ var _nxApp_app_paths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nxApp/app.paths */ 1578);
/* harmony import */ var _nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nxApp/events/nx-event.service */ 8354);
/* harmony import */ var _nxApp_services_app_nav_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nxApp/services/app-nav.service */ 2701);
/* harmony import */ var _root_app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @root/app.component */ 5041);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/angular */ 4362);
/* harmony import */ var _nxApp_components_nx_header_nx_header_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @nxApp/components/nx-header/nx-header.component */ 6192);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 6362);



























function LoginPage_ng_container_13_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "ion-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const validation_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](validation_r2.message);
} }
function LoginPage_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, LoginPage_ng_container_13_div_1_Template, 4, 1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const validation_r2 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.loginForm.get("email").hasError(validation_r2.type) && (ctx_r0.loginForm.get("email").dirty || ctx_r0.loginForm.get("email").touched));
} }
function LoginPage_ng_container_19_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "ion-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const validation_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](validation_r5.message);
} }
function LoginPage_ng_container_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, LoginPage_ng_container_19_div_1_Template, 4, 1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const validation_r5 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.loginForm.get("password").hasError(validation_r5.type) && (ctx_r1.loginForm.get("password").dirty || ctx_r1.loginForm.get("password").touched));
} }
const _c0 = function () { return ["/auth/forgot-password"]; };
class LoginPage {
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
        const emailValidator = _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required
            //  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ]);
        this.loginForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormGroup({
            'email': new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('+48888777657', emailValidator),
            'password': new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('1', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.minLength(1),
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required
            ]))
        });
    }
    dismissLoader() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.loadingCtrl) {
                console.log("NO LOADING CONTROLLER");
                return;
            }
            const { role, data } = yield this.loadingCtrl.onDidDismiss();
            console.log('Loading dismissed!');
        });
    }
    presentLoadingWithOptions() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            if (data && data.driver && data.driver.id) {
                let options = {
                    queryParams: {
                        fromLogin: true
                    }
                };
                this.appNavService.navigateWithData(_nxApp_app_paths__WEBPACK_IMPORTED_MODULE_3__.NxAppPages.Driver.url, options);
                //this.appNavService.navigateRoot(NxAppPages.Driver.url); // navigateWithData(NxAppPages.Driver.url, driverId);
            }
            else {
                this.appNavService.internalError("Invalid login data");
            }
        });
    }
    showTerms() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
        });
    }
    doLogin() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
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
}
LoginPage.ɵfac = function LoginPage_Factory(t) { return new (t || LoginPage)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_nxApp_services_app_nav_service__WEBPACK_IMPORTED_MODULE_5__.AppNavService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_12__.MenuController), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_storage_service__WEBPACK_IMPORTED_MODULE_2__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_4__.NxEventService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_root_app_component__WEBPACK_IMPORTED_MODULE_6__.AppComponent), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_12__.LoadingController), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_12__.AlertController), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_api_driver_api_service__WEBPACK_IMPORTED_MODULE_1__.DriverApiService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_nxApp_services_driver_driver_service__WEBPACK_IMPORTED_MODULE_0__.DriverService)); };
LoginPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: LoginPage, selectors: [["app-login"]], decls: 37, vars: 9, consts: [[3, "onlyLogo"], [1, "login-content"], [1, "card"], ["color", "medium"], [2, "font-weight", "bold"], [1, "card-form", 3, "formGroup", "ngSubmit"], [1, "input"], ["type", "text", "value", "", "formControlName", "email", 1, "input-field"], [1, "input-label"], [1, "error-container"], [4, "ngFor", "ngForOf"], ["type", "password", "formControlName", "password", 1, "input-field"], [1, "action"], ["type", "submit", "expand", "block", "color", "facebook", 1, "social-auth-btn", "facebook-auth-btn", 3, "disabled"], [2, "margin-top", "2em"], ["expand", "block", "color", "google", 1, "social-auth-btn", "google-auth-btn", 3, "routerLink"], ["expand", "block", "color", "medium", 1, "social-auth-btn", 3, "routerLink"], [1, "card-info"], [3, "click"], ["class", "error-message", 4, "ngIf"], [1, "error-message"], ["name", "information-circle-outline"]], template: function LoginPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "nx-header", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-content", 1)(2, "div", 2)(3, "ion-card", 2)(4, "ion-card-header", 3)(5, "ion-label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6, "Driver Login");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "form", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngSubmit", function LoginPage_Template_form_ngSubmit_7_listener() { return ctx.doLogin(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](9, "ion-input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "label", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](11, "Telefonnummer");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](13, LoginPage_ng_container_13_Template, 2, 1, "ng-container", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](15, "ion-input", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "label", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](17, "Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](19, LoginPage_ng_container_19_Template, 2, 1, "ng-container", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](20, "div", 12)(21, "ion-button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](22, " Logga in ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](23, "div", 14)(24, "ion-button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](25, " Get new password ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](26, "ion-card", 2)(27, "ion-card-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](28, " Do you want to drive for TaxiJakt? ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](29, "div")(30, "ion-button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](31, " Register as a Driver ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](32, "div", 17)(33, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](34, "By using this app you are agreeing to our ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](35, "a", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function LoginPage_Template_a_click_35_listener() { return ctx.showTerms(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](36, "Terms and Conditions");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("onlyLogo", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroup", ctx.loginForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx.validation_messages.email);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx.validation_messages.password);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", !ctx.loginForm.valid);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](7, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](8, _c0));
    } }, directives: [_nxApp_components_nx_header_nx_header_component__WEBPACK_IMPORTED_MODULE_7__.NxHeaderComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonCard, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonCardHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonLabel, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormGroupDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonInput, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.TextValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControlName, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.RouterLinkDelegate, _angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterLink], styles: ["@import url(\"https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap\");\n[_nghost-%COMP%] {\n  --page-margin: var(--app-broad-margin);\n  --page-background: #3faff4;\n}\nion-content[_ngcontent-%COMP%] {\n  --background: #3faff4 url(\"/assets/nx-app/blue-city.png\") bottom center no-repeat;\n}\nion-toolbar[_ngcontent-%COMP%] {\n  overflow: hidden;\n  background: #ffe0a7 !important;\n  background: linear-gradient(85deg, #ffe0a7 0%, #ffa800 13%, #ff8300 100%);\n  --background: linear-gradient(85deg, rgba(255,224,167,1) 0%, rgba(255,168,0,1) 13%, rgba(255,131,0,1) 100%);\n  position: relative;\n  box-shadow: rgba(0, 0, 0, 0.3) 0 2px 5px 0;\n}\nion-card[_ngcontent-%COMP%] {\n  padding: 2rem auto;\n  \n}\nimg[_ngcontent-%COMP%] {\n  max-width: 100%;\n  display: block;\n}\ninput[_ngcontent-%COMP%] {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  border-radius: 0;\n}\n.card[_ngcontent-%COMP%] {\n  margin: 2rem auto;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  max-width: 640px;\n  \n  padding: 0.75rem;\n}\n.card-image[_ngcontent-%COMP%] {\n  border-top-left-radius: 8px;\n  border-top-right-radius: 8px;\n  overflow: hidden;\n  background: #ffe0a7;\n  background: linear-gradient(85deg, #ffe0a7 0%, #ffa800 13%, #ff8300 100%);\n  position: relative;\n}\n.card-heading[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 10%;\n  top: 15%;\n  right: 10%;\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #735400;\n  line-height: 1.222;\n}\n.card-heading[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.75em;\n  font-weight: 400;\n  margin-top: 0.25em;\n}\n.card-form[_ngcontent-%COMP%] {\n  padding: 1rem 0;\n}\n.input[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column-reverse;\n  position: relative;\n  padding-top: 1.5rem;\n}\n.input[_ngcontent-%COMP%]    + .input[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n}\n.input-label[_ngcontent-%COMP%] {\n  color: #8597a3;\n  position: absolute;\n  top: 0.7rem;\n  transition: 0.25s ease;\n}\n.input-field[_ngcontent-%COMP%] {\n  border: 0;\n  z-index: 1;\n  background-color: transparent;\n  border-bottom: 2px solid #eee;\n  font: inherit;\n  font-size: 1.125rem;\n  padding: 0.25rem 0;\n}\n.input-field[_ngcontent-%COMP%]:focus, .input-field[_ngcontent-%COMP%]:valid {\n  outline: 0;\n  border-bottom-color: #6658d3;\n}\n.input-field[_ngcontent-%COMP%]:focus    + .input-label[_ngcontent-%COMP%], .input-field[_ngcontent-%COMP%]:valid    + .input-label[_ngcontent-%COMP%] {\n  color: #6658d3;\n  transform: translateY(-1.5rem);\n}\n.action[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n}\n.action-button[_ngcontent-%COMP%] {\n  font: inherit;\n  font-size: 1.25rem;\n  padding: 1em;\n  width: 100%;\n  font-weight: 500;\n  border-radius: 6px;\n  color: #FFF;\n  border: 0;\n}\n.action-button[_ngcontent-%COMP%]:focus {\n  outline: 0;\n}\n.action-button.black[_ngcontent-%COMP%] {\n  color: #fff;\n  font-weight: bolder;\n  background: #45484d;\n  background: linear-gradient(to bottom, #45484d 0%, #000000 100%);\n}\n.card-info[_ngcontent-%COMP%] {\n  padding: 1rem 1rem;\n  text-align: center;\n  font-size: 0.875rem;\n  color: #8597a3;\n}\n.card-info[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: block;\n  color: #6658d3;\n  text-decoration: none;\n}\n.login-content[_ngcontent-%COMP%] {\n  --padding-start: var(--page-margin);\n  --padding-end: var(--page-margin);\n  --padding-top: var(--page-margin);\n  --padding-bottom: var(--page-margin);\n}\n.login-content[_ngcontent-%COMP%]   .auth-title[_ngcontent-%COMP%] {\n  color: var(--ion-color-dark);\n  font-weight: bold;\n  margin-top: calc(var(--page-margin) / 2);\n  margin-bottom: calc(var(--page-margin) * 1.5);\n  letter-spacing: 0.6px;\n}\n.login-content[_ngcontent-%COMP%]   .inputs-list[_ngcontent-%COMP%] {\n  --ion-item-background: var(--page-background);\n}\n.login-content[_ngcontent-%COMP%]   .inputs-list[_ngcontent-%COMP%]   .input-item[_ngcontent-%COMP%] {\n  --padding-start: 0px;\n  --padding-end: 0px;\n  --inner-padding-end: 0px;\n}\n.login-content[_ngcontent-%COMP%]   .inputs-list[_ngcontent-%COMP%]   .error-container[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\n  margin: calc(var(--page-margin) / 2) 0px;\n  display: flex;\n  align-items: center;\n  color: var(--ion-color-danger);\n  font-size: 14px;\n}\n.login-content[_ngcontent-%COMP%]   .inputs-list[_ngcontent-%COMP%]   .error-container[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  -webkit-padding-end: calc(var(--page-margin) / 2);\n          padding-inline-end: calc(var(--page-margin) / 2);\n}\n.login-content[_ngcontent-%COMP%]   .login-btn[_ngcontent-%COMP%] {\n  margin: calc(var(--page-margin) / 2) 0px;\n}\n.login-content[_ngcontent-%COMP%]   .other-auth-options-row[_ngcontent-%COMP%] {\n  justify-content: space-between;\n  align-items: center;\n}\n.login-content[_ngcontent-%COMP%]   .other-auth-options-row[_ngcontent-%COMP%]   .forgot-btn[_ngcontent-%COMP%] {\n  --color: var(--ion-color-medium);\n  --padding-start: 0;\n  margin: 0;\n}\n.login-content[_ngcontent-%COMP%]   .other-auth-options-row[_ngcontent-%COMP%]   .forgot-btn[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.login-content[_ngcontent-%COMP%]   .other-auth-options-row[_ngcontent-%COMP%]   .signup-btn[_ngcontent-%COMP%] {\n  --color: var(--ion-color-secondary);\n  margin: 0px;\n}\n.login-content[_ngcontent-%COMP%]   .other-auth-options-row[_ngcontent-%COMP%]   .signup-btn[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.login-content[_ngcontent-%COMP%]   .social-auth-options[_ngcontent-%COMP%]   .options-divider[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  margin: var(--page-margin) 0px;\n  text-align: center;\n}\n.login-content[_ngcontent-%COMP%]   .social-auth-options[_ngcontent-%COMP%]   .social-auth-btn[_ngcontent-%COMP%] {\n  margin: 0px;\n}\n.login-content[_ngcontent-%COMP%]   .social-auth-options[_ngcontent-%COMP%]   .social-auth-btn[_ngcontent-%COMP%]:not(:first-child) {\n  margin-top: var(--page-margin);\n}\n/*# sourceMappingURL=data:application/json;base64,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c0NvbnRlbnQiOlsiLy8gQ3VzdG9tIHZhcmlhYmxlc1xuLy8gTm90ZTogIFRoZXNlIG9uZXMgd2VyZSBhZGRlZCBieSB1cyBhbmQgaGF2ZSBub3RoaW5nIHRvIGRvIHdpdGggSW9uaWMgQ1NTIEN1c3RvbSBQcm9wZXJ0aWVzXG46aG9zdCB7XG5cdC0tcGFnZS1tYXJnaW46IHZhcigtLWFwcC1icm9hZC1tYXJnaW4pO1xuXHQtLXBhZ2UtYmFja2dyb3VuZDogIzNmYWZmNDtcbn1cblxuaW9uLWNvbnRlbnQge1xuXHQtLWJhY2tncm91bmQ6ICMzZmFmZjQgdXJsKCcvYXNzZXRzL254LWFwcC9ibHVlLWNpdHkucG5nJykgYm90dG9tIGNlbnRlciBuby1yZXBlYXQ7ICAvLyAjZmZhODAwO1xufVxuXG5pb24tdG9vbGJhciB7XG5cdG92ZXJmbG93OiBoaWRkZW47XG5cdGJhY2tncm91bmQ6IHJnYigyNTUsMjI0LDE2NykgIWltcG9ydGFudDtcblx0YmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDg1ZGVnLCByZ2JhKDI1NSwyMjQsMTY3LDEpIDAlLCByZ2JhKDI1NSwxNjgsMCwxKSAxMyUsIHJnYmEoMjU1LDEzMSwwLDEpIDEwMCUpO1xuXHQtLWJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg4NWRlZywgcmdiYSgyNTUsMjI0LDE2NywxKSAwJSwgcmdiYSgyNTUsMTY4LDAsMSkgMTMlLCByZ2JhKDI1NSwxMzEsMCwxKSAxMDAlKTtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHQtd2Via2l0LWJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4zKSAwIDJweCA1cHggMDtcblx0Ym94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjMpIDAgMnB4IDVweCAwO1xufVxuXG5pb24tY2FyZCB7XG5cdHBhZGRpbmc6IDJyZW0gYXV0bztcblxuXG5cdC8qXG5cdC50b3AtY2FyZCB7XG5cdFx0dG9wOiAyMDBweDtcblx0XHRtYXJnaW4tdG9wOiAzMDBweCAhaW1wb3J0YW50O1xuXHRcdC0tbWFyZ2luLXRvcDogdmFyKC0tcGFnZS1tYXJnaW4gKiAxMCk7XG5cdH1cblx0Ki9cbn1cblxuXG4vL1xuLy8gIEZvcm0gU3R5bGVcbi8vXG5AaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1ETStTYW5zOndnaHRANDAwOzUwMDs3MDAmZGlzcGxheT1zd2FwJyk7XG5cbmltZyB7XG5cdG1heC13aWR0aDogMTAwJTtcblx0ZGlzcGxheTogYmxvY2s7XG59XG5cbi8vIGlPUyBSZXNldFxuaW5wdXQge1xuXHRhcHBlYXJhbmNlOiBub25lO1xuXHRib3JkZXItcmFkaXVzOiAwO1xufVxuXG4uY2FyZCB7XG5cdG1hcmdpbjogMnJlbSBhdXRvO1xuXHRkaXNwbGF5OiBmbGV4O1xuXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXHR3aWR0aDogMTAwJTtcblx0bWF4LXdpZHRoOiA2NDBweDtcblx0LypiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGOyovXG5cblxuXHRwYWRkaW5nOiAuNzVyZW07XG59XG5cbi5jYXJkLWltYWdlIHtcblx0Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1czogOHB4O1xuXHRib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogOHB4O1xuXHRvdmVyZmxvdzogaGlkZGVuO1xuXHRiYWNrZ3JvdW5kOiByZ2IoMjU1LDIyNCwxNjcpO1xuXHRiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoODVkZWcsIHJnYmEoMjU1LDIyNCwxNjcsMSkgMCUsIHJnYmEoMjU1LDE2OCwwLDEpIDEzJSwgcmdiYSgyNTUsMTMxLDAsMSkgMTAwJSk7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmNhcmQtaGVhZGluZyB7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0bGVmdDogMTAlO1xuXHR0b3A6IDE1JTtcblx0cmlnaHQ6IDEwJTtcblx0Zm9udC1zaXplOiAxLjc1cmVtO1xuXHRmb250LXdlaWdodDogNzAwO1xuXHRjb2xvcjogIzczNTQwMDtcblx0bGluZS1oZWlnaHQ6IDEuMjIyO1xuXHRzbWFsbCB7XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0Zm9udC1zaXplOiAuNzVlbTtcblx0XHRmb250LXdlaWdodDogNDAwO1xuXHRcdG1hcmdpbi10b3A6IC4yNWVtO1xuXHR9XG59XG5cbi5jYXJkLWZvcm0ge1xuXHRwYWRkaW5nOiAxcmVtIDA7XG59XG5cbi5pbnB1dCB7XG5cdGRpc3BsYXk6IGZsZXg7XG5cdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRwYWRkaW5nLXRvcDogMS41cmVtO1xuXHQmKy5pbnB1dCB7XG5cdFx0bWFyZ2luLXRvcDogMS41cmVtO1xuXHR9XG59XG5cbi5pbnB1dC1sYWJlbCB7XG5cdGNvbG9yOiAjODU5N2EzO1xuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHRvcDogMC43cmVtO1xuXHR0cmFuc2l0aW9uOiAuMjVzIGVhc2U7XG59XG5cbi5pbnB1dC1maWVsZCB7XG5cdGJvcmRlcjogMDtcblx0ei1pbmRleDogMTtcblx0YmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG5cdGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjZWVlO1xuXHRmb250OiBpbmhlcml0O1xuXHRmb250LXNpemU6IDEuMTI1cmVtO1xuXHRwYWRkaW5nOiAuMjVyZW0gMDtcblx0Jjpmb2N1cywgJjp2YWxpZCB7XG5cdFx0b3V0bGluZTogMDtcblx0XHRib3JkZXItYm90dG9tLWNvbG9yOiAjNjY1OGQzO1xuXHRcdCYrLmlucHV0LWxhYmVsIHtcblx0XHRcdGNvbG9yOiAjNjY1OGQzO1xuXHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xLjVyZW0pO1xuXHRcdH1cblx0fVxufVxuXG4uYWN0aW9uIHtcblx0bWFyZ2luLXRvcDogMnJlbTtcbn1cblxuLmFjdGlvbi1idXR0b24ge1xuXHRmb250OiBpbmhlcml0O1xuXHRmb250LXNpemU6IDEuMjVyZW07XG5cdHBhZGRpbmc6IDFlbTtcblx0d2lkdGg6IDEwMCU7XG5cdGZvbnQtd2VpZ2h0OiA1MDA7XG5cdGJvcmRlci1yYWRpdXM6IDZweDtcblx0Y29sb3I6ICNGRkY7XG5cdGJvcmRlcjogMDtcblx0Jjpmb2N1cyB7XG5cdFx0b3V0bGluZTogMDtcblx0fVxufVxuXG4uYWN0aW9uLWJ1dHRvbi5ibGFjayB7XG5cdGNvbG9yOiAjZmZmO1xuXHRmb250LXdlaWdodDogYm9sZGVyO1xuXHRiYWNrZ3JvdW5kOiAjNDU0ODRkO1xuXHRiYWNrZ3JvdW5kOiAtbW96LWxpbmVhci1ncmFkaWVudCh0b3AsICM0NTQ4NGQgMCUsICMwMDAwMDAgMTAwJSk7XG5cdGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgIzQ1NDg0ZCAwJSwjMDAwMDAwIDEwMCUpO1xuXHRiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCAjNDU0ODRkIDAlLCMwMDAwMDAgMTAwJSk7XG59XG5cbi5jYXJkLWluZm8ge1xuXHRwYWRkaW5nOiAxcmVtIDFyZW07XG5cdHRleHQtYWxpZ246IGNlbnRlcjtcblx0Zm9udC1zaXplOiAuODc1cmVtO1xuXHRjb2xvcjogIzg1OTdhMztcblx0YSB7XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0Y29sb3I6ICM2NjU4ZDM7XG5cdFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xuXHR9XG59XG5cblxuXG5cblxuLy8gTm90ZTogIEFsbCB0aGUgQ1NTIHZhcmlhYmxlcyBkZWZpbmVkIGJlbG93IGFyZSBvdmVycmlkZXMgb2YgSW9uaWMgZWxlbWVudHMgQ1NTIEN1c3RvbSBQcm9wZXJ0aWVzXG4ubG9naW4tY29udGVudCB7XG4vL1x0LS1iYWNrZ3JvdW5kOiAjM2VhZmY0IHVybCgnL2Fzc2V0cy9ueC1hcHAvb3JhbmdlLWNpdHkucG5nJykgYm90dG9tIGNlbnRlciBuby1yZXBlYXQ7XG4vL1x0YmFja2dyb3VuZC1zaXplOiA1MCUgIWltcG9ydGFudDtcblx0LS1wYWRkaW5nLXN0YXJ0OiB2YXIoLS1wYWdlLW1hcmdpbik7XG5cdC0tcGFkZGluZy1lbmQ6IHZhcigtLXBhZ2UtbWFyZ2luKTtcblx0LS1wYWRkaW5nLXRvcDogdmFyKC0tcGFnZS1tYXJnaW4pO1xuXHQtLXBhZGRpbmctYm90dG9tOiB2YXIoLS1wYWdlLW1hcmdpbik7XG5cblx0LmF1dGgtdGl0bGUge1xuXHRcdGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG5cdFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XG5cdFx0bWFyZ2luLXRvcDogY2FsYyh2YXIoLS1wYWdlLW1hcmdpbikgLyAyKTtcblx0XHRtYXJnaW4tYm90dG9tOiBjYWxjKHZhcigtLXBhZ2UtbWFyZ2luKSAqICgzLzIpKTtcblx0XHRsZXR0ZXItc3BhY2luZzogMC42cHg7XG5cdH1cblxuXHQuaW5wdXRzLWxpc3Qge1xuXHRcdC0taW9uLWl0ZW0tYmFja2dyb3VuZDogdmFyKC0tcGFnZS1iYWNrZ3JvdW5kKTtcblxuXHRcdC5pbnB1dC1pdGVtIHtcblx0XHRcdC0tcGFkZGluZy1zdGFydDogMHB4O1xuXHRcdFx0LS1wYWRkaW5nLWVuZDogMHB4O1xuXHRcdFx0LS1pbm5lci1wYWRkaW5nLWVuZDogMHB4O1xuXHRcdH1cblxuXHRcdC5lcnJvci1jb250YWluZXIge1xuXHRcdFx0LmVycm9yLW1lc3NhZ2Uge1xuXHRcdFx0XHRtYXJnaW46IGNhbGModmFyKC0tcGFnZS1tYXJnaW4pIC8gMikgMHB4O1xuXHRcdFx0XHRkaXNwbGF5OiBmbGV4O1xuXHRcdFx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRcdFx0XHRjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XG5cdFx0XHRcdGZvbnQtc2l6ZTogMTRweDtcblxuXHRcdFx0XHRpb24taWNvbiB7XG5cdFx0XHRcdFx0cGFkZGluZy1pbmxpbmUtZW5kOiBjYWxjKHZhcigtLXBhZ2UtbWFyZ2luKSAvIDIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LmxvZ2luLWJ0biB7XG5cdFx0bWFyZ2luOiBjYWxjKHZhcigtLXBhZ2UtbWFyZ2luKSAvIDIpIDBweDtcblx0fVxuXG5cdC5vdGhlci1hdXRoLW9wdGlvbnMtcm93IHtcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG5cdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblxuXHRcdC5mb3Jnb3QtYnRuIHtcblx0XHRcdC0tY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuXHRcdFx0LS1wYWRkaW5nLXN0YXJ0OiAwO1xuXHRcdFx0bWFyZ2luOiAwO1xuXG5cdFx0XHQmOmZvY3VzIHtcblx0XHRcdFx0b3V0bGluZTogbm9uZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQuc2lnbnVwLWJ0biB7XG5cdFx0XHQtLWNvbG9yOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcblx0XHRcdG1hcmdpbjogMHB4O1xuXG5cdFx0XHQmOmZvY3VzIHtcblx0XHRcdFx0b3V0bGluZTogbm9uZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQuc29jaWFsLWF1dGgtb3B0aW9ucyB7XG5cdFx0Lm9wdGlvbnMtZGl2aWRlciB7XG5cdFx0XHRjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG5cdFx0XHRtYXJnaW46IHZhcigtLXBhZ2UtbWFyZ2luKSAwcHg7XG5cdFx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdFx0fVxuXG5cdFx0LnNvY2lhbC1hdXRoLWJ0biB7XG5cdFx0XHRtYXJnaW46IDBweDtcblxuXHRcdFx0Jjpub3QoOmZpcnN0LWNoaWxkKSB7XG5cdFx0XHRcdG1hcmdpbi10b3A6IHZhcigtLXBhZ2UtbWFyZ2luKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiJdfQ== */"] });


/***/ })

}]);
//# sourceMappingURL=src_app_pages_login_login_module_ts.js.map