/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { IonicModule }      from '@ionic/angular';
import { RouterModule }     from '@angular/router';
import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { MapsPage }         from './maps.page';
import { ComponentsModule } from '../components/components.module';

@NgModule(
	{
		imports:      [
			IonicModule,
			CommonModule,
			ComponentsModule,
			RouterModule.forChild([{ path: '', component: MapsPage }])
		],
		declarations: [MapsPage]
	})
export class MapsPageModule {
}
