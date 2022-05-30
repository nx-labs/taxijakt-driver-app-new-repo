/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { NgModule }                        from '@angular/core';
import { BrowserModule }                   from '@angular/platform-browser';
import { BrowserTransferStateModule }      from '@angular/platform-browser';
import { RouteReuseStrategy }              from '@angular/router';
import { GeoService }                      from "@core/services/geo.service";
import { TabsService }                     from "@core/services/tabs.service";
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ServiceWorkerModule }             from '@angular/service-worker';
import { TranslateModuleConfig } from "@ngx-translate/core";
import { NxAppManagerService }   from "@nxApp/nx-app-manager.service";
import { NxComponentsModule }    from "@nxApp/components/nx-components.module";
import { NxEventService }                  from "@nxApp/events/nx-event.service";
import { ComponentsModule }                from '@components/components.module';
import { NxAppModule }                     from "@nxApp/nx-app.module";
import { AppNavService }                   from "@nxApp/services/app-nav.service";
import { DriverService }                   from "@nxApp/services/driver/driver.service";
import { NxAppService }                    from "@nxApp/services/nx-app.service";
import { ApiFactory }                      from "@api/api-factory";
import { DriverApiService }                from "@api/driver-api.service";
import { OrderApiService }                 from "@api/order-api.service";
import { AppRoutingModule }                 from './app-routing.module';
import { AppComponent }                     from './app.component';
import { environment }                      from '../environments/environment';
import { ReactiveFormsModule }              from '@angular/forms';
import { HttpClientModule, HttpClient }     from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader }              from '@ngx-translate/http-loader';
import { ApiClientService }                 from "@core/services/api-client.service";
import { SocketIoModule }                   from 'ngx-socket-io';
import { SocketIoConfig }                   from 'ngx-socket-io';
import { LoggingService }                   from "@core/services/logging.service";
import { SocketService }                    from "@core/services/socket.service";
import { TabsPageModule }                   from "./tabs/tabs.module";
import { IonicStorageModule }               from '@ionic/storage-angular';
import { CUSTOM_ELEMENTS_SCHEMA }           from '@angular/core';

const socketIoConfig: SocketIoConfig = {
	url    : environment.webSocketUrl,
	options: {
		autoConnect: true,
		transports : [ 'websocket' ]
	}
}

const translateConfig: TranslateModuleConfig = {
	loader: {
		provide   : TranslateLoader,
		useFactory: ( createTranslateLoader ),
		deps      : [ HttpClient ]
	}
}

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule(
	{
		declarations: [
			AppComponent
		],
		imports     : [
			BrowserModule.withServerTransition({ appId: 'serverApp' }),
			BrowserTransferStateModule,
			IonicModule.forRoot(),
			ReactiveFormsModule,
			AppRoutingModule,
			HttpClientModule,
			NxAppModule,
			ComponentsModule,
			NxComponentsModule,
			ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
			SocketIoModule.forRoot(socketIoConfig),
			TranslateModule.forRoot(translateConfig),
			IonicStorageModule.forRoot(),
			TabsPageModule
		],
		providers   : [
			{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
			GeoService,
			TabsService,
			ApiClientService,
			ApiFactory,
			SocketService,
			GeoService,
			LoggingService,
			NxAppService,
			NxEventService,
			DriverApiService,
			DriverService,
			OrderApiService,
			AppNavService,
			NxAppService

		],
		bootstrap   : [ AppComponent ],
		schemas     : [ CUSTOM_ELEMENTS_SCHEMA ]
	})
export class AppModule {
}
