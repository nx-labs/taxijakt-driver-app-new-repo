(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["main"],{

/***/ 8019:
/*!************************************!*\
  !*** ./src/app/api/api-factory.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiFactory": () => (/* binding */ ApiFactory)
/* harmony export */ });
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
class ApiFactory {
    constructor() { }
    static newTag() {
        return Math.random().toString(36).substr(2, 9);
    }
    simpleMessage(messageType, body) {
        return {
            type: messageType,
            data: body,
            timestamp: Date.now()
        };
    }
    newUserMessage(messageType, userId, body) {
        return {
            type: messageType,
            uid: userId,
            data: body,
            timestamp: Date.now()
        };
    }
}


/***/ }),

/***/ 1302:
/*!*******************************************!*\
  !*** ./src/app/api/driver-api.service.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DriverApiService": () => (/* binding */ DriverApiService)
/* harmony export */ });
/* harmony import */ var _core_services_api_client_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/services/api-client.service */ 1598);
/* harmony import */ var _core_services_socket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/services/socket.service */ 3404);
/* harmony import */ var _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nxApp/events/nx-event-types */ 5022);
/* harmony import */ var _nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nxApp/events/nx-event.service */ 8354);
/* harmony import */ var _shared_driver_driver_car_options__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/driver/driver-car-options */ 4601);
/* harmony import */ var _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/messages/message-types */ 729);
/* harmony import */ var _utils_tag_generator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @utils/tag-generator */ 9381);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 116);
/* harmony import */ var _api_api_factory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @api/api-factory */ 8019);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 3184);














class DriverApiService {
    constructor(nxEvents, messageFactory, socketService, apiClient) {
        this.nxEvents = nxEvents;
        this.messageFactory = messageFactory;
        this.socketService = socketService;
        this.apiClient = apiClient;
        nxEvents.onNewEvent().subscribe((value) => {
            switch (value.eventType) {
                case _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_2__.NxEvent.SetStatus:
                    this.setDriverStatus(value.eventData);
                    break;
                case _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_2__.NxEvent.SetBusy:
                    this.setDriverBusy(value.eventData);
                    break;
            }
        });
    }
    getDriverStatus(driverId) {
        let msg = this.messageFactory.newUserMessage(_shared_messages_message_types__WEBPACK_IMPORTED_MODULE_5__.MsgType.DriverGetInfo, driverId);
        return this.socketService.emitMessage(msg);
    }
    getDriverOrder(orderId) {
        let msg = this.messageFactory.simpleMessage(_shared_messages_message_types__WEBPACK_IMPORTED_MODULE_5__.MsgType.GetDriverOrder, {
            orderId: orderId
        });
        return this.socketService.sendMessage(msg);
    }
    /**
     * Get a list of cars registered to the driver
     * @param uuid
     * @param {number} driverId
     * @returns {<IMessage>}
     */
    getDriverCars() {
        let msg = {
            type: _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_5__.MsgType.GetCars
        };
        const tag = (0,_utils_tag_generator__WEBPACK_IMPORTED_MODULE_6__.generateTag)();
        const res = this.socketService.cmStream.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.filter)((value) => {
            const res = value.type === _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_5__.MsgType.GetCars;
            if (res)
                console.log("getDriverCars :: PARSE TAG MESS ::", res, ":::", value);
            return res;
        }));
        this.socketService.sendMessage(msg, tag);
        return res;
    }
    /**
     * Select car
     * @returns {<any>}
     */
    setCurrentCar(options) {
        let msg = {
            type: _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_5__.MsgType.SetCurrentCar,
            data: !options ? new _shared_driver_driver_car_options__WEBPACK_IMPORTED_MODULE_4__.DriverCarOptions().compile() : options.compile()
        };
        const tag = (0,_utils_tag_generator__WEBPACK_IMPORTED_MODULE_6__.generateTag)();
        const res = this.socketService.cmStream.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.filter)((value) => {
            return value.type === _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_5__.MsgType.SetCurrentCar && value.tag == tag;
        }));
        this.socketService.sendMessage(msg, tag);
        return res;
    }
    authenticate(username, password) {
        let msg = {
            type: _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_5__.MsgType.DriverLogin,
            data: {
                user: username,
                pass: password
            }
        };
        const tag = (0,_utils_tag_generator__WEBPACK_IMPORTED_MODULE_6__.generateTag)();
        const res = this.socketService.cmStream.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.filter)((value) => {
            const res = value.type === _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_5__.MsgType.DriverLogin && value.tag == tag;
            try {
                if (res) {
                    const apiMessage = value.data;
                    if (apiMessage.success) {
                        this.nxEvents.pushNewEvent(_nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_2__.NxEvent.DriverLogin);
                    }
                }
            }
            catch (e) {
                console.error("DriverApiService ::", e);
            }
            return res;
        }));
        this.socketService.sendMessage(msg, tag);
        return res;
    }
    setDriverStatus(status) {
        let msg = {
            type: _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_5__.MsgType.SetDriverStatus,
            data: status
        };
        return this.socketService.sendMessage(msg);
    }
    setDriverBusy(min, reason) {
        let msg = {
            type: _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_5__.MsgType.SetDriverBusy,
            data: { minutes: min }
        };
        return this.socketService.sendMessage(msg);
    }
}
DriverApiService.ɵfac = function DriverApiService_Factory(t) { return new (t || DriverApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_3__.NxEventService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_api_api_factory__WEBPACK_IMPORTED_MODULE_7__.ApiFactory), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_core_services_socket_service__WEBPACK_IMPORTED_MODULE_1__.SocketService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_core_services_api_client_service__WEBPACK_IMPORTED_MODULE_0__.ApiClientService)); };
DriverApiService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjectable"]({ token: DriverApiService, factory: DriverApiService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 371:
/*!******************************************!*\
  !*** ./src/app/api/order-api.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OrderAction": () => (/* binding */ OrderAction),
/* harmony export */   "OrderApiService": () => (/* binding */ OrderApiService)
/* harmony export */ });
/* harmony import */ var _core_services_api_client_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/services/api-client.service */ 1598);
/* harmony import */ var _core_services_socket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/services/socket.service */ 3404);
/* harmony import */ var _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nxApp/events/nx-event-types */ 5022);
/* harmony import */ var _nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nxApp/events/nx-event.service */ 8354);
/* harmony import */ var _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/messages/message-types */ 729);
/* harmony import */ var _utils_tag_generator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @utils/tag-generator */ 9381);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 116);
/* harmony import */ var _api_factory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./api-factory */ 8019);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);













var OrderAction;
(function (OrderAction) {
    OrderAction[OrderAction["Accept"] = 0] = "Accept";
    OrderAction[OrderAction["Deny"] = 1] = "Deny";
    OrderAction[OrderAction["Complete"] = 2] = "Complete";
    OrderAction[OrderAction["CustomerNoShow"] = 3] = "CustomerNoShow";
    OrderAction[OrderAction["CantDeliver"] = 4] = "CantDeliver";
})(OrderAction || (OrderAction = {}));
class OrderApiService {
    constructor(nxEvents, messageFactory, socketService, apiClient) {
        this.nxEvents = nxEvents;
        this.messageFactory = messageFactory;
        this.socketService = socketService;
        this.apiClient = apiClient;
        nxEvents.onNewEvent().subscribe((value) => {
            switch (value.eventType) {
                case _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_2__.NxEvent.GetSessionOrders:
                    this.getActiveOrdersBySession().subscribe(value => {
                        let data = value.data;
                        if (data.success && (data === null || data === void 0 ? void 0 : data.data)) {
                            nxEvents.pushNewEvent(_nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_2__.NxEvent.ActiveOrders, data.data);
                        }
                    });
                    break;
            }
        });
    }
    getOrders() {
        let msg = this.messageFactory.simpleMessage(_shared_messages_message_types__WEBPACK_IMPORTED_MODULE_4__.MsgType.GetOrdersBySession);
        return this.socketService.sendMessage(msg);
    }
    getActiveOrdersBySession() {
        let msg = {
            type: _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_4__.MsgType.GetOrdersBySession,
        };
        const tag = (0,_utils_tag_generator__WEBPACK_IMPORTED_MODULE_5__.generateTag)();
        const res = this.socketService.cmStream.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.filter)((value) => {
            return value.type === _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_4__.MsgType.GetOrdersBySession;
        }));
        this.socketService.sendMessage(msg, tag);
        return res;
    }
    acceptOrder(orderId, source = "MARKET") {
        let msg = {
            type: _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_4__.MsgType.AcceptOrder,
            data: {
                id: orderId,
                source: source
            }
        };
        console.log("\n\n ACCEPT ORDEAR :::", msg);
        const tag = (0,_utils_tag_generator__WEBPACK_IMPORTED_MODULE_5__.generateTag)();
        const res = this.socketService.cmStream.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.filter)((value) => {
            return value.type === _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_4__.MsgType.AcceptOrder;
        }));
        this.socketService.sendMessage(msg, tag);
        return res;
    }
    completeOrder(orderId, forceFinish) {
        let msg = this.messageFactory.simpleMessage(_shared_messages_message_types__WEBPACK_IMPORTED_MODULE_4__.MsgType.CompleteOrder, {
            id: orderId,
            driverForceFinish: forceFinish ? 1 : 0
        });
        return this.socketService.sendMessage(msg);
    }
    cantDeliver(orderId) {
        let msg = this.messageFactory.simpleMessage(_shared_messages_message_types__WEBPACK_IMPORTED_MODULE_4__.MsgType.CantCompleteOrder, { id: orderId });
        return this.socketService.sendMessage(msg);
    }
    customerNoShow(orderId) {
        let msg = this.messageFactory.simpleMessage(_shared_messages_message_types__WEBPACK_IMPORTED_MODULE_4__.MsgType.CustomerNoShow, { id: orderId });
        return this.socketService.sendMessage(msg);
    }
    denyOrder(orderId) {
        let msg = this.messageFactory.simpleMessage(_shared_messages_message_types__WEBPACK_IMPORTED_MODULE_4__.MsgType.DenyOrder, { id: orderId });
        return this.socketService.sendMessage(msg);
    }
}
OrderApiService.ɵfac = function OrderApiService_Factory(t) { return new (t || OrderApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_3__.NxEventService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_api_factory__WEBPACK_IMPORTED_MODULE_6__.ApiFactory), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_core_services_socket_service__WEBPACK_IMPORTED_MODULE_1__.SocketService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_core_services_api_client_service__WEBPACK_IMPORTED_MODULE_0__.ApiClientService)); };
OrderApiService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({ token: OrderApiService, factory: OrderApiService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);



const routes = [
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    },
    {
        path: 'auth/login',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_login_login_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/login/login.module */ 1053)).then(m => m.LoginPageModule)
    },
    {
        path: 'auth/signup',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_signup_signup_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/signup/signup.module */ 7110)).then(m => m.SignupPageModule)
    },
    {
        path: 'auth/forgot-password',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_forgot-password_forgot-password_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/forgot-password/forgot-password.module */ 5638)).then(m => m.ForgotPasswordPageModule)
    },
    {
        path: 'app',
        loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./tabs/tabs.module */ 5564)).then(m => m.TabsPageModule)
    },
    {
        path: 'app/start',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_start_start_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/start/start.module */ 9243)).then(m => m.StartPageModule)
    },
    {
        path: 'app/settings',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_settings_settings_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/settings/settings.module */ 7850)).then(m => m.SettingsPageModule)
    },
    {
        path: 'app/orders',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_orders_orders_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/orders/orders.module */ 7066)).then(m => m.OrdersPageModule)
    },
    {
        path: 'app/pro',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_payment_payment_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/payment/payment.module */ 4923)).then(m => m.PaymentPageModule)
    },
    {
        path: 'app/messages',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_messages_messages_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/messages/messages.module */ 5183)).then(m => m.MessagesPageModule)
    },
    {
        path: 'internal-error',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_page-internal-error_page-not-found_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/page-internal-error/page-not-found.module */ 9362)).then(m => m.PageNotFoundModule)
    },
    {
        path: '**',
        redirectTo: 'page-internal-error'
    },
    {
        path: 'payment',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_payment_payment_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/payment/payment.module */ 4923)).then(m => m.PaymentPageModule)
    }
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forRoot(routes, {
                // This value is required for server-side rendering to work.
                initialNavigation: 'enabled',
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled'
            })
        ], _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule] }); })();


/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _capacitor_splash_screen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor/splash-screen */ 2239);
/* harmony import */ var _core_services_socket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/services/socket.service */ 3404);
/* harmony import */ var _nxApp_components_nx_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nxApp/components/nx-app-component */ 830);
/* harmony import */ var _nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nxApp/events/nx-event.service */ 8354);
/* harmony import */ var _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nxApp/events/nx-event-types */ 5022);
/* harmony import */ var _nxApp_modals_new_order_modal_new_order_modal_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nxApp/modals/new-order-modal/new-order-modal.component */ 6442);
/* harmony import */ var _nxApp_nx_app_manager_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nxApp/nx-app-manager.service */ 8823);
/* harmony import */ var _nxApp_services_app_nav_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @nxApp/services/app-nav.service */ 2701);
/* harmony import */ var _nxApp_services_driver_driver_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @nxApp/services/driver/driver.service */ 3898);
/* harmony import */ var _nxApp_services_nx_app_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @nxApp/services/nx-app.service */ 9282);
/* harmony import */ var _utils_history_helper_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @utils/history-helper.service */ 675);
/* harmony import */ var _nxApp_app_paths__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @nxApp/app.paths */ 1578);
/* harmony import */ var _app_settings__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./app.settings */ 1182);
/* harmony import */ var _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./shared/messages/message-types */ 1765);
/* harmony import */ var _api_order_api_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @api/order-api.service */ 371);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ngx-translate/core */ 3935);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ionic/angular */ 4362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _tabs_tabs_page__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./tabs/tabs.page */ 7942);
































const _c0 = ["#appNav"];
const _c1 = function () { return []; };
const _c2 = function () { return ["/app/messages"]; };
const _c3 = function () { return ["/forms-filters"]; };
class AppComponent extends _nxApp_components_nx_app_component__WEBPACK_IMPORTED_MODULE_2__.NxAppComponent {
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
        this.appTitle = _app_settings__WEBPACK_IMPORTED_MODULE_12__.AppTitle;
        this.appPages = _nxApp_app_paths__WEBPACK_IMPORTED_MODULE_11__.AppPages;
        this.accountPages = _nxApp_app_paths__WEBPACK_IMPORTED_MODULE_11__.AccountPages;
        this.activeOrder = null;
        this.hackArray = new Array();
        this.modalIsPresenting = false;
        if (this.nav) {
            this.nav.ngAfterViewInit.subscribe();
            console.log("NAS IS NIL");
        }
        appDataService.OnNewOrder.subscribe((order) => {
            //	if (this.activeOrder !== null) return;
            this.activeOrder = order;
            this.hackArray.push(order.orderData.id);
            let modalData = {
                modal: _nxApp_modals_new_order_modal_new_order_modal_component__WEBPACK_IMPORTED_MODULE_5__.NewOrderModalComponent,
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
                case _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_13__.MsgType.DriverUpdate:
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            return yield this.presentModal(modalData);
        });
    }
    onEvent(event) {
        switch (event.eventType) {
            case _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_4__.NxEvent.ShowModal:
                this.presentModal(event.eventData);
                break;
            case _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_4__.NxEvent.AppWideData:
                this.updateAppData(event.eventData);
                break;
            case _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_4__.NxEvent.NewOrder:
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            console.log("AppEvent ::", appEvent);
        });
    }
    routeTab(url) {
        console.log("NAV ::", url);
        this.appNavService.navigateRoot(url);
    }
    initializeApp() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            try {
                yield _capacitor_splash_screen__WEBPACK_IMPORTED_MODULE_0__.SplashScreen.hide();
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            if (this.modalIsPresenting)
                return;
            this.modalIsPresenting = true;
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
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_nxApp_services_app_nav_service__WEBPACK_IMPORTED_MODULE_7__.AppNavService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_3__.NxEventService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_utils_history_helper_service__WEBPACK_IMPORTED_MODULE_10__.HistoryHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_19__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_nxApp_services_driver_driver_service__WEBPACK_IMPORTED_MODULE_8__.DriverService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_api_order_api_service__WEBPACK_IMPORTED_MODULE_14__.OrderApiService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_core_services_socket_service__WEBPACK_IMPORTED_MODULE_1__.SocketService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_nxApp_nx_app_manager_service__WEBPACK_IMPORTED_MODULE_6__.NxAppManagerService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_nxApp_services_nx_app_service__WEBPACK_IMPORTED_MODULE_9__.NxAppService)); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], viewQuery: function AppComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵviewQuery"](_c0, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵloadQuery"]()) && (ctx.nav = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵInheritDefinitionFeature"]], decls: 99, vars: 23, consts: [[3, "dir"], ["contentId", "menu-content", "when", "false"], ["contentId", "menu-content", 1, "app-sidemenu"], ["autoHide", "false"], [3, "routerLink"], ["slot", "start", "name", "newspaper", 2, "color", "#000000"], ["slot", "start", "name", "cash", 2, "color", "#000000"], ["slot", "start", "name", "mail", 2, "color", "#000000"], ["slot", "start", "name", "call", 2, "color", "#000000"], ["slot", "start", "name", "card", 2, "color", "#000000"], ["slot", "start", "name", "build", 2, "color", "#000000"], [3, "click"], ["slot", "start", "name", "options-outline"], ["id", "menu-content"], ["slot", "bottom"], ["tab", "start", 3, "click"], ["name", "calendar"], ["tab", "getpro", 3, "click"], ["name", "person-circle"], ["color", "primary"], ["name", "map"], ["tab", "prebookings", 3, "click"], ["name", "information-circle"], ["tab", "messages", 3, "click"], ["name", "chatbox-outline"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "ion-app", 0)(1, "ion-split-pane", 1)(2, "ion-menu", 2)(3, "ion-content")(4, "ion-list")(5, "ion-list-header")(6, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](7, "Bokningar");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](8, "ion-menu-toggle", 3)(9, "ion-item", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](10, "ion-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](11, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](12, " Mina bokingar ");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](13, "ion-item", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](14, "ion-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](15, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](16, " F\u00F6rbest\u00E4llningar ");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](17, "ion-list")(18, "ion-list-header")(19, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](20, "Skaffa pro");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](21, "ion-menu-toggle", 3)(22, "ion-item", 4)(23, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](24, " K\u00F6p PRO i 24 timmar f\u00F6r ");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](25, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](26, "100");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](27, " SEK ");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](28, "ion-item", 4)(29, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](30, " K\u00F6p PRO i en vecka f\u00F6r ");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](31, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](32, "500");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](33, " SEK ");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](34, "ion-item", 4)(35, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](36, " K\u00F6p PRO i en m\u00E5nad f\u00F6r ");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](37, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](38, "2000");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](39, " SEK ");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](40, "ion-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](41, "ion-list-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](42, "ion-menu-toggle", 3)(43, "ion-item", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](44, "ion-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](45, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](46, " H\u00E4nvisa och tj\u00E4na ");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](47, "ion-item", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](48, "ion-icon", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](49, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](50, " Meddelanden ");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](51, "ion-item", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](52, "ion-icon", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](53, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](54, " Support ");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](55, "ion-item", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](56, "ion-icon", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](57, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](58, " Kortdetaljer ");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](59, "ion-item", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](60, "ion-icon", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](61, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](62, " Inst\u00E4llningar ");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](63, "ion-item", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function AppComponent_Template_ion_item_click_63_listener() { return ctx.doLogout(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](64, "ion-icon", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](65, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](66, " Logga ut ");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](67, "ion-item", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](68, "ion-icon", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](69, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](70, " Policy ");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](71, "ion-router-outlet", 13)(72, "app-tabs");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](73, "ion-tabs")(74, "ion-tab-bar", 14)(75, "ion-tab-button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function AppComponent_Template_ion_tab_button_click_75_listener() { return ctx.routeTab("/app/start"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](76, "ion-icon", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](77, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](78, "Start");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](79, "ion-badge");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](80, "6");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](81, "ion-tab-button", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function AppComponent_Template_ion_tab_button_click_81_listener() { return ctx.routeTab("/app/getpro"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](82, "ion-icon", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](83, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](84, "K\u00F6p PRO");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](85, "ion-badge", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](86, "11");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](87, "ion-tab-button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function AppComponent_Template_ion_tab_button_click_87_listener() { return ctx.routeTab("/app/orders"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](88, "ion-icon", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](89, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](90, "Bokningar");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](91, "ion-tab-button", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function AppComponent_Template_ion_tab_button_click_91_listener() { return ctx.routeTab("/app/orders#pre"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](92, "ion-icon", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](93, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](94, "F\u00F6rbokningar");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](95, "ion-tab-button", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function AppComponent_Template_ion_tab_button_click_95_listener() { return ctx.routeTab("/app/messages"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](96, "ion-icon", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](97, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](98, "Meddelanden");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpropertyInterpolate"]("dir", ctx.appTitle);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpureFunction0"](12, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpureFunction0"](13, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpureFunction0"](14, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpureFunction0"](15, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpureFunction0"](16, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpureFunction0"](17, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpureFunction0"](18, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpureFunction0"](19, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpureFunction0"](20, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpureFunction0"](21, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpureFunction0"](22, _c3));
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonApp, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonSplitPane, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonMenu, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonMenuToggle, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.RouterLinkDelegate, _angular_router__WEBPACK_IMPORTED_MODULE_20__.RouterLink, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonRouterOutlet, _tabs_tabs_page__WEBPACK_IMPORTED_MODULE_15__.TabsPage, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonTabs, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonTabBar, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonTabButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonBadge], styles: ["[_nghost-%COMP%] {\n  --page-margin: var(--app-fair-margin);\n  --page-background: #ffe0a7;\n  --page-headers-shadow-color: rgba(var(--ion-color-darkest-rgb), 0.4);\n}\n\n.app-sidemenu[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%] {\n  --padding-start: 0px;\n  --padding-end: 0px;\n  --padding-top: 0px;\n  --padding-bottom: 0px;\n  --background: var(--ion-color-dark-tint);\n}\n\n.app-sidemenu[_ngcontent-%COMP%]   ion-content[_ngcontent-%COMP%] {\n  --background: var(--page-background);\n}\n\n.app-sidemenu[_ngcontent-%COMP%]   .user-details-wrapper[_ngcontent-%COMP%] {\n  --ion-grid-column-padding: 0px;\n  color: var(--ion-color-lightest);\n  padding: var(--page-margin);\n  align-items: center;\n}\n\n.app-sidemenu[_ngcontent-%COMP%]   .user-details-wrapper[_ngcontent-%COMP%]    + .user-details-wrapper[_ngcontent-%COMP%] {\n  padding-top: 0px;\n}\n\n.app-sidemenu[_ngcontent-%COMP%]   .user-info-wrapper[_ngcontent-%COMP%] {\n  padding-left: var(--page-margin);\n}\n\n.app-sidemenu[_ngcontent-%COMP%]   .user-info-wrapper[_ngcontent-%COMP%]   .user-name[_ngcontent-%COMP%] {\n  margin: 0px 0px 5px;\n}\n\n.app-sidemenu[_ngcontent-%COMP%]   .user-info-wrapper[_ngcontent-%COMP%]   .user-handle[_ngcontent-%COMP%] {\n  color: var(--ion-color-light-shade);\n  margin: 0px;\n  font-size: 14px;\n  font-weight: 400;\n}\n\n.app-sidemenu[_ngcontent-%COMP%]   .user-stats-wrapper[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.app-sidemenu[_ngcontent-%COMP%]   .user-stats-wrapper[_ngcontent-%COMP%]   .user-stat-value[_ngcontent-%COMP%] {\n  margin-right: 5px;\n  font-weight: 500;\n}\n\n.app-sidemenu[_ngcontent-%COMP%]   .user-stats-wrapper[_ngcontent-%COMP%]   .user-stat-name[_ngcontent-%COMP%] {\n  color: var(--ion-color-light-shade);\n  font-size: 14px;\n}\n\n.app-sidemenu[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%] {\n  --ion-text-color: #000000;\n  --ion-text-color-rgb: var(--ion-color-light-shade-rgb);\n  --ion-item-background: var(--page-background);\n  --ion-item-border-color: transparent;\n}\n\n.app-sidemenu[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-list-header[_ngcontent-%COMP%] {\n  --color: #ffffff;\n  --background: #ffa700;\n  text-transform: uppercase;\n  -webkit-padding-start: var(--page-margin);\n          padding-inline-start: var(--page-margin);\n  font-size: 14px;\n  font-weight: bold;\n  margin-bottom: 8px;\n}\n\n.app-sidemenu[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n  --border-width: 0px !important;\n  --padding-start: var(--page-margin);\n  --background-activated: var(--ion-color-medium);\n}\n\n.app-sidemenu[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: var(--ion-color-light-shade);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZGUtbWVudS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UscUNBQUE7RUFFQSwwQkFBQTtFQUNBLG9FQUFBO0FBRkY7O0FBT0U7RUFDRSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLHdDQUFBO0FBSko7O0FBT0U7RUFDRSxvQ0FBQTtBQUxKOztBQVFFO0VBQ0UsOEJBQUE7RUFHQSxnQ0FBQTtFQUNBLDJCQUFBO0VBQ0EsbUJBQUE7QUFSSjs7QUFVSTtFQUNFLGdCQUFBO0FBUk47O0FBWUU7RUFDRSxnQ0FBQTtBQVZKOztBQVlJO0VBQ0UsbUJBQUE7QUFWTjs7QUFhSTtFQUNFLG1DQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQVhOOztBQWVFO0VBQ0Usa0JBQUE7QUFiSjs7QUFlSTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7QUFiTjs7QUFnQkk7RUFDRSxtQ0FBQTtFQUNBLGVBQUE7QUFkTjs7QUFtQkU7RUFDRSx5QkFBQTtFQUNBLHNEQUFBO0VBQ0EsNkNBQUE7RUFDQSxvQ0FBQTtBQWpCSjs7QUFtQkk7RUFDRSxnQkFBQTtFQUNBLHFCQUFBO0VBQ0EseUJBQUE7RUFFQSx5Q0FBQTtVQUFBLHdDQUFBO0VBRUEsZUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUFuQk47O0FBc0JJO0VBQ0UsOEJBQUE7RUFDQSxtQ0FBQTtFQUNBLCtDQUFBO0FBcEJOOztBQXVCSTtFQUNFLG1DQUFBO0FBckJOIiwiZmlsZSI6InNpZGUtbWVudS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ3VzdG9tIHZhcmlhYmxlc1xuLy8gTm90ZTogIFRoZXNlIG9uZXMgd2VyZSBhZGRlZCBieSB1cyBhbmQgaGF2ZSBub3RoaW5nIHRvIGRvIHdpdGggSW9uaWMgQ1NTIEN1c3RvbSBQcm9wZXJ0aWVzXG46aG9zdCB7XG4gIC0tcGFnZS1tYXJnaW46IHZhcigtLWFwcC1mYWlyLW1hcmdpbik7XG4vLyAgLS1wYWdlLWJhY2tncm91bmQ6IHZhcigtLWFwcC1iYWNrZ3JvdW5kLWFsdC1zaGFkZSk7XG4gIC0tcGFnZS1iYWNrZ3JvdW5kOiAjZmZlMGE3O1xuICAtLXBhZ2UtaGVhZGVycy1zaGFkb3ctY29sb3I6IHJnYmEodmFyKC0taW9uLWNvbG9yLWRhcmtlc3QtcmdiKSwgMC40KTtcbn1cblxuLy8gTm90ZTogIEFsbCB0aGUgQ1NTIHZhcmlhYmxlcyBkZWZpbmVkIGJlbG93IGFyZSBvdmVycmlkZXMgb2YgSW9uaWMgZWxlbWVudHMgQ1NTIEN1c3RvbSBQcm9wZXJ0aWVzXG4uYXBwLXNpZGVtZW51IHtcbiAgaW9uLXRvb2xiYXIge1xuICAgIC0tcGFkZGluZy1zdGFydDogMHB4O1xuICAgIC0tcGFkZGluZy1lbmQ6IDBweDtcbiAgICAtLXBhZGRpbmctdG9wOiAwcHg7XG4gICAgLS1wYWRkaW5nLWJvdHRvbTogMHB4O1xuICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWRhcmstdGludCk7XG4gIH1cblxuICBpb24tY29udGVudCB7XG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1wYWdlLWJhY2tncm91bmQpO1xuICB9XG5cbiAgLnVzZXItZGV0YWlscy13cmFwcGVyIHtcbiAgICAtLWlvbi1ncmlkLWNvbHVtbi1wYWRkaW5nOiAwcHg7XG5cbiAgICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLWlvbi1jb2xvci1saWdodC1yZ2IpLCAwLjE1KTtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0ZXN0KTtcbiAgICBwYWRkaW5nOiB2YXIoLS1wYWdlLW1hcmdpbik7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcblxuICAgICYgKyAudXNlci1kZXRhaWxzLXdyYXBwZXIge1xuICAgICAgcGFkZGluZy10b3A6IDBweDtcbiAgICB9XG4gIH1cblxuICAudXNlci1pbmZvLXdyYXBwZXIge1xuICAgIHBhZGRpbmctbGVmdDogdmFyKC0tcGFnZS1tYXJnaW4pO1xuXG4gICAgLnVzZXItbmFtZSB7XG4gICAgICBtYXJnaW46IDBweCAwcHggNXB4O1xuICAgIH1cblxuICAgIC51c2VyLWhhbmRsZSB7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcbiAgICAgIG1hcmdpbjogMHB4O1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICB9XG4gIH1cblxuICAudXNlci1zdGF0cy13cmFwcGVyIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgICAudXNlci1zdGF0LXZhbHVlIHtcbiAgICAgIG1hcmdpbi1yaWdodDogNXB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB9XG5cbiAgICAudXNlci1zdGF0LW5hbWUge1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSk7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgfVxuICB9XG5cbiAgLy8gTWVudSBsaXN0IGl0ZW1zXG4gIGlvbi1saXN0IHtcbiAgICAtLWlvbi10ZXh0LWNvbG9yOiAjMDAwMDAwOyAgIC8vdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcbiAgICAtLWlvbi10ZXh0LWNvbG9yLXJnYjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlLXJnYik7XG4gICAgLS1pb24taXRlbS1iYWNrZ3JvdW5kOiB2YXIoLS1wYWdlLWJhY2tncm91bmQpO1xuICAgIC0taW9uLWl0ZW0tYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcblxuICAgIGlvbi1saXN0LWhlYWRlciB7XG4gICAgICAtLWNvbG9yOiAjZmZmZmZmO1xuICAgICAgLS1iYWNrZ3JvdW5kOiAjZmZhNzAwO1xuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAvLyAgYm94LXNoYWRvdzogaW5zZXQgMHB4IC00cHggOHB4IC0ycHggdmFyKC0tcGFnZS1oZWFkZXJzLXNoYWRvdy1jb2xvcik7XG4gICAgICBwYWRkaW5nLWlubGluZS1zdGFydDogdmFyKC0tcGFnZS1tYXJnaW4pO1xuXG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICB9XG5cbiAgICBpb24taXRlbSB7XG4gICAgICAtLWJvcmRlci13aWR0aDogMHB4ICFpbXBvcnRhbnQ7XG4gICAgICAtLXBhZGRpbmctc3RhcnQ6IHZhcigtLXBhZ2UtbWFyZ2luKTtcbiAgICAgIC0tYmFja2dyb3VuZC1hY3RpdmF0ZWQ6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIH1cblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xuICAgIH1cbiAgfVxufVxuIl19 */", "app-image-shell.user-avatar[_ngcontent-%COMP%] {\n  --image-shell-loading-background: rgba(var(--ion-color-light-rgb), 0.15);\n  --image-shell-border-radius: 50%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZGUtbWVudS5zaGVsbC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usd0VBQUE7RUFDQSxnQ0FBQTtBQUNGIiwiZmlsZSI6InNpZGUtbWVudS5zaGVsbC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLWltYWdlLXNoZWxsLnVzZXItYXZhdGFyIHtcbiAgLS1pbWFnZS1zaGVsbC1sb2FkaW5nLWJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLWxpZ2h0LXJnYiksIDAuMTUpO1xuICAtLWltYWdlLXNoZWxsLWJvcmRlci1yYWRpdXM6IDUwJTtcbn1cbiJdfQ== */", "@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (device-aspect-ratio: 2/3) {\n  .app-sidemenu[_ngcontent-%COMP%]   .user-info-wrapper[_ngcontent-%COMP%]   .user-name[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .app-sidemenu[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n}\n\n@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (device-aspect-ratio: 40/71) {\n  .interests-to-follow-slide[_ngcontent-%COMP%]   .custom-checkbox[_ngcontent-%COMP%]   .checkbox-title[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZGUtbWVudS5yZXNwb25zaXZlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsNENBQUE7QUFDQTtFQVlNO0lBQ0UsZUFBQTtFQWZOO0VBb0JJO0lBQ0UsZUFBQTtFQWxCTjtBQUNGO0FBdUJBLHFEQUFBO0FBQ0E7RUFZTTtJQUNFLGVBQUE7RUFoQ047QUFDRjtBQXFDQSxrREFBQTtBQWFBLHFDQUFBO0FBYUEsaURBQUEiLCJmaWxlIjoic2lkZS1tZW51LnJlc3BvbnNpdmUuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIChOb3RlOiBEb24ndCBjaGFuZ2UgdGhlIG9yZGVyIG9mIHRoZSBkZXZpY2VzIGFzIGl0IG1heSBicmVhayB0aGUgY29ycmVjdCBjc3MgcHJlY2VkZW5jZSlcblxuLy8gKHNlZTogaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9zbmlwcGV0cy9jc3MvbWVkaWEtcXVlcmllcy1mb3Itc3RhbmRhcmQtZGV2aWNlcy8jaXBob25lLXF1ZXJpZXMpXG4vLyAoc2VlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDc3NTAyNjEvMTExNjk1OSlcblxuLyogLS0tLS0tLS0tLS0gaVBob25lIDQgYW5kIDRTIC0tLS0tLS0tLS0tICovXG5AbWVkaWEgb25seSBzY3JlZW5cbiAgYW5kIChtaW4tZGV2aWNlLXdpZHRoIDogMzIwcHgpXG4gIGFuZCAobWF4LWRldmljZS13aWR0aCA6IDQ4MHB4KVxuICBhbmQgKC13ZWJraXQtbWluLWRldmljZS1waXhlbC1yYXRpbzogMilcbiAgYW5kIChkZXZpY2UtYXNwZWN0LXJhdGlvOiAyLzMpXG4gIC8vIHVuY29tbWVudCBmb3Igb25seSBwb3J0cmFpdDpcbiAgLy8gYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpXG4gIC8vIHVuY29tbWVudCBmb3Igb25seSBsYW5kc2NhcGU6XG4gIC8vIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSlcbntcbiAgLmFwcC1zaWRlbWVudSB7XG4gICAgLnVzZXItaW5mby13cmFwcGVyIHtcbiAgICAgIC51c2VyLW5hbWUge1xuICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW9uLWxpc3Qge1xuICAgICAgaW9uLWl0ZW0ge1xuICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qIC0tLS0tLS0tLS0tIGlQaG9uZSA1LCA1UywgNUMgYW5kIDVTRSAtLS0tLS0tLS0tLSAqL1xuQG1lZGlhIG9ubHkgc2NyZWVuXG4gIGFuZCAobWluLWRldmljZS13aWR0aCA6IDMyMHB4KVxuICBhbmQgKG1heC1kZXZpY2Utd2lkdGggOiA1NjhweClcbiAgYW5kICgtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDIpXG4gIGFuZCAoZGV2aWNlLWFzcGVjdC1yYXRpbzogNDAgLyA3MSlcbiAgLy8gdW5jb21tZW50IGZvciBvbmx5IHBvcnRyYWl0OlxuICAvLyBhbmQgKG9yaWVudGF0aW9uOiBwb3J0cmFpdClcbiAgLy8gdW5jb21tZW50IGZvciBvbmx5IGxhbmRzY2FwZTpcbiAgLy8gYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKVxue1xuICAuaW50ZXJlc3RzLXRvLWZvbGxvdy1zbGlkZSB7XG4gICAgLmN1c3RvbS1jaGVja2JveCB7XG4gICAgICAuY2hlY2tib3gtdGl0bGUge1xuICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qIC0tLS0tLS0tLS0tIGlQaG9uZSA2LCA2UywgNyBhbmQgOCAtLS0tLS0tLS0tLSAqL1xuQG1lZGlhIG9ubHkgc2NyZWVuXG4gIGFuZCAobWluLWRldmljZS13aWR0aCA6IDM3NXB4KVxuICBhbmQgKG1heC1kZXZpY2Utd2lkdGggOiA2NjdweClcbiAgYW5kICgtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDIpXG4gIC8vIHVuY29tbWVudCBmb3Igb25seSBwb3J0cmFpdDpcbiAgLy8gYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpXG4gIC8vIHVuY29tbWVudCBmb3Igb25seSBsYW5kc2NhcGU6XG4gIC8vIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSlcbntcblxufVxuXG4vKiAtLS0tLS0tLS0tLSBpUGhvbmUgWCAtLS0tLS0tLS0tLSAqL1xuQG1lZGlhIG9ubHkgc2NyZWVuXG4gIGFuZCAobWluLWRldmljZS13aWR0aCA6IDM3NXB4KVxuICBhbmQgKG1heC1kZXZpY2Utd2lkdGggOiA4MTJweClcbiAgYW5kICgtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW8gOiAzKVxuICAvLyB1bmNvbW1lbnQgZm9yIG9ubHkgcG9ydHJhaXQ6XG4gIC8vIGFuZCAob3JpZW50YXRpb246IHBvcnRyYWl0KVxuICAvLyB1bmNvbW1lbnQgZm9yIG9ubHkgbGFuZHNjYXBlOlxuICAvLyBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpXG57XG5cbn1cblxuLyogLS0tLS0tLS0tLS0gaVBob25lIDYrLCA3KyBhbmQgOCsgLS0tLS0tLS0tLS0gKi9cbkBtZWRpYSBvbmx5IHNjcmVlblxuICBhbmQgKG1pbi1kZXZpY2Utd2lkdGggOiA0MTRweClcbiAgYW5kIChtYXgtZGV2aWNlLXdpZHRoIDogNzM2cHgpXG4gIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAzKVxuICAvLyB1bmNvbW1lbnQgZm9yIG9ubHkgcG9ydHJhaXQ6XG4gIC8vIGFuZCAob3JpZW50YXRpb246IHBvcnRyYWl0KVxuICAvLyB1bmNvbW1lbnQgZm9yIG9ubHkgbGFuZHNjYXBlOlxuICAvLyBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpXG57XG5cbn1cbiJdfQ== */"] });


