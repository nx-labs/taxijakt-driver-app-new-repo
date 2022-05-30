/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { IonicModule }           from '@ionic/angular';
import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';
import { FormsModule }           from '@angular/forms';
import { TabsPageRoutingModule } from './tabs.router.module';
import { TabsPage }              from './tabs.page';

@NgModule(
	{
		imports     : [
			IonicModule,
			CommonModule,
			FormsModule,
			TabsPageRoutingModule
		],
		exports     : [
			TabsPage
		],
		declarations: [ TabsPage ]
	})
export class TabsPageModule {
}
