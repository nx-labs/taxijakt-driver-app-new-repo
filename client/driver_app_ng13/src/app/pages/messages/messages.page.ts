/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { isPlatformBrowser }   from '@angular/common';
import { Component }           from '@angular/core';
import { AfterViewInit }       from '@angular/core';
import { ViewChild }           from '@angular/core';
import { HostBinding }         from '@angular/core';
import { PLATFORM_ID }         from '@angular/core';
import { Inject }              from '@angular/core';
import { IonSlides }           from '@ionic/angular';
import { MenuController }      from '@ionic/angular';
import { NxAppManagerService } from "@nxApp/nx-app-manager.service";

@Component(
	{
		selector:    'app-messages',
		templateUrl: './messages.page.html',
		styleUrls:   [
			'./styles/messages.page.scss',
			'./styles/messages.shell.scss',
			'./styles/messages.responsive.scss'
		]
	})
export class MessagesPage implements AfterViewInit {
	/*
	@ViewChild(IonSlides, { static: true }) slides: IonSlides;
	@HostBinding('class.first-slide-active') isFirstSlide = true;
	@HostBinding('class.last-slide-active') isLastSlide = false;
	*/

	constructor(
		@Inject(PLATFORM_ID) private platformId: object,
		public menu: MenuController,
		public appData: NxAppManagerService
	) { }

	// Disable side menu for this page
	ionViewDidEnter(): void {
		this.menu.enable(false);
	}

	// Restore to default when leaving this page
	ionViewDidLeave(): void {
		this.menu.enable(true);
	}

	ngAfterViewInit(): void {
		if (isPlatformBrowser(this.platformId)) {
		}
	}
}