/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule),
/* harmony export */   "createTranslateLoader": () => (/* binding */ createTranslateLoader)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _core_services_geo_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/services/geo.service */ 6484);
/* harmony import */ var _core_services_tabs_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/services/tabs.service */ 4251);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @ionic/angular */ 4362);
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/service-worker */ 4933);
/* harmony import */ var _nxApp_components_nx_components_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nxApp/components/nx-components.module */ 7410);
/* harmony import */ var _nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nxApp/events/nx-event.service */ 8354);
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @components/components.module */ 5642);
/* harmony import */ var _nxApp_nx_app_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nxApp/nx-app.module */ 8271);
/* harmony import */ var _nxApp_services_app_nav_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nxApp/services/app-nav.service */ 2701);
/* harmony import */ var _nxApp_services_driver_driver_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @nxApp/services/driver/driver.service */ 3898);
/* harmony import */ var _nxApp_services_nx_app_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @nxApp/services/nx-app.service */ 9282);
/* harmony import */ var _api_api_factory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @api/api-factory */ 8019);
/* harmony import */ var _api_driver_api_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @api/driver-api.service */ 1302);
/* harmony import */ var _api_order_api_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @api/order-api.service */ 371);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../environments/environment */ 2340);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common/http */ 8784);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ngx-translate/core */ 3935);
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ngx-translate/http-loader */ 2202);
/* harmony import */ var _core_services_api_client_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @core/services/api-client.service */ 1598);
/* harmony import */ var ngx_socket_io__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ngx-socket-io */ 4935);
/* harmony import */ var _core_services_logging_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @core/services/logging.service */ 5948);
/* harmony import */ var _core_services_socket_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @core/services/socket.service */ 3404);
/* harmony import */ var _tabs_tabs_module__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./tabs/tabs.module */ 5564);
/* harmony import */ var _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @ionic/storage-angular */ 7566);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/core */ 3184);





































const socketIoConfig = {
    url: _environments_environment__WEBPACK_IMPORTED_MODULE_14__.environment.webSocketUrl,
    options: {
        autoConnect: true,
        transports: ['websocket']
    }
};
const translateConfig = {
    loader: {
        provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_20__.HttpClient]
    }
};
function createTranslateLoader(http) {
    return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_21__.TranslateHttpLoader(http, './assets/i18n/', '.json');
}
class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_13__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵdefineInjector"]({ providers: [
        { provide: _angular_router__WEBPACK_IMPORTED_MODULE_23__.RouteReuseStrategy, useClass: _ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonicRouteStrategy },
        _core_services_geo_service__WEBPACK_IMPORTED_MODULE_0__.GeoService,
        _core_services_tabs_service__WEBPACK_IMPORTED_MODULE_1__.TabsService,
        _core_services_api_client_service__WEBPACK_IMPORTED_MODULE_15__.ApiClientService,
        _api_api_factory__WEBPACK_IMPORTED_MODULE_9__.ApiFactory,
        _core_services_socket_service__WEBPACK_IMPORTED_MODULE_17__.SocketService,
        _core_services_geo_service__WEBPACK_IMPORTED_MODULE_0__.GeoService,
        _core_services_logging_service__WEBPACK_IMPORTED_MODULE_16__.LoggingService,
        _nxApp_services_nx_app_service__WEBPACK_IMPORTED_MODULE_8__.NxAppService,
        _nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_3__.NxEventService,
        _api_driver_api_service__WEBPACK_IMPORTED_MODULE_10__.DriverApiService,
        _nxApp_services_driver_driver_service__WEBPACK_IMPORTED_MODULE_7__.DriverService,
        _api_order_api_service__WEBPACK_IMPORTED_MODULE_11__.OrderApiService,
        _nxApp_services_app_nav_service__WEBPACK_IMPORTED_MODULE_6__.AppNavService,
        _nxApp_services_nx_app_service__WEBPACK_IMPORTED_MODULE_8__.NxAppService
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_25__.BrowserModule.withServerTransition({ appId: 'serverApp' }),
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_25__.BrowserTransferStateModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonicModule.forRoot(),
            _angular_forms__WEBPACK_IMPORTED_MODULE_26__.ReactiveFormsModule,
            _app_routing_module__WEBPACK_IMPORTED_MODULE_12__.AppRoutingModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_20__.HttpClientModule,
            _nxApp_nx_app_module__WEBPACK_IMPORTED_MODULE_5__.NxAppModule,
            _components_components_module__WEBPACK_IMPORTED_MODULE_4__.ComponentsModule,
            _nxApp_components_nx_components_module__WEBPACK_IMPORTED_MODULE_2__.NxComponentsModule,
            _angular_service_worker__WEBPACK_IMPORTED_MODULE_27__.ServiceWorkerModule.register('/ngsw-worker.js', { enabled: _environments_environment__WEBPACK_IMPORTED_MODULE_14__.environment.production }),
            ngx_socket_io__WEBPACK_IMPORTED_MODULE_28__.SocketIoModule.forRoot(socketIoConfig),
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslateModule.forRoot(translateConfig),
            _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_29__.IonicStorageModule.forRoot(),
            _tabs_tabs_module__WEBPACK_IMPORTED_MODULE_18__.TabsPageModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_13__.AppComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_25__.BrowserModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_25__.BrowserTransferStateModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_24__.IonicModule, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.ReactiveFormsModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_12__.AppRoutingModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_20__.HttpClientModule,
        _nxApp_nx_app_module__WEBPACK_IMPORTED_MODULE_5__.NxAppModule,
        _components_components_module__WEBPACK_IMPORTED_MODULE_4__.ComponentsModule,
        _nxApp_components_nx_components_module__WEBPACK_IMPORTED_MODULE_2__.NxComponentsModule, _angular_service_worker__WEBPACK_IMPORTED_MODULE_27__.ServiceWorkerModule, ngx_socket_io__WEBPACK_IMPORTED_MODULE_28__.SocketIoModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslateModule, _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_29__.IonicStorageModule, _tabs_tabs_module__WEBPACK_IMPORTED_MODULE_18__.TabsPageModule] }); })();


/***/ }),

/***/ 1182:
/*!*********************************!*\
  !*** ./src/app/app.settings.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppSettings": () => (/* binding */ AppSettings),
/* harmony export */   "AppTitle": () => (/* binding */ AppTitle),
/* harmony export */   "GoogleMapApiKey": () => (/* binding */ GoogleMapApiKey)
/* harmony export */ });
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
const GoogleMapApiKey = "AIzaSyDZHf56UUmMLo2cv_5dydfITZsOKeHooyM";
const AppTitle = "CmApp";
class AppSettings {
}


/***/ }),

/***/ 5435:
/*!************************************************!*\
  !*** ./src/app/coldmind/core/cm-auth-guard.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CmAuthChildGuard": () => (/* binding */ CmAuthChildGuard),
/* harmony export */   "CmAuthGuard": () => (/* binding */ CmAuthGuard)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 228);
/**
 * Copyright (c) 2018 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary, unlicensed this piece of software is under the most restrictive model.
 * There are commercial licensing available which then falls under the license model
 * described in GPL V2.1 (https://www.gnu.org/licenses/old-licenses/lgpl-2.1.en.html)
 *
 * @license
 * Dual license
 *
 * @description:
 *
 * @author
 * Patrik Forsberg<patrik.forsberg@coldmind.com> on 2018-04-12
 *
 */

class CmAuthGuard {
    canActivate(route, state) {
        return new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
    }
}
class CmAuthChildGuard {
    canActivateChild(childRoute, state) {
        let res = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
        return res.asObservable();
    }
}


/***/ }),

/***/ 6516:
/*!***************************************************************************!*\
  !*** ./src/app/components/checkbox-wrapper/checkbox-wrapper.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CheckboxWrapperComponent": () => (/* binding */ CheckboxWrapperComponent)
/* harmony export */ });
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ 4362);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
// Reference to the @ionic/angular Components List:
// https://github.com/ionic-team/ionic/blob/master/angular/src/directives/proxies.ts


const _c0 = ["*"];
class CheckboxWrapperComponent {
    constructor() { }
    ngAfterContentInit() {
        // ContentChild is set
        this.isChecked = this.checkbox.checked;
        // Subscribe to changes
        this.checkbox.ionChange.subscribe(changes => {
            this.isChecked = changes.detail.checked;
        });
    }
}
CheckboxWrapperComponent.ɵfac = function CheckboxWrapperComponent_Factory(t) { return new (t || CheckboxWrapperComponent)(); };
CheckboxWrapperComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CheckboxWrapperComponent, selectors: [["app-checkbox-wrapper"]], contentQueries: function CheckboxWrapperComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonCheckbox, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.checkbox = _t.first);
    } }, hostVars: 2, hostBindings: function CheckboxWrapperComponent_HostBindings(rf, ctx) { if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("checkbox-checked", ctx.isChecked);
    } }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function CheckboxWrapperComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
    } }, styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoZWNrYm94LXdyYXBwZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFBO0FBQ0YiLCJmaWxlIjoiY2hlY2tib3gtd3JhcHBlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG4iXX0= */"] });


/***/ }),

/***/ 5642:
/*!*************************************************!*\
  !*** ./src/app/components/components.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComponentsModule": () => (/* binding */ ComponentsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic/angular */ 4362);
/* harmony import */ var _shell_shell_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shell/shell.module */ 952);
/* harmony import */ var _checkbox_wrapper_checkbox_wrapper_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./checkbox-wrapper/checkbox-wrapper.component */ 6516);
/* harmony import */ var _show_hide_password_show_hide_password_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./show-hide-password/show-hide-password.component */ 6089);
/* harmony import */ var _countdown_timer_countdown_timer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./countdown-timer/countdown-timer.component */ 9521);
/* harmony import */ var _counter_input_counter_input_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./counter-input/counter-input.component */ 7352);
/* harmony import */ var _rating_input_rating_input_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rating-input/rating-input.component */ 8059);
/* harmony import */ var _google_map_google_map_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./google-map/google-map.component */ 2166);
/* harmony import */ var _modal_modal_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modal/modal.component */ 385);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);












class ComponentsModule {
}
ComponentsModule.ɵfac = function ComponentsModule_Factory(t) { return new (t || ComponentsModule)(); };
ComponentsModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: ComponentsModule });
ComponentsModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule,
            _shell_shell_module__WEBPACK_IMPORTED_MODULE_0__.ShellModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonicModule
        ], _shell_shell_module__WEBPACK_IMPORTED_MODULE_0__.ShellModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](ComponentsModule, { declarations: [_checkbox_wrapper_checkbox_wrapper_component__WEBPACK_IMPORTED_MODULE_1__.CheckboxWrapperComponent,
        _show_hide_password_show_hide_password_component__WEBPACK_IMPORTED_MODULE_2__.ShowHidePasswordComponent,
        _countdown_timer_countdown_timer_component__WEBPACK_IMPORTED_MODULE_3__.CountdownTimerComponent,
        _counter_input_counter_input_component__WEBPACK_IMPORTED_MODULE_4__.CounterInputComponent,
        _rating_input_rating_input_component__WEBPACK_IMPORTED_MODULE_5__.RatingInputComponent,
        _google_map_google_map_component__WEBPACK_IMPORTED_MODULE_6__.GoogleMapComponent,
        _modal_modal_component__WEBPACK_IMPORTED_MODULE_7__.ModalComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule,
        _shell_shell_module__WEBPACK_IMPORTED_MODULE_0__.ShellModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonicModule], exports: [_shell_shell_module__WEBPACK_IMPORTED_MODULE_0__.ShellModule,
        _checkbox_wrapper_checkbox_wrapper_component__WEBPACK_IMPORTED_MODULE_1__.CheckboxWrapperComponent,
        _show_hide_password_show_hide_password_component__WEBPACK_IMPORTED_MODULE_2__.ShowHidePasswordComponent,
        _countdown_timer_countdown_timer_component__WEBPACK_IMPORTED_MODULE_3__.CountdownTimerComponent,
        _counter_input_counter_input_component__WEBPACK_IMPORTED_MODULE_4__.CounterInputComponent,
        _rating_input_rating_input_component__WEBPACK_IMPORTED_MODULE_5__.RatingInputComponent,
        _google_map_google_map_component__WEBPACK_IMPORTED_MODULE_6__.GoogleMapComponent] }); })();


/***/ }),

/***/ 9521:
/*!*************************************************************************!*\
  !*** ./src/app/components/countdown-timer/countdown-timer.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CountdownTimerComponent": () => (/* binding */ CountdownTimerComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 8653);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 8951);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ 6901);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 4362);








function CountdownTimerComponent_ion_col_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-col", 2)(1, "span", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "D");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 4)(4, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0._daysLeft);
} }
function CountdownTimerComponent_ion_col_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-col", 2)(1, "span", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "H");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 4)(4, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1._hoursLeft);
} }
function CountdownTimerComponent_ion_col_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-col", 2)(1, "span", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "M");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 4)(4, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2._minutesLeft);
} }
function CountdownTimerComponent_ion_col_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-col", 2)(1, "span", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "S");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 4)(4, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r3._secondsLeft);
} }
class CountdownTimerComponent {
    constructor(platformId) {
        this.platformId = platformId;
        this._initialUnit = 'hour';
        this._endingUnit = 'second';
        this._updateInterval = (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.interval)(1000);
        this._unsubscribeSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
        // DIVISORS
        // 60 seconds * 60 (minutes) * 24 (hours) = 86400 seconds = 1 day
        this._dayDivisor = (60 * 60 * 24);
        // 60 seconds * 60 (minutes) = 3600 seconds = 1 hour
        this._hourDivisor = (60 * 60);
        // 60 seconds = 1 minute
        this._minuteDivisor = 60;
        this._secondDivisor = 1;
        // MODULUS
        // Neutral modulus
        this._dayModulus = (secondsLeft) => secondsLeft;
        // The modulus operator (%) returns the division remainder.
        // To figure out how many hours are left after taking in consideration the days, we should do:
        //    (secondsLeft % hourModulus) / hourDivisor
        // In 1 day there are 86400 seconds, and in 1 hour 3600 seconds. 1 day + 1 hour = 90000 seconds
        //    (90000s % 86400s) / 3600s = 1h
        this._hourModulus = (secondsLeft) => (secondsLeft % this._dayDivisor);
        this._minuteModulus = (secondsLeft) => (secondsLeft % this._hourDivisor);
        this._secondModulus = (secondsLeft) => (secondsLeft % this._minuteDivisor);
    }
    set end(endingTime) {
        this._endingTime = (endingTime !== undefined && endingTime !== null) ? dayjs__WEBPACK_IMPORTED_MODULE_0__(endingTime) : dayjs__WEBPACK_IMPORTED_MODULE_0__();
    }
    set units(units) {
        // 'day', 'hour, 'minute', 'second'
        this._initialUnit = (units !== undefined && (units.from !== undefined && units.from !== null)) ? units.from : 'hour';
        this._endingUnit = (units !== undefined && (units.to !== undefined && units.to !== null)) ? units.to : 'second';
        // For 'day' unit, use the default modulus
        // Adjust modulus depending on the unit
        if (this._initialUnit === 'hour') {
            // Cancelation modulus
            this._dayModulus = (secondsLeft) => 1;
            // Neutral modulus
            this._hourModulus = (secondsLeft) => secondsLeft;
        }
        if (this._initialUnit === 'minute') {
            // Cancelation modulus
            this._dayModulus = (secondsLeft) => 1;
            this._hourModulus = (secondsLeft) => 1;
            // Neutral modulus
            this._minuteModulus = (secondsLeft) => secondsLeft;
        }
        if (this._initialUnit === 'second') {
            // Cancelation modulus
            this._dayModulus = (secondsLeft) => 1;
            this._hourModulus = (secondsLeft) => 1;
            this._minuteModulus = (secondsLeft) => 1;
            // Neutral modulus
            this._secondModulus = (secondsLeft) => secondsLeft;
        }
    }
    ngOnInit() {
        // I believe if we run this on SSR, it won't ever trigger the change detection and thus the server will be stuck loading
        if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_4__.isPlatformBrowser)(this.platformId)) {
            this._updateInterval.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.takeUntil)(this._unsubscribeSubject)).subscribe((val) => {
                this.updateValues();
            }, (error) => console.error(error), () => console.log('[takeUntil] complete'));
        }
        else {
            this.updateValues();
        }
    }
    ngOnDestroy() {
        this._unsubscribeSubject.next();
        this._unsubscribeSubject.complete();
    }
    updateValues() {
        const secondsLeft = this._endingTime.diff(dayjs__WEBPACK_IMPORTED_MODULE_0__(), 'second');
        this._daysLeft = Math.floor(this._dayModulus(secondsLeft) / this._dayDivisor);
        this._hoursLeft = Math.floor(this._hourModulus(secondsLeft) / this._hourDivisor);
        this._minutesLeft = Math.floor(this._minuteModulus(secondsLeft) / this._minuteDivisor);
        this._secondsLeft = Math.floor(this._secondModulus(secondsLeft) / this._secondDivisor);
    }
}
CountdownTimerComponent.ɵfac = function CountdownTimerComponent_Factory(t) { return new (t || CountdownTimerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.PLATFORM_ID)); };
CountdownTimerComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CountdownTimerComponent, selectors: [["app-countdown-timer"]], inputs: { end: "end", units: "units" }, decls: 5, vars: 4, consts: [[1, "countdown"], ["class", "time", 4, "ngIf"], [1, "time"], [1, "time-unit"], [1, "inner-time"], [1, "time-value"]], template: function CountdownTimerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-row", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, CountdownTimerComponent_ion_col_1_Template, 6, 1, "ion-col", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, CountdownTimerComponent_ion_col_2_Template, 6, 1, "ion-col", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, CountdownTimerComponent_ion_col_3_Template, 6, 1, "ion-col", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, CountdownTimerComponent_ion_col_4_Template, 6, 1, "ion-col", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx._initialUnit === "day");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx._initialUnit === "day" && ctx._endingUnit !== "day" || ctx._initialUnit === "hour" || ctx._endingUnit === "hour");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx._initialUnit === "day" && (ctx._endingUnit !== "day" && ctx._endingUnit !== "hour") || ctx._initialUnit === "hour" && ctx._endingUnit !== "hour" || ctx._initialUnit === "minute");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx._endingUnit === "second");
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonRow, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonCol], styles: ["[_nghost-%COMP%] {\n  --countdown-margin: 0px;\n  --countdown-padding: 0px;\n  --countdown-time-margin: 0px;\n  --countdown-time-padding: 0px;\n  --countdown-inner-time-margin: 2px;\n  --countdown-inner-time-padding: 0px;\n  --countdown-fill-border: none;\n  --countdown-fill-border-radius: 0px;\n  --countdown-fill-background: transparent;\n  --countdown-fill-shadow: none;\n  --countdown-value-color: #CCC;\n  --countdown-unit-color: #CCC;\n  --countdown-time-flex-direction: row-reverse;\n  display: block;\n}\n[_nghost-%COMP%]   .countdown[_ngcontent-%COMP%] {\n  margin: var(--countdown-margin);\n  padding: var(--countdown-padding);\n  justify-content: center;\n  flex-wrap: nowrap;\n}\n[_nghost-%COMP%]   .time[_ngcontent-%COMP%] {\n  padding: var(--countdown-time-padding);\n  margin: var(--countdown-time-margin);\n  display: flex;\n  flex-direction: var(--countdown-time-flex-direction);\n  align-items: center;\n  justify-content: center;\n}\n[_nghost-%COMP%]   .time[_ngcontent-%COMP%]   .time-unit[_ngcontent-%COMP%] {\n  display: block;\n  color: var(--countdown-unit-color);\n  font-size: 0.7em;\n  text-align: center;\n  text-transform: uppercase;\n  width: 2ex;\n}\n[_nghost-%COMP%]   .time[_ngcontent-%COMP%]   .time-value[_ngcontent-%COMP%] {\n  display: block;\n  color: var(--countdown-value-color);\n  text-align: center;\n  font-size: 1em;\n  line-height: 1em;\n  min-height: 1em;\n  min-width: 2.2ex;\n  min-width: 2.1ch;\n}\n[_nghost-%COMP%]   .inner-time[_ngcontent-%COMP%] {\n  margin: var(--countdown-inner-time-margin);\n  padding: var(--countdown-inner-time-padding);\n}\n[fill=countdown][_nghost-%COMP%]   .countdown[_ngcontent-%COMP%] {\n  border: var(--countdown-fill-border);\n  border-radius: var(--countdown-fill-border-radius);\n  background-color: var(--countdown-fill-background);\n  box-shadow: var(--countdown-fill-shadow);\n}\n[fill=time][_nghost-%COMP%]   .time[_ngcontent-%COMP%] {\n  border: var(--countdown-fill-border);\n  border-radius: var(--countdown-fill-border-radius);\n  background-color: var(--countdown-fill-background);\n  box-shadow: var(--countdown-fill-shadow);\n}\n[fill=inner-time][_nghost-%COMP%]   .inner-time[_ngcontent-%COMP%] {\n  border: var(--countdown-fill-border);\n  border-radius: var(--countdown-fill-border-radius);\n  background-color: var(--countdown-fill-background);\n  box-shadow: var(--countdown-fill-shadow);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdW50ZG93bi10aW1lci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQTtFQUNFLHVCQUFBO0VBQ0Esd0JBQUE7RUFDQSw0QkFBQTtFQUNBLDZCQUFBO0VBQ0Esa0NBQUE7RUFDQSxtQ0FBQTtFQUVBLDZCQUFBO0VBQ0EsbUNBQUE7RUFDQSx3Q0FBQTtFQUNBLDZCQUFBO0VBRUEsNkJBQUE7RUFDQSw0QkFBQTtFQUVBLDRDQUFBO0VBRUEsY0FBQTtBQVZGO0FBWUU7RUFDRSwrQkFBQTtFQUNBLGlDQUFBO0VBRUEsdUJBQUE7RUFDQSxpQkFBQTtBQVhKO0FBY0U7RUFDRSxzQ0FBQTtFQUNBLG9DQUFBO0VBRUEsYUFBQTtFQUNBLG9EQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQWJKO0FBZUk7RUFDRSxjQUFBO0VBQ0Esa0NBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxVQUFBO0FBYk47QUFnQkk7RUFDRSxjQUFBO0VBQ0EsbUNBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFLQSxnQkFBQTtFQUNBLGdCQUFBO0FBbEJOO0FBc0JFO0VBQ0UsMENBQUE7RUFDQSw0Q0FBQTtBQXBCSjtBQXlCRTtFQTNFQSxvQ0FBQTtFQUNBLGtEQUFBO0VBQ0Esa0RBQUE7RUFDQSx3Q0FBQTtBQXNERjtBQXdCRTtFQWpGQSxvQ0FBQTtFQUNBLGtEQUFBO0VBQ0Esa0RBQUE7RUFDQSx3Q0FBQTtBQTZERjtBQXVCRTtFQXZGQSxvQ0FBQTtFQUNBLGtEQUFBO0VBQ0Esa0RBQUE7RUFDQSx3Q0FBQTtBQW9FRiIsImZpbGUiOiJjb3VudGRvd24tdGltZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAbWl4aW4gZmlsbC1jb250YWluZXIoKXtcbiAgYm9yZGVyOiB2YXIoLS1jb3VudGRvd24tZmlsbC1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS1jb3VudGRvd24tZmlsbC1ib3JkZXItcmFkaXVzKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY291bnRkb3duLWZpbGwtYmFja2dyb3VuZCk7XG4gIGJveC1zaGFkb3c6IHZhcigtLWNvdW50ZG93bi1maWxsLXNoYWRvdyk7XG59XG5cbjpob3N0IHtcbiAgLS1jb3VudGRvd24tbWFyZ2luOiAwcHg7XG4gIC0tY291bnRkb3duLXBhZGRpbmc6IDBweDtcbiAgLS1jb3VudGRvd24tdGltZS1tYXJnaW46IDBweDtcbiAgLS1jb3VudGRvd24tdGltZS1wYWRkaW5nOiAwcHg7XG4gIC0tY291bnRkb3duLWlubmVyLXRpbWUtbWFyZ2luOiAycHg7XG4gIC0tY291bnRkb3duLWlubmVyLXRpbWUtcGFkZGluZzogMHB4O1xuXG4gIC0tY291bnRkb3duLWZpbGwtYm9yZGVyOiBub25lO1xuICAtLWNvdW50ZG93bi1maWxsLWJvcmRlci1yYWRpdXM6IDBweDtcbiAgLS1jb3VudGRvd24tZmlsbC1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgLS1jb3VudGRvd24tZmlsbC1zaGFkb3c6IG5vbmU7XG5cbiAgLS1jb3VudGRvd24tdmFsdWUtY29sb3I6ICNDQ0M7XG4gIC0tY291bnRkb3duLXVuaXQtY29sb3I6ICNDQ0M7XG5cbiAgLS1jb3VudGRvd24tdGltZS1mbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG5cbiAgZGlzcGxheTogYmxvY2s7XG5cbiAgLmNvdW50ZG93biB7XG4gICAgbWFyZ2luOiB2YXIoLS1jb3VudGRvd24tbWFyZ2luKTtcbiAgICBwYWRkaW5nOiB2YXIoLS1jb3VudGRvd24tcGFkZGluZyk7XG5cbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBmbGV4LXdyYXA6IG5vd3JhcDtcbiAgfVxuXG4gIC50aW1lIHtcbiAgICBwYWRkaW5nOiB2YXIoLS1jb3VudGRvd24tdGltZS1wYWRkaW5nKTtcbiAgICBtYXJnaW46IHZhcigtLWNvdW50ZG93bi10aW1lLW1hcmdpbik7XG5cbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiB2YXIoLS1jb3VudGRvd24tdGltZS1mbGV4LWRpcmVjdGlvbik7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxuICAgIC50aW1lLXVuaXQge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBjb2xvcjogdmFyKC0tY291bnRkb3duLXVuaXQtY29sb3IpO1xuICAgICAgZm9udC1zaXplOiAwLjdlbTtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICB3aWR0aDogMmV4O1xuICAgIH1cblxuICAgIC50aW1lLXZhbHVlIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgY29sb3I6IHZhcigtLWNvdW50ZG93bi12YWx1ZS1jb2xvcik7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBmb250LXNpemU6IDFlbTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxZW07XG4gICAgICBtaW4taGVpZ2h0OiAxZW07XG5cbiAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBhbHdheXMgaGF2ZSBzcGFjZSBmb3IgdHdvIGNoYXJhY3RlcnNcbiAgICAgIC8vIEFzIGNoICh3aWR0aCBvZiB0aGUgY2hhcmFjdGVyICcwJykgdW5pdCBpcyBub3QgMTAwJSBzdXBwb3J0ZWQsIHdlIHdpbGwgdXNlIGV4IChoZWlnaHQgb2YgdGhlICd4JyBjaGFyYWN0ZXIpIGFzIGEgZmFsbGJhY2tcbiAgICAgIC8vIFNlZTogaHR0cHM6Ly93d3cucXVpcmtzbW9kZS5vcmcvY3NzL3VuaXRzLXZhbHVlcy9cbiAgICAgIG1pbi13aWR0aDogMi4yZXg7IC8vIFRoZSAneCcgY2hhcmFjdGVyIGlzIHNlbWktc3F1YXJlIGNoYXIsIHRoYXQncyB3aHkgd2Ugc2V0IDIuMmV4XG4gICAgICBtaW4td2lkdGg6IDIuMWNoOyAvLyBjaCBpcyB0aGUgb25seSBmb250IHVuaXQgYmFzZWQgb24gdGhlIHdpZHRoIG9mIGNoYXJhY3RlcnNcbiAgICB9XG4gIH1cblxuICAuaW5uZXItdGltZSB7XG4gICAgbWFyZ2luOiB2YXIoLS1jb3VudGRvd24taW5uZXItdGltZS1tYXJnaW4pO1xuICAgIHBhZGRpbmc6IHZhcigtLWNvdW50ZG93bi1pbm5lci10aW1lLXBhZGRpbmcpO1xuICB9XG59XG5cbjpob3N0KFtmaWxsPVwiY291bnRkb3duXCJdKSB7XG4gIC5jb3VudGRvd24ge1xuICAgIEBpbmNsdWRlIGZpbGwtY29udGFpbmVyKCk7XG4gIH1cbn1cblxuOmhvc3QoW2ZpbGw9XCJ0aW1lXCJdKSB7XG4gIC50aW1lIHtcbiAgICBAaW5jbHVkZSBmaWxsLWNvbnRhaW5lcigpO1xuICB9XG59XG5cbjpob3N0KFtmaWxsPVwiaW5uZXItdGltZVwiXSkge1xuICAuaW5uZXItdGltZSB7XG4gICAgQGluY2x1ZGUgZmlsbC1jb250YWluZXIoKTtcbiAgfVxufVxuIl19 */"] });


/***/ }),

/***/ 7352:
/*!*********************************************************************!*\
  !*** ./src/app/components/counter-input/counter-input.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CounterInputComponent": () => (/* binding */ CounterInputComponent),
/* harmony export */   "counterRangeValidator": () => (/* binding */ counterRangeValidator)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ 4362);




function counterRangeValidator(minValue, maxValue) {
    return (c) => {
        const err = {
            rangeError: {
                given: c.value,
                min: minValue || 0,
                max: maxValue || 10
            }
        };
        return (c.value > +maxValue || c.value < +minValue) ? err : null;
    };
}
class CounterInputComponent {
    constructor() {
        // eslint-disable-next-line @angular-eslint/no-input-rename
        this._counterValue = 0;
        this.propagateChange = () => { }; // Noop function
        this.validateFn = () => { }; // Noop function
    }
    get counterValue() {
        return this._counterValue;
    }
    set counterValue(val) {
        this._counterValue = val;
        this.propagateChange(val);
    }
    ngOnChanges(inputs) {
        if (inputs.counterRangeMax || inputs.counterRangeMin) {
            this.validateFn = counterRangeValidator(this.counterRangeMin, this.counterRangeMax);
        }
    }
    writeValue(value) {
        if (value) {
            this.counterValue = value;
        }
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched() { }
    increase() {
        this.counterValue++;
    }
    decrease() {
        this.counterValue--;
    }
    validate(c) {
        return this.validateFn(c);
    }
}
CounterInputComponent.ɵfac = function CounterInputComponent_Factory(t) { return new (t || CounterInputComponent)(); };
CounterInputComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CounterInputComponent, selectors: [["app-counter-input"]], inputs: { _counterValue: ["counterValue", "_counterValue"], counterRangeMax: ["max", "counterRangeMax"], counterRangeMin: ["min", "counterRangeMin"] }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([
            { provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NG_VALUE_ACCESSOR, useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => CounterInputComponent), multi: true },
            { provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NG_VALIDATORS, useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => CounterInputComponent), multi: true }
        ]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 10, vars: 1, consts: [[1, "button-outer"], [1, "button-wrapper"], [1, "counter-icon", 3, "click"], ["slot", "icon-only", "name", "remove"], [1, "counter-value"], ["slot", "icon-only", "name", "add"]], template: function CounterInputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CounterInputComponent_Template_ion_button_click_2_listener() { return ctx.decrease(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "ion-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 0)(7, "div", 1)(8, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CounterInputComponent_Template_ion_button_click_8_listener() { return ctx.increase(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "ion-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx._counterValue);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonIcon], styles: ["app-counter-input {\n  --counter-background: #000;\n  --counter-color: #FFF;\n  --counter-color-activated: #FFF;\n  --counter-border-color: #000;\n  --counter-border-radius-outer: 50%;\n  --counter-border-radius-inner: 50%;\n  --counter-size: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\napp-counter-input ion-button.counter-icon {\n  margin: 0px;\n}\napp-counter-input ion-button.counter-icon.button-solid {\n  --background: var(--counter-background);\n  --background-activated: var(--counter-color);\n  --color: var(--counter-color);\n  --color-activated: var(--counter-color-activated);\n  --border-width: 1px;\n  --border-style: solid;\n  --border-color: var(--counter-border-color);\n  --box-shadow: none;\n  --border-radius: var(--counter-border-radius-outer) var(--counter-border-radius-inner) var(--counter-border-radius-inner) var(--counter-border-radius-outer);\n  --padding-bottom: 3px;\n  --padding-end: 3px;\n  --padding-start: 3px;\n  --padding-top: 3px;\n}\napp-counter-input .counter-value {\n  color: var(--counter-color);\n  margin: 0px 10px;\n  width: 2.2ch;\n  text-align: center;\n  font-feature-settings: \"tnum\";\n  font-variant-numeric: tabular-nums;\n}\napp-counter-input:not([basic]) .button-outer {\n  width: var(--counter-size);\n}\napp-counter-input:not([basic]) .button-outer .button-wrapper {\n  display: block;\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n  padding-bottom: 100%;\n}\napp-counter-input:not([basic]) .button-outer .button-wrapper .counter-icon {\n  position: absolute;\n  top: 0px;\n  bottom: 0px;\n  left: 0px;\n  right: 0px;\n  height: auto;\n  width: 100%;\n}\napp-counter-input[basic] {\n  --counter-border-radius-outer: 12px;\n  --counter-border-radius-inner: 0px;\n}\napp-counter-input[basic] .counter-value {\n  display: none;\n}\napp-counter-input[basic] .button-outer:first-child ion-button.counter-icon {\n  --border-radius: var(--counter-border-radius-outer) var(--counter-border-radius-inner) var(--counter-border-radius-inner) var(--counter-border-radius-outer);\n}\napp-counter-input[basic] .button-outer:last-child {\n  margin-left: -1px;\n}\napp-counter-input[basic] .button-outer:last-child ion-button.counter-icon {\n  --border-radius: var(--counter-border-radius-inner) var(--counter-border-radius-outer) var(--counter-border-radius-outer) var(--counter-border-radius-inner);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdW50ZXItaW5wdXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSwwQkFBQTtFQUNBLHFCQUFBO0VBQ0EsK0JBQUE7RUFDQSw0QkFBQTtFQUNBLGtDQUFBO0VBQ0Esa0NBQUE7RUFDQSxvQkFBQTtFQUVBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0FBQUY7QUFFRTtFQWlCRSxXQUFBO0FBaEJKO0FBQUk7RUFDRSx1Q0FBQTtFQUNBLDRDQUFBO0VBQ0EsNkJBQUE7RUFDQSxpREFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSwyQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsNEpBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtBQUVOO0FBSUU7RUFDRSwyQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsNkJBQUE7RUFDQSxrQ0FBQTtBQUZKO0FBT0k7RUFDRSwwQkFBQTtBQUxOO0FBT007RUFDRSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtBQUxSO0FBT1E7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQUxWO0FBV0U7RUFDRSxtQ0FBQTtFQUNBLGtDQUFBO0FBVEo7QUFXSTtFQUNFLGFBQUE7QUFUTjtBQWNRO0VBQ0UsNEpBQUE7QUFaVjtBQWdCTTtFQUVFLGlCQUFBO0FBZlI7QUFpQlE7RUFDRSw0SkFBQTtBQWZWIiwiZmlsZSI6ImNvdW50ZXItaW5wdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJhcHAtY291bnRlci1pbnB1dCB7XG4gIC0tY291bnRlci1iYWNrZ3JvdW5kOiAjMDAwO1xuICAtLWNvdW50ZXItY29sb3I6ICNGRkY7XG4gIC0tY291bnRlci1jb2xvci1hY3RpdmF0ZWQ6ICNGRkY7XG4gIC0tY291bnRlci1ib3JkZXItY29sb3I6ICMwMDA7XG4gIC0tY291bnRlci1ib3JkZXItcmFkaXVzLW91dGVyOiA1MCU7XG4gIC0tY291bnRlci1ib3JkZXItcmFkaXVzLWlubmVyOiA1MCU7XG4gIC0tY291bnRlci1zaXplOiAzMHB4O1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG5cbiAgaW9uLWJ1dHRvbi5jb3VudGVyLWljb24ge1xuICAgICYuYnV0dG9uLXNvbGlkIHtcbiAgICAgIC0tYmFja2dyb3VuZDogdmFyKC0tY291bnRlci1iYWNrZ3JvdW5kKTtcbiAgICAgIC0tYmFja2dyb3VuZC1hY3RpdmF0ZWQ6IHZhcigtLWNvdW50ZXItY29sb3IpO1xuICAgICAgLS1jb2xvcjogdmFyKC0tY291bnRlci1jb2xvcik7XG4gICAgICAtLWNvbG9yLWFjdGl2YXRlZDogdmFyKC0tY291bnRlci1jb2xvci1hY3RpdmF0ZWQpO1xuICAgICAgLS1ib3JkZXItd2lkdGg6IDFweDtcbiAgICAgIC0tYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgIC0tYm9yZGVyLWNvbG9yOiB2YXIoLS1jb3VudGVyLWJvcmRlci1jb2xvcik7XG4gICAgICAtLWJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAtLWJvcmRlci1yYWRpdXM6IHZhcigtLWNvdW50ZXItYm9yZGVyLXJhZGl1cy1vdXRlcikgdmFyKC0tY291bnRlci1ib3JkZXItcmFkaXVzLWlubmVyKSB2YXIoLS1jb3VudGVyLWJvcmRlci1yYWRpdXMtaW5uZXIpIHZhcigtLWNvdW50ZXItYm9yZGVyLXJhZGl1cy1vdXRlcik7XG4gICAgICAtLXBhZGRpbmctYm90dG9tOiAzcHg7XG4gICAgICAtLXBhZGRpbmctZW5kOiAzcHg7XG4gICAgICAtLXBhZGRpbmctc3RhcnQ6IDNweDtcbiAgICAgIC0tcGFkZGluZy10b3A6IDNweDtcbiAgICB9XG5cbiAgICBtYXJnaW46IDBweDtcbiAgfVxuXG4gIC5jb3VudGVyLXZhbHVlIHtcbiAgICBjb2xvcjogdmFyKC0tY291bnRlci1jb2xvcik7XG4gICAgbWFyZ2luOiAwcHggMTBweDtcbiAgICB3aWR0aDogMi4yY2g7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtZmVhdHVyZS1zZXR0aW5nczogJ3RudW0nO1xuICAgIGZvbnQtdmFyaWFudC1udW1lcmljOiB0YWJ1bGFyLW51bXM7XG4gIH1cblxuICAmOm5vdChbYmFzaWNdKSB7XG4gICAgLy8gRm9yY2UgZWFjaCBjb3VudGVyIGJ1dHRvbiB0byBoYXZlIGEgMToxIGFzcGVjdCByYXRpb1xuICAgIC5idXR0b24tb3V0ZXIge1xuICAgICAgd2lkdGg6IHZhcigtLWNvdW50ZXItc2l6ZSk7XG5cbiAgICAgIC5idXR0b24td3JhcHBlciB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTAwJTtcblxuICAgICAgICAuY291bnRlci1pY29uIHtcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgdG9wOiAwcHg7XG4gICAgICAgICAgYm90dG9tOiAwcHg7XG4gICAgICAgICAgbGVmdDogMHB4O1xuICAgICAgICAgIHJpZ2h0OiAwcHg7XG4gICAgICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJltiYXNpY10ge1xuICAgIC0tY291bnRlci1ib3JkZXItcmFkaXVzLW91dGVyOiAxMnB4O1xuICAgIC0tY291bnRlci1ib3JkZXItcmFkaXVzLWlubmVyOiAwcHg7XG5cbiAgICAuY291bnRlci12YWx1ZSB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cblxuICAgIC5idXR0b24tb3V0ZXIge1xuICAgICAgJjpmaXJzdC1jaGlsZCB7XG4gICAgICAgIGlvbi1idXR0b24uY291bnRlci1pY29uIHtcbiAgICAgICAgICAtLWJvcmRlci1yYWRpdXM6IHZhcigtLWNvdW50ZXItYm9yZGVyLXJhZGl1cy1vdXRlcikgdmFyKC0tY291bnRlci1ib3JkZXItcmFkaXVzLWlubmVyKSB2YXIoLS1jb3VudGVyLWJvcmRlci1yYWRpdXMtaW5uZXIpIHZhcigtLWNvdW50ZXItYm9yZGVyLXJhZGl1cy1vdXRlcik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgLy8gVG8gYXZvaWQgZG91YmxlIGJvcmRlclxuICAgICAgICBtYXJnaW4tbGVmdDogLTFweDtcblxuICAgICAgICBpb24tYnV0dG9uLmNvdW50ZXItaWNvbiB7XG4gICAgICAgICAgLS1ib3JkZXItcmFkaXVzOiB2YXIoLS1jb3VudGVyLWJvcmRlci1yYWRpdXMtaW5uZXIpIHZhcigtLWNvdW50ZXItYm9yZGVyLXJhZGl1cy1vdXRlcikgdmFyKC0tY291bnRlci1ib3JkZXItcmFkaXVzLW91dGVyKSB2YXIoLS1jb3VudGVyLWJvcmRlci1yYWRpdXMtaW5uZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0= */"], encapsulation: 2 });


