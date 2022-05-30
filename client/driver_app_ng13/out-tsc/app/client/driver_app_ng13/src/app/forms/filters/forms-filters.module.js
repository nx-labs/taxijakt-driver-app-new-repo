import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';
import { FormsFiltersPage } from './forms-filters.page';
const routes = [
    {
        path: '',
        component: FormsFiltersPage
    }
];
let FormsFiltersPageModule = class FormsFiltersPageModule {
};
FormsFiltersPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            IonicModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule.forChild(routes),
            ComponentsModule
        ],
        declarations: [FormsFiltersPage]
    })
], FormsFiltersPageModule);
export { FormsFiltersPageModule };
