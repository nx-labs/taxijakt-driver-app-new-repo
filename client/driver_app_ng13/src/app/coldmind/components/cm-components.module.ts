import { CommonModule }               from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA }     from "@angular/core";
import { NgModule }                   from "@angular/core";
import { IonicModule }                from "@ionic/angular";
import { NxDriverStatusComponent }    from "../../nx-app/components/nx-driver-status/nx-driver-status.component";
import { NxModalsModule }             from "../../nx-app/modals/nx-modals.module";
import { CmMessengerStatusComponent } from "./cm-messenger-status/cm-messenger-status.component";

/**
 * Copyright (c) 2018 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary, unlicensed this piece of software is under the most restrictive model.
 * There are commercial licensing available which then falls under the license model
 * described in GPL V2.1 (https://www.gnu.org/licenses/old-licenses/lgpl-2.1.en.html)
 *
 * @license
 * Dual license
 *
 * @description:
 *
 * @author
 * Patrik Forsberg<patrik.forsberg@coldmind.com> on 2018-04-12
 *
 */
@NgModule(
	{
		imports     : [
			CommonModule,
			IonicModule,

		],
		declarations: [
			CmMessengerStatusComponent
		],
		exports     : [
		],
		schemas     : [
			CUSTOM_ELEMENTS_SCHEMA
		]
	})
export class CmComponentsModule {

}
