/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { CommonModule }            from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA }  from "@angular/core";
import { NgModule }                from "@angular/core";
import { IonicModule }             from "@ionic/angular";
import { NxDriverStatusComponent } from "@nxApp/components/nx-driver-status/nx-driver-status.component";
import { NxHeaderComponent }       from "@nxApp/components/nx-header/nx-header.component";
import { NxModalsModule }          from "../modals/nx-modals.module";

@NgModule(
	{
		imports     : [
			CommonModule,
			IonicModule,
			NxModalsModule
		],
		declarations: [
			NxHeaderComponent,
			NxDriverStatusComponent
		],
		exports: [
			NxDriverStatusComponent,
			NxHeaderComponent
		],
		schemas     : [
			CUSTOM_ELEMENTS_SCHEMA
		]
	})
export class NxComponentsModule { }
