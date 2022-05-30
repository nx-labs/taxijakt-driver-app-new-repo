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

import { CommonModule }            from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA }  from "@angular/core";
import { NgModule }                from "@angular/core";
import { IonicModule }             from "@ionic/angular";
import { BoxshadowDirective }      from './directives/boxshadow.directive';
import { FunybuttonDirective }     from './directives/funybutton.directive';
import { NxModalsModule }          from "./modals/nx-modals.module";


@NgModule(
	{
		imports     : [
			CommonModule,
			IonicModule,
			NxModalsModule
		],
		declarations: [
			BoxshadowDirective,
			FunybuttonDirective,
		],
		exports     : [
		],
		schemas     : [
			CUSTOM_ELEMENTS_SCHEMA
		]
	})
export class NxAppModule { }