/***/ }),

/***/ 2166:
/*!***************************************************************!*\
  !*** ./src/app/components/google-map/google-map.component.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GoogleMapComponent": () => (/* binding */ GoogleMapComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);



class GoogleMapComponent {
    constructor(_elementRef, platformId) {
        this._elementRef = _elementRef;
        this.platformId = platformId;
        this.$mapReady = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
        this._mapIdledOnce = false;
    }
    ngOnInit() {
        // there are some issues with maps in server side
        if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_1__.isPlatformBrowser)(this.platformId)) {
            this.initMap();
        }
    }
    initMap() {
        this._el = this._elementRef.nativeElement;
        this._map = new google.maps.Map(this._el, this.mapOptions);
        // Workarround for init method: try to catch the first idle event after the map creation
        // (this._mapIdledOnce). The following idle events don't matter.
        const _ready_listener = this._map.addListener('idle', () => {
            console.log('mapReady - IDLE');
            if (!this._mapIdledOnce) {
                this.$mapReady.emit(this._map);
                this._mapIdledOnce = true;
                // Stop listening to event, the map is ready
                google.maps.event.removeListener(_ready_listener);
            }
        });
    }
}
GoogleMapComponent.ɵfac = function GoogleMapComponent_Factory(t) { return new (t || GoogleMapComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.PLATFORM_ID)); };
GoogleMapComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GoogleMapComponent, selectors: [["app-google-map"]], inputs: { mapOptions: "mapOptions" }, decls: 0, vars: 0, template: function GoogleMapComponent_Template(rf, ctx) { }, encapsulation: 2 });


/***/ }),

/***/ 385:
/*!*****************************************************!*\
  !*** ./src/app/components/modal/modal.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModalComponent": () => (/* binding */ ModalComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ 4362);


class ModalComponent {
    constructor() { }
    ngOnInit() {
    }
}
ModalComponent.ɵfac = function ModalComponent_Factory(t) { return new (t || ModalComponent)(); };
ModalComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ModalComponent, selectors: [["app-modal"]], decls: 11, vars: 0, consts: [[1, "form-actions-wrapper"], ["expand", "block", "color", "primary", "fill", "outline", 1, "delete-btn"], ["expand", "block", "color", "secondary", "type", "submit", "fill", "solid", 1, "submit-btn"]], template: function ModalComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Ny Bokning\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "ion-footer")(4, "ion-row", 0)(5, "ion-col")(6, "ion-button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " DELETE ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "ion-col")(9, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "UPDATE ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonFooter, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonButton], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtb2RhbC5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ 8059:
/*!*******************************************************************!*\
  !*** ./src/app/components/rating-input/rating-input.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RatingInputComponent": () => (/* binding */ RatingInputComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 4362);





function RatingInputComponent_ion_button_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-button", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RatingInputComponent_ion_button_0_Template_ion_button_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const i_r2 = restoredCtx.index; const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.rate(i_r2 + 1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ion-icon", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const r_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("name", ctx_r0.value === undefined ? r_r1 === 1 ? "star" : r_r1 === 2 ? "star-half" : "star-outline" : ctx_r0.value > i_r2 ? ctx_r0.value < i_r2 + 1 ? "star-half" : "star" : "star-outline");
} }
class RatingInputComponent {
    constructor() {
        this.max = 5;
        this.readOnly = false;
        this.propagateChange = () => { }; // Noop function
    }
    ngOnInit() {
        const states = [];
        for (let i = 0; i < this.max; i++) {
            if (this.innerValue > i && this.innerValue < i + 1) {
                states[i] = 2;
            }
            else if (this.innerValue > i) {
                states[i] = 1;
            }
            else {
                states[i] = 0;
            }
        }
        this.range = states;
    }
    get value() {
        return this.innerValue;
    }
    set value(val) {
        if (val !== this.innerValue) {
            this.innerValue = val;
            this.propagateChange(val);
        }
    }
    writeValue(value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched() { }
    rate(amount) {
        if (!this.readOnly && amount >= 0 && amount <= this.range.length) {
            this.value = amount;
        }
    }
}
RatingInputComponent.ɵfac = function RatingInputComponent_Factory(t) { return new (t || RatingInputComponent)(); };
RatingInputComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RatingInputComponent, selectors: [["app-rating-input"]], inputs: { max: "max", readOnly: "readOnly" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([
            { provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NG_VALUE_ACCESSOR, useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => RatingInputComponent), multi: true }
        ])], decls: 1, vars: 1, consts: [["class", "rating-icon", "fill", "clear", "shape", "round", 3, "click", 4, "ngFor", "ngForOf"], ["fill", "clear", "shape", "round", 1, "rating-icon", 3, "click"], ["slot", "icon-only", 3, "name"]], template: function RatingInputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, RatingInputComponent_ion_button_0_Template, 2, 1, "ion-button", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.range);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonIcon], styles: ["app-rating-input {\n  --rating-background: transparent;\n  --rating-color: #000;\n  --rating-size: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\napp-rating-input ion-button.rating-icon {\n  --background: var(--rating-background);\n  --color: var(--rating-color);\n  --color-activated: var(--rating-color);\n  --box-shadow: none;\n  --padding-bottom: 0px;\n  --padding-end: 4px;\n  --padding-start: 4px;\n  --padding-top: 0px;\n  margin: 0px;\n  flex: 1;\n  width: var(--rating-size);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJhdGluZy1pbnB1dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdDQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtFQUVBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0FBQUY7QUFFQztFQUNHLHNDQUFBO0VBQ0EsNEJBQUE7RUFDQSxzQ0FBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7RUFFQSxXQUFBO0VBQ0YsT0FBQTtFQUNDLHlCQUFBO0FBREgiLCJmaWxlIjoicmF0aW5nLWlucHV0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLXJhdGluZy1pbnB1dCB7XG4gIC0tcmF0aW5nLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAtLXJhdGluZy1jb2xvcjogIzAwMDtcbiAgLS1yYXRpbmctc2l6ZTogMzJweDtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuXG5cdGlvbi1idXR0b24ucmF0aW5nLWljb24ge1xuICAgIC0tYmFja2dyb3VuZDogdmFyKC0tcmF0aW5nLWJhY2tncm91bmQpO1xuICAgIC0tY29sb3I6IHZhcigtLXJhdGluZy1jb2xvcik7XG4gICAgLS1jb2xvci1hY3RpdmF0ZWQ6IHZhcigtLXJhdGluZy1jb2xvcik7XG4gICAgLS1ib3gtc2hhZG93OiBub25lO1xuICAgIC0tcGFkZGluZy1ib3R0b206IDBweDtcbiAgICAtLXBhZGRpbmctZW5kOiA0cHg7XG4gICAgLS1wYWRkaW5nLXN0YXJ0OiA0cHg7XG4gICAgLS1wYWRkaW5nLXRvcDogMHB4O1xuXG4gICAgbWFyZ2luOiAwcHg7XG5cdFx0ZmxleDogMTtcblx0ICB3aWR0aDogdmFyKC0tcmF0aW5nLXNpemUpO1xuXHR9XG59XG4iXX0= */"], encapsulation: 2 });


/***/ }),

/***/ 8070:
/*!*************************************************************************!*\
  !*** ./src/app/components/shell/aspect-ratio/aspect-ratio.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AspectRatioComponent": () => (/* binding */ AspectRatioComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);

const _c0 = ["*"];
class AspectRatioComponent {
    constructor() {
        this.ratioPadding = '0px';
    }
    set ratio(ratio) {
        ratio = (ratio !== undefined && ratio !== null) ? ratio : { w: 1, h: 1 };
        const heightRatio = (ratio.h / ratio.w * 100) + '%';
        // Conserve aspect ratio (see: http://stackoverflow.com/a/10441480/1116959)
        this.ratioPadding = '0px 0px ' + heightRatio + ' 0px';
    }
}
AspectRatioComponent.ɵfac = function AspectRatioComponent_Factory(t) { return new (t || AspectRatioComponent)(); };
AspectRatioComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AspectRatioComponent, selectors: [["app-aspect-ratio"]], hostVars: 2, hostBindings: function AspectRatioComponent_HostBindings(rf, ctx) { if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("padding", ctx.ratioPadding);
    } }, inputs: { ratio: "ratio" }, ngContentSelectors: _c0, decls: 2, vars: 0, consts: [[1, "content-wrapper"]], template: function AspectRatioComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["[_nghost-%COMP%] {\n  display: block;\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n}\n[_nghost-%COMP%]   .content-wrapper[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0px;\n  bottom: 0px;\n  left: 0px;\n  right: 0px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzcGVjdC1yYXRpby5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtBQUNGO0FBQ0U7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7QUFDSiIsImZpbGUiOiJhc3BlY3QtcmF0aW8uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAxMDAlO1xuXG4gIC5jb250ZW50LXdyYXBwZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDBweDtcbiAgICBib3R0b206IDBweDtcbiAgICBsZWZ0OiAwcHg7XG4gICAgcmlnaHQ6IDBweDtcbiAgfVxufVxuIl19 */"] });


/***/ }),

/***/ 7356:
/*!***********************************************************************!*\
  !*** ./src/app/components/shell/image-shell/image-shell.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageShellComponent": () => (/* binding */ ImageShellComponent)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../environments/environment */ 2340);
/* harmony import */ var _utils_transfer_state_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/transfer-state-helper */ 1747);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 4362);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);






function ImageShellComponent_ng_content_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](0, 0, ["*ngIf", "_display === 'cover'"]);
} }
const _c0 = ["*"];
class ImageShellComponent {
    constructor(transferStateHelper) {
        this.transferStateHelper = transferStateHelper;
        // To debug shell styles, change configuration in the environment file
        this.debugDisplay = (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.appShellConfig && _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.appShellConfig.debug)
            ? _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.appShellConfig.debug : false;
        this._src = '';
        this._alt = '';
        this._loadingStrategy = 'lazy';
        this._display = '';
        this.imageSSR = false;
        this.imageLoaded = false;
        this.imageError = false;
        this.errorMessage = 'Could not load image';
    }
    set display(val) {
        this._display = (val !== undefined && val !== null) ? val : '';
        // For display 'cover' we use a hidden aux image. As it's hidden, if set loading to 'lazy' it won't ever trigger the loading mechanism
        if (this._display === 'cover') {
            this._loadingStrategy = 'eager';
        }
    }
    get display() {
        return this._display;
    }
    set src(val) {
        if (!this.debugDisplay) {
            this._src = (val !== undefined && val !== null) ? val : '';
        }
        // When using SSR (Server Side Rendering), avoid the loading animation while the image resource is being loaded
        const imageState = this.transferStateHelper.checkImageShellState('shell-images-state', this._src);
        if (imageState === _utils_transfer_state_helper__WEBPACK_IMPORTED_MODULE_1__.ImageShellState.SSR || imageState === _utils_transfer_state_helper__WEBPACK_IMPORTED_MODULE_1__.ImageShellState.BROWSER_FROM_SSR) {
            this._imageProcessedInServer();
        }
        else {
            if (this._display === 'cover') {
                // Unset the background-image until the image is loaded
                this.backgroundImage = 'unset';
            }
        }
    }
    set alt(val) {
        this._alt = (val !== undefined && val !== null) ? val : '';
    }
    _imageProcessedInServer() {
        this.imageSSR = true;
        // Also set backgroundImage so it's ready when transitioning from SSR to the browser
        if (this._display === 'cover') {
            this.backgroundImage = 'url(' + this._src + ')';
        }
    }
    _imageLoaded() {
        this.imageLoaded = true;
        // If it's a cover image then set the background-image property accordingly
        if (this._display === 'cover') {
            // Now that the image is loaded, set the background image
            this.backgroundImage = 'url(' + this._src + ')';
        }
    }
    _imageLoadError(event) {
        // Image error event get's called when the src is empty. We use emty values for the shell.
        // (see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Image_loading_errors)
        // Avoid that shell case
        if (this._src && this._src !== '') {
            this.imageLoaded = false;
            this.imageSSR = false;
            setTimeout(() => {
                this.imageError = true;
            }, 500);
        }
    }
}
ImageShellComponent.ɵfac = function ImageShellComponent_Factory(t) { return new (t || ImageShellComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_utils_transfer_state_helper__WEBPACK_IMPORTED_MODULE_1__.TransferStateHelper)); };
ImageShellComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ImageShellComponent, selectors: [["app-image-shell"]], hostVars: 10, hostBindings: function ImageShellComponent_HostBindings(rf, ctx) { if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("data-error", ctx.errorMessage)("display", ctx.display);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("background-image", ctx.backgroundImage);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("img-ssr", ctx.imageSSR)("img-loaded", ctx.imageLoaded)("img-error", ctx.imageError);
    } }, inputs: { display: "display", src: "src", alt: "alt" }, ngContentSelectors: _c0, decls: 3, vars: 4, consts: [[1, "spinner"], [1, "inner-img", 3, "src", "alt", "load", "error"], [4, "ngIf"]], template: function ImageShellComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "ion-spinner", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("load", function ImageShellComponent_Template_img_load_1_listener() { return ctx._imageLoaded(); })("error", function ImageShellComponent_Template_img_error_1_listener($event) { return ctx._imageLoadError($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, ImageShellComponent_ng_content_2_Template, 1, 0, "ng-content", 2);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx._src, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"])("alt", ctx._alt);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("loading", ctx._loadingStrategy);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx._display === "cover");
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonSpinner, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf], styles: ["[_nghost-%COMP%] {\n  --image-shell-loading-background: #EEE;\n  --image-shell-border-radius: 0px;\n  --image-shell-color: #333;\n  display: block;\n  position: relative;\n  height: 100%;\n  border-radius: var(--image-shell-border-radius);\n  transition: all ease-in-out 0.3s;\n  z-index: 2;\n}\n[_nghost-%COMP%]    > .spinner[_ngcontent-%COMP%] {\n  display: none;\n}\n[_nghost-%COMP%]::before {\n  content: \"\";\n  background: var(--image-shell-loading-background);\n  border-radius: var(--image-shell-border-radius);\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n[_nghost-%COMP%]:not([display=cover]) {\n  width: 100%;\n  overflow: hidden;\n}\n[_nghost-%COMP%]:not([display=cover])    > .inner-img[_ngcontent-%COMP%] {\n  transition: visibility 0s linear, opacity 0.5s linear;\n  opacity: 0;\n  visibility: hidden;\n  width: 100%;\n  height: 100%;\n  border-radius: var(--image-shell-border-radius);\n  display: block;\n}\n[_nghost-%COMP%]:not([display=cover]).img-ssr::before, [_nghost-%COMP%]:not([display=cover]).img-loaded::before {\n  display: none;\n}\n[_nghost-%COMP%]:not([display=cover]).img-ssr    > .inner-img[_ngcontent-%COMP%], [_nghost-%COMP%]:not([display=cover]).img-loaded    > .inner-img[_ngcontent-%COMP%] {\n  opacity: 1;\n  visibility: visible;\n}\n[_nghost-%COMP%]:not([display=cover]).img-error    > .inner-img[_ngcontent-%COMP%] {\n  color: var(--image-shell-color);\n  font-size: 12px;\n}\n[_nghost-%COMP%]:not([display=cover]).img-error::after {\n  content: attr(data-error);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  padding: 10px;\n  color: var(--image-shell-color);\n  background-color: var(--image-shell-loading-background);\n  font-size: 12px;\n}\n[display=cover][_nghost-%COMP%] {\n  background-size: cover;\n  background-repeat: no-repeat;\n}\n[display=cover][_nghost-%COMP%]::before, [display=cover][_nghost-%COMP%]    > .spinner[_ngcontent-%COMP%] {\n  z-index: -1;\n}\n[display=cover][_nghost-%COMP%]    > .inner-img[_ngcontent-%COMP%] {\n  display: none;\n  visibility: hidden;\n}\n[display=cover].img-ssr[_nghost-%COMP%]::before, [display=cover].img-loaded[_nghost-%COMP%]::before {\n  display: none;\n}\n[animation=gradient][_nghost-%COMP%] {\n  --image-shell-loading-background: #EEE;\n  --image-shell-animation-color: #DDD;\n}\n[animation=gradient][_nghost-%COMP%]::before {\n  background: linear-gradient(to right, var(--image-shell-loading-background) 8%, var(--image-shell-animation-color) 18%, var(--image-shell-loading-background) 33%);\n  background-size: 800px 104px;\n  -webkit-animation: animateBackground 2s ease-in-out infinite;\n          animation: animateBackground 2s ease-in-out infinite;\n}\n[animation=gradient].img-ssr[_nghost-%COMP%]::before, [animation=gradient].img-loaded[_nghost-%COMP%]::before, [animation=gradient].img-error[_nghost-%COMP%]::before {\n  background: none;\n  -webkit-animation: 0;\n          animation: 0;\n}\n@-webkit-keyframes animateBackground {\n  0% {\n    background-position: -468px 0;\n  }\n  100% {\n    background-position: 468px 0;\n  }\n}\n@keyframes animateBackground {\n  0% {\n    background-position: -468px 0;\n  }\n  100% {\n    background-position: 468px 0;\n  }\n}\n[animation=spinner][_nghost-%COMP%] {\n  --image-shell-spinner-size: 28px;\n  --image-shell-spinner-color: #CCC;\n}\n[animation=spinner][_nghost-%COMP%]    > .spinner[_ngcontent-%COMP%] {\n  display: block;\n  position: absolute;\n  top: calc(50% - var(--image-shell-spinner-size) / 2);\n  left: calc(50% - var(--image-shell-spinner-size) / 2);\n  width: var(--image-shell-spinner-size);\n  height: var(--image-shell-spinner-size);\n  font-size: var(--image-shell-spinner-size);\n  line-height: var(--image-shell-spinner-size);\n  color: var(--image-shell-spinner-color);\n}\n[animation=spinner].img-ssr[_nghost-%COMP%]    > .spinner[_ngcontent-%COMP%], [animation=spinner].img-loaded[_nghost-%COMP%]    > .spinner[_ngcontent-%COMP%], [animation=spinner].img-error[_nghost-%COMP%]    > .spinner[_ngcontent-%COMP%] {\n  display: none;\n  visibility: hidden;\n}\n.add-overlay[_nghost-%COMP%] {\n  --image-shell-overlay-background: rgba(0, 0, 0, .4);\n}\n.add-overlay.img-ssr[_nghost-%COMP%]::before, .add-overlay.img-loaded[_nghost-%COMP%]::before, .add-overlay.img-error[_nghost-%COMP%]::before {\n  display: block;\n  background: var(--image-shell-overlay-background);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlLXNoZWxsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Msc0NBQUE7RUFDQSxnQ0FBQTtFQUNBLHlCQUFBO0VBRUEsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLCtDQUFBO0VBQ0EsZ0NBQUE7RUFDQSxVQUFBO0FBQUQ7QUFHQztFQUNDLGFBQUE7QUFERjtBQUtDO0VBQ0MsV0FBQTtFQUNBLGlEQUFBO0VBQ0EsK0NBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7QUFIRjtBQU1DO0VBQ0MsV0FBQTtFQUNBLGdCQUFBO0FBSkY7QUFNRTtFQUNDLHFEQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSwrQ0FBQTtFQUVBLGNBQUE7QUFMSDtBQVdHO0VBQ0MsYUFBQTtBQVRKO0FBWUc7RUFDQyxVQUFBO0VBQ0EsbUJBQUE7QUFWSjtBQWVHO0VBRUMsK0JBQUE7RUFDQSxlQUFBO0FBZEo7QUFrQkc7RUFDQyx5QkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtFQUNBLGFBQUE7RUFDQSwrQkFBQTtFQUNBLHVEQUFBO0VBQ0EsZUFBQTtBQWhCSjtBQXVCQztFQUNDLHNCQUFBO0VBQ0EsNEJBQUE7QUFyQkY7QUF3QkU7RUFFQyxXQUFBO0FBdkJIO0FBMEJFO0VBQ0MsYUFBQTtFQUNBLGtCQUFBO0FBeEJIO0FBOEJHO0VBQ0MsYUFBQTtBQTVCSjtBQWtDQTtFQUNDLHNDQUFBO0VBQ0EsbUNBQUE7QUEvQkQ7QUFrQ0M7RUFDQyxrS0FDRTtFQUNGLDRCQUFBO0VBQ0EsNERBQUE7VUFBQSxvREFBQTtBQWpDRjtBQXdDRTtFQUNDLGdCQUFBO0VBQ0Esb0JBQUE7VUFBQSxZQUFBO0FBdENIO0FBMENDO0VBQ0M7SUFDQyw2QkFBQTtFQXhDRDtFQTJDQTtJQUNDLDRCQUFBO0VBekNEO0FBQ0Y7QUFrQ0M7RUFDQztJQUNDLDZCQUFBO0VBeENEO0VBMkNBO0lBQ0MsNEJBQUE7RUF6Q0Q7QUFDRjtBQTZDQTtFQUNDLGdDQUFBO0VBQ0EsaUNBQUE7QUExQ0Q7QUE0Q0M7RUFDQyxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxvREFBQTtFQUNBLHFEQUFBO0VBQ0Esc0NBQUE7RUFDQSx1Q0FBQTtFQUNBLDBDQUFBO0VBQ0EsNENBQUE7RUFDQSx1Q0FBQTtBQTFDRjtBQWdERTtFQUNDLGFBQUE7RUFDQSxrQkFBQTtBQTlDSDtBQW1EQTtFQUNDLG1EQUFBO0FBaEREO0FBc0RFO0VBQ0MsY0FBQTtFQUNBLGlEQUFBO0FBcERIIiwiZmlsZSI6ImltYWdlLXNoZWxsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuXHQtLWltYWdlLXNoZWxsLWxvYWRpbmctYmFja2dyb3VuZDogI0VFRTtcblx0LS1pbWFnZS1zaGVsbC1ib3JkZXItcmFkaXVzOiAwcHg7XG5cdC0taW1hZ2Utc2hlbGwtY29sb3I6ICMzMzM7XG5cblx0ZGlzcGxheTogYmxvY2s7XG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0aGVpZ2h0OiAxMDAlO1xuXHRib3JkZXItcmFkaXVzOiB2YXIoLS1pbWFnZS1zaGVsbC1ib3JkZXItcmFkaXVzKTtcblx0dHJhbnNpdGlvbjogYWxsIGVhc2UtaW4tb3V0IC4zcztcblx0ei1pbmRleDogMjtcblxuXHQvLyBCeSBkZWZhdWx0LCBoaWRlIHRoZSBzcGlubmVyXG5cdCYgPiAuc3Bpbm5lciB7XG5cdFx0ZGlzcGxheTogbm9uZTtcblx0fVxuXG5cdC8vIExvYWRpbmcgYmFja2dyb3VuZFxuXHQmOjpiZWZvcmUge1xuXHRcdGNvbnRlbnQ6ICcnO1xuXHRcdGJhY2tncm91bmQ6IHZhcigtLWltYWdlLXNoZWxsLWxvYWRpbmctYmFja2dyb3VuZCk7XG5cdFx0Ym9yZGVyLXJhZGl1czogdmFyKC0taW1hZ2Utc2hlbGwtYm9yZGVyLXJhZGl1cyk7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdHRvcDogMDtcblx0XHRib3R0b206IDA7XG5cdFx0bGVmdDogMDtcblx0XHRyaWdodDogMDtcblx0fVxuXG5cdCY6bm90KFtkaXNwbGF5PVwiY292ZXJcIl0pIHtcblx0XHR3aWR0aDogMTAwJTtcblx0XHRvdmVyZmxvdzogaGlkZGVuO1xuXG5cdFx0JiA+IC5pbm5lci1pbWcge1xuXHRcdFx0dHJhbnNpdGlvbjogdmlzaWJpbGl0eSAwcyBsaW5lYXIsIG9wYWNpdHkgLjVzIGxpbmVhcjtcblx0XHRcdG9wYWNpdHk6IDA7XG5cdFx0XHR2aXNpYmlsaXR5OiBoaWRkZW47XG5cdFx0XHR3aWR0aDogMTAwJTtcblx0XHRcdGhlaWdodDogMTAwJTtcblx0XHRcdGJvcmRlci1yYWRpdXM6IHZhcigtLWltYWdlLXNoZWxsLWJvcmRlci1yYWRpdXMpO1xuXHRcdFx0Ly8gSW1hZ2Ugc2hvdWxkIGZpbGwgdGhlIHNwYWNlIHdoaWxlIGxvYWRpbmdcblx0XHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdH1cblxuXHRcdCYuaW1nLXNzcixcblx0XHQmLmltZy1sb2FkZWQge1xuXHRcdFx0Ly8gSGlkZSBsb2FkaW5nIGJhY2tncm91bmQgb25jZSB0aGUgaW1hZ2UgaGFzIGxvYWRlZFxuXHRcdFx0Jjo6YmVmb3JlIHtcblx0XHRcdFx0ZGlzcGxheTogbm9uZTtcblx0XHRcdH1cblxuXHRcdFx0JiA+IC5pbm5lci1pbWcge1xuXHRcdFx0XHRvcGFjaXR5OiAxO1xuXHRcdFx0XHR2aXNpYmlsaXR5OiB2aXNpYmxlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdCYuaW1nLWVycm9yIHtcblx0XHRcdCYgPiAuaW5uZXItaW1nIHtcblx0XHRcdFx0Ly8gRm9yIHRoZSBBbHQgdGV4dFxuXHRcdFx0XHRjb2xvcjogdmFyKC0taW1hZ2Utc2hlbGwtY29sb3IpO1xuXHRcdFx0XHRmb250LXNpemU6IDEycHg7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCBwbGFjZWhvbGRlciBiYWNrZ3JvdW5kXG5cdFx0XHQmOjphZnRlciB7XG5cdFx0XHRcdGNvbnRlbnQ6IGF0dHIoZGF0YS1lcnJvcik7XG5cdFx0XHRcdGRpc3BsYXk6IGZsZXg7XG5cdFx0XHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdFx0XHRcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0XHRcdHRvcDogMDtcblx0XHRcdFx0d2lkdGg6IDEwMCU7XG5cdFx0XHRcdGhlaWdodDogMTAwJTtcblx0XHRcdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0XHRcdFx0cGFkZGluZzogMTBweDtcblx0XHRcdFx0Y29sb3I6IHZhcigtLWltYWdlLXNoZWxsLWNvbG9yKTtcblx0XHRcdFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW1hZ2Utc2hlbGwtbG9hZGluZy1iYWNrZ3JvdW5kKTtcblx0XHRcdFx0Zm9udC1zaXplOiAxMnB4O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vICogTk9URTogd2UgZGlkbid0IGFkZCAuaW1nLWVycm9yIHN0eWxlcyBmb3IgJ2NvdmVyJyBkaXNwbGF5IG9uIHB1cnBvc2UuXG5cdC8vIElmIGl0IGlzIGRpc3BsYXk6IGNvdmVyXG5cdCZbZGlzcGxheT1cImNvdmVyXCJdIHtcblx0XHRiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuXHRcdGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG5cblx0XHQvLyBJbiBjb3ZlciBkaXNwbGF5LCB3ZSBjYW4gaGF2ZSBjb250ZW50IGluc2lkZSB0aGUgZWxlbWVudCwgdGh1cyB3ZSBuZWVkIHRvIHB1dCB0aGVzZSBlbGVtZW50cyBiZW5lYXRoXG5cdFx0Jjo6YmVmb3JlLFxuXHRcdCYgPiAuc3Bpbm5lciB7XG5cdFx0XHR6LWluZGV4OiAtMTtcblx0XHR9XG5cblx0XHQmID4gLmlubmVyLWltZyB7XG5cdFx0XHRkaXNwbGF5OiBub25lO1xuXHRcdFx0dmlzaWJpbGl0eTogaGlkZGVuO1xuXHRcdH1cblxuXHRcdCYuaW1nLXNzcixcblx0XHQmLmltZy1sb2FkZWQge1xuXHRcdFx0Ly8gSGlkZSBsb2FkaW5nIGJhY2tncm91bmQgb25jZSB0aGUgaW1hZ2UgaGFzIGxvYWRlZFxuXHRcdFx0Jjo6YmVmb3JlIHtcblx0XHRcdFx0ZGlzcGxheTogbm9uZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuOmhvc3QoW2FuaW1hdGlvbj1cImdyYWRpZW50XCJdKSB7XG5cdC0taW1hZ2Utc2hlbGwtbG9hZGluZy1iYWNrZ3JvdW5kOiAjRUVFO1xuXHQtLWltYWdlLXNoZWxsLWFuaW1hdGlvbi1jb2xvcjogI0RERDtcblxuXHQvLyBUaGUgYW5pbWF0aW9uIHRoYXQgZ29lcyBiZW5lYXRoIHRoZSBtYXNrc1xuXHQmOjpiZWZvcmUge1xuXHRcdGJhY2tncm91bmQ6XG5cdFx0XHRcdGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgdmFyKC0taW1hZ2Utc2hlbGwtbG9hZGluZy1iYWNrZ3JvdW5kKSA4JSwgdmFyKC0taW1hZ2Utc2hlbGwtYW5pbWF0aW9uLWNvbG9yKSAxOCUsIHZhcigtLWltYWdlLXNoZWxsLWxvYWRpbmctYmFja2dyb3VuZCkgMzMlKTtcblx0XHRiYWNrZ3JvdW5kLXNpemU6IDgwMHB4IDEwNHB4O1xuXHRcdGFuaW1hdGlvbjogYW5pbWF0ZUJhY2tncm91bmQgMnMgZWFzZS1pbi1vdXQgaW5maW5pdGU7XG5cdH1cblxuXHQmLmltZy1zc3IsXG5cdCYuaW1nLWxvYWRlZCxcblx0Ji5pbWctZXJyb3Ige1xuXHRcdC8vIFJlc2V0IGJhY2tncm91bmQgYW5pbWF0aW9uXG5cdFx0Jjo6YmVmb3JlIHtcblx0XHRcdGJhY2tncm91bmQ6IG5vbmU7XG5cdFx0XHRhbmltYXRpb246IDA7XG5cdFx0fVxuXHR9XG5cblx0QGtleWZyYW1lcyBhbmltYXRlQmFja2dyb3VuZCB7XG5cdFx0MCV7XG5cdFx0XHRiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtNDY4cHggMFxuXHRcdH1cblxuXHRcdDEwMCV7XG5cdFx0XHRiYWNrZ3JvdW5kLXBvc2l0aW9uOiA0NjhweCAwXG5cdFx0fVxuXHR9XG59XG5cbjpob3N0KFthbmltYXRpb249XCJzcGlubmVyXCJdKSB7XG5cdC0taW1hZ2Utc2hlbGwtc3Bpbm5lci1zaXplOiAyOHB4O1xuXHQtLWltYWdlLXNoZWxsLXNwaW5uZXItY29sb3I6ICNDQ0M7XG5cblx0JiA+IC5zcGlubmVyIHtcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0dG9wOiBjYWxjKDUwJSAtIGNhbGModmFyKC0taW1hZ2Utc2hlbGwtc3Bpbm5lci1zaXplKSAvIDIpKTtcblx0XHRsZWZ0OiBjYWxjKDUwJSAtIGNhbGModmFyKC0taW1hZ2Utc2hlbGwtc3Bpbm5lci1zaXplKSAvIDIpKTtcblx0XHR3aWR0aDogdmFyKC0taW1hZ2Utc2hlbGwtc3Bpbm5lci1zaXplKTtcblx0XHRoZWlnaHQ6IHZhcigtLWltYWdlLXNoZWxsLXNwaW5uZXItc2l6ZSk7XG5cdFx0Zm9udC1zaXplOiB2YXIoLS1pbWFnZS1zaGVsbC1zcGlubmVyLXNpemUpO1xuXHRcdGxpbmUtaGVpZ2h0OiB2YXIoLS1pbWFnZS1zaGVsbC1zcGlubmVyLXNpemUpO1xuXHRcdGNvbG9yOiB2YXIoLS1pbWFnZS1zaGVsbC1zcGlubmVyLWNvbG9yKTtcblx0fVxuXG5cdCYuaW1nLXNzcixcblx0Ji5pbWctbG9hZGVkLFxuXHQmLmltZy1lcnJvciB7XG5cdFx0JiA+IC5zcGlubmVyIHtcblx0XHRcdGRpc3BsYXk6IG5vbmU7XG5cdFx0XHR2aXNpYmlsaXR5OiBoaWRkZW47XG5cdFx0fVxuXHR9XG59XG5cbjpob3N0KC5hZGQtb3ZlcmxheSkge1xuXHQtLWltYWdlLXNoZWxsLW92ZXJsYXktYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAuNCk7XG5cblx0Ji5pbWctc3NyLFxuXHQmLmltZy1sb2FkZWQsXG5cdCYuaW1nLWVycm9yIHtcblx0XHQvLyBBZGQgYmFja2dyb3VuZCBvdmVybGF5IGFmdGVyIHRoZSBpbWFnZSBoYXMgbG9hZGVkXG5cdFx0Jjo6YmVmb3JlIHtcblx0XHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdFx0YmFja2dyb3VuZDogdmFyKC0taW1hZ2Utc2hlbGwtb3ZlcmxheS1iYWNrZ3JvdW5kKTtcblx0XHR9XG5cdH1cbn1cbiJdfQ== */"] });


/***/ }),

/***/ 952:
/*!**************************************************!*\
  !*** ./src/app/components/shell/shell.module.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShellModule": () => (/* binding */ ShellModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 4362);
/* harmony import */ var _aspect_ratio_aspect_ratio_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aspect-ratio/aspect-ratio.component */ 8070);
/* harmony import */ var _image_shell_image_shell_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-shell/image-shell.component */ 7356);
/* harmony import */ var _text_shell_text_shell_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./text-shell/text-shell.component */ 2148);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);






class ShellModule {
}
ShellModule.ɵfac = function ShellModule_Factory(t) { return new (t || ShellModule)(); };
ShellModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: ShellModule });
ShellModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](ShellModule, { declarations: [_aspect_ratio_aspect_ratio_component__WEBPACK_IMPORTED_MODULE_0__.AspectRatioComponent,
        _image_shell_image_shell_component__WEBPACK_IMPORTED_MODULE_1__.ImageShellComponent,
        _text_shell_text_shell_component__WEBPACK_IMPORTED_MODULE_2__.TextShellComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule], exports: [_aspect_ratio_aspect_ratio_component__WEBPACK_IMPORTED_MODULE_0__.AspectRatioComponent,
        _image_shell_image_shell_component__WEBPACK_IMPORTED_MODULE_1__.ImageShellComponent,
        _text_shell_text_shell_component__WEBPACK_IMPORTED_MODULE_2__.TextShellComponent] }); })();


/***/ }),

/***/ 2148:
/*!*********************************************************************!*\
  !*** ./src/app/components/shell/text-shell/text-shell.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextShellComponent": () => (/* binding */ TextShellComponent)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../environments/environment */ 2340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);


