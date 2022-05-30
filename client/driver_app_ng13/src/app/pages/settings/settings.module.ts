/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';
import { ReactiveFormsModule }  from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule }          from '@ionic/angular';
import { ComponentsModule }     from '../../components/components.module';
import { SettingsPage }         from './settings.page';

const routes: Routes = [
	{
		path     : '',
		component: SettingsPage
	}
];

@NgModule(
	{
		imports     : [
			CommonModule,
			FormsModule,
			ReactiveFormsModule,
			IonicModule,
			RouterModule.forChild(routes),
			ComponentsModule
		],
		declarations: [ SettingsPage ]
	})
export class SettingsPageModule {
}
