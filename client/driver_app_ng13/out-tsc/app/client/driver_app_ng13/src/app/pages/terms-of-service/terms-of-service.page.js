/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderApiService } from "../../api/order-api.service";
let TermsOfServicePage = class TermsOfServicePage {
    constructor(modalController, orderApi) {
        this.modalController = modalController;
        this.orderApi = orderApi;
    }
    ngOnInit() {
        console.log("Booking data ***** ::", this.data);
    }
    dismiss() {
        this.modalController.dismiss();
    }
};
TermsOfServicePage = __decorate([
    Component({
        selector: 'app-terms-of-service-page',
        templateUrl: 'terms-of-service.page.html',
        styleUrls: [
            './styles/terms-of-service.page.scss'
        ]
    }),
    __metadata("design:paramtypes", [ModalController,
        OrderApiService])
], TermsOfServicePage);
export { TermsOfServicePage };
