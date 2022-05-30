/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __decorate } from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { NxComponentsModule } from "../../nx-app/components/nx-components.module";
import { StartPage } from './start.page';
const categoriesRoutes = [
    {
        path: '',
        component: StartPage
    }
];
let StartPageModule = class StartPageModule {
};
StartPageModule = __decorate([
    NgModule({
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
], StartPageModule);
export { StartPageModule };
