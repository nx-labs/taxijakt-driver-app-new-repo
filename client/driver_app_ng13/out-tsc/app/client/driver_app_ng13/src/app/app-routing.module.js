/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
const routes = [
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    },
    {
        path: 'auth/login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'auth/signup',
        loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
    },
    {
        path: 'auth/forgot-password',
        loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
    },
    {
        path: 'app',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'app/start',
        loadChildren: () => import('./pages/start/start.module').then(m => m.StartPageModule)
    },
    {
        path: 'app/settings',
        loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
    },
    {
        path: 'app/orders',
        loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersPageModule)
    },
    {
        path: 'app/pro',
        loadChildren: () => import('./pages/payment/payment.module').then(m => m.PaymentPageModule)
    },
    {
        path: 'contact-card',
        loadChildren: () => import('./pages/contact-card/contact-card.module').then(m => m.ContactCardPageModule)
    },
    {
        path: 'forms-and-validations',
        loadChildren: () => import('./forms/validations/forms-validations.module').then(m => m.FormsValidationsPageModule)
    },
    {
        path: 'forms-filters',
        loadChildren: () => import('./forms/filters/forms-filters.module').then(m => m.FormsFiltersPageModule)
    },
    {
        path: 'internal-error',
        loadChildren: () => import('./pages/page-internal-error/page-not-found.module').then(m => m.PageNotFoundModule)
    },
    {
        path: 'maps',
        loadChildren: () => import('./maps/maps.module').then(m => m.MapsPageModule)
    },
    {
        path: '**',
        redirectTo: 'page-internal-error'
    },
    {
        path: 'payment',
        loadChildren: () => import('./pages/payment/payment.module').then(m => m.PaymentPageModule)
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes, {
                // This value is required for server-side rendering to work.
                initialNavigation: 'enabled',
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled'
            })
        ],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
