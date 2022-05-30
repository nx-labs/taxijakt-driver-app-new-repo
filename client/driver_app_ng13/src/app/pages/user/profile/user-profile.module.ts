/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormsModule }            from '@angular/forms';
import { Routes, RouterModule }   from '@angular/router';
import { IonicModule }       from '@ionic/angular';
import { NxComponentsModule } from "../../../nx-app/components/nx-components.module";
import { UserProfilePage }   from './user-profile.page';
import { ComponentsModule }  from '../../../components/components.module';
import { LanguageService }   from '../../../core/language/language.service';
import { TranslateModule }   from '@ngx-translate/core';

const routes: Routes = [
	{
		path     : '',
		component: null,
		resolve  : {
			data: null
		}
	}
];

@NgModule(
	{
		imports     : [
			IonicModule,
			CommonModule,
			FormsModule,
			TranslateModule,
			ComponentsModule,
			RouterModule.forChild(routes),
			NxComponentsModule
		],
		declarations: [
			UserProfilePage
		],
		providers   : [
			LanguageService
		],
		schemas     : [
			CUSTOM_ELEMENTS_SCHEMA
		]
	})
export class UserProfilePageModule {
}
