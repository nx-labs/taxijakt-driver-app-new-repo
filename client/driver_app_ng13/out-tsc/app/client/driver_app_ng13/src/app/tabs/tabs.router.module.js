/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmAuthChildGuard } from "../coldmind/core/cm-auth-guard";
import { TabsPage } from './tabs.page';
const routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: '',
                redirectTo: 'categories',
                pathMatch: 'full'
            },
            {
                path: 'app',
                canActivateChild: [new CmAuthChildGuard()],
                children: [
                    {
                        path: 'start',
                        loadChildren: () => import('../pages/start/start.module').then(m => m.StartPageModule)
                    },
                    {
                        path: 'mess',
                        loadChildren: () => import('../notifications/notifications.module').then(m => m.NotificationsPageModule)
                    }
                ]
            }
        ]
    }
];
let TabsPageRoutingModule = class TabsPageRoutingModule {
};
TabsPageRoutingModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forChild(routes)
        ],
        exports: [RouterModule],
        providers: []
    })
], TabsPageRoutingModule);
export { TabsPageRoutingModule };
