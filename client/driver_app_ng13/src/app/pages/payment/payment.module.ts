/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';
import { IonicModule }              from '@ionic/angular';
import { NxComponentsModule }       from "@nxApp/components/nx-components.module";
import { PaymentPageRoutingModule } from './payment-routing.module';
import { PaymentPage }              from './payment.page';

@NgModule(
	{
		imports: [
			CommonModule,
			FormsModule,
			IonicModule,
			PaymentPageRoutingModule,
			NxComponentsModule
		],
		declarations: [PaymentPage]
	})
export class PaymentPageModule {
}
