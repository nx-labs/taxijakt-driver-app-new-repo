import { __decorate } from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactCardPage } from './contact-card.page';
import { ComponentsModule } from '../../components/components.module';
let ContactCardPageModule = class ContactCardPageModule {
};
ContactCardPageModule = __decorate([
    NgModule({
        imports: [
            IonicModule,
            CommonModule,
            ComponentsModule,
            RouterModule.forChild([{ path: '', component: ContactCardPage }])
        ],
        declarations: [ContactCardPage]
    })
], ContactCardPageModule);
export { ContactCardPageModule };
