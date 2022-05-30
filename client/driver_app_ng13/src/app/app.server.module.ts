import { NgModule }                  from '@angular/core';
import { ServerModule }              from '@angular/platform-server';
import { ServerTransferStateModule } from '@angular/platform-server';
import { HTTP_INTERCEPTORS }         from '@angular/common/http';

// Tell Ionic components how to render on the server
import { IonicServerModule } from '@ionic/angular-server';

import { AppModule }            from './app.module';
import { AppComponent }         from './app.component';

@NgModule(
	{
		imports:   [
			AppModule,
			ServerModule,
			ServerTransferStateModule,
			IonicServerModule
		],
		bootstrap: [AppComponent],
	})
export class AppServerModule {
}