class TextShellComponent {
    constructor() {
        // To debug shell styles, change configuration in the environment file
        this.debugMode = (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.appShellConfig && _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.appShellConfig.debug) ? _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.appShellConfig.debug : false;
        this.textLoaded = false;
    }
    set data(val) {
        if (!this.debugMode) {
            this._data = (val !== undefined && val !== null) ? val : '';
        }
        if (this._data && this._data !== '') {
            this.textLoaded = true;
        }
        else {
            this.textLoaded = false;
        }
    }
}
TextShellComponent.ɵfac = function TextShellComponent_Factory(t) { return new (t || TextShellComponent)(); };
TextShellComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: TextShellComponent, selectors: [["app-text-shell"]], hostVars: 2, hostBindings: function TextShellComponent_HostBindings(rf, ctx) { if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("text-loaded", ctx.textLoaded);
    } }, inputs: { data: "data" }, decls: 2, vars: 1, template: function TextShellComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx._data);
    } }, styles: ["[_nghost-%COMP%] {\n  --text-shell-background: transparent;\n  --text-shell-line-color: #EEE;\n  --text-shell-line-height: 16px;\n  --text-shell-line-gutter: 3px;\n  display: block;\n  position: relative;\n  color: transparent;\n  background-color: var(--text-shell-background);\n  transform-style: preserve-3d;\n  background-clip: content-box;\n}\n\n[_nghost-%COMP%]:not([animation]) {\n  background-image: linear-gradient(to right, #CCC 87% , #FFF 87%);\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 87% , var(--text-shell-background, #FFF) 87%);\n  background-position: 0 0px;\n  background-size: 100% 16px;\n  background-size: 100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((16px * 1) + (3px * (1 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 1) + (var(--text-shell-line-gutter, 3px) * (1 - 1)));\n}\n\n[_nghost-%COMP%]:not([animation])[lines=\"1\"] {\n  background-image: linear-gradient(to right, #CCC 92% , #FFF 92%);\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 92% , var(--text-shell-background, #FFF) 92%);\n  background-position: 0 0px;\n  background-size: 100% 16px;\n  background-size: 100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((16px * 1) + (3px * (1 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 1) + (var(--text-shell-line-gutter, 3px) * (1 - 1)));\n}\n\n[_nghost-%COMP%]:not([animation])[lines=\"2\"] {\n  background-image: linear-gradient(to right, #CCC 92% , #FFF 92%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 34% , #FFF 34%);\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 92% , var(--text-shell-background, #FFF) 92%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 34% , var(--text-shell-background, #FFF) 34%);\n  background-position: 0 0px,  0 calc((16px * (2 - 1)) + (3px * (2 - 2))),  0 calc((16px * (2 - 1)) + (3px * (2 - 1)));\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1)));\n  background-size: 100% 16px,  100% 3px,  100% 16px;\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((16px * 2) + (3px * (2 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 2) + (var(--text-shell-line-gutter, 3px) * (2 - 1)));\n}\n\n[_nghost-%COMP%]:not([animation])[lines=\"3\"] {\n  background-image: linear-gradient(to right, #CCC 85% , #FFF 85%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 70% , #FFF 70%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 43% , #FFF 43%);\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 85% , var(--text-shell-background, #FFF) 85%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 70% , var(--text-shell-background, #FFF) 70%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 43% , var(--text-shell-background, #FFF) 43%);\n  background-position: 0 0px,  0 calc((16px * (2 - 1)) + (3px * (2 - 2))),  0 calc((16px * (2 - 1)) + (3px * (2 - 1))),  0 calc((16px * (3 - 1)) + (3px * (3 - 2))),  0 calc((16px * (3 - 1)) + (3px * (3 - 1)));\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1)));\n  background-size: 100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px;\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((16px * 3) + (3px * (3 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 3) + (var(--text-shell-line-gutter, 3px) * (3 - 1)));\n}\n\n[_nghost-%COMP%]:not([animation])[lines=\"4\"] {\n  background-image: linear-gradient(to right, #CCC 88% , #FFF 88%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 79% , #FFF 79%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 77% , #FFF 77%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 47% , #FFF 47%);\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 88% , var(--text-shell-background, #FFF) 88%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 79% , var(--text-shell-background, #FFF) 79%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 77% , var(--text-shell-background, #FFF) 77%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 47% , var(--text-shell-background, #FFF) 47%);\n  background-position: 0 0px,  0 calc((16px * (2 - 1)) + (3px * (2 - 2))),  0 calc((16px * (2 - 1)) + (3px * (2 - 1))),  0 calc((16px * (3 - 1)) + (3px * (3 - 2))),  0 calc((16px * (3 - 1)) + (3px * (3 - 1))),  0 calc((16px * (4 - 1)) + (3px * (4 - 2))),  0 calc((16px * (4 - 1)) + (3px * (4 - 1)));\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 1)));\n  background-size: 100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px;\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((16px * 4) + (3px * (4 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 4) + (var(--text-shell-line-gutter, 3px) * (4 - 1)));\n}\n\n[_nghost-%COMP%]:not([animation])[lines=\"5\"] {\n  background-image: linear-gradient(to right, #CCC 89% , #FFF 89%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 62% , #FFF 62%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 68% , #FFF 68%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 66% , #FFF 66%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 38% , #FFF 38%);\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 89% , var(--text-shell-background, #FFF) 89%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 62% , var(--text-shell-background, #FFF) 62%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 68% , var(--text-shell-background, #FFF) 68%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 66% , var(--text-shell-background, #FFF) 66%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 38% , var(--text-shell-background, #FFF) 38%);\n  background-position: 0 0px,  0 calc((16px * (2 - 1)) + (3px * (2 - 2))),  0 calc((16px * (2 - 1)) + (3px * (2 - 1))),  0 calc((16px * (3 - 1)) + (3px * (3 - 2))),  0 calc((16px * (3 - 1)) + (3px * (3 - 1))),  0 calc((16px * (4 - 1)) + (3px * (4 - 2))),  0 calc((16px * (4 - 1)) + (3px * (4 - 1))),  0 calc((16px * (5 - 1)) + (3px * (5 - 2))),  0 calc((16px * (5 - 1)) + (3px * (5 - 1)));\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 1)));\n  background-size: 100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px;\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((16px * 5) + (3px * (5 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 5) + (var(--text-shell-line-gutter, 3px) * (5 - 1)));\n}\n\n[_nghost-%COMP%]:not([animation])[lines=\"6\"] {\n  background-image: linear-gradient(to right, #CCC 85% , #FFF 85%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 63% , #FFF 63%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 69% , #FFF 69%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 65% , #FFF 65%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 78% , #FFF 78%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 49% , #FFF 49%);\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 85% , var(--text-shell-background, #FFF) 85%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 63% , var(--text-shell-background, #FFF) 63%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 69% , var(--text-shell-background, #FFF) 69%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 65% , var(--text-shell-background, #FFF) 65%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 78% , var(--text-shell-background, #FFF) 78%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 49% , var(--text-shell-background, #FFF) 49%);\n  background-position: 0 0px,  0 calc((16px * (2 - 1)) + (3px * (2 - 2))),  0 calc((16px * (2 - 1)) + (3px * (2 - 1))),  0 calc((16px * (3 - 1)) + (3px * (3 - 2))),  0 calc((16px * (3 - 1)) + (3px * (3 - 1))),  0 calc((16px * (4 - 1)) + (3px * (4 - 2))),  0 calc((16px * (4 - 1)) + (3px * (4 - 1))),  0 calc((16px * (5 - 1)) + (3px * (5 - 2))),  0 calc((16px * (5 - 1)) + (3px * (5 - 1))),  0 calc((16px * (6 - 1)) + (3px * (6 - 2))),  0 calc((16px * (6 - 1)) + (3px * (6 - 1)));\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (6 - 1)) + (var(--text-shell-line-gutter, 3px) * (6 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (6 - 1)) + (var(--text-shell-line-gutter, 3px) * (6 - 1)));\n  background-size: 100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px;\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((16px * 6) + (3px * (6 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 6) + (var(--text-shell-line-gutter, 3px) * (6 - 1)));\n}\n\n[_nghost-%COMP%]:not([animation]).text-loaded {\n  background: none;\n  min-height: inherit;\n  color: inherit;\n}\n\n[animation=bouncing][_nghost-%COMP%] {\n  background-image: linear-gradient(to right, #CCC 95% , #FFF 95%);\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 95% , var(--text-shell-background, #FFF) 95%);\n  background-position: 0 0px;\n  background-size: 100% 16px;\n  background-size: 100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  -webkit-animation-direction: alternate;\n          animation-direction: alternate;\n  -webkit-animation-name: animateLine;\n          animation-name: animateLine;\n  min-height: calc((16px * 1) + (3px * (1 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 1) + (var(--text-shell-line-gutter, 3px) * (1 - 1)));\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-timing-function: ease-in-out;\n          animation-timing-function: ease-in-out;\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s;\n}\n\n@-webkit-keyframes animateLine {\n  0% {\n    background-size: 85% 16px;\n    background-size: 85% var(--text-shell-line-height, 16px);\n  }\n  100% {\n    background-size: 100% 16px;\n    background-size: 100% var(--text-shell-line-height, 16px);\n  }\n}\n\n@keyframes animateLine {\n  0% {\n    background-size: 85% 16px;\n    background-size: 85% var(--text-shell-line-height, 16px);\n  }\n  100% {\n    background-size: 100% 16px;\n    background-size: 100% var(--text-shell-line-height, 16px);\n  }\n}\n\n[animation=bouncing][lines=\"1\"][_nghost-%COMP%] {\n  background-image: linear-gradient(to right, #CCC 92% , #FFF 92%);\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 92% , var(--text-shell-background, #FFF) 92%);\n  background-position: 0 0px;\n  background-size: 100% 16px;\n  background-size: 100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  -webkit-animation-direction: alternate;\n          animation-direction: alternate;\n  -webkit-animation-name: animateLine;\n          animation-name: animateLine;\n  min-height: calc((16px * 1) + (3px * (1 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 1) + (var(--text-shell-line-gutter, 3px) * (1 - 1)));\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-timing-function: ease-in-out;\n          animation-timing-function: ease-in-out;\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s;\n}\n\n@keyframes animateLine {\n  0% {\n    background-size: 85% 16px;\n    background-size: 85% var(--text-shell-line-height, 16px);\n  }\n  100% {\n    background-size: 100% 16px;\n    background-size: 100% var(--text-shell-line-height, 16px);\n  }\n}\n\n[animation=bouncing][lines=\"2\"][_nghost-%COMP%] {\n  background-image: linear-gradient(to right, #CCC 93% , #FFF 93%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 35% , #FFF 35%);\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 93% , var(--text-shell-background, #FFF) 93%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 35% , var(--text-shell-background, #FFF) 35%);\n  background-position: 0 0px,  0 calc((16px * (2 - 1)) + (3px * (2 - 2))),  0 calc((16px * (2 - 1)) + (3px * (2 - 1)));\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1)));\n  background-size: 100% 16px,  100% 3px,  100% 16px;\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  animation-direction: alternate-reverse;\n  -webkit-animation-name: animateMultiLine;\n          animation-name: animateMultiLine;\n  min-height: calc((16px * 2) + (3px * (2 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 2) + (var(--text-shell-line-gutter, 3px) * (2 - 1)));\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-timing-function: ease-in-out;\n          animation-timing-function: ease-in-out;\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s;\n}\n\n@-webkit-keyframes animateMultiLine {\n  0% {\n    background-size: 85% 16px,  100% 3px,  55% 16px;\n    background-size: 85% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  55% var(--text-shell-line-height, 16px);\n  }\n  100% {\n    background-size: 100% 16px,  100% 3px,  100% 16px;\n    background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  }\n}\n\n@keyframes animateMultiLine {\n  0% {\n    background-size: 85% 16px,  100% 3px,  55% 16px;\n    background-size: 85% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  55% var(--text-shell-line-height, 16px);\n  }\n  100% {\n    background-size: 100% 16px,  100% 3px,  100% 16px;\n    background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  }\n}\n\n[animation=bouncing][lines=\"3\"][_nghost-%COMP%] {\n  background-image: linear-gradient(to right, #CCC 90% , #FFF 90%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 69% , #FFF 69%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 42% , #FFF 42%);\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 90% , var(--text-shell-background, #FFF) 90%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 69% , var(--text-shell-background, #FFF) 69%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 42% , var(--text-shell-background, #FFF) 42%);\n  background-position: 0 0px,  0 calc((16px * (2 - 1)) + (3px * (2 - 2))),  0 calc((16px * (2 - 1)) + (3px * (2 - 1))),  0 calc((16px * (3 - 1)) + (3px * (3 - 2))),  0 calc((16px * (3 - 1)) + (3px * (3 - 1)));\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1)));\n  background-size: 100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px;\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  animation-direction: alternate-reverse;\n  -webkit-animation-name: animateMultiLine;\n          animation-name: animateMultiLine;\n  min-height: calc((16px * 3) + (3px * (3 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 3) + (var(--text-shell-line-gutter, 3px) * (3 - 1)));\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-timing-function: ease-in-out;\n          animation-timing-function: ease-in-out;\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s;\n}\n\n@keyframes animateMultiLine {\n  0% {\n    background-size: 85% 16px,  100% 3px,  75% 16px,  100% 3px,  55% 16px;\n    background-size: 85% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  75% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  55% var(--text-shell-line-height, 16px);\n  }\n  100% {\n    background-size: 100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px;\n    background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  }\n}\n\n[animation=bouncing][lines=\"4\"][_nghost-%COMP%] {\n  background-image: linear-gradient(to right, #CCC 91% , #FFF 91%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 77% , #FFF 77%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 75% , #FFF 75%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 45% , #FFF 45%);\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 91% , var(--text-shell-background, #FFF) 91%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 77% , var(--text-shell-background, #FFF) 77%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 75% , var(--text-shell-background, #FFF) 75%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 45% , var(--text-shell-background, #FFF) 45%);\n  background-position: 0 0px,  0 calc((16px * (2 - 1)) + (3px * (2 - 2))),  0 calc((16px * (2 - 1)) + (3px * (2 - 1))),  0 calc((16px * (3 - 1)) + (3px * (3 - 2))),  0 calc((16px * (3 - 1)) + (3px * (3 - 1))),  0 calc((16px * (4 - 1)) + (3px * (4 - 2))),  0 calc((16px * (4 - 1)) + (3px * (4 - 1)));\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 1)));\n  background-size: 100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px;\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  animation-direction: alternate-reverse;\n  -webkit-animation-name: animateMultiLine;\n          animation-name: animateMultiLine;\n  min-height: calc((16px * 4) + (3px * (4 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 4) + (var(--text-shell-line-gutter, 3px) * (4 - 1)));\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-timing-function: ease-in-out;\n          animation-timing-function: ease-in-out;\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s;\n}\n\n@keyframes animateMultiLine {\n  0% {\n    background-size: 85% 16px,  100% 3px,  75% 16px,  100% 3px,  75% 16px,  100% 3px,  55% 16px;\n    background-size: 85% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  75% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  75% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  55% var(--text-shell-line-height, 16px);\n  }\n  100% {\n    background-size: 100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px;\n    background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  }\n}\n\n[animation=bouncing][lines=\"5\"][_nghost-%COMP%] {\n  background-image: linear-gradient(to right, #CCC 88% , #FFF 88%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 70% , #FFF 70%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 79% , #FFF 79%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 75% , #FFF 75%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 44% , #FFF 44%);\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 88% , var(--text-shell-background, #FFF) 88%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 70% , var(--text-shell-background, #FFF) 70%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 79% , var(--text-shell-background, #FFF) 79%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 75% , var(--text-shell-background, #FFF) 75%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 44% , var(--text-shell-background, #FFF) 44%);\n  background-position: 0 0px,  0 calc((16px * (2 - 1)) + (3px * (2 - 2))),  0 calc((16px * (2 - 1)) + (3px * (2 - 1))),  0 calc((16px * (3 - 1)) + (3px * (3 - 2))),  0 calc((16px * (3 - 1)) + (3px * (3 - 1))),  0 calc((16px * (4 - 1)) + (3px * (4 - 2))),  0 calc((16px * (4 - 1)) + (3px * (4 - 1))),  0 calc((16px * (5 - 1)) + (3px * (5 - 2))),  0 calc((16px * (5 - 1)) + (3px * (5 - 1)));\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 1)));\n  background-size: 100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px;\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  animation-direction: alternate-reverse;\n  -webkit-animation-name: animateMultiLine;\n          animation-name: animateMultiLine;\n  min-height: calc((16px * 5) + (3px * (5 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 5) + (var(--text-shell-line-gutter, 3px) * (5 - 1)));\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-timing-function: ease-in-out;\n          animation-timing-function: ease-in-out;\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s;\n}\n\n@keyframes animateMultiLine {\n  0% {\n    background-size: 85% 16px,  100% 3px,  75% 16px,  100% 3px,  75% 16px,  100% 3px,  75% 16px,  100% 3px,  55% 16px;\n    background-size: 85% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  75% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  75% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  75% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  55% var(--text-shell-line-height, 16px);\n  }\n  100% {\n    background-size: 100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px;\n    background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  }\n}\n\n[animation=bouncing][lines=\"6\"][_nghost-%COMP%] {\n  background-image: linear-gradient(to right, #CCC 93% , #FFF 93%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 62% , #FFF 62%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 72% , #FFF 72%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 76% , #FFF 76%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 75% , #FFF 75%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 34% , #FFF 34%);\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 93% , var(--text-shell-background, #FFF) 93%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 62% , var(--text-shell-background, #FFF) 62%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 72% , var(--text-shell-background, #FFF) 72%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 76% , var(--text-shell-background, #FFF) 76%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 75% , var(--text-shell-background, #FFF) 75%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 34% , var(--text-shell-background, #FFF) 34%);\n  background-position: 0 0px,  0 calc((16px * (2 - 1)) + (3px * (2 - 2))),  0 calc((16px * (2 - 1)) + (3px * (2 - 1))),  0 calc((16px * (3 - 1)) + (3px * (3 - 2))),  0 calc((16px * (3 - 1)) + (3px * (3 - 1))),  0 calc((16px * (4 - 1)) + (3px * (4 - 2))),  0 calc((16px * (4 - 1)) + (3px * (4 - 1))),  0 calc((16px * (5 - 1)) + (3px * (5 - 2))),  0 calc((16px * (5 - 1)) + (3px * (5 - 1))),  0 calc((16px * (6 - 1)) + (3px * (6 - 2))),  0 calc((16px * (6 - 1)) + (3px * (6 - 1)));\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (6 - 1)) + (var(--text-shell-line-gutter, 3px) * (6 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (6 - 1)) + (var(--text-shell-line-gutter, 3px) * (6 - 1)));\n  background-size: 100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px;\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  animation-direction: alternate-reverse;\n  -webkit-animation-name: animateMultiLine;\n          animation-name: animateMultiLine;\n  min-height: calc((16px * 6) + (3px * (6 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 6) + (var(--text-shell-line-gutter, 3px) * (6 - 1)));\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-timing-function: ease-in-out;\n          animation-timing-function: ease-in-out;\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s;\n}\n\n@keyframes animateMultiLine {\n  0% {\n    background-size: 85% 16px,  100% 3px,  75% 16px,  100% 3px,  75% 16px,  100% 3px,  75% 16px,  100% 3px,  75% 16px,  100% 3px,  55% 16px;\n    background-size: 85% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  75% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  75% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  75% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  75% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  55% var(--text-shell-line-height, 16px);\n  }\n  100% {\n    background-size: 100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px;\n    background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  }\n}\n\n[animation=bouncing].text-loaded[_nghost-%COMP%] {\n  background: none;\n  min-height: inherit;\n  color: inherit;\n  -webkit-animation: 0;\n          animation: 0;\n}\n\n[animation=gradient][_nghost-%COMP%] {\n  --text-shell-background: #FFF;\n  --text-shell-line-color: transparent !important;\n  --text-shell-animation-background: #EEE;\n  --text-shell-animation-color: #DDD;\n  min-height: calc((16px * 1) + (3px * (1 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 1) + (var(--text-shell-line-gutter, 3px) * (1 - 1)));\n}\n\n[animation=gradient][_nghost-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: linear-gradient(to right, var(--text-shell-animation-background) 8%, var(--text-shell-animation-color) 18%, var(--text-shell-animation-background) 33%);\n  background-size: 800px 104px;\n  -webkit-animation: animateBackground 2s ease-in-out infinite;\n          animation: animateBackground 2s ease-in-out infinite;\n}\n\n@-webkit-keyframes animateBackground {\n  0% {\n    background-position: -468px 0;\n  }\n  100% {\n    background-position: 468px 0;\n  }\n}\n\n@keyframes animateBackground {\n  0% {\n    background-position: -468px 0;\n  }\n  100% {\n    background-position: 468px 0;\n  }\n}\n\n[animation=gradient][_nghost-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background-image: linear-gradient(to right, #CCC 90% , #FFF 90%);\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 90% , var(--text-shell-background, #FFF) 90%);\n  background-position: 0 0px;\n  background-size: 100% 16px;\n  background-size: 100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((16px * 1) + (3px * (1 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 1) + (var(--text-shell-line-gutter, 3px) * (1 - 1)));\n}\n\n[animation=gradient][lines=\"1\"][_nghost-%COMP%] {\n  min-height: calc((16px * 1) + (3px * (1 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 1) + (var(--text-shell-line-gutter, 3px) * (1 - 1)));\n}\n\n[animation=gradient][lines=\"1\"][_nghost-%COMP%]::after {\n  background-image: linear-gradient(to right, #CCC 85% , #FFF 85%);\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 85% , var(--text-shell-background, #FFF) 85%);\n  background-position: 0 0px;\n  background-size: 100% 16px;\n  background-size: 100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((16px * 1) + (3px * (1 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 1) + (var(--text-shell-line-gutter, 3px) * (1 - 1)));\n}\n\n[animation=gradient][lines=\"2\"][_nghost-%COMP%] {\n  min-height: calc((16px * 2) + (3px * (2 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 2) + (var(--text-shell-line-gutter, 3px) * (2 - 1)));\n}\n\n[animation=gradient][lines=\"2\"][_nghost-%COMP%]::after {\n  background-image: linear-gradient(to right, #CCC 93% , #FFF 93%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 47% , #FFF 47%);\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 93% , var(--text-shell-background, #FFF) 93%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 47% , var(--text-shell-background, #FFF) 47%);\n  background-position: 0 0px,  0 calc((16px * (2 - 1)) + (3px * (2 - 2))),  0 calc((16px * (2 - 1)) + (3px * (2 - 1)));\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1)));\n  background-size: 100% 16px,  100% 3px,  100% 16px;\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((16px * 2) + (3px * (2 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 2) + (var(--text-shell-line-gutter, 3px) * (2 - 1)));\n}\n\n[animation=gradient][lines=\"3\"][_nghost-%COMP%] {\n  min-height: calc((16px * 3) + (3px * (3 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 3) + (var(--text-shell-line-gutter, 3px) * (3 - 1)));\n}\n\n[animation=gradient][lines=\"3\"][_nghost-%COMP%]::after {\n  background-image: linear-gradient(to right, #CCC 87% , #FFF 87%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 76% , #FFF 76%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 41% , #FFF 41%);\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 87% , var(--text-shell-background, #FFF) 87%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 76% , var(--text-shell-background, #FFF) 76%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 41% , var(--text-shell-background, #FFF) 41%);\n  background-position: 0 0px,  0 calc((16px * (2 - 1)) + (3px * (2 - 2))),  0 calc((16px * (2 - 1)) + (3px * (2 - 1))),  0 calc((16px * (3 - 1)) + (3px * (3 - 2))),  0 calc((16px * (3 - 1)) + (3px * (3 - 1)));\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1)));\n  background-size: 100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px;\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((16px * 3) + (3px * (3 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 3) + (var(--text-shell-line-gutter, 3px) * (3 - 1)));\n}\n\n[animation=gradient][lines=\"4\"][_nghost-%COMP%] {\n  min-height: calc((16px * 4) + (3px * (4 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 4) + (var(--text-shell-line-gutter, 3px) * (4 - 1)));\n}\n\n[animation=gradient][lines=\"4\"][_nghost-%COMP%]::after {\n  background-image: linear-gradient(to right, #CCC 91% , #FFF 91%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 79% , #FFF 79%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 67% , #FFF 67%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 40% , #FFF 40%);\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 91% , var(--text-shell-background, #FFF) 91%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 79% , var(--text-shell-background, #FFF) 79%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 67% , var(--text-shell-background, #FFF) 67%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 40% , var(--text-shell-background, #FFF) 40%);\n  background-position: 0 0px,  0 calc((16px * (2 - 1)) + (3px * (2 - 2))),  0 calc((16px * (2 - 1)) + (3px * (2 - 1))),  0 calc((16px * (3 - 1)) + (3px * (3 - 2))),  0 calc((16px * (3 - 1)) + (3px * (3 - 1))),  0 calc((16px * (4 - 1)) + (3px * (4 - 2))),  0 calc((16px * (4 - 1)) + (3px * (4 - 1)));\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 1)));\n  background-size: 100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px;\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((16px * 4) + (3px * (4 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 4) + (var(--text-shell-line-gutter, 3px) * (4 - 1)));\n}\n\n[animation=gradient][lines=\"5\"][_nghost-%COMP%] {\n  min-height: calc((16px * 5) + (3px * (5 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 5) + (var(--text-shell-line-gutter, 3px) * (5 - 1)));\n}\n\n[animation=gradient][lines=\"5\"][_nghost-%COMP%]::after {\n  background-image: linear-gradient(to right, #CCC 88% , #FFF 88%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 62% , #FFF 62%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 71% , #FFF 71%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 71% , #FFF 71%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 45% , #FFF 45%);\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 88% , var(--text-shell-background, #FFF) 88%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 62% , var(--text-shell-background, #FFF) 62%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 71% , var(--text-shell-background, #FFF) 71%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 71% , var(--text-shell-background, #FFF) 71%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 45% , var(--text-shell-background, #FFF) 45%);\n  background-position: 0 0px,  0 calc((16px * (2 - 1)) + (3px * (2 - 2))),  0 calc((16px * (2 - 1)) + (3px * (2 - 1))),  0 calc((16px * (3 - 1)) + (3px * (3 - 2))),  0 calc((16px * (3 - 1)) + (3px * (3 - 1))),  0 calc((16px * (4 - 1)) + (3px * (4 - 2))),  0 calc((16px * (4 - 1)) + (3px * (4 - 1))),  0 calc((16px * (5 - 1)) + (3px * (5 - 2))),  0 calc((16px * (5 - 1)) + (3px * (5 - 1)));\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 1)));\n  background-size: 100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px;\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((16px * 5) + (3px * (5 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 5) + (var(--text-shell-line-gutter, 3px) * (5 - 1)));\n}\n\n[animation=gradient][lines=\"6\"][_nghost-%COMP%] {\n  min-height: calc((16px * 6) + (3px * (6 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 6) + (var(--text-shell-line-gutter, 3px) * (6 - 1)));\n}\n\n[animation=gradient][lines=\"6\"][_nghost-%COMP%]::after {\n  background-image: linear-gradient(to right, #CCC 95% , #FFF 95%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 65% , #FFF 65%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 78% , #FFF 78%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 77% , #FFF 77%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 78% , #FFF 78%),  linear-gradient(to right, #FFF 100%, #FFF 100%),  linear-gradient(to right, #CCC 36% , #FFF 36%);\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 95% , var(--text-shell-background, #FFF) 95%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 65% , var(--text-shell-background, #FFF) 65%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 78% , var(--text-shell-background, #FFF) 78%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 77% , var(--text-shell-background, #FFF) 77%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 78% , var(--text-shell-background, #FFF) 78%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 36% , var(--text-shell-background, #FFF) 36%);\n  background-position: 0 0px,  0 calc((16px * (2 - 1)) + (3px * (2 - 2))),  0 calc((16px * (2 - 1)) + (3px * (2 - 1))),  0 calc((16px * (3 - 1)) + (3px * (3 - 2))),  0 calc((16px * (3 - 1)) + (3px * (3 - 1))),  0 calc((16px * (4 - 1)) + (3px * (4 - 2))),  0 calc((16px * (4 - 1)) + (3px * (4 - 1))),  0 calc((16px * (5 - 1)) + (3px * (5 - 2))),  0 calc((16px * (5 - 1)) + (3px * (5 - 1))),  0 calc((16px * (6 - 1)) + (3px * (6 - 2))),  0 calc((16px * (6 - 1)) + (3px * (6 - 1)));\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (6 - 1)) + (var(--text-shell-line-gutter, 3px) * (6 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (6 - 1)) + (var(--text-shell-line-gutter, 3px) * (6 - 1)));\n  background-size: 100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px,  100% 3px,  100% 16px;\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((16px * 6) + (3px * (6 - 1)));\n  min-height: calc((var(--text-shell-line-height, 16px) * 6) + (var(--text-shell-line-gutter, 3px) * (6 - 1)));\n}\n\n[animation=gradient].text-loaded[_nghost-%COMP%] {\n  background: none;\n  min-height: inherit;\n  color: inherit;\n}\n\n[animation=gradient].text-loaded[_nghost-%COMP%]::before, [animation=gradient].text-loaded[_nghost-%COMP%]::after {\n  background: none;\n  -webkit-animation: 0;\n          animation: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRleHQtc2hlbGwuY29tcG9uZW50LnNjc3MiLCJtaXhpbnMvbWFza2VkLWxpbmVzLWJhY2tncm91bmQuc2NzcyIsIm1peGlucy9iYWNrZ3JvdW5kLWhlaWdodC5zY3NzIiwibWl4aW5zL2JvdW5jaW5nLWxpbmVzLWJhY2tncm91bmQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQTtFQUNDLG9DQUFBO0VBQ0EsNkJBQUE7RUFDQSw4QkFBQTtFQUNBLDZCQUFBO0VBRUEsY0FBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSw4Q0FBQTtFQUNBLDRCQUFBO0VBR0EsNEJBQUE7QUFSRDs7QUFZQTtFQ1BJLGdFQUFBO0VBQUEsNEhBQUE7RUFDQSwwQkFBQTtFQUNBLDBCQUFBO0VBQUEseURBQUE7RUFDQSw0QkFBQTtFQ2ZGLDhDQUFBO0VBQUEsNEdBQUE7QUZlRjs7QUFVRTtFQ2JFLGdFQUFBO0VBQUEsNEhBQUE7RUFDQSwwQkFBQTtFQUNBLDBCQUFBO0VBQUEseURBQUE7RUFDQSw0QkFBQTtFQ2ZGLDhDQUFBO0VBQUEsNEdBQUE7QUZzQkY7O0FBR0U7RUNnQkUsbUtBQUE7RUFBQSx1VkFBQTtFQUNBLG9IQUFBO0VBQUEsZ1BBQUE7RUFDQSxpREFBQTtFQUFBLDhJQUFBO0VBQ0EsNEJBQUE7RUM1Q0YsOENBQUE7RUFBQSw0R0FBQTtBRjZCRjs7QUFKRTtFQ2dCRSxzUUFBQTtFQUFBLGtqQkFBQTtFQUNBLDhNQUFBO0VBQUEsc2NBQUE7RUFDQSx3RUFBQTtFQUFBLG1PQUFBO0VBQ0EsNEJBQUE7RUM1Q0YsOENBQUE7RUFBQSw0R0FBQTtBRm9DRjs7QUFYRTtFQ2dCRSx5V0FBQTtFQUFBLDZ3QkFBQTtFQUNBLHdTQUFBO0VBQUEsNHBCQUFBO0VBQ0EsK0ZBQUE7RUFBQSx3VEFBQTtFQUNBLDRCQUFBO0VDNUNGLDhDQUFBO0VBQUEsNEdBQUE7QUYyQ0Y7O0FBbEJFO0VDZ0JFLDRjQUFBO0VBQUEsdytCQUFBO0VBQ0Esa1lBQUE7RUFBQSxrM0JBQUE7RUFDQSxzSEFBQTtFQUFBLDZZQUFBO0VBQ0EsNEJBQUE7RUM1Q0YsOENBQUE7RUFBQSw0R0FBQTtBRmtERjs7QUF6QkU7RUNnQkUsK2lCQUFBO0VBQUEsbXNDQUFBO0VBQ0EsNGRBQUE7RUFBQSx3a0NBQUE7RUFDQSw2SUFBQTtFQUFBLGtlQUFBO0VBQ0EsNEJBQUE7RUM1Q0YsOENBQUE7RUFBQSw0R0FBQTtBRnlERjs7QUEzQkM7RUFDQyxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtBQTZCRjs7QUF4QkE7RUd6QkksZ0VBQUE7RUFBQSw0SEFBQTtFQUNBLDBCQUFBO0VBQ0EsMEJBQUE7RUFBQSx5REFBQTtFQUNBLDRCQUFBO0VBRUEsc0NBQUE7VUFBQSw4QkFBQTtFQUNBLG1DQUFBO1VBQUEsMkJBQUE7RURuQkYsOENBQUE7RUFBQSw0R0FBQTtFQ21GQSxxQ0FBQTtVQUFBLDZCQUFBO0VBQ0EsMkNBQUE7VUFBQSxtQ0FBQTtFQUNBLDhDQUFBO1VBQUEsc0NBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0FIVkY7O0FHdkRJO0VBQ0U7SUFDRSx5QkFBQTtJQUFBLHdEQUFBO0VIeUROO0VHdERJO0lBQ0UsMEJBQUE7SUFBQSx5REFBQTtFSHdETjtBQUNGOztBRy9ESTtFQUNFO0lBQ0UseUJBQUE7SUFBQSx3REFBQTtFSHlETjtFR3RESTtJQUNFLDBCQUFBO0lBQUEseURBQUE7RUh3RE47QUFDRjs7QUF4Q0U7RUcvQkUsZ0VBQUE7RUFBQSw0SEFBQTtFQUNBLDBCQUFBO0VBQ0EsMEJBQUE7RUFBQSx5REFBQTtFQUNBLDRCQUFBO0VBRUEsc0NBQUE7VUFBQSw4QkFBQTtFQUNBLG1DQUFBO1VBQUEsMkJBQUE7RURuQkYsOENBQUE7RUFBQSw0R0FBQTtFQ21GQSxxQ0FBQTtVQUFBLDZCQUFBO0VBQ0EsMkNBQUE7VUFBQSxtQ0FBQTtFQUNBLDhDQUFBO1VBQUEsc0NBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0FIV0Y7O0FHNUVJO0VBQ0U7SUFDRSx5QkFBQTtJQUFBLHdEQUFBO0VIOEVOO0VHM0VJO0lBQ0UsMEJBQUE7SUFBQSx5REFBQTtFSDZFTjtBQUNGOztBQTdERTtFR2tCRSxtS0FBQTtFQUFBLHVWQUFBO0VBQ0Esb0hBQUE7RUFBQSxnUEFBQTtFQUNBLGlEQUFBO0VBQUEsOElBQUE7RUFDQSw0QkFBQTtFQUVBLHNDQUFBO0VBQ0Esd0NBQUE7VUFBQSxnQ0FBQTtFRHBFRiw4Q0FBQTtFQUFBLDRHQUFBO0VDbUZBLHFDQUFBO1VBQUEsNkJBQUE7RUFDQSwyQ0FBQTtVQUFBLG1DQUFBO0VBQ0EsOENBQUE7VUFBQSxzQ0FBQTtFQUNBLDhCQUFBO1VBQUEsc0JBQUE7QUhnQ0Y7O0FHaERJO0VBQ0U7SUFDRSwrQ0FBQTtJQUFBLDRJQUFBO0VIa0ROO0VHL0NJO0lBQ0UsaURBQUE7SUFBQSw4SUFBQTtFSGlETjtBQUNGOztBR3hESTtFQUNFO0lBQ0UsK0NBQUE7SUFBQSw0SUFBQTtFSGtETjtFRy9DSTtJQUNFLGlEQUFBO0lBQUEsOElBQUE7RUhpRE47QUFDRjs7QUFsRkU7RUdrQkUsc1FBQUE7RUFBQSxrakJBQUE7RUFDQSw4TUFBQTtFQUFBLHNjQUFBO0VBQ0Esd0VBQUE7RUFBQSxtT0FBQTtFQUNBLDRCQUFBO0VBRUEsc0NBQUE7RUFDQSx3Q0FBQTtVQUFBLGdDQUFBO0VEcEVGLDhDQUFBO0VBQUEsNEdBQUE7RUNtRkEscUNBQUE7VUFBQSw2QkFBQTtFQUNBLDJDQUFBO1VBQUEsbUNBQUE7RUFDQSw4Q0FBQTtVQUFBLHNDQUFBO0VBQ0EsOEJBQUE7VUFBQSxzQkFBQTtBSHFERjs7QUdyRUk7RUFDRTtJQUNFLHFFQUFBO0lBQUEsZ09BQUE7RUh1RU47RUdwRUk7SUFDRSx3RUFBQTtJQUFBLG1PQUFBO0VIc0VOO0FBQ0Y7O0FBdkdFO0VHa0JFLHlXQUFBO0VBQUEsNndCQUFBO0VBQ0Esd1NBQUE7RUFBQSw0cEJBQUE7RUFDQSwrRkFBQTtFQUFBLHdUQUFBO0VBQ0EsNEJBQUE7RUFFQSxzQ0FBQTtFQUNBLHdDQUFBO1VBQUEsZ0NBQUE7RURwRUYsOENBQUE7RUFBQSw0R0FBQTtFQ21GQSxxQ0FBQTtVQUFBLDZCQUFBO0VBQ0EsMkNBQUE7VUFBQSxtQ0FBQTtFQUNBLDhDQUFBO1VBQUEsc0NBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0FIMEVGOztBRzFGSTtFQUNFO0lBQ0UsMkZBQUE7SUFBQSxvVEFBQTtFSDRGTjtFR3pGSTtJQUNFLCtGQUFBO0lBQUEsd1RBQUE7RUgyRk47QUFDRjs7QUE1SEU7RUdrQkUsNGNBQUE7RUFBQSx3K0JBQUE7RUFDQSxrWUFBQTtFQUFBLGszQkFBQTtFQUNBLHNIQUFBO0VBQUEsNllBQUE7RUFDQSw0QkFBQTtFQUVBLHNDQUFBO0VBQ0Esd0NBQUE7VUFBQSxnQ0FBQTtFRHBFRiw4Q0FBQTtFQUFBLDRHQUFBO0VDbUZBLHFDQUFBO1VBQUEsNkJBQUE7RUFDQSwyQ0FBQTtVQUFBLG1DQUFBO0VBQ0EsOENBQUE7VUFBQSxzQ0FBQTtFQUNBLDhCQUFBO1VBQUEsc0JBQUE7QUgrRkY7O0FHL0dJO0VBQ0U7SUFDRSxpSEFBQTtJQUFBLHdZQUFBO0VIaUhOO0VHOUdJO0lBQ0Usc0hBQUE7SUFBQSw2WUFBQTtFSGdITjtBQUNGOztBQWpKRTtFR2tCRSwraUJBQUE7RUFBQSxtc0NBQUE7RUFDQSw0ZEFBQTtFQUFBLHdrQ0FBQTtFQUNBLDZJQUFBO0VBQUEsa2VBQUE7RUFDQSw0QkFBQTtFQUVBLHNDQUFBO0VBQ0Esd0NBQUE7VUFBQSxnQ0FBQTtFRHBFRiw4Q0FBQTtFQUFBLDRHQUFBO0VDbUZBLHFDQUFBO1VBQUEsNkJBQUE7RUFDQSwyQ0FBQTtVQUFBLG1DQUFBO0VBQ0EsOENBQUE7VUFBQSxzQ0FBQTtFQUNBLDhCQUFBO1VBQUEsc0JBQUE7QUhvSEY7O0FHcElJO0VBQ0U7SUFDRSx1SUFBQTtJQUFBLDRkQUFBO0VIc0lOO0VHbklJO0lBQ0UsNklBQUE7SUFBQSxrZUFBQTtFSHFJTjtBQUNGOztBQWpLQztFQUNDLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0VBRUEsb0JBQUE7VUFBQSxZQUFBO0FBa0tGOztBQTdKQTtFQUNDLDZCQUFBO0VBQ0EsK0NBQUE7RUFDQSx1Q0FBQTtFQUNBLGtDQUFBO0VFL0RDLDhDQUFBO0VBQUEsNEdBQUE7QUZnT0Y7O0FBMUpDO0VBQ0MsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtFQUNBLG1LQUNFO0VBQ0YsNEJBQUE7RUFDQSw0REFBQTtVQUFBLG9EQUFBO0FBMkpGOztBQXhKQztFQUNDO0lBQ0MsNkJBQUE7RUEwSkQ7RUF2SkE7SUFDQyw0QkFBQTtFQXlKRDtBQUNGOztBQWhLQztFQUNDO0lBQ0MsNkJBQUE7RUEwSkQ7RUF2SkE7SUFDQyw0QkFBQTtFQXlKRDtBQUNGOztBQXJKQztFQUNDLFdBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUN4RkUsZ0VBQUE7RUFBQSw0SEFBQTtFQUNBLDBCQUFBO0VBQ0EsMEJBQUE7RUFBQSx5REFBQTtFQUNBLDRCQUFBO0VDZkYsOENBQUE7RUFBQSw0R0FBQTtBRmdRRjs7QUFwSkU7RUU1R0EsOENBQUE7RUFBQSw0R0FBQTtBRm1RRjs7QUFuSkc7RUNwR0MsZ0VBQUE7RUFBQSw0SEFBQTtFQUNBLDBCQUFBO0VBQ0EsMEJBQUE7RUFBQSx5REFBQTtFQUNBLDRCQUFBO0VDZkYsOENBQUE7RUFBQSw0R0FBQTtBRjBRRjs7QUE5SkU7RUU1R0EsOENBQUE7RUFBQSw0R0FBQTtBRjZRRjs7QUE3Skc7RUN2RUMsbUtBQUE7RUFBQSx1VkFBQTtFQUNBLG9IQUFBO0VBQUEsZ1BBQUE7RUFDQSxpREFBQTtFQUFBLDhJQUFBO0VBQ0EsNEJBQUE7RUM1Q0YsOENBQUE7RUFBQSw0R0FBQTtBRm9SRjs7QUF4S0U7RUU1R0EsOENBQUE7RUFBQSw0R0FBQTtBRnVSRjs7QUF2S0c7RUN2RUMsc1FBQUE7RUFBQSxrakJBQUE7RUFDQSw4TUFBQTtFQUFBLHNjQUFBO0VBQ0Esd0VBQUE7RUFBQSxtT0FBQTtFQUNBLDRCQUFBO0VDNUNGLDhDQUFBO0VBQUEsNEdBQUE7QUY4UkY7O0FBbExFO0VFNUdBLDhDQUFBO0VBQUEsNEdBQUE7QUZpU0Y7O0FBakxHO0VDdkVDLHlXQUFBO0VBQUEsNndCQUFBO0VBQ0Esd1NBQUE7RUFBQSw0cEJBQUE7RUFDQSwrRkFBQTtFQUFBLHdUQUFBO0VBQ0EsNEJBQUE7RUM1Q0YsOENBQUE7RUFBQSw0R0FBQTtBRndTRjs7QUE1TEU7RUU1R0EsOENBQUE7RUFBQSw0R0FBQTtBRjJTRjs7QUEzTEc7RUN2RUMsNGNBQUE7RUFBQSx3K0JBQUE7RUFDQSxrWUFBQTtFQUFBLGszQkFBQTtFQUNBLHNIQUFBO0VBQUEsNllBQUE7RUFDQSw0QkFBQTtFQzVDRiw4Q0FBQTtFQUFBLDRHQUFBO0FGa1RGOztBQXRNRTtFRTVHQSw4Q0FBQTtFQUFBLDRHQUFBO0FGcVRGOztBQXJNRztFQ3ZFQywraUJBQUE7RUFBQSxtc0NBQUE7RUFDQSw0ZEFBQTtFQUFBLHdrQ0FBQTtFQUNBLDZJQUFBO0VBQUEsa2VBQUE7RUFDQSw0QkFBQTtFQzVDRiw4Q0FBQTtFQUFBLDRHQUFBO0FGNFRGOztBQXRNQztFQUNDLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0FBd01GOztBQXRNRTtFQUVDLGdCQUFBO0VBQ0Esb0JBQUE7VUFBQSxZQUFBO0FBdU1IIiwiZmlsZSI6InRleHQtc2hlbGwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwibWl4aW5zL2JhY2tncm91bmQtaGVpZ2h0XCI7XG5AaW1wb3J0IFwibWl4aW5zL21hc2tlZC1saW5lcy1iYWNrZ3JvdW5kXCI7XG5AaW1wb3J0IFwibWl4aW5zL2JvdW5jaW5nLWxpbmVzLWJhY2tncm91bmRcIjtcblxuJG1heC1saW5lcy1jb3VudDogNjtcblxuOmhvc3Qge1xuXHQtLXRleHQtc2hlbGwtYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG5cdC0tdGV4dC1zaGVsbC1saW5lLWNvbG9yOiAjRUVFO1xuXHQtLXRleHQtc2hlbGwtbGluZS1oZWlnaHQ6IDE2cHg7XG5cdC0tdGV4dC1zaGVsbC1saW5lLWd1dHRlcjogM3B4O1xuXG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdGNvbG9yOiB0cmFuc3BhcmVudDtcblx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdGV4dC1zaGVsbC1iYWNrZ3JvdW5kKTtcblx0dHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcblx0Ly8gVG8gZml4IDFweCBsaW5lIG1pc2FsaWdubWVudCBpbiBjaHJvbWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0NTUy9iYWNrZ3JvdW5kLWNsaXBcblx0Ly8gKEkgYWxzbyBub3RpY2VkIHRoYXQgaWYgSSBzZXQgdGhlIGNvbG9yIHRvIGEgc29saWQgY29sb3IgaW5zdGVhZCBvZiBoYXZpbmcgb3BhY2l0eSwgdGhlIGlzc3VlIGRvZXNuJ3QgaGFwcGVuKVxuXHRiYWNrZ3JvdW5kLWNsaXA6IGNvbnRlbnQtYm94O1xufVxuXG4vLyBEZWZhdWx0IHN0eWxlcy4gV2hlbiBubyBhbmltYXRpb24gYXR0cmlidXRlIGlzIHByb3ZpZGVkXG46aG9zdCg6bm90KFthbmltYXRpb25dKSkge1xuXHQvLyBEZWZhdWx0IG9uZSBsaW5lIHRleHQtc2hlbGxcblx0QGluY2x1ZGUgbWFza2VkLWxpbmVzLWJhY2tncm91bmQoMSk7XG5cblx0Ly8gU3VwcG9ydCBmb3IgW2xpbmVzXSBhdHRyaWJ1dGVcblx0QGZvciAkaSBmcm9tIDEgdGhyb3VnaCAkbWF4LWxpbmVzLWNvdW50IHtcblx0XHQmW2xpbmVzPVwiI3sgJGkgfVwiXSB7XG5cdFx0XHRAaW5jbHVkZSBtYXNrZWQtbGluZXMtYmFja2dyb3VuZCgkaSk7XG5cdFx0fVxuXHR9XG5cblx0Ji50ZXh0LWxvYWRlZCB7XG5cdFx0YmFja2dyb3VuZDogbm9uZTtcblx0XHRtaW4taGVpZ2h0OiBpbmhlcml0O1xuXHRcdGNvbG9yOiBpbmhlcml0O1xuXHR9XG59XG5cbi8vIEJvdW5jaW5nIGxpbmUgbG9hZGluZyBhbmltYXRpb25cbjpob3N0KFthbmltYXRpb249XCJib3VuY2luZ1wiXSkge1xuXHQvLyBEZWZhdWx0IG9uZSBsaW5lIHRleHQtc2hlbGxcblx0QGluY2x1ZGUgYm91bmNpbmctbGluZXMtYmFja2dyb3VuZCgxKTtcblxuXHQvLyBTdXBwb3J0IGZvciBbbGluZXNdIGF0dHJpYnV0ZVxuXHRAZm9yICRpIGZyb20gMSB0aHJvdWdoICRtYXgtbGluZXMtY291bnQge1xuXHRcdCZbbGluZXM9XCIjeyAkaSB9XCJdIHtcblx0XHRcdEBpbmNsdWRlIGJvdW5jaW5nLWxpbmVzLWJhY2tncm91bmQoJGkpO1xuXHRcdH1cblx0fVxuXG5cdCYudGV4dC1sb2FkZWQge1xuXHRcdGJhY2tncm91bmQ6IG5vbmU7XG5cdFx0bWluLWhlaWdodDogaW5oZXJpdDtcblx0XHRjb2xvcjogaW5oZXJpdDtcblx0XHQvLyAwIGlzIHRoZSBkZWZhdWx0IHZhbHVlIChzZWU6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNTk2MzA0NC8xMTE2OTU5KVxuXHRcdGFuaW1hdGlvbjogMDtcblx0fVxufVxuXG4vLyBCYWNrZ3JvdW5kIGdyYWRpZW50IGJlbmVhdGggbWFza2VkIGxpbmVzXG46aG9zdChbYW5pbWF0aW9uPVwiZ3JhZGllbnRcIl0pIHtcblx0LS10ZXh0LXNoZWxsLWJhY2tncm91bmQ6ICNGRkY7XG5cdC0tdGV4dC1zaGVsbC1saW5lLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuXHQtLXRleHQtc2hlbGwtYW5pbWF0aW9uLWJhY2tncm91bmQ6ICNFRUU7XG5cdC0tdGV4dC1zaGVsbC1hbmltYXRpb24tY29sb3I6ICNEREQ7XG5cblxuXHQvLyBDYWxjdWxhdGUgZGVmYXVsdCBoZWlnaHQgZm9yIDEgbGluZVxuXHRAaW5jbHVkZSBiYWNrZ3JvdW5kLWhlaWdodChtaW4taGVpZ2h0LCAxKTtcblxuXHQvLyBUaGUgYW5pbWF0aW9uIHRoYXQgZ29lcyBiZW5lYXRoIHRoZSBtYXNrc1xuXHQmOjpiZWZvcmUge1xuXHRcdGNvbnRlbnQ6IFwiXCI7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdHRvcDogMDtcblx0XHRsZWZ0OiAwO1xuXHRcdGJvdHRvbTogMDtcblx0XHRyaWdodDogMDtcblx0XHRiYWNrZ3JvdW5kOlxuXHRcdFx0XHRsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHZhcigtLXRleHQtc2hlbGwtYW5pbWF0aW9uLWJhY2tncm91bmQpIDglLCB2YXIoLS10ZXh0LXNoZWxsLWFuaW1hdGlvbi1jb2xvcikgMTglLCB2YXIoLS10ZXh0LXNoZWxsLWFuaW1hdGlvbi1iYWNrZ3JvdW5kKSAzMyUpO1xuXHRcdGJhY2tncm91bmQtc2l6ZTogODAwcHggMTA0cHg7XG5cdFx0YW5pbWF0aW9uOiBhbmltYXRlQmFja2dyb3VuZCAycyBlYXNlLWluLW91dCBpbmZpbml0ZTtcblx0fVxuXG5cdEBrZXlmcmFtZXMgYW5pbWF0ZUJhY2tncm91bmQge1xuXHRcdDAle1xuXHRcdFx0YmFja2dyb3VuZC1wb3NpdGlvbjogLTQ2OHB4IDBcblx0XHR9XG5cblx0XHQxMDAle1xuXHRcdFx0YmFja2dyb3VuZC1wb3NpdGlvbjogNDY4cHggMFxuXHRcdH1cblx0fVxuXG5cdC8vIFRoZSBtYXNrc1xuXHQmOjphZnRlciB7XG5cdFx0Y29udGVudDogXCJcIjtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0dG9wOiAwO1xuXHRcdGxlZnQ6IDA7XG5cdFx0Ym90dG9tOiAwO1xuXHRcdHJpZ2h0OiAwO1xuXG5cdFx0Ly8gRGVmYXVsdCBvbmUgbGluZSB0ZXh0LXNoZWxsXG5cdFx0QGluY2x1ZGUgbWFza2VkLWxpbmVzLWJhY2tncm91bmQoMSk7XG5cdH1cblxuXHQvLyBTdXBwb3J0IGZvciBbbGluZXNdIGF0dHJpYnV0ZVxuXHRAZm9yICRpIGZyb20gMSB0aHJvdWdoICRtYXgtbGluZXMtY291bnQge1xuXHRcdCZbbGluZXM9XCIjeyAkaSB9XCJdIHtcblx0XHRcdC8vIENhbGN1bGF0ZSBkZWZhdWx0IGhlaWdodCBmb3IgJGkgbGluZXNcblx0XHRcdEBpbmNsdWRlIGJhY2tncm91bmQtaGVpZ2h0KG1pbi1oZWlnaHQsICRpKTtcblxuXHRcdFx0Jjo6YWZ0ZXIge1xuXHRcdFx0XHRAaW5jbHVkZSBtYXNrZWQtbGluZXMtYmFja2dyb3VuZCgkaSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ji50ZXh0LWxvYWRlZCB7XG5cdFx0YmFja2dyb3VuZDogbm9uZTtcblx0XHRtaW4taGVpZ2h0OiBpbmhlcml0O1xuXHRcdGNvbG9yOiBpbmhlcml0O1xuXG5cdFx0Jjo6YmVmb3JlLFxuXHRcdCY6OmFmdGVyIHtcblx0XHRcdGJhY2tncm91bmQ6IG5vbmU7XG5cdFx0XHRhbmltYXRpb246IDA7XG5cdFx0fVxuXHR9XG59XG4iLCJAaW1wb3J0IFwidXRpbHNcIjtcbkBpbXBvcnQgXCJiYWNrZ3JvdW5kLWhlaWdodFwiO1xuXG5AbWl4aW4gbWFza2VkLWxpbmVzLWJhY2tncm91bmQoJGxpbmVzOiAxKSB7XG4gICRsaW5lLWhlaWdodDogdmFyKC0tdGV4dC1zaGVsbC1saW5lLWhlaWdodCwgMTZweCk7XG4gICRsaW5lLXNwYWNpbmc6IHZhcigtLXRleHQtc2hlbGwtbGluZS1ndXR0ZXIsIDNweCk7XG4gICRiZy1jb2xvcjogdmFyKC0tdGV4dC1zaGVsbC1saW5lLWNvbG9yLCAjQ0NDKTtcbiAgJG1hc2stY29sb3I6IHZhcigtLXRleHQtc2hlbGwtYmFja2dyb3VuZCwgI0ZGRik7XG4gICRsaW5lLWJnLWNvbG9yOiB2YXIoLS10ZXh0LXNoZWxsLWJhY2tncm91bmQsICNGRkYpO1xuICAkYmcteS1wb3M6IDBweDtcbiAgJHJhbmQtd2lkdGg6ICN7cmFuZG9tTnVtKDg1LCA5NSl9O1xuICAkYmctaW1hZ2U6ICdsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICcgKyAkYmctY29sb3IgKyAnICcgKyAkcmFuZC13aWR0aCArICclICwgJyArICRtYXNrLWNvbG9yICsgJyAnICsgJHJhbmQtd2lkdGggKyAnJSknO1xuICAkYmctcG9zaXRpb246ICcwICcgKyAkYmcteS1wb3M7XG4gICRiZy1zaXplOiAnMTAwJSAnICsgJGxpbmUtaGVpZ2h0O1xuXG4gIEBpZiAoJGxpbmVzID09IDEpIHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAjeyRiZy1pbWFnZX07XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogI3skYmctcG9zaXRpb259O1xuICAgIGJhY2tncm91bmQtc2l6ZTogI3skYmctc2l6ZX07XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgfSBAZWxzZSB7XG4gICAgQGZvciAkaSBmcm9tIDIgdGhyb3VnaCAkbGluZXMge1xuICAgICAgLy8gQWRkIHNlcGFyYXRvciBiZXR3ZWVuIGxpbmVzXG4gICAgICAkYmctaW1hZ2U6IGFwcGVuZCgkYmctaW1hZ2UsIGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgI3skbGluZS1iZy1jb2xvcn0gMTAwJSwgI3skbGluZS1iZy1jb2xvcn0gMTAwJSkpO1xuICAgICAgLy8gVGhpcyBsaW5lYXItZ3JhZGllbnQgYXMgc2VwYXJhdG9yIHN0YXJ0cyBiZWxvdyB0aGUgbGFzdCBsaW5lLFxuICAgICAgLy8gc28gd2UgaGF2ZSB0byBhZGQgJGxpbmUtaGVpZ2h0IHRvIG91ciB5LXBvcyBwb2ludGVyXG4gICAgICAkYmcteS1wb3M6IGNhbGMoKCN7JGxpbmUtaGVpZ2h0fSAqICgjeyRpfSAtIDEpKSArICgjeyRsaW5lLXNwYWNpbmd9ICogKCN7JGl9IC0gMikpKTtcbiAgICAgICRiZy1wb3NpdGlvbjogYXBwZW5kKCRiZy1wb3NpdGlvbiwgJzAgJyArICRiZy15LXBvcyk7XG4gICAgICAkYmctc2l6ZTogYXBwZW5kKCRiZy1zaXplLCAnMTAwJSAnICsgJGxpbmUtc3BhY2luZyk7XG5cbiAgICAgIC8vIEFkZCBuZXcgbGluZVxuICAgICAgLy8gVGhlIGxhc3QgbGluZSBzaG91bGQgYmUgbmFycm93IHRoYW4gdGhlIG90aGVyc1xuICAgICAgQGlmICgkaSA9PSAkbGluZXMpIHtcbiAgICAgICAgJHJhbmQtd2lkdGg6ICN7cmFuZG9tTnVtKDMwLCA1MCl9O1xuICAgICAgfSBAZWxzZSB7XG4gICAgICAgICRyYW5kLXdpZHRoOiAje3JhbmRvbU51bSg2MCwgODApfTtcbiAgICAgIH1cbiAgICAgICRiZy1pbWFnZTogYXBwZW5kKCRiZy1pbWFnZSwgJ2xpbmVhci1ncmFkaWVudCh0byByaWdodCwgJyArICRiZy1jb2xvciArICcgJyArICRyYW5kLXdpZHRoICsgJyUgLCAnICsgJG1hc2stY29sb3IgKyAnICcgKyAkcmFuZC13aWR0aCArICclKScpO1xuICAgICAgLy8gVGhpcyBuZXcgbGluZSBzdGFydHMgYmVsb3cgdGhlIHBydmlvdXNseSBhZGRlZCBzZXBhcmF0b3IsXG4gICAgICAvLyBzbyB3ZSBoYXZlIHRvIGFkZCAkbGluZS1zcGFjaW5nIHRvIG91ciB5LXBvcyBwb2ludGVyXG4gICAgICAkYmcteS1wb3M6IGNhbGMoKCN7JGxpbmUtaGVpZ2h0fSAqICgjeyRpfSAtIDEpKSArICgjeyRsaW5lLXNwYWNpbmd9ICogKCN7JGl9IC0gMSkpKTtcbiAgICAgICRiZy1wb3NpdGlvbjogYXBwZW5kKCRiZy1wb3NpdGlvbiwgJzAgJyArICRiZy15LXBvcyk7XG4gICAgICAkYmctc2l6ZTogYXBwZW5kKCRiZy1zaXplLCAnMTAwJSAnICsgJGxpbmUtaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAje3RvLXN0cmluZygkYmctaW1hZ2UsICcsICcpfTtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAje3RvLXN0cmluZygkYmctcG9zaXRpb24sICcsICcpfTtcbiAgICBiYWNrZ3JvdW5kLXNpemU6ICN7dG8tc3RyaW5nKCRiZy1zaXplLCAnLCAnKX07XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgfVxuXG4gIEBpbmNsdWRlIGJhY2tncm91bmQtaGVpZ2h0KG1pbi1oZWlnaHQsICRsaW5lcyk7XG59XG4iLCJAbWl4aW4gYmFja2dyb3VuZC1oZWlnaHQoJHByb3BlcnR5LCAkbGluZXM6IDEpIHtcbiAgJGxpbmUtaGVpZ2h0OiB2YXIoLS10ZXh0LXNoZWxsLWxpbmUtaGVpZ2h0LCAxNnB4KTtcbiAgJGxpbmUtc3BhY2luZzogdmFyKC0tdGV4dC1zaGVsbC1saW5lLWd1dHRlciwgM3B4KTtcblxuICAjeyRwcm9wZXJ0eX06IGNhbGMoKCN7JGxpbmUtaGVpZ2h0fSAqICN7JGxpbmVzfSkgKyAoI3skbGluZS1zcGFjaW5nfSAqICgjeyRsaW5lc30gLSAxKSkpO1xufVxuIiwiQGltcG9ydCBcInV0aWxzXCI7XG5cbkBtaXhpbiBib3VuY2luZy1saW5lcy1iYWNrZ3JvdW5kKCRsaW5lczogMSkge1xuICAkbGluZS1oZWlnaHQ6IHZhcigtLXRleHQtc2hlbGwtbGluZS1oZWlnaHQsIDE2cHgpO1xuICAkbGluZS1zcGFjaW5nOiB2YXIoLS10ZXh0LXNoZWxsLWxpbmUtZ3V0dGVyLCAzcHgpO1xuICAkYmctY29sb3I6IHZhcigtLXRleHQtc2hlbGwtbGluZS1jb2xvciwgI0NDQyk7XG4gICRtYXNrLWNvbG9yOiB2YXIoLS10ZXh0LXNoZWxsLWJhY2tncm91bmQsICNGRkYpO1xuICAkbGluZS1iZy1jb2xvcjogdmFyKC0tdGV4dC1zaGVsbC1iYWNrZ3JvdW5kLCAjRkZGKTtcbiAgJGJnLXktcG9zOiAwcHg7XG4gICRyYW5kLXdpZHRoOiAje3JhbmRvbU51bSg4NSwgOTUpfTtcbiAgJGJnLWltYWdlOiAnbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAnICsgJGJnLWNvbG9yICsgJyAnICsgJHJhbmQtd2lkdGggKyAnJSAsICcgKyAkbWFzay1jb2xvciArICcgJyArICRyYW5kLXdpZHRoICsgJyUpJztcbiAgJGJnLXBvc2l0aW9uOiAnMCAnICsgJGJnLXktcG9zO1xuICAkYmctc2l6ZTogJzEwMCUgJyArICRsaW5lLWhlaWdodDtcbiAgJGJnLXNpemUtYW5pbWF0aW9uLWZyb206ICc4NSUgJyArICRsaW5lLWhlaWdodDtcbiAgJGJnLXNpemUtYW5pbWF0aW9uLXRvOiAnMTAwJSAnICsgJGxpbmUtaGVpZ2h0O1xuXG4gIEBpZiAoJGxpbmVzID09IDEpIHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAjeyRiZy1pbWFnZX07XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogI3skYmctcG9zaXRpb259O1xuICAgIGJhY2tncm91bmQtc2l6ZTogI3skYmctc2l6ZX07XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcblxuICAgIGFuaW1hdGlvbi1kaXJlY3Rpb246IGFsdGVybmF0ZTtcbiAgICBhbmltYXRpb24tbmFtZTogYW5pbWF0ZUxpbmU7XG5cbiAgICBAa2V5ZnJhbWVzIGFuaW1hdGVMaW5lIHtcbiAgICAgIDAle1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6ICN7JGJnLXNpemUtYW5pbWF0aW9uLWZyb219O1xuICAgICAgfVxuXG4gICAgICAxMDAle1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6ICN7JGJnLXNpemUtYW5pbWF0aW9uLXRvfTtcbiAgICAgIH1cbiAgICB9XG4gIH0gQGVsc2Uge1xuICAgIEBmb3IgJGkgZnJvbSAyIHRocm91Z2ggJGxpbmVzIHtcbiAgICAgIC8vIEFkZCBzZXBhcmF0b3IgYmV0d2VlbiBsaW5lc1xuICAgICAgJGJnLWltYWdlOiBhcHBlbmQoJGJnLWltYWdlLCBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICN7JGxpbmUtYmctY29sb3J9IDEwMCUsICN7JGxpbmUtYmctY29sb3J9IDEwMCUpKTtcbiAgICAgIC8vIFRoaXMgbGluZWFyLWdyYWRpZW50IGFzIHNlcGFyYXRvciBzdGFydHMgYmVsb3cgdGhlIGxhc3QgbGluZSxcbiAgICAgIC8vIHNvIHdlIGhhdmUgdG8gYWRkICRsaW5lLWhlaWdodCB0byBvdXIgeS1wb3MgcG9pbnRlclxuICAgICAgJGJnLXktcG9zOiBjYWxjKCgjeyRsaW5lLWhlaWdodH0gKiAoI3skaX0gLSAxKSkgKyAoI3skbGluZS1zcGFjaW5nfSAqICgjeyRpfSAtIDIpKSk7XG4gICAgICAkYmctcG9zaXRpb246IGFwcGVuZCgkYmctcG9zaXRpb24sICcwICcgKyAkYmcteS1wb3MpO1xuICAgICAgJGJnLXNpemU6IGFwcGVuZCgkYmctc2l6ZSwgJzEwMCUgJyArICRsaW5lLXNwYWNpbmcpO1xuICAgICAgLy8gc2VwYXJhdG9yIGxpbmVzIGhhdmUgdGhlIHNhbWUgaW5pdGlhbCBhbmQgZW5kIHN0YXRlLCB0aHVzIG5vIGFuaW1hdGlvbiBvY2N1cnNcbiAgICAgICRiZy1zaXplLWFuaW1hdGlvbi1mcm9tOiBhcHBlbmQoJGJnLXNpemUtYW5pbWF0aW9uLWZyb20sICcxMDAlICcgKyAkbGluZS1zcGFjaW5nKTtcbiAgICAgICRiZy1zaXplLWFuaW1hdGlvbi10bzogYXBwZW5kKCRiZy1zaXplLWFuaW1hdGlvbi10bywgJzEwMCUgJyArICRsaW5lLXNwYWNpbmcpO1xuXG4gICAgICAvLyBBZGQgbmV3IGxpbmVcbiAgICAgIC8vIFRoZSBsYXN0IGxpbmUgc2hvdWxkIGJlIG5hcnJvdyB0aGFuIHRoZSBvdGhlcnNcbiAgICAgIEBpZiAoJGkgPT0gJGxpbmVzKSB7XG4gICAgICAgICRyYW5kLXdpZHRoOiAje3JhbmRvbU51bSgzMCwgNTApfTtcbiAgICAgICAgJGJnLXNpemUtYW5pbWF0aW9uLWZyb206IGFwcGVuZCgkYmctc2l6ZS1hbmltYXRpb24tZnJvbSwgJzU1JSAnICsgJGxpbmUtaGVpZ2h0KTtcbiAgICAgIH0gQGVsc2Uge1xuICAgICAgICAkcmFuZC13aWR0aDogI3tyYW5kb21OdW0oNjAsIDgwKX07XG4gICAgICAgICRiZy1zaXplLWFuaW1hdGlvbi1mcm9tOiBhcHBlbmQoJGJnLXNpemUtYW5pbWF0aW9uLWZyb20sICc3NSUgJyArICRsaW5lLWhlaWdodCk7XG4gICAgICB9XG5cbiAgICAgICRiZy1pbWFnZTogYXBwZW5kKCRiZy1pbWFnZSwgJ2xpbmVhci1ncmFkaWVudCh0byByaWdodCwgJyArICRiZy1jb2xvciArICcgJyArICRyYW5kLXdpZHRoICsgJyUgLCAnICsgJG1hc2stY29sb3IgKyAnICcgKyAkcmFuZC13aWR0aCArICclKScpO1xuICAgICAgLy8gVGhpcyBuZXcgbGluZSBzdGFydHMgYmVsb3cgdGhlIHBydmlvdXNseSBhZGRlZCBzZXBhcmF0b3IsXG4gICAgICAvLyBzbyB3ZSBoYXZlIHRvIGFkZCAkbGluZS1zcGFjaW5nIHRvIG91ciB5LXBvcyBwb2ludGVyXG4gICAgICAkYmcteS1wb3M6IGNhbGMoKCN7JGxpbmUtaGVpZ2h0fSAqICgjeyRpfSAtIDEpKSArICgjeyRsaW5lLXNwYWNpbmd9ICogKCN7JGl9IC0gMSkpKTtcbiAgICAgICRiZy1wb3NpdGlvbjogYXBwZW5kKCRiZy1wb3NpdGlvbiwgJzAgJyArICRiZy15LXBvcyk7XG4gICAgICAkYmctc2l6ZTogYXBwZW5kKCRiZy1zaXplLCAnMTAwJSAnICsgJGxpbmUtaGVpZ2h0KTtcbiAgICAgICRiZy1zaXplLWFuaW1hdGlvbi10bzogYXBwZW5kKCRiZy1zaXplLWFuaW1hdGlvbi10bywgJzEwMCUgJyArICRsaW5lLWhlaWdodCk7XG4gICAgfVxuXG4gICAgYmFja2dyb3VuZC1pbWFnZTogI3t0by1zdHJpbmcoJGJnLWltYWdlLCAnLCAnKX07XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogI3t0by1zdHJpbmcoJGJnLXBvc2l0aW9uLCAnLCAnKX07XG4gICAgYmFja2dyb3VuZC1zaXplOiAje3RvLXN0cmluZygkYmctc2l6ZSwgJywgJyl9O1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG5cbiAgICBhbmltYXRpb24tZGlyZWN0aW9uOiBhbHRlcm5hdGUtcmV2ZXJzZTtcbiAgICBhbmltYXRpb24tbmFtZTogYW5pbWF0ZU11bHRpTGluZTtcblxuICAgIEBrZXlmcmFtZXMgYW5pbWF0ZU11bHRpTGluZSB7XG4gICAgICAwJXtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiAje3RvLXN0cmluZygkYmctc2l6ZS1hbmltYXRpb24tZnJvbSwgJywgJyl9O1xuICAgICAgfVxuXG4gICAgICAxMDAle1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6ICN7dG8tc3RyaW5nKCRiZy1zaXplLWFuaW1hdGlvbi10bywgJywgJyl9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBpbmNsdWRlIGJhY2tncm91bmQtaGVpZ2h0KG1pbi1oZWlnaHQsICRsaW5lcyk7XG5cbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XG4gIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xuICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluLW91dDtcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxcztcbn1cbiJdfQ== */"] });


