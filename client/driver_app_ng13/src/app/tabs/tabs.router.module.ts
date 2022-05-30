/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmAuthChildGuard }     from "../coldmind/core/cm-auth-guard";
import { CmAuthGuard }          from "../coldmind/core/cm-auth-guard";
import { TabsPage }             from './tabs.page';

const routes: Routes = [
	{
		path     : '',
		component: TabsPage,
		children : [
			{
				path      : '',
				redirectTo: 'categories',
				pathMatch : 'full'
			},
			{
				path            : 'app',
				canActivateChild: [ new CmAuthChildGuard() ],
				children        : [
					{
						path        : 'start',
						loadChildren: () => import('../pages/start/start.module').then(m => m.StartPageModule)
					},
					{
						path        : 'messages',
						loadChildren: () => import('../pages/messages/messages.module').then(m => m.MessagesPageModule)
					},
					{
						path        : 'mess',
						loadChildren: () => import('../notifications/notifications.module').then(m => m.NotificationsPageModule)
					}
				]
			}
		]
	}
];

@NgModule(
	{
		imports  : [
			RouterModule.forChild(routes)
		],
		exports  : [ RouterModule ],
		providers: []
	})
export class TabsPageRoutingModule { }
