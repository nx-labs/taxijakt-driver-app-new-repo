import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';
import { FormsValidationsPage } from './forms-validations.page';
const routes = [
    {
        path: '',
        component: FormsValidationsPage
    }
];
let FormsValidationsPageModule = class FormsValidationsPageModule {
};
FormsValidationsPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            IonicModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule.forChild(routes),
            ComponentsModule
        ],
        declarations: [FormsValidationsPage]
    })
], FormsValidationsPageModule);
export { FormsValidationsPageModule };