/***/ }),

/***/ 6089:
/*!*******************************************************************************!*\
  !*** ./src/app/components/show-hide-password/show-hide-password.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShowHidePasswordComponent": () => (/* binding */ ShowHidePasswordComponent)
/* harmony export */ });
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ 4362);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);



const _c0 = ["*"];
class ShowHidePasswordComponent {
    constructor() {
        this.showPassword = false;
    }
    toggleShow() {
        this.showPassword = !this.showPassword;
        this.input.type = this.showPassword ? 'text' : 'password';
    }
}
ShowHidePasswordComponent.ɵfac = function ShowHidePasswordComponent_Factory(t) { return new (t || ShowHidePasswordComponent)(); };
ShowHidePasswordComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ShowHidePasswordComponent, selectors: [["app-show-hide-password"]], contentQueries: function ShowHidePasswordComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonInput, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.input = _t.first);
    } }, ngContentSelectors: _c0, decls: 4, vars: 2, consts: [[1, "type-toggle", 3, "click"], ["name", "eye-off-outline", 1, "show-option", 3, "hidden"], ["name", "eye-outline", 1, "hide-option", 3, "hidden"]], template: function ShowHidePasswordComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ShowHidePasswordComponent_Template_a_click_1_listener() { return ctx.toggleShow(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "ion-icon", 1)(3, "ion-icon", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", ctx.showPassword);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", !ctx.showPassword);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonIcon], styles: ["[_nghost-%COMP%] {\n  display: flex;\n  width: 100%;\n  align-items: center;\n}\n[_nghost-%COMP%]   .type-toggle[_ngcontent-%COMP%] {\n  -webkit-padding-start: 0.5rem;\n          padding-inline-start: 0.5rem;\n}\n[_nghost-%COMP%]   .type-toggle[_ngcontent-%COMP%]   .show-option[_ngcontent-%COMP%], [_nghost-%COMP%]   .type-toggle[_ngcontent-%COMP%]   .hide-option[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  display: block;\n}\n[_nghost-%COMP%]   .type-toggle[_ngcontent-%COMP%]   .show-option[_ngcontent-%COMP%]:not(ion-icon), [_nghost-%COMP%]   .type-toggle[_ngcontent-%COMP%]   .hide-option[_ngcontent-%COMP%]:not(ion-icon) {\n  text-transform: uppercase;\n  font-size: 1rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3ctaGlkZS1wYXNzd29yZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7QUFDRjtBQUNFO0VBQ0UsNkJBQUE7VUFBQSw0QkFBQTtBQUNKO0FBQ0k7O0VBRUUsaUJBQUE7RUFDQSxjQUFBO0FBQ047QUFFTTs7RUFDRSx5QkFBQTtFQUNBLGVBQUE7QUFDUiIsImZpbGUiOiJzaG93LWhpZGUtcGFzc3dvcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHdpZHRoOiAxMDAlO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gIC50eXBlLXRvZ2dsZSB7XG4gICAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IDAuNXJlbTtcblxuICAgIC5zaG93LW9wdGlvbixcbiAgICAuaGlkZS1vcHRpb24ge1xuICAgICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgICBkaXNwbGF5OiBibG9jaztcblxuICAgICAgLy8gSW4gY2FzZSB5b3Ugd2FudCB0byB1c2UgdGV4dCBpbnN0ZWFkIG9mIGljb25zXG4gICAgICAmOm5vdChpb24taWNvbikge1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0= */"] });


/***/ }),

/***/ 1598:
/*!*****************************************************!*\
  !*** ./src/app/core/services/api-client.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiClientService": () => (/* binding */ ApiClientService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 3158);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 9337);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ 2340);
/* harmony import */ var _logging_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logging.service */ 5948);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 8784);









