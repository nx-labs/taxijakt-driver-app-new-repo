import { __decorate } from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { NotificationsPage } from './notifications.page';
import { NotificationsResolver } from '../notifications/notifications.resolver';
import { NotificationsService } from '../notifications/notifications.service';
let NotificationsPageModule = class NotificationsPageModule {
};
NotificationsPageModule = __decorate([
    NgModule({
        imports: [
            IonicModule,
            CommonModule,
            ComponentsModule,
            RouterModule.forChild([
                {
                    path: '',
                    component: NotificationsPage,
                    resolve: {
                        data: NotificationsResolver
                    }
                }
            ])
        ],
        declarations: [NotificationsPage],
        providers: [
            NotificationsResolver,
            NotificationsService
        ]
    })
], NotificationsPageModule);
export { NotificationsPageModule };
