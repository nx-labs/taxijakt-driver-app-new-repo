import { __decorate } from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { PageNotFoundPage } from './page-not-found.page';
let PageNotFoundModule = class PageNotFoundModule {
};
PageNotFoundModule = __decorate([
    NgModule({
        imports: [
            IonicModule,
            CommonModule,
            ComponentsModule,
            RouterModule.forChild([
                {
                    path: '',
                    component: PageNotFoundPage
                }
            ])
        ],
        declarations: [PageNotFoundPage]
    })
], PageNotFoundModule);
export { PageNotFoundModule };
