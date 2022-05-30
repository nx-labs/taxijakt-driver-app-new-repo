/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { RouterModule }       from "@angular/router";
import { Routes }             from "@angular/router";
import { IonicModule }        from '@ionic/angular';
import { ComponentsModule }   from '@components/components.module';
import { NxComponentsModule } from "@nxApp/components/nx-components.module";
import { TermsOfServicePage } from "@root/pages/terms-of-service/terms-of-service.page";

const routes: Routes = [
	{
		path     : '',
		component: TermsOfServicePage
	}
];

@NgModule(
	{
		imports: [
			CommonModule,
			IonicModule,
			RouterModule.forChild(routes),
			ComponentsModule,
			NxComponentsModule,
		],
		declarations: [ TermsOfServicePage ]
	}
)
export class TermsOfServicePageModule {}