class ApiClientService {
    constructor(logger, httpClient) {
        this.logger = logger;
        this.httpClient = httpClient;
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiEndpoint;
        this.httpGetOptions = { withCredentials: true };
        this.httpPostOptions = { withCredentials: true };
    }
    postData(payload) {
        const _funcName = 'ApiClientService::postData';
        return this.httpClient.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.webSocketUrl}`, payload, this.httpPostOptions).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(data => {
            this.logger.debug(`${_funcName}`, 'data', data);
        }, error => {
            this.logger.error(_funcName, error);
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.catchError)(this.handleError(_funcName, payload)));
    }
    handleError(operation = 'operation', result) {
        return (error) => {
            this.logger.error(error);
            this.logger.serverError('Error ::', error);
            this.logger.error(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(result);
        };
    }
}
ApiClientService.ɵfac = function ApiClientService_Factory(t) { return new (t || ApiClientService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_logging_service__WEBPACK_IMPORTED_MODULE_1__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient)); };
ApiClientService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: ApiClientService, factory: ApiClientService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 6484:
/*!**********************************************!*\
  !*** ./src/app/core/services/geo.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GeoService": () => (/* binding */ GeoService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 833);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);


const GEOLOCATION_ERRORS = {
    'errors.location.unsupportedBrowser': 'Browser does not support location services',
    'errors.location.permissionDenied': 'You have rejected access to your location',
    'errors.location.positionUnavailable': 'Unable to determine your location',
    'errors.location.timeout': 'Service timeout has been reached'
};
class GeoService {
    geoEnabled() {
        return !(!window.navigator || !window.navigator.geolocation);
    }
    watchPosition() {
        return new rxjs__WEBPACK_IMPORTED_MODULE_0__.Observable(observer => {
            let watchId;
            const success = position => {
                observer.next(position);
            };
            const error = err => {
                observer.error(err);
            };
            if (this.geoEnabled()) {
                window.navigator.geolocation.watchPosition((position) => {
                    observer.next(position);
                }, (error) => {
                    switch (error.code) {
                        case 1:
                            observer.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
                            break;
                        case 2:
                            observer.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
                            break;
                        case 3:
                            observer.error(GEOLOCATION_ERRORS['errors.location.timeout']);
                            break;
                    }
                });
            }
            else {
                console.log("GEO NOT ENABLED !!!!!");
                observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
            }
        });
    }
    getPosition(geoLocationOptions) {
        geoLocationOptions = geoLocationOptions || { timeout: 5000 };
        return new Promise((resolve, reject) => {
            if (this.geoEnabled()) {
                window.navigator.geolocation.getCurrentPosition((position) => {
                    resolve(position);
                }, (error) => {
                    switch (error.code) {
                        case 1:
                            reject(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
                            break;
                        case 2:
                            reject(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
                            break;
                        case 3:
                            reject(GEOLOCATION_ERRORS['errors.location.timeout']);
                            break;
                    }
                }, geoLocationOptions);
            }
            else {
                reject(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
            }
        });
    }
    getLocation(geoLocationOptions) {
        geoLocationOptions = geoLocationOptions || { timeout: 5000 };
        return new rxjs__WEBPACK_IMPORTED_MODULE_0__.Observable(observer => {
            if (this.geoEnabled()) {
                window.navigator.geolocation.getCurrentPosition((position) => {
                    observer.next(position);
                    observer.complete();
                }, (error) => {
                    switch (error.code) {
                        case 1:
                            observer.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
                            break;
                        case 2:
                            observer.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
                            break;
                        case 3:
                            observer.error(GEOLOCATION_ERRORS['errors.location.timeout']);
                            break;
                    }
                }, geoLocationOptions);
            }
            else {
                observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
            }
        });
    }
}
GeoService.ɵfac = function GeoService_Factory(t) { return new (t || GeoService)(); };
GeoService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: GeoService, factory: GeoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 5948:
/*!**************************************************!*\
  !*** ./src/app/core/services/logging.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoggingService": () => (/* binding */ LoggingService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);

class LoggingService {
    constructor() { }
    debug(label = "Debug Log", ...data) {
        console.log(label, data);
    }
    out(label = ">>", data) {
        this.debug(label, data);
    }
    error(...data) {
    }
    serverError(...data) {
    }
}
LoggingService.ɵfac = function LoggingService_Factory(t) { return new (t || LoggingService)(); };
LoggingService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: LoggingService, factory: LoggingService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 3404:
/*!*************************************************!*\
  !*** ./src/app/core/services/socket.service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SocketService": () => (/* binding */ SocketService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _core_services_storage_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/services/storage.service */ 2323);
/* harmony import */ var _core_socket_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/socket-events */ 212);
/* harmony import */ var _nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nxApp/events/nx-event.service */ 8354);
/* harmony import */ var _utils_tag_generator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @utils/tag-generator */ 9381);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 833);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 116);
/* harmony import */ var _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/messages/message-types */ 1765);
/* harmony import */ var _api_api_factory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @api/api-factory */ 8019);
/* harmony import */ var _logging_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./logging.service */ 5948);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! uuid */ 2535);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var ngx_socket_io__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-socket-io */ 4935);



















class SocketService {
    constructor(nxEvents, storageService, logger, socket) {
        this.nxEvents = nxEvents;
        this.storageService = storageService;
        this.logger = logger;
        this.socket = socket;
        this.prevMessage = { type: -1000 };
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subject();
        this.dataStream = this.subject.asObservable();
        this.haveShownDriverData = false;
        const _funcName = 'SocketService::subscribe';
        this.ensureUUID();
        this.socket.on("disconnect", () => {
            alert("SOCKET DISCONNECT");
        });
        this.cmStream = new rxjs__WEBPACK_IMPORTED_MODULE_8__.Observable(observer => {
            this.socket.fromEvent(_core_socket_events__WEBPACK_IMPORTED_MODULE_1__.SocketEvents.Message).subscribe((message) => {
                if (message.type === _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_4__.MsgType.DriverUpdate && !this.haveShownDriverData) {
                    console.log("NEW SOCKET MESSAGE :: DRIVET DATA ::", message);
                    this.haveShownDriverData = true;
                }
                else {
                    if (message.type !== this.prevMessage.type) {
                        this.prevMessage = message;
                        console.log("NEW SOCKET MESSAGE ::", message);
                    }
                }
                this.subject.next(message);
                observer.next(message);
            }, (error) => {
                this.logger.error(_funcName, "::", error);
            });
        });
    }
    oberveMessage(tag = null, ...msgTypes) {
        tag = !tag ? new Date().getMilliseconds().toString() : tag;
        return this.subject.asObservable().pipe((msg) => {
            let msgType = Number.isInteger(msg.type) && msgTypes.indexOf(Number(msg.type)) > -1 ? msg : null;
            return (msgType && tag === (msgType === null || msgType === void 0 ? void 0 : msgType.tag)) ? msg : null;
        });
    }
    ensureUUID() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.uuid) {
                let storedId = yield this.storageService.get("uuid");
                this.logger.debug("UUID FROM STORAGE DB ::", storedId);
                if (!storedId) {
                    storedId = (0,uuid__WEBPACK_IMPORTED_MODULE_10__["default"])();
                    yield this.storageService.set("uuid", storedId);
                }
                this.uuid = storedId;
            }
            this.logger.debug("**** STORED UUID: ", this.uuid);
            return !(!this.uuid);
        });
    }
    getStream() {
        return this.subject.asObservable();
    }
    handleError(operation = 'operation', result) {
        return (error) => {
            this.logger.error(error);
            this.logger.serverError('Error ::', error);
            this.logger.error(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.of)(result);
        };
    }
    fake(type, data) {
        this.subject.next({
            type: type,
            data: data
        });
    }
    typedStream(type) {
        return this.cmStream.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.filter)((val) => {
            return val && (val === null || val === void 0 ? void 0 : val.type) == type;
        }));
    }
    typedStreamByTag(type, tag) {
        return this.cmStream.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.filter)((val) => {
            return (val && (val === null || val === void 0 ? void 0 : val.type) === type) && (tag === (val === null || val === void 0 ? void 0 : val.tag));
        }));
    }
    observeMessage(msg, tag) {
        return this.emitMessage(msg, tag);
    }
    emitMessage(msg, tag) {
        let msgType = Number.isInteger(msg) ? Number(msg) : msg === null || msg === void 0 ? void 0 : msg.type;
        tag = (!tag) ? (0,_utils_tag_generator__WEBPACK_IMPORTED_MODULE_3__.generateTag)() : tag;
        return this.oberveMessage(tag, msgType);
    }
    m2(msg, tag) {
        this.logger.out("m2 ::", msg);
        msg.uuid = this.uuid;
        if (tag) {
            msg.tag = tag;
        }
        else {
            msg.tag = _api_api_factory__WEBPACK_IMPORTED_MODULE_5__.ApiFactory.newTag();
        }
        const filterStream = this.cmStream.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.filter)((value) => {
            this.logger.out("FILLE ::: FILTER", value);
            return value.tag ? value.tag === msg.tag : true;
        }));
        this.socket.emit(_core_socket_events__WEBPACK_IMPORTED_MODULE_1__.SocketEvents.Message, msg);
        return filterStream;
    }
    tagMsg(msg, tag) {
        msg.uuid = this.uuid;
        if (tag) {
            msg.tag = tag;
        }
        else {
            msg.tag = _api_api_factory__WEBPACK_IMPORTED_MODULE_5__.ApiFactory.newTag();
        }
        this.socket.emit(_core_socket_events__WEBPACK_IMPORTED_MODULE_1__.SocketEvents.Message, msg);
        return this.typedStreamByTag(msg.type, msg.tag);
    }
    sendMessage(msg, tag) {
        msg.uuid = this.uuid;
        if (tag) {
            msg.tag = tag;
        }
        else {
            msg.tag = _api_api_factory__WEBPACK_IMPORTED_MODULE_5__.ApiFactory.newTag();
        }
        this.socket.emit(_core_socket_events__WEBPACK_IMPORTED_MODULE_1__.SocketEvents.Message, msg);
        return this.typedStream(msg.type);
    }
    getMessage(msgType) {
        return this.dataStream.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.filter)((value) => {
            return value.type == msgType;
        }));
    }
}
SocketService.ɵfac = function SocketService_Factory(t) { return new (t || SocketService)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_2__.NxEventService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_core_services_storage_service__WEBPACK_IMPORTED_MODULE_0__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_logging_service__WEBPACK_IMPORTED_MODULE_6__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](ngx_socket_io__WEBPACK_IMPORTED_MODULE_14__.Socket)); };
SocketService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjectable"]({ token: SocketService, factory: SocketService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 2323:
/*!**************************************************!*\
  !*** ./src/app/core/services/storage.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StorageService": () => (/* binding */ StorageService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/storage-angular */ 190);




class StorageService {
    constructor(storage) {
        this.storage = storage;
        this.init();
    }
    init() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            /*localforage.config({
                                   name        : 'taxijaktdriver',
                                   version     : 1.0,
                                   storeName   : 'data'
                        });*/
            let config = {
                name: 'taxijaktdriver',
                version: 1.0,
                storeName: 'data'
            };
            this.storage = yield this.storage.create();
            yield this.storage.defineDriver("LocalStorage");
        });
    }
    set(key, value) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            console.log("SET DATA ::", key, value);
            return yield this.storage.set(key, value);
        });
    }
    get(key) {
        var _a;
        return (_a = this.storage) === null || _a === void 0 ? void 0 : _a.get(key);
    }
    getAs(key) {
        var _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            return yield ((_a = this.storage) === null || _a === void 0 ? void 0 : _a.get(key));
        });
    }
    remove(key) {
        var _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            return yield ((_a = this.storage) === null || _a === void 0 ? void 0 : _a.remove(key));
        });
    }
    clear() {
        var _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            return yield ((_a = this.storage) === null || _a === void 0 ? void 0 : _a.clear());
        });
    }
}
StorageService.ɵfac = function StorageService_Factory(t) { return new (t || StorageService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_ionic_storage_angular__WEBPACK_IMPORTED_MODULE_2__.Storage)); };
StorageService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: StorageService, factory: StorageService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 4251:
/*!***********************************************!*\
  !*** ./src/app/core/services/tabs.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabsService": () => (/* binding */ TabsService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);

class TabsService {
    constructor() { }
}
TabsService.ɵfac = function TabsService_Factory(t) { return new (t || TabsService)(); };
TabsService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: TabsService, factory: TabsService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 212:
/*!***************************************!*\
  !*** ./src/app/core/socket-events.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SocketEvents": () => (/* binding */ SocketEvents)
/* harmony export */ });
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
var SocketEvents;
(function (SocketEvents) {
    SocketEvents.Message = "message";
})(SocketEvents || (SocketEvents = {}));


/***/ }),

/***/ 675:
/*!******************************************************!*\
  !*** ./src/app/core/utils/history-helper.service.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HistoryHelperService": () => (/* binding */ HistoryHelperService)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ 116);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);




class HistoryHelperService {
    constructor(router) {
        this.router = router;
        this.router.events
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__.NavigationEnd))
            .subscribe(({ urlAfterRedirects }) => {
            // console.log('previous URL', this.previousUrl);
            this.previousUrl = urlAfterRedirects;
            // console.log('NEW previous URL', this.previousUrl);
        });
    }
}
HistoryHelperService.ɵfac = function HistoryHelperService_Factory(t) { return new (t || HistoryHelperService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router)); };
HistoryHelperService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: HistoryHelperService, factory: HistoryHelperService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 9381:
/*!*********************************************!*\
  !*** ./src/app/core/utils/tag-generator.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateTag": () => (/* binding */ generateTag)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ 2535);
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

function generateTag() {
    return (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
}


/***/ }),

/***/ 1747:
/*!*****************************************************!*\
  !*** ./src/app/core/utils/transfer-state-helper.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageShellState": () => (/* binding */ ImageShellState),
/* harmony export */   "TransferStateHelper": () => (/* binding */ TransferStateHelper)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 9337);







var ImageShellState;
(function (ImageShellState) {
    ImageShellState["SSR"] = "ssr-loaded";
    ImageShellState["BROWSER_FROM_SSR"] = "browser-loaded-from-ssr";
    ImageShellState["NOT_FOUND"] = "not-found";
})(ImageShellState || (ImageShellState = {}));
class TransferStateHelper {
    constructor(platformId, state) {
        this.platformId = platformId;
        this.state = state;
    }
    // Method with generic param
    checkDataSourceState(stateKey, dataSource) {
        const dataKey = (0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__.makeStateKey)(stateKey);
        if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_1__.isPlatformServer)(this.platformId)) {
            // When loading resource in the server, store the result in the TransferState
            // to use when transitioning to the browser from the SSR rendered app
            return dataSource.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)((data) => {
                this.state.set(dataKey, data);
            }));
        }
        else {
            // Check if we have data in the TransferState
            if (this.state.hasKey(dataKey)) {
                const stateData = this.state.get(dataKey, null);
                if (stateData && stateData !== null) {
                    const cachedDataSource = (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(stateData);
                    // After using it, remove data from state
                    // this.state.remove(dataKey);
                    // Set a flag to track if the dataSource is being cached in the server state or not
                    Object.assign(cachedDataSource, { ssr_state: true });
                    return cachedDataSource;
                }
                else {
                    return dataSource;
                }
            }
            else {
                return dataSource;
            }
        }
    }
    // This method checks if a specific image was previously handled in the server
    checkImageShellState(stateKey, imageSource) {
        let imageState = ImageShellState.NOT_FOUND;
        // Make sure we are not dealing with empty image sources
        if (imageSource !== '') {
            // We will store a collection of image sources in the state
            const dataKey = (0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__.makeStateKey)(stateKey);
            if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_1__.isPlatformServer)(this.platformId)) {
                // When loading resource in the server, store the result in the TransferState
                // to use when transitioning to the browser from the SSR rendered app
                const stateImages = this.state.get(dataKey, []);
                stateImages.push(imageSource);
                this.state.set(dataKey, stateImages);
                // Running in the server, in this execution the image is set in the transfer state for the first time
                imageState = ImageShellState.SSR;
            }
            else {
                // Check if we have data in the TransferState
                if (this.state.hasKey(dataKey)) {
                    const stateData = this.state.get(dataKey, []);
                    // Check if the image was previously loaded in the server
                    if (stateData.includes(imageSource)) {
                        imageState = ImageShellState.BROWSER_FROM_SSR;
                    }
                }
            }
        }
        return imageState;
    }
}
TransferStateHelper.ɵfac = function TransferStateHelper_Factory(t) { return new (t || TransferStateHelper)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.PLATFORM_ID), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__.TransferState)); };
TransferStateHelper.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: TransferStateHelper, factory: TransferStateHelper.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 2702:
/*!*************************************!*\
  !*** ./src/app/nx-app/app.const.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NxAppSettings": () => (/* binding */ NxAppSettings),
/* harmony export */   "StorageKeys": () => (/* binding */ StorageKeys)
/* harmony export */ });
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
var StorageKeys;
(function (StorageKeys) {
    StorageKeys.DriverData = "driverData";
})(StorageKeys || (StorageKeys = {}));
var NxAppSettings;
(function (NxAppSettings) {
    NxAppSettings.HeartbeatInterval = 1;
})(NxAppSettings || (NxAppSettings = {}));


/***/ }),

/***/ 1578:
/*!*************************************!*\
  !*** ./src/app/nx-app/app.paths.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AccountPages": () => (/* binding */ AccountPages),
/* harmony export */   "AppPages": () => (/* binding */ AppPages),
/* harmony export */   "NxAppPages": () => (/* binding */ NxAppPages)
/* harmony export */ });
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
var NxAppPages;
(function (NxAppPages) {
    let Driver;
    (function (Driver) {
        Driver.title = 'Driver Page';
        Driver.url = '/app/start';
        Driver.icon = 'list-outline';
    })(Driver = NxAppPages.Driver || (NxAppPages.Driver = {}));
    let TaxiShift;
    (function (TaxiShift) {
        TaxiShift.title = 'Taxi Shift';
        TaxiShift.url = '/app/shift';
        TaxiShift.icon = 'list-outline';
    })(TaxiShift = NxAppPages.TaxiShift || (NxAppPages.TaxiShift = {}));
    let InternalError;
    (function (InternalError) {
        InternalError.title = "Internal Error";
        InternalError.url = "/internal-error";
    })(InternalError = NxAppPages.InternalError || (NxAppPages.InternalError = {}));
})(NxAppPages || (NxAppPages = {}));
const AppPages = [
    {
        title: 'Driver Start Page',
        url: '/app/start',
        icon: 'list-outline'
    },
    {
        title: 'Profile',
        url: '/app/user',
        icon: 'person-outline'
    },
    {
        title: 'Contact Card',
        url: '/contact-card',
        icon: './assets/custom-icons/side-menu/contact-card.svg'
    },
    {
        title: 'Notifications',
        url: '/app/notifications',
        icon: 'notifications-outline'
    }
];
const AccountPages = [
    {
        title: 'Log In',
        url: '/auth/login',
        ionicIcon: 'log-in-outline'
    },
    {
        title: 'Sign Up',
        url: '/auth/signup',
        ionicIcon: 'person-add-outline'
    },
    {
        title: 'Tutorial',
        url: '/messages',
        ionicIcon: 'school-outline'
    },
    {
        title: 'Getting Started',
        url: '/orders',
        ionicIcon: 'rocket-outline'
    },
    {
        title: '404 page',
        url: '/page-internal-error',
        ionicIcon: 'alert-circle-outline'
    }
];


/***/ }),

/***/ 830:
/*!*******************************************************!*\
  !*** ./src/app/nx-app/components/nx-app-component.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NxAppComponent": () => (/* binding */ NxAppComponent),
/* harmony export */   "logErrorMess": () => (/* binding */ logErrorMess),
/* harmony export */   "logMess": () => (/* binding */ logMess)
/* harmony export */ });
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
const logMess = console.log;
const logErrorMess = console.log;
class NxAppComponent {
}


/***/ }),

/***/ 7410:
/*!***********************************************************!*\
  !*** ./src/app/nx-app/components/nx-components.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NxComponentsModule": () => (/* binding */ NxComponentsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 4362);
/* harmony import */ var _nxApp_components_nx_driver_status_nx_driver_status_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nxApp/components/nx-driver-status/nx-driver-status.component */ 2000);
/* harmony import */ var _nxApp_components_nx_header_nx_header_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nxApp/components/nx-header/nx-header.component */ 6192);
/* harmony import */ var _modals_nx_modals_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modals/nx-modals.module */ 6916);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */






class NxComponentsModule {
}
NxComponentsModule.ɵfac = function NxComponentsModule_Factory(t) { return new (t || NxComponentsModule)(); };
NxComponentsModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: NxComponentsModule });
NxComponentsModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
            _modals_nx_modals_module__WEBPACK_IMPORTED_MODULE_2__.NxModalsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](NxComponentsModule, { declarations: [_nxApp_components_nx_header_nx_header_component__WEBPACK_IMPORTED_MODULE_1__.NxHeaderComponent,
        _nxApp_components_nx_driver_status_nx_driver_status_component__WEBPACK_IMPORTED_MODULE_0__.NxDriverStatusComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
        _modals_nx_modals_module__WEBPACK_IMPORTED_MODULE_2__.NxModalsModule], exports: [_nxApp_components_nx_driver_status_nx_driver_status_component__WEBPACK_IMPORTED_MODULE_0__.NxDriverStatusComponent,
        _nxApp_components_nx_header_nx_header_component__WEBPACK_IMPORTED_MODULE_1__.NxHeaderComponent] }); })();


/***/ }),

/***/ 2000:
/*!**********************************************************************************!*\
  !*** ./src/app/nx-app/components/nx-driver-status/nx-driver-status.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DriverStatusStorage": () => (/* binding */ DriverStatusStorage),
/* harmony export */   "DriverStatusStorageBase": () => (/* binding */ DriverStatusStorageBase),
/* harmony export */   "NxButtonType": () => (/* binding */ NxButtonType),
/* harmony export */   "NxDriverStatusComponent": () => (/* binding */ NxDriverStatusComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _shared_driver_driver_status__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/driver/driver-status */ 9102);
/* harmony import */ var _shared_utils_var_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/utils/var.utils */ 1224);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 629);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 4362);
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */







class DriverStatusStorageBase extends Map {
    /**
     * Add new Status type
     * @param {DriverStatusType} statusType
     * @param {string} strVal
     * @returns {any}
     */
    set(statusType) {
        return this.add(_shared_driver_driver_status__WEBPACK_IMPORTED_MODULE_0__.DriverStatusType[statusType]);
    }
    add(strVal) {
        let val2 = !_shared_utils_var_utils__WEBPACK_IMPORTED_MODULE_1__.VarUtils.isEmpty(strVal) ? strVal : _shared_driver_driver_status__WEBPACK_IMPORTED_MODULE_0__.DriverStatusType[_shared_driver_driver_status__WEBPACK_IMPORTED_MODULE_0__.DriverStatusType.Unset];
        return _shared_driver_driver_status__WEBPACK_IMPORTED_MODULE_0__.DriverStatusType[this.setVal(val2)];
    }
    setVal(strVal) {
        let statusType = _shared_driver_driver_status__WEBPACK_IMPORTED_MODULE_0__.DriverStatusType[strVal];
        return this.set(statusType);
    }
    has(strVal) {
        return this.get(strVal) !== null;
    }
    /**
     * You guessed it
     * @returns {boolean}
     */
    isEmpty() {
        return this.size < 1;
    }
}
class DriverStatusStorage extends DriverStatusStorageBase {
}
var NxButtonType;
(function (NxButtonType) {
    NxButtonType[NxButtonType["Custom"] = 0] = "Custom";
    NxButtonType[NxButtonType["SetBusy"] = 1] = "SetBusy";
    NxButtonType[NxButtonType["DropDown"] = 2] = "DropDown";
})(NxButtonType || (NxButtonType = {}));
class NxDriverStatusComponent {
    constructor() {
        this.initEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
        this.statusEventStream = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject().pipe((event) => {
            return event;
        });
        this.beforeStatusChange = this.statusEventStream.subscribe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.pipe)((event) => {
            let doCancel = !event.cancel;
            if (!doCancel || !this.beforeStatusChange.closed) {
                return event.type;
            }
        }));
        // This sucker is triggered when a server confirmation have beem reveived
        this.statusDidChange = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    }
    ngOnInit() {
        this.initEvent.emit(this);
    }
    triggerStatusChange(value) {
        this.statusDidChange.emit(value);
    }
    set buttonType(value) {
        let storage = this._choosableStatuses;
        if (value === NxButtonType.DropDown && (!storage || (storage === null || storage === void 0 ? void 0 : storage.isEmpty()))) {
        }
        else if (storage && !storage.isEmpty()) {
            this.button = value;
        }
    }
    set statuses(storage) {
        if (!storage) {
            storage = new DriverStatusStorage();
        }
        this._choosableStatuses = storage;
    }
    get statuses() {
        return this._choosableStatuses;
    }
    onClick() {
    }
}
NxDriverStatusComponent.ɵfac = function NxDriverStatusComponent_Factory(t) { return new (t || NxDriverStatusComponent)(); };
NxDriverStatusComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: NxDriverStatusComponent, selectors: [["nx-driver-status"]], inputs: { button: "button" }, outputs: { beforeStatusChange: "beforeStatusChange", statusDidChange: "statusDidChange" }, decls: 2, vars: 0, consts: [[3, "click"]], template: function NxDriverStatusComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function NxDriverStatusComponent_Template_ion_button_click_0_listener() { return ctx.onClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Status");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonButton], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJueC1kcml2ZXItc3RhdHVzLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 6192:
/*!********************************************************************!*\
  !*** ./src/app/nx-app/components/nx-header/nx-header.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NxHeaderComponent": () => (/* binding */ NxHeaderComponent)
/* harmony export */ });
/* harmony import */ var _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nxApp/events/nx-event-types */ 5022);
/* harmony import */ var _nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nxApp/events/nx-event.service */ 8354);
/* harmony import */ var _nxApp_services_nx_app_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nxApp/services/nx-app.service */ 9282);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 4362);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6362);








function NxHeaderComponent_ion_toolbar_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-toolbar", 5)(1, "ion-buttons", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "ion-menu-button");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "ion-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "ion-chip", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](6, "ion-icon", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "ion-label")(8, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, " Points");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "ion-chip", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r0.title, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r0.points);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r0.membership, " ");
} }
function NxHeaderComponent_ion_toolbar_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-toolbar");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " GPS FAILURE ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
class NxHeaderComponent {
    constructor(nxEvents, appService) {
        this.nxEvents = nxEvents;
        this.appService = appService;
        this.nxHeaderClass = "std";
        this.showWarning = false;
        this.driverActive = false;
        this.onlyLogo = false;
        nxEvents.onNewEvent().subscribe((value) => {
            switch (value.eventType) {
                case _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_0__.NxEvent.DriverUpdate:
                    let driverData = value.eventData;
                    this.points = driverData.info.points;
                    this.membership = driverData.info.mode.is_basic ? "BASIC" : "PRO";
                    break;
            }
        });
    }
    ngOnInit() { }
    hideWarning(value) {
        this.showWarning = false;
        return true;
    }
    warningVisible() {
        return this.showWarning;
    }
    showGpsWarning() {
        this.showWarning = true;
        return true;
    }
}
NxHeaderComponent.ɵfac = function NxHeaderComponent_Factory(t) { return new (t || NxHeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_1__.NxEventService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_nxApp_services_nx_app_service__WEBPACK_IMPORTED_MODULE_2__.NxAppService)); };
NxHeaderComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: NxHeaderComponent, selectors: [["nx-header"]], inputs: { driverActive: "driverActive", onlyLogo: "onlyLogo" }, decls: 6, vars: 4, consts: [[1, "nx"], [1, "nx", 2, "background", "#ffffff"], ["alt", "logo", "height", "40", "src", "/assets/nx-app/nx-app-logo.png", 2, "display", "block", "margin", "0 auto"], ["class", "nx-sub", 4, "ngIf"], [4, "ngIf"], [1, "nx-sub"], ["slot", "start"], ["slot", "end"], ["name", "trophy-outline"]], template: function NxHeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-header", 0)(1, "ion-toolbar", 1)(2, "ion-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, NxHeaderComponent_ion_toolbar_4_Template, 13, 3, "ion-toolbar", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, NxHeaderComponent_ion_toolbar_5_Template, 2, 0, "ion-toolbar", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassMap"](ctx.nxHeaderClass);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.onlyLogo);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.warningVisible());
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonToolbar, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonTitle, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonMenuButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonChip, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonLabel], styles: ["ion-header[_ngcontent-%COMP%] {\n  \n}\nion-header[_ngcontent-%COMP%]   .nx[_ngcontent-%COMP%] {\n  --background: #ffffff;\n  padding: 10px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 8px 12px rgba(0, 0, 0, 0.04);\n}\nion-header[_ngcontent-%COMP%]   .nx-sub[_ngcontent-%COMP%] {\n  --background: #ffe0a7;\n}\n@-webkit-keyframes blinking {\n  0% {\n    background-color: #ff3d50;\n    color: #ddd;\n  }\n  100% {\n    background-color: #222291;\n    color: #fff;\n  }\n}\n@keyframes blinking {\n  0% {\n    background-color: #ff3d50;\n    color: #ddd;\n  }\n  100% {\n    background-color: #222291;\n    color: #fff;\n  }\n}\nion-header[_ngcontent-%COMP%]   #gpsWarning[_ngcontent-%COMP%] {\n  font-size: 1.3em;\n  font-weight: bold;\n  padding: 10px;\n  \n  -webkit-animation: blinking 1s infinite;\n          animation: blinking 1s infinite;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm54LWhlYWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQVdDOzs7O2dDQUFBO0FBTkQ7QUFKQztFQUNDLHFCQUFBO0VBQ0EsYUFBQTtFQUNBLHlFQUFBO0FBTUY7QUFIQztFQUNDLHFCQUFBO0FBS0Y7QUFHQztFQUNBO0lBQ0MseUJBQUE7SUFDQSxXQUFBO0VBREE7RUFHRDtJQUNDLHlCQUFBO0lBQ0EsV0FBQTtFQURBO0FBQ0Y7QUFQQztFQUNBO0lBQ0MseUJBQUE7SUFDQSxXQUFBO0VBREE7RUFHRDtJQUNDLHlCQUFBO0lBQ0EsV0FBQTtFQURBO0FBQ0Y7QUFHQztFQUNDLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxhQUFBO0VBQ0EsNEJBQUE7RUFDQSx1Q0FBQTtVQUFBLCtCQUFBO0FBREYiLCJmaWxlIjoibngtaGVhZGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pb24taGVhZGVyIHtcblx0Lm54IHtcblx0XHQtLWJhY2tncm91bmQ6ICNmZmZmZmY7IC8vICNmZmE4MDA7XG5cdFx0cGFkZGluZzogMTBweDtcblx0XHRib3gtc2hhZG93OiAwIDJweCA0cHggcmdiKDAgMCAwIC8gOCUpLCAwIDhweCAxMnB4IHJnYigwIDAgMCAvIDQlKTtcblx0fVxuXG5cdC5ueC1zdWIge1xuXHRcdC0tYmFja2dyb3VuZDogI2ZmZTBhNztcblx0fVxuXG5cdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblx0KlxuXHQqICBCbGlua2luZyBHUFMgV0FSTklOR1xuXHQqXG5cdCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0QGtleWZyYW1lcyBibGlua2luZyB7XG5cdDAlIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjZmYzZDUwO1xuXHRcdGNvbG9yOiAjZGRkO1xuXHR9XG5cdDEwMCUge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMyMjIyOTE7XG5cdFx0Y29sb3I6ICNmZmY7XG5cdH1cbn1cblx0I2dwc1dhcm5pbmcge1xuXHRcdGZvbnQtc2l6ZTogMS4zZW07XG5cdFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XG5cdFx0cGFkZGluZzogMTBweDtcblx0XHQvKiBOQU1FIHwgVElNRSB8IElURVJBVElPTiAqL1xuXHRcdGFuaW1hdGlvbjogYmxpbmtpbmcgMXMgaW5maW5pdGU7XG5cdH1cbn1cblxuXG4iXX0= */"] });


/***/ }),

/***/ 5085:
/*!**********************************************************!*\
  !*** ./src/app/nx-app/directives/boxshadow.directive.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoxshadowDirective": () => (/* binding */ BoxshadowDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);

class BoxshadowDirective {
    constructor() { }
}
BoxshadowDirective.ɵfac = function BoxshadowDirective_Factory(t) { return new (t || BoxshadowDirective)(); };
BoxshadowDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: BoxshadowDirective, selectors: [["", "appBoxshadow", ""]] });


/***/ }),

/***/ 3587:
/*!***********************************************************!*\
  !*** ./src/app/nx-app/directives/funybutton.directive.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FunybuttonDirective": () => (/* binding */ FunybuttonDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);

class FunybuttonDirective {
    constructor() { }
}
FunybuttonDirective.ɵfac = function FunybuttonDirective_Factory(t) { return new (t || FunybuttonDirective)(); };
FunybuttonDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: FunybuttonDirective, selectors: [["", "appFunybutton", ""]] });


/***/ }),

/***/ 5022:
/*!*************************************************!*\
  !*** ./src/app/nx-app/events/nx-event-types.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NxEvent": () => (/* binding */ NxEvent),
/* harmony export */   "NxEventTypes": () => (/* binding */ NxEventTypes)
/* harmony export */ });
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
var NxEvent;
(function (NxEvent) {
    NxEvent[NxEvent["Login"] = 0] = "Login";
    NxEvent[NxEvent["SetBusy"] = 1] = "SetBusy";
    NxEvent[NxEvent["GetSessionOrders"] = 2] = "GetSessionOrders";
    NxEvent[NxEvent["ActiveOrders"] = 3] = "ActiveOrders";
    NxEvent[NxEvent["ShowModal"] = 4] = "ShowModal";
    NxEvent[NxEvent["AppWideData"] = 5] = "AppWideData";
    NxEvent[NxEvent["NewOrder"] = 6] = "NewOrder";
    NxEvent[NxEvent["Heartbeat"] = 7] = "Heartbeat";
    NxEvent[NxEvent["SetStatus"] = 8] = "SetStatus";
    NxEvent[NxEvent["DriverLogin"] = 9] = "DriverLogin";
    NxEvent[NxEvent["DriverData"] = 10] = "DriverData";
    NxEvent[NxEvent["DriverUpdate"] = 11] = "DriverUpdate";
    NxEvent[NxEvent["Orders"] = 12] = "Orders";
    NxEvent[NxEvent["SelectrCar"] = 13] = "SelectrCar";
})(NxEvent || (NxEvent = {}));
var NxEventTypes;
(function (NxEventTypes) {
    let Booking;
    (function (Booking) {
        Booking.NewBooking = 100;
        Booking.AcceptBooking = 101;
        Booking.ShowBookingMap = 102;
    })(Booking = NxEventTypes.Booking || (NxEventTypes.Booking = {}));
})(NxEventTypes || (NxEventTypes = {}));


/***/ }),

/***/ 8354:
/*!***************************************************!*\
  !*** ./src/app/nx-app/events/nx-event.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NxEventService": () => (/* binding */ NxEventService)
/* harmony export */ });
/* harmony import */ var _core_services_logging_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/services/logging.service */ 5948);
/* harmony import */ var _core_services_socket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/services/socket.service */ 3404);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 116);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 9337);
/* harmony import */ var _nx_event_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nx-event-types */ 5022);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! uuid */ 2535);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);










class NxEventService {
    constructor(logger, socketService) {
        this.logger = logger;
        this.socketService = socketService;
        this.appEvent = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
        this.eventStream = this.appEvent.asObservable();
        this.listeners = new Map();
        this.socketService.dataStream.subscribe(val => {
            this.handleMessageEvent(val);
        });
    }
    registerEventListener(listener, ...types) {
        this.listeners.set(listener, types);
    }
    unregisterEventListener(listener) {
        return this.listeners.delete(listener);
    }
    handleMessageEvent(msg) {
        //
        // This shouold really be re-worked
        /*
         this.onEvent({
         eventType: msg.type,
         eventData: msg
         });
         */
    }
    onNewEvent(...types) {
        const _func = "_EventService::onEvent";
        return this.eventStream.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.tap)(val => {
            // console.log("NxEventService :: ON EVENT TAP :::", val);
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.filter)((val) => {
            return types.length ? types.indexOf(val.eventType) > -1 : true;
        }));
    }
    onEvent(...types) {
        const _func = "_EventService::onEvent";
        return this.eventStream.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.tap)(val => {
            // console.log("NxEventService :: ON EVENT TAP :::", val);
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.filter)((val) => {
            return types.length ? types.indexOf(val.eventType) > -1 : true;
        }));
    }
    onEvent2(event) {
        console.log("NxEventService :: onEvent");
        for (let [listener, events] of this.listeners) {
            console.log("Listener ::", listener.name);
            let force = false;
            if (!events || events.length < 1) {
                force = true;
            }
            let trigger = events.length ? events.indexOf(event.eventType) > -1 : true;
            trigger = trigger || !event;
            if (trigger || force) {
                console.log("DO Trigger ::", event.eventType);
                listener.onEvent(event);
            }
            else {
                console.log("NxEventService :: this.listeners ::", this.listeners);
            }
        }
    }
    pushNewEvent(type, data, message) {
        let event = {
            eventType: type,
            eventMessage: message,
            eventData: data
        };
        return this.pushEvent(event);
    }
    pushEvent(event) {
        event.eventTag = (0,uuid__WEBPACK_IMPORTED_MODULE_6__["default"])();
        this.appEvent.next(event);
        return event.eventTag;
    }
    newBookingEvent(data) {
        let serviceEvent = {
            eventType: _nx_event_types__WEBPACK_IMPORTED_MODULE_2__.NxEventTypes.Booking.NewBooking,
            eventData: data
        };
        return this.pushEvent(serviceEvent);
    }
    acceptBooking(data) {
        let serviceEvent = {
            eventType: _nx_event_types__WEBPACK_IMPORTED_MODULE_2__.NxEventTypes.Booking.AcceptBooking,
            eventData: data
        };
        return this.pushEvent(serviceEvent);
    }
}
NxEventService.ɵfac = function NxEventService_Factory(t) { return new (t || NxEventService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_core_services_logging_service__WEBPACK_IMPORTED_MODULE_0__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_core_services_socket_service__WEBPACK_IMPORTED_MODULE_1__.SocketService)); };
NxEventService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({ token: NxEventService, factory: NxEventService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 7658:
/*!********************************************************************************!*\
  !*** ./src/app/nx-app/modals/driver-busy-modal/driver-busy-modal.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DriverBusyModalComponent": () => (/* binding */ DriverBusyModalComponent)
/* harmony export */ });
/* harmony import */ var _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nxApp/events/nx-event-types */ 5022);
/* harmony import */ var _nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nxApp/events/nx-event.service */ 8354);
/* harmony import */ var _shared_driver_driver_status__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/driver/driver-status */ 9102);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 4362);







class DriverBusyModalComponent {
    constructor(nxEvents, modalController) {
        this.nxEvents = nxEvents;
        this.modalController = modalController;
        this.minutes = 7;
        this.countDownDate = new Date().getTime();
        this.timerDisplay = "";
        this.timer = null;
        this.addMinutes(this.countDownDate, this.minutes);
        nxEvents.pushNewEvent(_nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_0__.NxEvent.SetBusy, this.minutes);
        this.nxEvents.pushNewEvent(_nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_0__.NxEvent.SetStatus, _shared_driver_driver_status__WEBPACK_IMPORTED_MODULE_2__.DriverStatusType.Busy);
    }
    addMinutes(ms, minutes) {
        let tmpDate = new Date(ms + minutes * 60000);
        this.countDownDate = tmpDate.getTime();
    }
    extendByMin(min) {
        this.addMinutes(this.countDownDate, min);
    }
    countDown() {
        // Update the count down every 1 second
        this.timer = setInterval(() => {
            let now = new Date().getTime();
            this.distance = this.countDownDate - now;
            let minutes = (this.distance / 1000) / 60;
            let seconds = ((this.distance / 1000) % 60);
            let minFormatted = Math.round(minutes).toFixed();
            let secFormatted = Math.round(seconds).toFixed();
            // Display the result in the element with id="demo"
            this.timerDisplay = `${minFormatted}:${secFormatted}`;
            // If the count down is finished, write some text
            if (this.distance < 0) {
                clearInterval(this.timer);
                this.timerDisplay = "Time´s up...";
            }
        }, 1000);
    }
    ngOnInit() {
        this.countDown();
    }
    setAvailable() {
        this.nxEvents.pushNewEvent(_nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_0__.NxEvent.SetStatus, _shared_driver_driver_status__WEBPACK_IMPORTED_MODULE_2__.DriverStatusType.Available);
        this.dismiss();
    }
    dismiss(data) {
        this.modalController.dismiss({ data: data }).then(() => {
        });
    }
}
DriverBusyModalComponent.ɵfac = function DriverBusyModalComponent_Factory(t) { return new (t || DriverBusyModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_1__.NxEventService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ModalController)); };
DriverBusyModalComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: DriverBusyModalComponent, selectors: [["app-driver-busy-modal"]], decls: 20, vars: 1, consts: [[1, "card"], [2, "margin-top", "2em"], ["expand", "block", "color", "facebook", 1, "social-auth-btn", "facebook-auth-btn", 3, "click"], ["expand", "block", "color", "twitter", 1, "social-auth-btn", "facebook-auth-btn", 3, "click"], ["expand", "block", "color", "purple", 1, "social-auth-btn", "facebook-auth-btn", 3, "click"], [2, "margin-top", "4em"], ["expand", "block", "color", "success", 1, "social-auth-btn", "facebook-auth-btn", 3, "click"]], template: function DriverBusyModalComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-card", 0)(1, "ion-header")(2, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "You are busy");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "ion-card-content")(5, "div")(6, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 1)(9, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function DriverBusyModalComponent_Template_ion_button_click_9_listener() { return ctx.extendByMin(7); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, " Add 7 minutes ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 1)(12, "ion-button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function DriverBusyModalComponent_Template_ion_button_click_12_listener() { return ctx.extendByMin(14); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, " Add 14 minutes ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "div", 1)(15, "ion-button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function DriverBusyModalComponent_Template_ion_button_click_15_listener() { return ctx.extendByMin(28); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16, " Add 28 minutes ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "div", 5)(18, "ion-button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function DriverBusyModalComponent_Template_ion_button_click_18_listener() { return ctx.setAvailable(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, " Available ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.timerDisplay, " ");
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonCard, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonCardContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonButton], styles: [".card[_ngcontent-%COMP%], .card-md[_ngcontent-%COMP%], .card-ios[_ngcontent-%COMP%] {\n  webkit-box-shadow: none;\n  box-shadow: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyaXZlci1idXN5LW1vZGFsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0MsdUJBQUE7RUFDQSxnQkFBQTtBQUNEIiwiZmlsZSI6ImRyaXZlci1idXN5LW1vZGFsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcmQsIC5jYXJkLW1kLCAuY2FyZC1pb3Mge1xuXHR3ZWJraXQtYm94LXNoYWRvdzogbm9uZTtcblx0Ym94LXNoYWRvdzogbm9uZTtcbn1cbiJdfQ== */"] });


/***/ }),

/***/ 6442:
/*!****************************************************************************!*\
  !*** ./src/app/nx-app/modals/new-order-modal/new-order-modal.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewOrderModalComponent": () => (/* binding */ NewOrderModalComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _components_google_map_google_map_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/google-map/google-map.component */ 2166);
/* harmony import */ var _core_services_socket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/services/socket.service */ 3404);
/* harmony import */ var _api_driver_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @api/driver-api.service */ 1302);
/* harmony import */ var _api_order_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @api/order-api.service */ 371);
/* harmony import */ var _nxApp_nx_app_manager_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nxApp/nx-app-manager.service */ 8823);
/* harmony import */ var _nxApp_services_driver_driver_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nxApp/services/driver/driver.service */ 3898);
/* harmony import */ var _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../shared/messages/message-types */ 1765);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 4362);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 6362);




















function NewOrderModalComponent_ion_content_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "ion-content")(1, "ion-card")(2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](4, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "ion-button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function NewOrderModalComponent_ion_content_0_Template_ion_button_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r3.dismiss(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7, " OK ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("Order #", ctx_r0.orderCompleted.order.id, " completed");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate2"](" ", ctx_r0.orderCompleted.summary == null ? null : ctx_r0.orderCompleted.summary.commission, " ", ctx_r0.orderCompleted.summary == null ? null : ctx_r0.orderCompleted.summary.currency, " ");
} }
function NewOrderModalComponent_ion_content_1_ion_card_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "ion-card")(1, "div")(2, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r5.data.orderData.customer_name);
} }
function NewOrderModalComponent_ion_content_1_div_15_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div")(1, "ion-button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function NewOrderModalComponent_ion_content_1_div_15_Template_ion_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r7.setCustomerInCar(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, " Customer is in the car ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
} }
function NewOrderModalComponent_ion_content_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "ion-content", 3)(1, "ion-card")(2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "ion-card-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "ion-card-content")(7, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](11, "app-google-map", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](12, NewOrderModalComponent_ion_content_1_ion_card_12_Template, 4, 1, "ion-card", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](14, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](15, NewOrderModalComponent_ion_content_1_div_15_Template, 3, 0, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](16, "div", 4)(17, "ion-button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function NewOrderModalComponent_ion_content_1_Template_ion_button_click_17_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r9.finishRide(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](18, " Finish ride ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()()();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r1.data.orderData.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" Customer ", ctx_r1.data.orderData.customer_phone, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" Fr\u00E5n: ", ctx_r1.data.orderData.from_formatted, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" Till: ", ctx_r1.data.orderData.to_formatted, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("mapOptions", ctx_r1.mapOptions);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r1.customerInCar);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx_r1.customerInCar);
} }
function NewOrderModalComponent_ion_content_2_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div")(1, "ion-button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function NewOrderModalComponent_ion_content_2_div_10_Template_ion_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r12.accept(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, " Accept ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
} }
function NewOrderModalComponent_ion_content_2_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "ion-content", 3)(1, "ion-card")(2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](9, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](10, NewOrderModalComponent_ion_content_2_div_10_Template, 3, 0, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "div", 4)(12, "ion-button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function NewOrderModalComponent_ion_content_2_Template_ion_button_click_12_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r14.deny(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](13, " Deny ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()()();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("Order: ", ctx_r2.data.orderData.id, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" Fr\u00E5n: ", ctx_r2.data.orderData.from_formatted, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" Till: ", ctx_r2.data.orderData.to_formatted, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx_r2.customerInCar);
} }
class NewOrderModalComponent {
    constructor(loadingController, socketService, modalController, orderApi, driverApi, driverService, appManagerService, alertController) {
        var _a, _b;
        this.loadingController = loadingController;
        this.socketService = socketService;
        this.modalController = modalController;
        this.orderApi = orderApi;
        this.driverApi = driverApi;
        this.driverService = driverService;
        this.appManagerService = appManagerService;
        this.alertController = alertController;
        this.customerInCar = false;
        this.orderCompleted = null;
        this.mapOptions = {
            zoom: 15,
            center: { lat: -34.9199842, lng: -56.149849 }
            // uncomment the following line if you want to remove the default Map controls
            // disableDefaultUI: true
        };
        if ((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.orderData) === null || _b === void 0 ? void 0 : _b.id) {
            appManagerService.muteOrder(this.data.orderData.id);
            driverService.orderActive = true;
        }
    }
    ngOnInit() {
        this.isActive = this.data.active;
        this.orderId = this.data.orderData.id;
        this.customerInCar = this.data.orderData.customer_in_car;
        console.log("Data received in ModalDataaType :::", this.data2);
        console.log("Data received :: header :::", this.header);
        console.log("Data received :: ModalDataaType :::", this.data);
    }
    ngAfterViewInit() {
        // GoogleMapComponent should be available
        this._GoogleMap.$mapReady.subscribe(map => {
            this.map = map;
            console.log('ngAfterViewInit - Google map ready');
        });
        this.createLoader();
    }
    createLoader(text = "Loading...") {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            this.loadingElement = yield this.loadingController.create({
                message: text
            });
        });
    }
    presentLoader() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            yield this.loadingElement.present();
        });
    }
    dismissLoader() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            if (this.loadingElement) {
                yield this.loadingElement.dismiss();
            }
        });
    }
    geolocateMe() {
        /*this.presentLoader();
         Geolocation.getCurrentPosition().then(position => {

         const current_location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
         this.map.panTo(current_location);

         // add a marker
         const marker = new google.maps.Marker({
         position: current_location,
         title   : 'You are here!',
         // animation: google.maps.Animation.DROP
         });

         // To add the marker to the map, call setMap();
         marker.setMap(this.map);

         }).catch((error) => {
         console.log('Error getting current location', error);

         }).finally(() => this.dismissLoader());
         */
    }
    test() {
        let testObj = {
            "type": 9,
            "uuid": "d011a979-60ca-446d-bcf3-10a1a2e136d4",
            "data": {
                "success": true,
                "data": {
                    "order": {
                        "id": "2172751",
                        "created": "2022-05-10 14:31:56",
                        "dispatch_time": "2022-05-10 14:31:56",
                        "cancelled": null,
                        "confirmed": "2022-05-10 14:32:20",
                        "finished": null,
                        "pickup_time": "2022-05-10 14:31:56",
                        "estimated_pickup_time": null,
                        "taxi_at_from_address": null,
                        "taxi_at_from_address_min_distance": null,
                        "taxi_at_from_address_min_distance_time": null,
                        "taxi_at_to_address": null,
                        "taxi_at_to_address_min_distance": null,
                        "taxi_at_to_address_min_distance_time": null,
                        "from_address": "Gültzauuddens Badplats, Repslagargatan, Luleå",
                        "from_zipcode": "97239",
                        "from_name": "Gültzauuddens Badplats, Repslagargatan",
                        "from_formatted": "Gültzauuddens Badplats, Repslagargatan, Luleå",
                        "from_area": "Luleå C",
                        "from_lat": "65.587352",
                        "from_lng": "22.125006",
                        "from_is_establishment": "1",
                        "to_address": "Norrbottensteatern, Luleå",
                        "to_zipcode": "97239",
                        "to_name": "Norrbottensteatern",
                        "to_formatted": "Norrbottensteatern, Luleå",
                        "to_area": "Luleå C",
                        "to_lat": "65.58500599999999",
                        "to_lng": "22.142910999999998",
                        "via_addresses": null,
                        "via_positions": null,
                        "route": "[{\"address\":\"G\\u00fcltzauuddens Badplats\",\"lat\":\"65.587352\",\"lng\":\"22.125006\",\"city\":\"Lule\\u00e5\"},{\"address\":\"Norrbottensteatern\",\"lat\":\"65.58500599999999\",\"lng\":\"22.142910999999998\",\"city\":\"Lule\\u00e5\"}]",
                        "distance": "825",
                        "duration": "186",
                        "currency": "SEK",
                        "price": "128",
                        "price_net": "120.75",
                        "price_vat": "7.25",
                        "taxameter_price": null,
                        "prepaid": null,
                        "prepaid_voucher": null,
                        "prepaid_reduction": null,
                        "prepaid_card": null,
                        "prepaid_card_net": null,
                        "prepaid_card_vat": null,
                        "prepaid_invoice": null,
                        "prepaid_vat": null,
                        "flight_no": null,
                        "wave_session_id": "13477953",
                        "customer_id": null,
                        "customer_name": "qwdqwd yu",
                        "customer_phone": "+46708633007",
                        "customer_email": "dsfg@oij.se",
                        "customer_lat": "59.3438896",
                        "customer_lng": "18.0531736",
                        "target_driver_id": null,
                        "driver_id": "2673",
                        "driver_company": "test",
                        "driver_car_registration_number": "TAXI01",
                        "driver_name": "Kierowca",
                        "driver_phone": "+48888777657",
                        "driver_email": null,
                        "driver_popup_message": "Ny körning!\n\nFrån: Gültzauuddens Badplats, Repslagargatan, Luleå\n\nTill: Norrbottensteatern, Luleå\n\nSträcka: 0.8 km\n\nFast pris: 128 kr\n\nKunden: qwdqwd yu | +46708633007",
                        "ip_address": "35.156.42.228",
                        "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:100.0) Gecko/20100101 Firefox/100.0",
                        "http_referer": "http://dev.taxijakt.se/",
                        "order_page_url": "http://dev.taxijakt.se/",
                        "customer_did_not_show_up": null,
                        "driver_did_not_show_up": null,
                        "admin_notified": null,
                        "admin_confirmed": null,
                        "handled_by_admin": null,
                        "admin_user_id": null,
                        "super_admin_notified": null,
                        "test": "0",
                        "validated": "1",
                        "suspect": "0",
                        "resent": null,
                        "resent_by_customer": null,
                        "resent_by_customer_wait": null,
                        "target_taxi_company_id": null,
                        "taxi_company_id": null,
                        "jackpot": null,
                        "carrier_id": "1787",
                        "carrier_name": "Test",
                        "invoice_id": null,
                        "carrier_fee": null,
                        "carrier_compensation": null,
                        "delivery_type": "PASSENGER",
                        "urgent": null,
                        "urgent_distance": null,
                        "duplicate_of_order_id": null,
                        "app_version": "4.19",
                        "mode": null,
                        "country_code": "SE",
                        "locale": "en",
                        "admin_id": null,
                        "closed": null,
                        "company_id": null,
                        "device_id": null,
                        "number_of_passengers": null,
                        "number_of_luggages": null,
                        "ref": null,
                        "accept_sms_id": null,
                        "baby_seats": null,
                        "child_seats": null,
                        "booster_seats": null,
                        "animals_in_cage": null,
                        "animals_without_cage": null,
                        "combi": null,
                        "left_to_pay": null,
                        "payica_transaction_id": null,
                        "payica_card_id": null,
                        "secret": "8C7079",
                        "domain": "dev.taxijakt.se",
                        "signup_min_points": "0",
                        "points": "73.6",
                        "dialed_phone": null,
                        "partner_id": null,
                        "partner_reference_no": null,
                        "query_id": "76593",
                        "message_to_driver": null,
                        "admin_note_id": null,
                        "accept_id": null,
                        "success_id": null,
                        "taxi_company_customer_id": null,
                        "taxi_company_customer_no": null,
                        "allow_forwarding": null,
                        "vehicle_id": "12630",
                        "rate_sms_id": null,
                        "status": null,
                        "is_phone_order": "0",
                        "customer_in_car": null,
                        "should_be_watched": "1",
                        "is_cancelled": "0",
                        "is_confirmed": "1",
                        "is_finished": "0"
                    }
                },
                "headers": {
                    "date": "Tue, 10 May 2022 12:32:21 GMT",
                    "content-type": "text/html; charset=UTF-8",
                    "content-length": "1486",
                    "connection": "keep-alive",
                    "server": "Apache/2.4.37 (Unix) OpenSSL/1.1.0j",
                    "x-powered-by": "PHP/7.1.23",
                    "access-control-allow-origin": "https://dev.taxijakt.se",
                    "access-control-allow-credentials": "true",
                    "access-control-allow-headers": "Authorization,Content-Type,Accept,Accept-Language,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since",
                    "access-control-allow-methods": "PUT, GET, POST, DELETE, OPTIONS",
                    "vary": "Accept-Encoding,Origin",
                    "cache-control": "max-age=0, no-store"
                }
            },
            "tag": "9378d721-5b0f-4efc-8274-3c44751c0369"
        };
        this.socketService.fake(_shared_messages_message_types__WEBPACK_IMPORTED_MODULE_6__.MsgType.AcceptOrder, testObj);
    }
    accept() {
        this.orderApi.acceptOrder(this.data.orderData.id).subscribe(val => {
            console.log("ORDER API :::", val);
        });
        this.isActive = true;
        /*toPromise().then(res => {
         console.log("ACCEPT ORDER RESULT ::", res);
         }).catch(err => {
         console.log("ACCEPT ORDER ERR ::", err);
         });*/
        //		this.dismiss();
    }
    setCustomerInCar() {
        this.data.orderData.customer_in_car = true;
        this.customerInCar = true;
    }
    doFinishRide() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            yield this.createLoader("Finishing ride...");
            yield this.presentLoader();
            yield this.orderApi.completeOrder(this.orderId).subscribe((msg) => {
                let response = msg.data;
                if (response && response.status === "OK") {
                    this.dismissLoader();
                    this.orderCompleted = response;
                }
            });
        });
    }
    finishRide() {
        this.alertController.create({
            header: 'Confirm Alert',
            subHeader: 'Beware lets confirm',
            message: 'Are you sure? you want to leave without safty mask?',
            buttons: [
                {
                    text: 'Yes',
                    handler: () => {
                        this.doFinishRide();
                    }
                },
                {
                    text: 'No',
                    handler: () => {
                        console.log('Let me think');
                    }
                }
            ]
        }).then(res => {
            res.present();
        });
    }
    deny() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            alert("ORDER ID #" + this.data.orderData.id);
            yield this.createLoader("Processing...");
            yield this.presentLoader();
            this.orderApi.denyOrder(this.data.orderData.id).subscribe((msg) => {
                this.dismissLoader();
                this.dismiss();
            });
        });
    }
    dismiss(data) {
        data = !data ? this.data : data;
        this.modalController.dismiss({ data: data }).then(() => {
            this.driverService.orderActive = false;
        });
    }
}
NewOrderModalComponent.ɵfac = function NewOrderModalComponent_Factory(t) { return new (t || NewOrderModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.LoadingController), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_core_services_socket_service__WEBPACK_IMPORTED_MODULE_1__.SocketService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_api_order_api_service__WEBPACK_IMPORTED_MODULE_3__.OrderApiService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_api_driver_api_service__WEBPACK_IMPORTED_MODULE_2__.DriverApiService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_nxApp_services_driver_driver_service__WEBPACK_IMPORTED_MODULE_5__.DriverService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_nxApp_nx_app_manager_service__WEBPACK_IMPORTED_MODULE_4__.NxAppManagerService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.AlertController)); };
NewOrderModalComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: NewOrderModalComponent, selectors: [["app-new-order-modal"]], viewQuery: function NewOrderModalComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_components_google_map_google_map_component__WEBPACK_IMPORTED_MODULE_0__.GoogleMapComponent, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx._GoogleMap = _t.first);
    } }, inputs: { data2: "data2" }, decls: 3, vars: 3, consts: [[4, "ngIf"], ["style", "height: 100%", 4, "ngIf"], ["type", "button", "expand", "block", "color", "facebook", 1, "social-auth-btn", "facebook-auth-btn", 3, "click"], [2, "height", "100%"], [2, "margin-top", "2em"], [3, "mapOptions"], ["expand", "block", "color", "twitter", 1, "social-auth-btn", "facebook-auth-btn", 3, "click"], ["expand", "block", "color", "danger", 1, "social-auth-btn", "facebook-auth-btn", 3, "click"]], template: function NewOrderModalComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](0, NewOrderModalComponent_ion_content_0_Template, 8, 3, "ion-content", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, NewOrderModalComponent_ion_content_1_Template, 19, 7, "ion-content", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, NewOrderModalComponent_ion_content_2_Template, 14, 4, "ion-content", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.orderCompleted !== null);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.isActive && !ctx.orderCompleted);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx.isActive);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonCard, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonCardHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonCardContent, _components_google_map_google_map_component__WEBPACK_IMPORTED_MODULE_0__.GoogleMapComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonLabel], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJuZXctb3JkZXItbW9kYWwuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 6916:
/*!***************************************************!*\
  !*** ./src/app/nx-app/modals/nx-modals.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NxModalsModule": () => (/* binding */ NxModalsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 4362);
/* harmony import */ var _nxApp_modals_driver_busy_modal_driver_busy_modal_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nxApp/modals/driver-busy-modal/driver-busy-modal.component */ 7658);
/* harmony import */ var _nxApp_modals_select_car_modal_select_car_modal_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nxApp/modals/select-car-modal/select-car-modal.component */ 3648);
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/components.module */ 5642);
/* harmony import */ var _new_order_modal_new_order_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./new-order-modal/new-order-modal.component */ 6442);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);







class NxModalsModule {
}
NxModalsModule.ɵfac = function NxModalsModule_Factory(t) { return new (t || NxModalsModule)(); };
NxModalsModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: NxModalsModule });
NxModalsModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _components_components_module__WEBPACK_IMPORTED_MODULE_2__.ComponentsModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](NxModalsModule, { declarations: [_new_order_modal_new_order_modal_component__WEBPACK_IMPORTED_MODULE_3__.NewOrderModalComponent,
        _nxApp_modals_select_car_modal_select_car_modal_component__WEBPACK_IMPORTED_MODULE_1__.SelectCarModalComponent,
        _nxApp_modals_driver_busy_modal_driver_busy_modal_component__WEBPACK_IMPORTED_MODULE_0__.DriverBusyModalComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
        _components_components_module__WEBPACK_IMPORTED_MODULE_2__.ComponentsModule] }); })();


/***/ }),

/***/ 3648:
/*!******************************************************************************!*\
  !*** ./src/app/nx-app/modals/select-car-modal/select-car-modal.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectCarModalComponent": () => (/* binding */ SelectCarModalComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _api_driver_api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @api/driver-api.service */ 1302);
/* harmony import */ var _core_services_socket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/services/socket.service */ 3404);
/* harmony import */ var _core_services_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/services/storage.service */ 2323);
/* harmony import */ var _nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nxApp/events/nx-event.service */ 8354);
/* harmony import */ var _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nxApp/events/nx-event-types */ 5022);
/* harmony import */ var _nxApp_services_driver_driver_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nxApp/services/driver/driver.service */ 3898);
/* harmony import */ var _shared_driver_driver_car_options__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/driver/driver-car-options */ 4601);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! events */ 3358);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 4362);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 6362);


















function SelectCarModalComponent_ion_card_1_ion_list_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-list", 3)(1, "ion-item", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function SelectCarModalComponent_ion_card_1_ion_list_4_Template_ion_item_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r5); const car_r3 = restoredCtx.$implicit; const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return ctx_r4.selectCar(car_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "div", 5)(3, "div", 6)(4, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()();
} if (rf & 2) {
    const car_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](car_r3.registration_number);
} }
function SelectCarModalComponent_ion_card_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-card")(1, "ion-card-header")(2, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "V\u00E4lj bil");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, SelectCarModalComponent_ion_card_1_ion_list_4_Template, 6, 1, "ion-list", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r0.cars);
} }
function SelectCarModalComponent_ion_card_2_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-card")(1, "ion-card-header")(2, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "V\u00E4lj bil");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "ion-list")(5, "ion-item")(6, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, "Baby seats (backward facing)");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "ion-select", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function SelectCarModalComponent_ion_card_2_Template_ion_select_ngModelChange_8_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r6.carModel.babySeats = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "ion-select-option", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10, "0");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "ion-select-option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12, "1");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "ion-select-option", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14, "2");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](15, "ion-item")(16, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](17, "Child seats (forward facing)");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "ion-select", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function SelectCarModalComponent_ion_card_2_Template_ion_select_ngModelChange_18_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r7); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r8.carModel.childSeats = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](19, "ion-select-option", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](20, "0");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](21, "ion-select-option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](22, "1");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](23, "ion-select-option", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](24, "2");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](25, "ion-item")(26, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](27, "Booster seats");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](28, "ion-select", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function SelectCarModalComponent_ion_card_2_Template_ion_select_ngModelChange_28_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r7); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r9.carModel.boosterSeats = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](29, "ion-select-option", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](30, "0");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](31, "ion-select-option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](32, "1");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](33, "ion-select-option", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](34, "2");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](35, "ion-item")(36, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](37, "Car with Shield");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](38, "ion-checkbox", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function SelectCarModalComponent_ion_card_2_Template_ion_checkbox_ngModelChange_38_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r7); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r10.carModel.hasShield = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](39, "ion-item")(40, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](41, "Animals in Cage");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](42, "ion-checkbox", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function SelectCarModalComponent_ion_card_2_Template_ion_checkbox_ngModelChange_42_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r7); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r11.carModel.animalsInCage = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](43, "ion-item")(44, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](45, "Animals without Cage");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](46, "ion-checkbox", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function SelectCarModalComponent_ion_card_2_Template_ion_checkbox_ngModelChange_46_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r7); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r12.carModel.animalsWhitoutCaghe = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](47, "ion-button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function SelectCarModalComponent_ion_card_2_Template_ion_button_click_47_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r7); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r13.saveCar(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](48, "UPDATE");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx_r1.carModel.babySeats);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx_r1.carModel.childSeats);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx_r1.carModel.boosterSeats);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("checked", ctx_r1.carModel.hasShield)("ngModel", ctx_r1.carModel.hasShield);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx_r1.carModel.animalsInCage);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx_r1.carModel.animalsWhitoutCaghe);
} }
class SelectCarModalComponent {
    constructor(modalController, driverService, apiService, storage, nxEvents, socketService) {
        this.modalController = modalController;
        this.driverService = driverService;
        this.apiService = apiService;
        this.storage = storage;
        this.nxEvents = nxEvents;
        this.socketService = socketService;
        this._optionsModel = new _shared_driver_driver_car_options__WEBPACK_IMPORTED_MODULE_6__.DriverCarOptions();
        this.onSelectCar = new events__WEBPACK_IMPORTED_MODULE_7__.EventEmitter();
        this.uuid = "";
        this.carSelected = false;
        this.carModel = null;
        this.uuid = socketService.uuid;
        this.onSelectCar.on(_nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_4__.NxEvent.SelectrCar, (car) => {
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            this.apiService.setCurrentCar(this.carModel).subscribe((value) => {
            });
            this.onSelectCar.emit(_nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_4__.NxEvent.SelectrCar, this.carModel);
            this.nxEvents.pushNewEvent(_nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_4__.NxEvent.SelectrCar, this.carModel);
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
        this.carModel = new _shared_driver_driver_car_options__WEBPACK_IMPORTED_MODULE_6__.DriverCarOptions().fromObj(car);
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
}
SelectCarModalComponent.ɵfac = function SelectCarModalComponent_Factory(t) { return new (t || SelectCarModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_nxApp_services_driver_driver_service__WEBPACK_IMPORTED_MODULE_5__.DriverService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_api_driver_api_service__WEBPACK_IMPORTED_MODULE_0__.DriverApiService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_storage_service__WEBPACK_IMPORTED_MODULE_2__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_3__.NxEventService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_socket_service__WEBPACK_IMPORTED_MODULE_1__.SocketService)); };
SelectCarModalComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: SelectCarModalComponent, selectors: [["app-select-car-modal"]], decls: 3, vars: 2, consts: [[1, "inner-content"], [4, "ngIf"], ["no-lines", "", 4, "ngFor", "ngForOf"], ["no-lines", ""], ["lines", "none", 3, "click"], [1, "car-plate"], [1, "codepen-wrapper"], [1, "registration-ui"], [3, "ngModel", "ngModelChange"], ["value", "0"], ["value", "1"], ["value", "2"], ["value", "brown", "okText", "OK", "cancelText", "Cancel", 3, "ngModel", "ngModelChange"], ["value", "0", "okText", "OK", "cancelText", "Cancel", 3, "ngModel", "ngModelChange"], ["slot", "end", "color", "primary", 3, "checked", "ngModel", "ngModelChange"], ["slot", "end", 3, "ngModel", "ngModelChange"], ["expand", "block", "color", "facebook", "type", "submit", "fill", "solid", 1, "submit-btn", 3, "click"]], template: function SelectCarModalComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, SelectCarModalComponent_ion_card_1_Template, 5, 1, "ion-card", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, SelectCarModalComponent_ion_card_2_Template, 49, 7, "ion-card", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx.currentCar);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.carModel !== null);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonCard, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonCardHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonSelect, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.SelectValueAccessor, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonSelectOption, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonCheckbox, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.BooleanValueAccessor, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButton], styles: [".carplate[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 2em 0 0;\n  font-size: 2em;\n  font-family: helvetica, ariel, sans-serif;\n  text-align: center;\n}\n.carplate[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 1em 0 2em;\n  font-size: 1.4em;\n  font-family: helvetica, ariel, sans-serif;\n  text-align: center;\n}\n.carplate[_ngcontent-%COMP%]   .plate-wrapper[_ngcontent-%COMP%] {\n  width: 25%;\n  margin: 0 37.5%;\n}\n.carplate[_ngcontent-%COMP%]   .registration-ui[_ngcontent-%COMP%] {\n  background: linear-gradient(to bottom, #f8d038 0%, #f5ca2e 100%);\n  padding: 0.25em 1em 0.25em 1.75em;\n  font-weight: bold;\n  font-size: 2em;\n  border-radius: 5px;\n  border: 1px solid #000;\n  box-shadow: 1px 1px 1px #ddd;\n  position: relative;\n  font-family: helvetica, ariel, sans-serif;\n}\n.carplate[_ngcontent-%COMP%]   .registration-ui[_ngcontent-%COMP%]:before {\n  content: \"S\";\n  display: block;\n  width: 30px;\n  height: 100%;\n  background: #063298;\n  position: absolute;\n  top: 0;\n  border-radius: 5px 0 0 5px;\n  color: #f8d038;\n  font-size: 0.5em;\n  line-height: 85px;\n  padding-left: 5px;\n}\n.carplate[_ngcontent-%COMP%]   .registration-ui[_ngcontent-%COMP%]:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  top: 7px;\n  left: 5px;\n  width: 20px;\n  height: 20px;\n  border-radius: 30px;\n  border: 1px dashed #f8d038;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdC1jYXItbW9kYWwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUM7RUFDQyxlQUFBO0VBQ0EsY0FBQTtFQUNBLHlDQUFBO0VBQ0Esa0JBQUE7QUFERjtBQUlDO0VBQ0MsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLHlDQUFBO0VBQ0Esa0JBQUE7QUFGRjtBQUtDO0VBQ0MsVUFBQTtFQUNBLGVBQUE7QUFIRjtBQVFDO0VBQ0MsZ0VBQUE7RUFDQSxpQ0FBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSw0QkFBQTtFQUNBLGtCQUFBO0VBQ0EseUNBQUE7QUFORjtBQVNDO0VBQ0MsWUFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsMEJBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0FBUEY7QUFVQztFQUNDLFdBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSwwQkFBQTtBQVJGIiwiZmlsZSI6InNlbGVjdC1jYXItbW9kYWwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcbi5jYXJwbGF0ZSB7XG5cdGgxIHtcblx0XHRtYXJnaW46IDJlbSAwIDA7XG5cdFx0Zm9udC1zaXplOiAyZW07XG5cdFx0Zm9udC1mYW1pbHk6IGhlbHZldGljYSwgYXJpZWwsIHNhbnMtc2VyaWY7XG5cdFx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHR9XG5cblx0aDIge1xuXHRcdG1hcmdpbjogMWVtIDAgMmVtO1xuXHRcdGZvbnQtc2l6ZTogMS40ZW07XG5cdFx0Zm9udC1mYW1pbHk6IGhlbHZldGljYSwgYXJpZWwsIHNhbnMtc2VyaWY7XG5cdFx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHR9XG5cblx0LnBsYXRlLXdyYXBwZXIge1xuXHRcdHdpZHRoOiAyNSU7XG5cdFx0bWFyZ2luOiAwIDM3LjUlO1xuXHR9XG5cblx0Ly8gdGhpcyBpcyB0aGUgc3R1ZmYgeW91IHdhbnQuXG5cblx0LnJlZ2lzdHJhdGlvbi11aSB7XG5cdFx0YmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgI2Y4ZDAzOCAwJSwgI2Y1Y2EyZSAxMDAlKTtcblx0XHRwYWRkaW5nOiAuMjVlbSAxZW0gLjI1ZW0gMS43NWVtO1xuXHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xuXHRcdGZvbnQtc2l6ZTogMmVtO1xuXHRcdGJvcmRlci1yYWRpdXM6IDVweDtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xuXHRcdGJveC1zaGFkb3c6IDFweCAxcHggMXB4ICNkZGQ7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdGZvbnQtZmFtaWx5OiBoZWx2ZXRpY2EsIGFyaWVsLCBzYW5zLXNlcmlmO1xuXHR9XG5cblx0LnJlZ2lzdHJhdGlvbi11aTpiZWZvcmUge1xuXHRcdGNvbnRlbnQ6ICdTJztcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHR3aWR0aDogMzBweDtcblx0XHRoZWlnaHQ6IDEwMCU7XG5cdFx0YmFja2dyb3VuZDogIzA2MzI5ODtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0dG9wOiAwO1xuXHRcdGJvcmRlci1yYWRpdXM6IDVweCAwIDAgNXB4O1xuXHRcdGNvbG9yOiAjZjhkMDM4O1xuXHRcdGZvbnQtc2l6ZTogLjVlbTtcblx0XHRsaW5lLWhlaWdodDogODVweDtcblx0XHRwYWRkaW5nLWxlZnQ6IDVweDtcblx0fVxuXG5cdC5yZWdpc3RyYXRpb24tdWk6YWZ0ZXIge1xuXHRcdGNvbnRlbnQ6ICcnO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHR0b3A6IDdweDtcblx0XHRsZWZ0OiA1cHg7XG5cdFx0d2lkdGg6IDIwcHg7XG5cdFx0aGVpZ2h0OiAyMHB4O1xuXHRcdGJvcmRlci1yYWRpdXM6IDMwcHg7XG5cdFx0Ym9yZGVyOiAxcHggZGFzaGVkICNmOGQwMzg7XG5cdH1cbn1cbiJdfQ== */"] });


/***/ }),

/***/ 8823:
/*!**************************************************!*\
  !*** ./src/app/nx-app/nx-app-manager.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NxAppManagerService": () => (/* binding */ NxAppManagerService),
/* harmony export */   "UpdateType": () => (/* binding */ UpdateType)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _core_services_socket_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/services/socket.service */ 3404);
/* harmony import */ var _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nxApp/events/nx-event-types */ 5022);
/* harmony import */ var _nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nxApp/events/nx-event.service */ 8354);
/* harmony import */ var _shared_driver_driver_status__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/driver/driver-status */ 9102);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var _shared_driver_driver_status__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/driver/driver-status */ 9107);
/* harmony import */ var _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/messages/message-types */ 1765);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);











var UpdateType;
(function (UpdateType) {
    UpdateType[UpdateType["NotSet"] = 0] = "NotSet";
    UpdateType[UpdateType["Driver"] = 1] = "Driver";
    UpdateType[UpdateType["Orders"] = 2] = "Orders";
    UpdateType[UpdateType["Status"] = 3] = "Status";
})(UpdateType || (UpdateType = {}));
class NxAppManagerService {
    constructor(socket, nxEvents) {
        this.socket = socket;
        this.nxEvents = nxEvents;
        this.prevData = "";
        this.isLoggedIn = false;
        this.haveActiveOrder = false;
        this.driverStatus = new _shared_driver_driver_status__WEBPACK_IMPORTED_MODULE_3__.DriverStatus();
        this.selectedCar = null;
        this.selectedCarData = null;
        this.bookings = new Array();
        this.data = null;
        this.dataUpdated = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
        this.newOrder = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
        this.OnDataUpdate = this.dataUpdated.asObservable();
        this.OnNewOrder = this.newOrder.asObservable();
        this.messages = Array();
        this.marketOrders = Array();
        this.availableOrders = Array();
        this.mutedOrderIds = new Array();
        this.firstEvent = true;
        socket.dataStream.subscribe((msg) => {
            if (msg.type === _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_5__.MsgType.DriverUpdate && msg.data !== null) {
                this.handleResponseUpdate(msg.data);
            }
        });
        nxEvents.onNewEvent().subscribe((value) => {
            var _a, _b;
            switch (value.eventType) {
                case _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_1__.NxEvent.SelectrCar:
                    this.nxEvents.pushNewEvent(_nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_1__.NxEvent.GetSessionOrders);
                    this.nxEvents.pushNewEvent(_nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_1__.NxEvent.SetStatus, _shared_driver_driver_status__WEBPACK_IMPORTED_MODULE_4__.DriverStatusType.Available);
                    break;
                case _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_1__.NxEvent.ActiveOrders:
                    let activeOrders = (_a = value.eventData) === null || _a === void 0 ? void 0 : _a.orders;
                    if (Array.isArray(activeOrders) && activeOrders.length > 0) {
                        this.newOrder.next({
                            active: true,
                            orderData: activeOrders[0]
                        });
                        console.log("****** ORDERS :::", (_b = value.eventData) === null || _b === void 0 ? void 0 : _b.orders);
                        this.haveActiveOrder = true;
                    }
                    break;
            }
        });
    }
    muteOrder(orderId) {
        if (this.mutedOrderIds.indexOf(orderId) === -1) {
            this.mutedOrderIds.push(orderId);
        }
    }
    handleResponseUpdate(data) {
        const dataStr = JSON.stringify(data);
        if (dataStr !== this.prevData) {
            this.prevData = dataStr;
            console.log("****** DRIVER UPDATE ::::", data);
        }
        this.nxEvents.pushNewEvent(_nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_1__.NxEvent.DriverUpdate, data);
        if (this.firstEvent) {
            this.firstEvent = false;
        }
        this.data = JSON.parse(JSON.stringify(data));
        if (Array.isArray(data.messages)) {
            this.messages = data.messages;
        }
        if (Array.isArray(data.orders)) {
            this.marketOrders = data.orders;
        }
        this.handleAvailOrders(data.availOrders);
        /*

         this.driver         = data.driverEntry;
         this.driverInfo     = data.info;
         this.driverData     = data.driverEntry.data;
         this.fullDriverData = data.driverEntry.data.data;
         */
        if (this.data !== null) {
            this.doDataChange(UpdateType.Driver, this.data);
        }
    }
    handleAvailOrders(orders) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            if (!orders || !Array.isArray(orders) || orders.length < 1)
                return;
            for (let order of orders) {
                if (this.mutedOrderIds.indexOf(order.id) === -1) {
                    this.newOrder.next({
                        active: false,
                        orderData: order
                    });
                    break;
                }
            }
        });
    }
    doDataChange(updateType, data) {
        let event = {
            type: updateType,
            data: data
        };
        this.dataUpdated.next(event);
    }
}
NxAppManagerService.ɵfac = function NxAppManagerService_Factory(t) { return new (t || NxAppManagerService)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_core_services_socket_service__WEBPACK_IMPORTED_MODULE_0__.SocketService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_2__.NxEventService)); };
NxAppManagerService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({ token: NxAppManagerService, factory: NxAppManagerService.ɵfac, providedIn: "root" });


/***/ }),

/***/ 8271:
/*!*****************************************!*\
  !*** ./src/app/nx-app/nx-app.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NxAppModule": () => (/* binding */ NxAppModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 4362);
/* harmony import */ var _directives_boxshadow_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./directives/boxshadow.directive */ 5085);
/* harmony import */ var _directives_funybutton_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./directives/funybutton.directive */ 3587);
/* harmony import */ var _modals_nx_modals_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modals/nx-modals.module */ 6916);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */






class NxAppModule {
}
NxAppModule.ɵfac = function NxAppModule_Factory(t) { return new (t || NxAppModule)(); };
NxAppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: NxAppModule });
NxAppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
            _modals_nx_modals_module__WEBPACK_IMPORTED_MODULE_2__.NxModalsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](NxAppModule, { declarations: [_directives_boxshadow_directive__WEBPACK_IMPORTED_MODULE_0__.BoxshadowDirective,
        _directives_funybutton_directive__WEBPACK_IMPORTED_MODULE_1__.FunybuttonDirective], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
        _modals_nx_modals_module__WEBPACK_IMPORTED_MODULE_2__.NxModalsModule] }); })();


/***/ }),

/***/ 2701:
/*!****************************************************!*\
  !*** ./src/app/nx-app/services/app-nav.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppNavService": () => (/* binding */ AppNavService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _core_services_storage_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/services/storage.service */ 2323);
/* harmony import */ var _app_paths__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.paths */ 1578);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 4362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 2816);









class AppNavService {
    constructor(navController, router, storage) {
        this.navController = navController;
        this.router = router;
        this.storage = storage;
    }
    internalError(errorData) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            this.router.navigate([_app_paths__WEBPACK_IMPORTED_MODULE_1__.NxAppPages.InternalError, errorData]);
        });
    }
    navigateRoot(path, options) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            return yield this.navController.navigateRoot([path], options);
        });
    }
    navigateWithData(path, data) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            let navigationExtras = {
                queryParams: {
                    navData: JSON.stringify(data)
                }
            };
            this.storage.set("fromLogin", true);
            return yield this.router.navigate([path], navigationExtras);
        });
    }
    getNavData(route) {
        return new Promise((resolve, reject) => {
            route.queryParams.subscribe(params => {
                if (params && params.navData) {
                    resolve(JSON.parse(params.navData));
                }
            });
        });
    }
}
AppNavService.ɵfac = function AppNavService_Factory(t) { return new (t || AppNavService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.NavController), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_core_services_storage_service__WEBPACK_IMPORTED_MODULE_0__.StorageService)); };
AppNavService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: AppNavService, factory: AppNavService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 3898:
/*!**********************************************************!*\
  !*** ./src/app/nx-app/services/driver/driver.service.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DriverService": () => (/* binding */ DriverService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _core_services_api_client_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/services/api-client.service */ 1598);
/* harmony import */ var _core_services_geo_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/services/geo.service */ 6484);
/* harmony import */ var _core_services_logging_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/services/logging.service */ 5948);
/* harmony import */ var _core_services_socket_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/services/socket.service */ 3404);
/* harmony import */ var _core_services_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core/services/storage.service */ 2323);
/* harmony import */ var _nxApp_app_const__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nxApp/app.const */ 2702);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/messages/message-types */ 729);
/* harmony import */ var _api_driver_api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @api/driver-api.service */ 1302);
/* harmony import */ var _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @nxApp/events/nx-event-types */ 5022);
/* harmony import */ var _nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @nxApp/events/nx-event.service */ 8354);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 3184);




















class DriverService {
    constructor(logger, storage, apiService, nxEvents, socketService, driverApiService, geoService) {
        this.logger = logger;
        this.storage = storage;
        this.apiService = apiService;
        this.nxEvents = nxEvents;
        this.socketService = socketService;
        this.driverApiService = driverApiService;
        this.geoService = geoService;
        this.driverMode = new rxjs__WEBPACK_IMPORTED_MODULE_10__.Subject();
        this.isLoggedIn = false;
        this.orderActive = false;
        this.bookings = new Map();
        this.firstUpdate = true;
        /*
        socketService.dataStream.subscribe(
            (mess: IMessage | any) => {
                if (mess.type === MsgType.DriverUpdate) {
                    let rawJson = JsonConverter.toString<string>(mess.data);
                    let driverUpdateData = JsonConverter.toType<IDriverUpdateResponse>(rawJson);

                    //console.log("DDDDRIVER UPDATE ::::", mess);

                    let driverData: ITJWebDriver;

                    if ((mess.data && !mess.data?.data) || (!mess.data)) {
                        return;
                    } else {
                        driverData = mess.data.data;

                        if (!driverData.id) {
                            return;
                        }
                    }

                    if (this.firstUpdate) {

                        console.log("driverService :: driverData ::", driverData);

                        let appEventData = {
                            driver: {
                                id: driverData.id,
                                status: driverData.status,
                                points: driverData.points,
                                likes: driverData.likes,
                                dislikes: driverData.dislikes,
                                fullData: driverData,
                        }}

                        nxEvents.pushNewEvent(NxEvent.AppWideData, appEventData);
                    }
                }
            }
        );
        */
        nxEvents.eventStream.subscribe((value) => {
            if (value.eventType === _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_8__.NxEvent.DriverLogin) {
                console.log("STORAGE :: SOCKET MESS ::", value.eventData);
            }
            if (value.eventType !== _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_6__.MsgType.DriverUpdate) {
                //console.log("DriverService :: NxEvent ::", value);
            }
            this.handleEvent(value);
        });
    }
    setDriverBusy() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
        });
    }
    pushDriverDataEvent(data) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            this.nxEvents.pushNewEvent(_nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_8__.NxEvent.DriverData, data);
        });
    }
    triggerStoredData() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            let data = yield this.storage.getAs(_nxApp_app_const__WEBPACK_IMPORTED_MODULE_5__.StorageKeys.DriverData);
            if (!data) {
                console.log("DRIVER SERVICE ::: data MISSING", data);
            }
            else {
                this.pushDriverDataEvent(data);
            }
        });
    }
    /**
     * Driver auth functionality
     * @param {IApiLoginRes} data
     * @returns {Promise<void>}
     */
    driverLogin(data) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            if (data && data.driver && data.driver.id) {
                yield this.storage.set(_nxApp_app_const__WEBPACK_IMPORTED_MODULE_5__.StorageKeys.DriverData, data.driver);
                let driverId = data.driver.id;
                console.log("driverService :: openDriverStart ::", data);
                this.driverData = data.driver;
                this.driverId = data.driver.id;
                this.session = data.web_session;
                this.cardsIdent = data.cards_identifier;
                this.isLoggedIn = true;
                this.pushDriverDataEvent(data.driver);
            }
        });
    }
    logOut() {
        this.isLoggedIn = false;
        this.driverData = null;
        this.driverId = null;
        this.session = null;
        this.cardsIdent = null;
    }
    getDriverStatus(driverId) {
        this.driverApiService.getDriverStatus(driverId).subscribe(value => {
            console.log("SUBSCRIBED VALUE ::", value);
        });
        this.nxEvents.pushNewEvent(_nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_8__.NxEvent.ShowModal);
    }
    /**
     * Push event to open new order modal
     * @param {IBookingEntry} entry
     */
    newOrder(entry) {
        this.nxEvents.pushEvent({
            eventType: _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_8__.NxEvent.NewOrder,
            eventData: entry
        });
    }
    storeOrders(orders) {
        for (let order of orders) {
            if (!this.bookings.get(order.id)) {
                this.bookings.set(order.id, order);
                this.newOrder(order);
            }
        }
    }
    handleEvent(event) {
        if (!this.isLoggedIn)
            return;
        switch (event.eventType) {
            case _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_8__.NxEvent.DriverLogin:
                console.log("DRIVER LOGIN ***", event);
                break;
            case _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_8__.NxEvent.DriverUpdate:
                if (event.eventData.availOrders) {
                    // console.log("DriverService :: NxEvent.DriverUpdate ::", event.eventData.availOrders)
                    let orders = event.eventData.availOrders;
                    this.storeOrders(orders);
                    for (let order of orders) {
                        //console.log(order.driver_popup_message)
                        break;
                    }
                }
                break;
            case _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_8__.NxEvent.Heartbeat:
                this.geoService.getPosition().then(res => {
                    let data = {
                        lat: res.coords.latitude,
                        lon: res.coords.longitude,
                        accuracy: res.coords.accuracy
                    };
                    this.socketService.sendMessage({
                        type: _shared_messages_message_types__WEBPACK_IMPORTED_MODULE_6__.MsgType.DriverUpdate,
                        data: data
                    });
                }).catch(err => {
                    console.error("geoService.getPosition ::", err);
                });
        }
    }
    /**
     * Read back driver data stored upon login
     * @returns {Promise<boolean>}
     */
    restoreDriverData() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            let result = true;
            try {
                this.driverData = yield this.storage.get(_nxApp_app_const__WEBPACK_IMPORTED_MODULE_5__.StorageKeys.DriverData);
                if (!this.driverData || !this.driverData.id) {
                    result = false;
                }
            }
            catch (e) {
                this.logger.error("restoreDriverData ::", e);
                result = false;
            }
            return result;
        });
    }
}
DriverService.ɵfac = function DriverService_Factory(t) { return new (t || DriverService)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_core_services_logging_service__WEBPACK_IMPORTED_MODULE_2__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_core_services_storage_service__WEBPACK_IMPORTED_MODULE_4__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_core_services_api_client_service__WEBPACK_IMPORTED_MODULE_0__.ApiClientService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_9__.NxEventService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_core_services_socket_service__WEBPACK_IMPORTED_MODULE_3__.SocketService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_api_driver_api_service__WEBPACK_IMPORTED_MODULE_7__.DriverApiService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_core_services_geo_service__WEBPACK_IMPORTED_MODULE_1__.GeoService)); };
DriverService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjectable"]({ token: DriverService, factory: DriverService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 9282:
/*!***************************************************!*\
  !*** ./src/app/nx-app/services/nx-app.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NxAppService": () => (/* binding */ NxAppService)
/* harmony export */ });
/* harmony import */ var _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nxApp/events/nx-event-types */ 5022);
/* harmony import */ var _nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nxApp/events/nx-event.service */ 8354);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);




class NxAppService {
    constructor(nxEvents) {
        this.nxEvents = nxEvents;
        this.name = "NxAppService";
        this.tickCount = 0;
        nxEvents.registerEventListener(this);
        this.heartMonitor = setInterval(() => {
            this.heartBeat();
        }, 6000);
    }
    onEvent(event) {
        switch (event.eventType) {
            case _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_0__.NxEvent.DriverLogin:
                console.log("DRIVER LOGIN EVNT ::", event.eventData);
                this.driverData = event.eventData;
                break;
        }
    }
    gpsError(error) {
    }
    heartBeat() {
        this.tickCount++;
        this.nxEvents.pushEvent({ eventType: _nxApp_events_nx_event_types__WEBPACK_IMPORTED_MODULE_0__.NxEvent.Heartbeat });
    }
}
NxAppService.ɵfac = function NxAppService_Factory(t) { return new (t || NxAppService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_nxApp_events_nx_event_service__WEBPACK_IMPORTED_MODULE_1__.NxEventService)); };
NxAppService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: NxAppService, factory: NxAppService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 9107:
/*!************************************************!*\
  !*** ./src/app/shared/driver/driver-status.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DriverStatus": () => (/* binding */ DriverStatus),
/* harmony export */   "DriverStatusType": () => (/* binding */ DriverStatusType)
/* harmony export */ });
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
var DriverStatusType;
(function (DriverStatusType) {
    DriverStatusType["Unset"] = "ROCKING_THE_WORLD";
    DriverStatusType["Available"] = "AVAILABLE";
    DriverStatusType["LoggedIn"] = "LOGGED IN";
    DriverStatusType["Busy"] = "BUSY";
    DriverStatusType["SoonAvailable"] = "SOON_AVAILABLE";
    DriverStatusType["HasCustomer"] = "HAS_CUSTOMER";
    DriverStatusType["NotLoggedIn"] = "NO_SESSION_SET";
    DriverStatusType["NoSessionFound"] = "NO_SESSION_FOUND_ERROR";
})(DriverStatusType || (DriverStatusType = {}));
class DriverStatus {
    constructor(statusType) {
        if (statusType) {
            this.status = statusType;
        }
    }
    get prevStatus() {
        return this._prevStatus;
    }
    get status() {
        return this._status;
    }
    set status(newType) {
        if (newType === (DriverStatusType.Unset
            || DriverStatusType.NoSessionFound)) {
            throw new Error(`Ststus "${DriverStatusType[newType]}" can not be manually set.`);
        }
        this._prevStatus = this.status;
        this._status = newType;
    }
    loggedIn() {
        return this.status !== (DriverStatusType.NotLoggedIn || DriverStatusType.NoSessionFound || DriverStatusType.Unset);
    }
    static parseFromStr(str) {
        let aType = DriverStatusType[str];
        return new DriverStatus(aType); //JsonConverter.toType<DriverStatusType>(str);
    }
}


/***/ }),

/***/ 1765:
/*!**************************************************!*\
  !*** ./src/app/shared/messages/message-types.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiAttributeType": () => (/* binding */ ApiAttributeType),
/* harmony export */   "Message": () => (/* binding */ Message),
/* harmony export */   "MsgType": () => (/* binding */ MsgType)
/* harmony export */ });
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
var MsgType;
(function (MsgType) {
    MsgType[MsgType["Ping"] = 222000] = "Ping";
    MsgType[MsgType["Pong"] = 100001] = "Pong";
    MsgType[MsgType["GetDriverUpdate"] = -40] = "GetDriverUpdate";
    MsgType[MsgType["DebugBooking"] = -30] = "DebugBooking";
    MsgType[MsgType["ShowDebug"] = -20] = "ShowDebug";
    MsgType[MsgType["Error"] = -10] = "Error";
    MsgType[MsgType["Connect"] = 0] = "Connect";
    MsgType[MsgType["Disconnect"] = 1] = "Disconnect";
    MsgType[MsgType["DriverLogin"] = 2] = "DriverLogin";
    MsgType[MsgType["DriverLogOut"] = 3] = "DriverLogOut";
    MsgType[MsgType["DriverGetInfo"] = 4] = "DriverGetInfo";
    MsgType[MsgType["DriverUpdate"] = 5] = "DriverUpdate";
    MsgType[MsgType["GetDriverOrder"] = 6] = "GetDriverOrder";
    MsgType[MsgType["GetOrdersBySession"] = 7] = "GetOrdersBySession";
    MsgType[MsgType["GetMessagesBySession"] = 8] = "GetMessagesBySession";
    MsgType[MsgType["AcceptOrder"] = 9] = "AcceptOrder";
    MsgType[MsgType["DenyOrder"] = 10] = "DenyOrder";
    MsgType[MsgType["CompleteOrder"] = 11] = "CompleteOrder";
    MsgType[MsgType["CustomerNoShow"] = 12] = "CustomerNoShow";
    MsgType[MsgType["CantCompleteOrder"] = 13] = "CantCompleteOrder";
    MsgType[MsgType["GetCars"] = 14] = "GetCars";
    MsgType[MsgType["SetCurrentCar"] = 15] = "SetCurrentCar";
    MsgType[MsgType["NeedReauthentication"] = 16] = "NeedReauthentication";
    MsgType[MsgType["LoggedOut"] = 17] = "LoggedOut";
    MsgType[MsgType["GetRawData"] = 544] = "GetRawData";
})(MsgType || (MsgType = {}));
class Message {
    static ofType(value, msg) {
        return value === ((msg === null || msg === void 0 ? void 0 : msg.type) ? msg.type : "");
    }
}
//////////////////////////////////////////////////
//
// Api Messages
//
var ApiAttributeType;
(function (ApiAttributeType) {
    ApiAttributeType["Error"] = "error";
    ApiAttributeType["Message"] = "information";
    ApiAttributeType["Information"] = "information";
})(ApiAttributeType || (ApiAttributeType = {}));


/***/ }),

/***/ 5564:
/*!*************************************!*\
  !*** ./src/app/tabs/tabs.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabsPageModule": () => (/* binding */ TabsPageModule)
/* harmony export */ });
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 4362);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _tabs_router_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabs.router.module */ 8345);
/* harmony import */ var _tabs_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tabs.page */ 7942);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */






class TabsPageModule {
}
TabsPageModule.ɵfac = function TabsPageModule_Factory(t) { return new (t || TabsPageModule)(); };
TabsPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: TabsPageModule });
TabsPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonicModule,
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _tabs_router_module__WEBPACK_IMPORTED_MODULE_0__.TabsPageRoutingModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](TabsPageModule, { declarations: [_tabs_page__WEBPACK_IMPORTED_MODULE_1__.TabsPage], imports: [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonicModule,
        _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
        _tabs_router_module__WEBPACK_IMPORTED_MODULE_0__.TabsPageRoutingModule], exports: [_tabs_page__WEBPACK_IMPORTED_MODULE_1__.TabsPage] }); })();


/***/ }),

/***/ 7942:
/*!***********************************!*\
  !*** ./src/app/tabs/tabs.page.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabsPage": () => (/* binding */ TabsPage)
/* harmony export */ });
/* harmony import */ var _nxApp_nx_app_manager_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nxApp/nx-app-manager.service */ 8823);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 4362);





function TabsPage_ion_tabs_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-tabs")(1, "ion-tab-bar", 1)(2, "ion-tab-button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "ion-icon", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Start");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "ion-badge");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "6");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "ion-tab-button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "ion-icon", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "K\u00F6p PRO");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "ion-badge", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "11");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "ion-tab-button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](15, "ion-icon", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Bokningar");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "ion-tab-button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](19, "ion-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "F\u00F6rbokningar");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
} }
class TabsPage {
    constructor(appService) {
        this.appService = appService;
    }
    //constructor(public menu: MenuController) { }
    ionViewWillEnter() {
        //	this.menu.enable(true);
    }
    ionTabsDidChange(event) {
        // console.log('ionTabsDidChange', event);
    }
}
TabsPage.ɵfac = function TabsPage_Factory(t) { return new (t || TabsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_nxApp_nx_app_manager_service__WEBPACK_IMPORTED_MODULE_0__.NxAppManagerService)); };
TabsPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: TabsPage, selectors: [["app-tabs"]], decls: 1, vars: 1, consts: [[4, "ngIf"], ["slot", "bottom"], ["tab", "app/start"], ["name", "calendar"], ["tab", "app/pro"], ["name", "person-circle"], ["color", "primary"], ["tab", "appo/orders"], ["name", "map"], ["tab", "about"], ["name", "information-circle"]], template: function TabsPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, TabsPage_ion_tabs_0_Template, 22, 0, "ion-tabs", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.appService.isLoggedIn === true);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonTabs, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonTabBar, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonTabButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonBadge], styles: ["ion-tab-button[_ngcontent-%COMP%] {\n  --color: var(--ion-color-medium-shade);\n  --color-selected: var(--ion-color-dark);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhYnMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0Usc0NBQUE7RUFDQSx1Q0FBQTtBQUFGIiwiZmlsZSI6InRhYnMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTm90ZTogIEFsbCB0aGUgQ1NTIHZhcmlhYmxlcyBkZWZpbmVkIGJlbG93IGFyZSBvdmVycmlkZXMgb2YgSW9uaWMgZWxlbWVudHMgQ1NTIEN1c3RvbSBQcm9wZXJ0aWVzXG5pb24tdGFiLWJ1dHRvbiB7XG4gIC0tY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGUpO1xuICAtLWNvbG9yLXNlbGVjdGVkOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG59XG4iXX0= */"] });


/***/ }),

/***/ 8345:
/*!********************************************!*\
  !*** ./src/app/tabs/tabs.router.module.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabsPageRoutingModule": () => (/* binding */ TabsPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _coldmind_core_cm_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../coldmind/core/cm-auth-guard */ 5435);
/* harmony import */ var _tabs_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tabs.page */ 7942);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);





const routes = [
    {
        path: '',
        component: _tabs_page__WEBPACK_IMPORTED_MODULE_1__.TabsPage,
        children: [
            {
                path: '',
                redirectTo: 'categories',
                pathMatch: 'full'
            },
            {
                path: 'app',
                canActivateChild: [new _coldmind_core_cm_auth_guard__WEBPACK_IMPORTED_MODULE_0__.CmAuthChildGuard()],
                children: [
                    {
                        path: 'start',
                        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_start_start_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../pages/start/start.module */ 9243)).then(m => m.StartPageModule)
                    },
                    {
                        path: 'messages',
                        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_messages_messages_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../pages/messages/messages.module */ 5183)).then(m => m.MessagesPageModule)
                    },
                    {
                        path: 'mess',
                        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_notifications_notifications_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../notifications/notifications.module */ 9182)).then(m => m.NotificationsPageModule)
                    }
                ]
            }
        ]
    }
];
class TabsPageRoutingModule {
}
TabsPageRoutingModule.ɵfac = function TabsPageRoutingModule_Factory(t) { return new (t || TabsPageRoutingModule)(); };
TabsPageRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: TabsPageRoutingModule });
TabsPageRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)
        ], _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](TabsPageRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which00ds file can be found in `.angular-cli.json`.
const environment = {
    production: false,
    apiEndpoint: "http://localhost:3000",
    webSocketUrl: "http://localhost:3001",
    firebase: {
        apiKey: 'AIzaSyC5QK355uuknu0_ldVxFqqNqgp9oJi_eLc',
        authDomain: 'ion4fullpwa.firebaseapp.com',
        databaseURL: 'https://ion4fullpwa.firebaseio.com',
        projectId: 'ion4fullpwa',
        storageBucket: 'ion4fullpwa.appspot.com'
    },
    appShellConfig: {
        debug: false,
        networkDelay: 500
    }
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
document.addEventListener('DOMContentLoaded', () => {
    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
        .catch(err => console.log(err));
});


/***/ }),

/***/ 4601:
/*!*************************************************!*\
  !*** ../../shared/driver/driver-car-options.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DriverCarOptions": () => (/* binding */ DriverCarOptions)
/* harmony export */ });
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
class DriverCarOptions {
    constructor() {
    }
    fromObj(data) {
        this.carId = data === null || data === void 0 ? void 0 : data.id;
        this.babySeats = Number.parseInt(data.baby_seats);
        this.childSeats = Number.parseInt(data.child_seats);
        this.boosterSeats = Number.parseInt(data.booster_seats);
        this.hasShield = Number.parseInt(data.has_shield) >= 1;
        this.animalsInCage = Number.parseInt(data.animals_in_cage) >= 1;
        this.animalsWhitoutCaghe = Number.parseInt(data.animals_without_cage) >= 1;
        return this;
    }
    compile() {
        let values = new Array();
        values.push(`car_id=${this.carId}`);
        values.push(`baby_seats=${this.babySeats}`);
        values.push(`child_seats=${this.childSeats}`);
        values.push(`booster_seats=${this.boosterSeats}`);
        values.push(`has_shield=${this.hasShield}`);
        values.push(`animals_in_cage=${this.animalsInCage}`);
        values.push(`animals_without_cage=${this.animalsWhitoutCaghe}`);
        return values.join("&");
    }
    toSloppyJson(data) {
        return JSON.stringify(this);
    }
}


/***/ }),

/***/ 9102:
/*!********************************************!*\
  !*** ../../shared/driver/driver-status.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DriverStatus": () => (/* binding */ DriverStatus),
/* harmony export */   "DriverStatusType": () => (/* binding */ DriverStatusType)
/* harmony export */ });
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
var DriverStatusType;
(function (DriverStatusType) {
    DriverStatusType["Unset"] = "UNSET";
    DriverStatusType["Unknown"] = "UNKNOWN";
    DriverStatusType["Available"] = "AVAILABLE";
    DriverStatusType["LoggedIn"] = "LOGGED IN";
    DriverStatusType["Busy"] = "BUSY";
    DriverStatusType["SoonAvailable"] = "SOON_AVAILABLE";
    DriverStatusType["HasCustomer"] = "HAS_CUSTOMER";
    DriverStatusType["NotLoggedIn"] = "NO_SESSION_SET";
    DriverStatusType["NoSessionFound"] = "NO_SESSION_FOUND_ERROR";
})(DriverStatusType || (DriverStatusType = {}));
class DriverStatus {
    constructor(statusType) {
        this._prevStatus = DriverStatusType.Unset;
        this._status = DriverStatusType.Unset;
        if (statusType) {
            this.status = statusType;
        }
    }
    get prevStatus() {
        return this._prevStatus;
    }
    get status() {
        return this._status;
    }
    set status(newType) {
        if (newType === (DriverStatusType.Unset
            || DriverStatusType.NoSessionFound)) {
            throw new Error(`Ststus "${DriverStatusType[newType]}" can not be manually set.`);
        }
        this._prevStatus = this.status;
        this._status = newType;
    }
    loggedIn() {
        return this.status !== (DriverStatusType.NotLoggedIn || DriverStatusType.NoSessionFound || DriverStatusType.Unset);
    }
    static parseFromStr(str) {
        let aType = DriverStatusType[str];
        return new DriverStatus(aType); //JsonConverter.toType<DriverStatusType>(str);
    }
}


/***/ }),

/***/ 729:
/*!**********************************************!*\
  !*** ../../shared/messages/message-types.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiAttributeType": () => (/* binding */ ApiAttributeType),
/* harmony export */   "Message": () => (/* binding */ Message),
/* harmony export */   "MsgType": () => (/* binding */ MsgType)
/* harmony export */ });
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
var MsgType;
(function (MsgType) {
    MsgType[MsgType["Ping"] = 222000] = "Ping";
    MsgType[MsgType["Pong"] = 100001] = "Pong";
    MsgType[MsgType["UpdateDriverData"] = -40] = "UpdateDriverData";
    MsgType[MsgType["DebugBooking"] = -30] = "DebugBooking";
    MsgType[MsgType["ShowDebug"] = -20] = "ShowDebug";
    MsgType[MsgType["Error"] = -10] = "Error";
    MsgType[MsgType["Connect"] = 0] = "Connect";
    MsgType[MsgType["Disconnect"] = 1] = "Disconnect";
    MsgType[MsgType["DriverLogin"] = 2] = "DriverLogin";
    MsgType[MsgType["DriverLogOut"] = 3] = "DriverLogOut";
    MsgType[MsgType["DriverGetInfo"] = 4] = "DriverGetInfo";
    MsgType[MsgType["DriverUpdate"] = 5] = "DriverUpdate";
    MsgType[MsgType["GetDriverOrder"] = 6] = "GetDriverOrder";
    MsgType[MsgType["GetOrdersBySession"] = 7] = "GetOrdersBySession";
    MsgType[MsgType["GetMessagesBySession"] = 8] = "GetMessagesBySession";
    MsgType[MsgType["AcceptOrder"] = 9] = "AcceptOrder";
    MsgType[MsgType["DenyOrder"] = 10] = "DenyOrder";
    MsgType[MsgType["CompleteOrder"] = 11] = "CompleteOrder";
    MsgType[MsgType["CustomerNoShow"] = 12] = "CustomerNoShow";
    MsgType[MsgType["CantCompleteOrder"] = 13] = "CantCompleteOrder";
    MsgType[MsgType["GetCars"] = 14] = "GetCars";
    MsgType[MsgType["SetCurrentCar"] = 15] = "SetCurrentCar";
    MsgType[MsgType["NeedReauthentication"] = 16] = "NeedReauthentication";
    MsgType[MsgType["LoggedOut"] = 17] = "LoggedOut";
    MsgType[MsgType["SetDriverStatus"] = 18] = "SetDriverStatus";
    MsgType[MsgType["SetDriverBusy"] = 19] = "SetDriverBusy";
    MsgType[MsgType["GetRawData"] = 544] = "GetRawData";
})(MsgType || (MsgType = {}));
class Message {
    static ofType(value, msg) {
        return value === (msg.type ? msg.type : "");
    }
}
//////////////////////////////////////////////////
//
// Api Messages
//
var ApiAttributeType;
(function (ApiAttributeType) {
    ApiAttributeType["Error"] = "error";
    ApiAttributeType["Message"] = "information";
    ApiAttributeType["Information"] = "information";
})(ApiAttributeType || (ApiAttributeType = {}));


/***/ }),

/***/ 1060:
/*!****************************************!*\
  !*** ../../shared/utils/data.utils.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataTypeInfo": () => (/* binding */ DataTypeInfo),
/* harmony export */   "DataUtils": () => (/* binding */ DataUtils)
/* harmony export */ });
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
var DataTypeInfo;
(function (DataTypeInfo) {
    DataTypeInfo[DataTypeInfo["string"] = 0] = "string";
    DataTypeInfo[DataTypeInfo["object"] = 1] = "object";
    DataTypeInfo[DataTypeInfo["undefined"] = 2] = "undefined";
    DataTypeInfo[DataTypeInfo["boolean"] = 3] = "boolean";
    DataTypeInfo[DataTypeInfo["function"] = 4] = "function";
    DataTypeInfo[DataTypeInfo["number"] = 5] = "number";
    DataTypeInfo[DataTypeInfo["bigint"] = 6] = "bigint";
    DataTypeInfo[DataTypeInfo["symbol"] = 7] = "symbol";
})(DataTypeInfo || (DataTypeInfo = {}));
class DataUtils {
    static getDataType(obj) {
        let result = DataTypeInfo.undefined;
        let typeName = typeof obj;
        switch (typeName) {
            case "string":
                result = DataTypeInfo.string;
                break;
            case "object":
                result = DataTypeInfo.object;
                break;
            case "undefined":
                result = DataTypeInfo.undefined;
                break;
            case "boolean":
                result = DataTypeInfo.boolean;
                break;
            case "function":
                result = DataTypeInfo.function;
                break;
            case "number":
                result = DataTypeInfo.number;
                break;
            case "bigint":
                result = DataTypeInfo.bigint;
                break;
            case "symbol":
                result = DataTypeInfo.symbol;
                break;
        }
        return result;
    }
    static arrayIsEmpty(value) {
        let result = true;
        let arrVal = value;
        if (!(Array.isArray(arrVal) && !arrVal[0])) {
            result = false;
        }
        return result;
    }
    static ensureArray(value) {
        if (!Array.isArray(value)) {
            value = [];
        }
        return value;
    }
    /**
     * Determine if provided object is of type string
     * @param value
     * @returns {boolean}
     */
    static isString(value) {
        return DataUtils.getDataType(value) === DataTypeInfo.string;
    }
    /**
     * Determine if provided object is of type string or number
     * @param value
     * @returns {boolean}
     */
    static isStrOrNum(value) {
        const dataType = DataUtils.getDataType(value);
        let strValue = "";
        return (dataType === DataTypeInfo.string ||
            dataType === DataTypeInfo.number ||
            dataType === DataTypeInfo.bigint);
    }
}


/***/ }),

/***/ 1224:
/*!***************************************!*\
  !*** ../../shared/utils/var.utils.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VarUtils": () => (/* binding */ VarUtils)
/* harmony export */ });
/* harmony import */ var _data_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.utils */ 1060);
/**
 * Copyright (c) 2018 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

class VarUtils {
    /**
     * Returns a string of a given length filled with given char value
     * @param {string} charValue - value to fill
     * @param {number} length - number of repeats
     * @returns {string}
     */
    static fillChar(charValue, length) {
        let result = "";
        for (let i = 0; i < length; i++) {
            result += charValue;
        }
        return result;
    }
    static isString(value) {
        return value !== null && (typeof value === "string") && value.length > 0;
    }
    static typesEqual(type1, type2) {
        return type1 !== null && type2 && (typeof type1 === typeof type2);
    }
    /**
     * Ensure a non null value of certain trype
     * @param val
     * @param {T} defValue
     * @returns {T}
     */
    static ensure(val, defValue) {
        val = !val && defValue ? defValue : val;
        let val2 = val;
        return VarUtils.typesEqual(val, defValue) ? val : JSON.parse("");
    }
    static isEmpty(str) {
        return (str == null) || (VarUtils.typesEqual(str, "") && str.length < 1);
    }
    /*
    public static isString(value: any): boolean {
        return (typeof value === "string");
    }
    */
    /**
 * Deterine if a string is of numeric value
 * @param {string} value
 * @returns {boolean}
 */
    static isNumeric(value) {
        const dataType = _data_utils__WEBPACK_IMPORTED_MODULE_0__.DataUtils.getDataType(value);
        let strValue = "";
        if (value) {
            strValue = JSON.stringify(value);
        }
        return (!isNaN(Number(strValue)));
    }
    /**
     * Wrapper metod for string replace
     * @param {string} source
     * @param {string} find
     * @param replaceWith
     * @returns {string}
     */
    static replaceStr(source, find, replaceWith) {
        return source.replace(find, String(replaceWith));
    }
}
VarUtils.replaceEx = function (originalString, oldValue, newValue, ignoreCase = false) {
    //
    // if invalid vendorBaskets, return the original string
    //
    if ((originalString == null) || (oldValue == null) || (newValue == null) || (oldValue.length == 0))
        return (originalString);
    //
    // replace oldValue with newValue
    //
    let Flags = (ignoreCase) ? "gi" : "g", pattern = oldValue.replace(/[-\[\]\/{}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), str = originalString.replace(new RegExp(pattern, Flags), newValue);
    return str;
};


/***/ }),

/***/ 863:
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/ lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
  \******************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./ion-action-sheet.entry.js": [
		5593,
		"common",
		"node_modules_ionic_core_dist_esm_ion-action-sheet_entry_js"
	],
	"./ion-alert.entry.js": [
		3225,
		"common",
		"node_modules_ionic_core_dist_esm_ion-alert_entry_js"
	],
	"./ion-app_8.entry.js": [
		4812,
		"common",
		"node_modules_ionic_core_dist_esm_ion-app_8_entry_js"
	],
	"./ion-avatar_3.entry.js": [
		6655,
		"common",
		"node_modules_ionic_core_dist_esm_ion-avatar_3_entry_js"
	],
	"./ion-back-button.entry.js": [
		4856,
		"common",
		"node_modules_ionic_core_dist_esm_ion-back-button_entry_js"
	],
	"./ion-backdrop.entry.js": [
		3059,
		"node_modules_ionic_core_dist_esm_ion-backdrop_entry_js"
	],
	"./ion-button_2.entry.js": [
		8308,
		"common",
		"node_modules_ionic_core_dist_esm_ion-button_2_entry_js"
	],
	"./ion-card_5.entry.js": [
		4690,
		"common",
		"node_modules_ionic_core_dist_esm_ion-card_5_entry_js"
	],
	"./ion-checkbox.entry.js": [
		4090,
		"common",
		"node_modules_ionic_core_dist_esm_ion-checkbox_entry_js"
	],
	"./ion-chip.entry.js": [
		6214,
		"common",
		"node_modules_ionic_core_dist_esm_ion-chip_entry_js"
	],
	"./ion-col_3.entry.js": [
		9447,
		"node_modules_ionic_core_dist_esm_ion-col_3_entry_js"
	],
	"./ion-datetime_3.entry.js": [
		9689,
		"common",
		"node_modules_ionic_core_dist_esm_ion-datetime_3_entry_js"
	],
	"./ion-fab_3.entry.js": [
		8840,
		"common",
		"node_modules_ionic_core_dist_esm_ion-fab_3_entry_js"
	],
	"./ion-img.entry.js": [
		749,
		"node_modules_ionic_core_dist_esm_ion-img_entry_js"
	],
	"./ion-infinite-scroll_2.entry.js": [
		9667,
		"node_modules_ionic_core_dist_esm_ion-infinite-scroll_2_entry_js"
	],
	"./ion-input.entry.js": [
		3288,
		"common",
		"node_modules_ionic_core_dist_esm_ion-input_entry_js"
	],
	"./ion-item-option_3.entry.js": [
		5473,
		"common",
		"node_modules_ionic_core_dist_esm_ion-item-option_3_entry_js"
	],
	"./ion-item_8.entry.js": [
		3634,
		"common",
		"node_modules_ionic_core_dist_esm_ion-item_8_entry_js"
	],
	"./ion-loading.entry.js": [
		2855,
		"common",
		"node_modules_ionic_core_dist_esm_ion-loading_entry_js"
	],
	"./ion-menu_3.entry.js": [
		495,
		"common",
		"node_modules_ionic_core_dist_esm_ion-menu_3_entry_js"
	],
	"./ion-modal.entry.js": [
		8737,
		"common",
		"node_modules_ionic_core_dist_esm_ion-modal_entry_js"
	],
	"./ion-nav_2.entry.js": [
		9632,
		"common",
		"node_modules_ionic_core_dist_esm_ion-nav_2_entry_js"
	],
	"./ion-popover.entry.js": [
		8050,
		"common",
		"node_modules_ionic_core_dist_esm_ion-popover_entry_js"
	],
	"./ion-progress-bar.entry.js": [
		8994,
		"common",
		"node_modules_ionic_core_dist_esm_ion-progress-bar_entry_js"
	],
	"./ion-radio_2.entry.js": [
		3592,
		"common",
		"node_modules_ionic_core_dist_esm_ion-radio_2_entry_js"
	],
	"./ion-range.entry.js": [
		5454,
		"common",
		"node_modules_ionic_core_dist_esm_ion-range_entry_js"
	],
	"./ion-refresher_2.entry.js": [
		290,
		"common",
		"node_modules_ionic_core_dist_esm_ion-refresher_2_entry_js"
	],
	"./ion-reorder_2.entry.js": [
		2666,
		"common",
		"node_modules_ionic_core_dist_esm_ion-reorder_2_entry_js"
	],
	"./ion-ripple-effect.entry.js": [
		4816,
		"node_modules_ionic_core_dist_esm_ion-ripple-effect_entry_js"
	],
	"./ion-route_4.entry.js": [
		5534,
		"common",
		"node_modules_ionic_core_dist_esm_ion-route_4_entry_js"
	],
	"./ion-searchbar.entry.js": [
		4902,
		"common",
		"node_modules_ionic_core_dist_esm_ion-searchbar_entry_js"
	],
	"./ion-segment_2.entry.js": [
		1938,
		"common",
		"node_modules_ionic_core_dist_esm_ion-segment_2_entry_js"
	],
	"./ion-select_3.entry.js": [
		8179,
		"common",
		"node_modules_ionic_core_dist_esm_ion-select_3_entry_js"
	],
	"./ion-slide_2.entry.js": [
		668,
		"node_modules_ionic_core_dist_esm_ion-slide_2_entry_js"
	],
	"./ion-spinner.entry.js": [
		1624,
		"common",
		"node_modules_ionic_core_dist_esm_ion-spinner_entry_js"
	],
	"./ion-split-pane.entry.js": [
		9989,
		"node_modules_ionic_core_dist_esm_ion-split-pane_entry_js"
	],
	"./ion-tab-bar_2.entry.js": [
		8902,
		"common",
		"node_modules_ionic_core_dist_esm_ion-tab-bar_2_entry_js"
	],
	"./ion-tab_2.entry.js": [
		199,
		"common",
		"node_modules_ionic_core_dist_esm_ion-tab_2_entry_js"
	],
	"./ion-text.entry.js": [
		8395,
		"common",
		"node_modules_ionic_core_dist_esm_ion-text_entry_js"
	],
	"./ion-textarea.entry.js": [
		6357,
		"common",
		"node_modules_ionic_core_dist_esm_ion-textarea_entry_js"
	],
	"./ion-toast.entry.js": [
		8268,
		"common",
		"node_modules_ionic_core_dist_esm_ion-toast_entry_js"
	],
	"./ion-toggle.entry.js": [
		5269,
		"common",
		"node_modules_ionic_core_dist_esm_ion-toggle_entry_js"
	],
	"./ion-virtual-scroll.entry.js": [
		2875,
		"node_modules_ionic_core_dist_esm_ion-virtual-scroll_entry_js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 863;
module.exports = webpackAsyncContext;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map