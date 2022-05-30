/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule }             from '@angular/router';
import { IonicModule }                      from '@ionic/angular';
import { NxComponentsModule }               from "@nxApp/components/nx-components.module";
import { ComponentsModule }                 from '../../components/components.module';
import { SignupPage }                       from './signup.page';
import { TermsOfServicePage }               from '../terms-of-service/terms-of-service.page';
import { PrivacyPolicyPage }                from '../privacy-policy/privacy-policy.page';

const routes: Routes = [
	{
		path:      '',
		component: SignupPage
	}
];

@NgModule(
	{
		imports: [
			CommonModule,
			FormsModule,
			ReactiveFormsModule,
			IonicModule,
			RouterModule.forChild(routes),
			ComponentsModule,
			NxComponentsModule
		],
		declarations: [SignupPage, PrivacyPolicyPage]
	})
export class SignupPageModule {
}
