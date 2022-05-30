/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Component }           from '@angular/core';
import { MenuController }      from '@ionic/angular';
import { NxAppManagerService } from "@nxApp/nx-app-manager.service";

@Component(
	{
		selector:    'app-tabs',
		templateUrl: 'tabs.page.html',
		styleUrls:   [
			'./styles/tabs.page.scss'
		]
	})
export class TabsPage {
	constructor(public appService: NxAppManagerService) {
	}

	//constructor(public menu: MenuController) { }

	ionViewWillEnter() {
	//	this.menu.enable(true);
	}

	ionTabsDidChange(event) {
		// console.log('ionTabsDidChange', event);
	}
}
