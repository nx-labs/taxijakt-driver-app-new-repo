/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';
import { NxComponentsModule } from "../../nx-app/components/nx-components.module";
import { OrdersPage } from './orders.page';
const routes = [
    {
        path: '',
        component: OrdersPage
    }
];
let OrdersPageModule = class OrdersPageModule {
};
OrdersPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            IonicModule,
            RouterModule.forChild(routes),
            ComponentsModule,
            NxComponentsModule
        ],
        declarations: [OrdersPage]
    })
], OrdersPageModule);
export { OrdersPageModule };
