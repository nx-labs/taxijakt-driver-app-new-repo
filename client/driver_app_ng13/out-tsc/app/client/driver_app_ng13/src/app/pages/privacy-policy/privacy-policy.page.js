import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
let PrivacyPolicyPage = class PrivacyPolicyPage {
    constructor(modalController) {
        this.modalController = modalController;
    }
    dismiss() {
        this.modalController.dismiss();
    }
};
PrivacyPolicyPage = __decorate([
    Component({
        selector: 'app-privacy-policy-page',
        templateUrl: 'privacy-policy.page.html',
        styleUrls: [
            './styles/privacy-policy.page.scss'
        ]
    }),
    __metadata("design:paramtypes", [ModalController])
], PrivacyPolicyPage);
export { PrivacyPolicyPage };
