/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { IonicModule }             from '@ionic/angular';
import { RouterModule, Routes }    from '@angular/router';
import { NgModule }                from '@angular/core';
import { CommonModule }            from '@angular/common';
import { ComponentsModule }        from '../../components/components.module';
import { NxComponentsModule }      from "../../nx-app/components/nx-components.module";
import { StartPage }               from './start.page';

const categoriesRoutes: Routes = [
	{
		path:      '',
		component: StartPage
	}
];

@NgModule(
	{
		imports: [
			IonicModule,
			CommonModule,
			RouterModule.forChild(categoriesRoutes),
			ComponentsModule,
			NxComponentsModule
		],
		declarations: [
			StartPage
		]
	})
export class StartPageModule {
}
