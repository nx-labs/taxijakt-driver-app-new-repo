/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { OnInit }          from "@angular/core";
import { Component }       from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NxEventService }  from "@nxApp/events/nx-event.service";
import { OrderApiService } from "../../api/order-api.service";

@Component(
	{
		selector:    'app-terms-of-service-page',
		templateUrl: 'terms-of-service.page.html',
		styleUrls:   [
			'./styles/terms-of-service.page.scss'
		]
	})
export class TermsOfServicePage implements OnInit {
	data;

	constructor(
		private modalController: ModalController,
		private orderApi: OrderApiService
	) { }

	ngOnInit() {
		console.log("Booking data ***** ::", this.data);
	}

	dismiss(): void {
		this.modalController.dismiss();
	}
}
