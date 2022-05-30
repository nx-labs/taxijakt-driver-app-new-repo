/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { NgModule }             from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
	{
		path      : "",
		redirectTo: "/auth/login",
		pathMatch : "full"
	},
	{
		path        : "auth/login",
		loadChildren: () => import("./pages/login/login.module").then(m => m.LoginPageModule)
	},
	{
		path        : "terms",
		loadChildren: () => import("./pages/terms-of-service/terms-of-service.module").then(m => m.TermsOfServicePageModule)
	},
	{
		path        : "auth/signup",
		loadChildren: () => import("./pages/signup/signup.module").then(m => m.SignupPageModule)
	},
	{
		path        : "auth/forgot-password",
		loadChildren: () => import("./pages/forgot-password/forgot-password.module").then(m => m.ForgotPasswordPageModule)
	},
	{
		path        : "app",
		loadChildren: () => import("./tabs/tabs.module").then(m => m.TabsPageModule)
	},
	{
		path        : "app/start",
		loadChildren: () => import("./pages/start/start.module").then(m => m.StartPageModule)
	},
	{
		path        : "app/settings",
		loadChildren: () => import("./pages/settings/settings.module").then(m => m.SettingsPageModule)
	},
	{
		path        : "app/orders",
		loadChildren: () => import("./pages/orders/orders.module").then(m => m.OrdersPageModule)
	},
	{
		path        : "app/pro",
		loadChildren: () => import("./pages/payment/payment.module").then(m => m.PaymentPageModule)
	},
	{
		path        : "app/messages",
		loadChildren: () => import("./pages/messages/messages.module").then(m => m.MessagesPageModule)
	},
	{
		path        : "internal-error",
		loadChildren: () => import("./pages/page-internal-error/page-not-found.module").then(m => m.PageNotFoundModule)
	},
	{
		path      : "**",
		redirectTo: "page-internal-error"
	},
	{
		path        : "payment",
		loadChildren: () => import("./pages/payment/payment.module").then(m => m.PaymentPageModule)
	}
];

@NgModule(
	{
		imports: [
			RouterModule.forRoot(routes, {
				// This value is required for server-side rendering to work.
				initialNavigation        : "enabled",
				scrollPositionRestoration: "enabled",
				anchorScrolling          : "enabled"
			})
		],
		exports: [ RouterModule ]
	})
export class AppRoutingModule {
}
