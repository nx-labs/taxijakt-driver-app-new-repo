/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { IonRouterOutlet } from '@ionic/angular';
import { TermsOfServicePage } from '../terms-of-service/terms-of-service.page';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy.page';
import { PasswordValidator } from '../../core/validators/password.validator';
let SignupPage = class SignupPage {
    constructor(router, modalController, menu, routerOutlet) {
        this.router = router;
        this.modalController = modalController;
        this.menu = menu;
        this.routerOutlet = routerOutlet;
        this.validation_messages = {
            'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'pattern', message: 'Enter a valid email.' }
            ],
            'password': [
                { type: 'required', message: 'Password is required.' },
                { type: 'minlength', message: 'Password must be at least 5 characters long.' }
            ],
            'confirm_password': [
                { type: 'required', message: 'Confirm password is required' }
            ],
            'matching_passwords': [
                { type: 'areNotEqual', message: 'Password mismatch' }
            ]
        };
        this.matching_passwords_group = new FormGroup({
            'password': new FormControl('', Validators.compose([
                Validators.minLength(5),
                Validators.required
            ])),
            'confirm_password': new FormControl('', Validators.required)
        }, (formGroup) => {
            return PasswordValidator.areNotEqual(formGroup);
        });
        this.signupForm = new FormGroup({
            'email': new FormControl('test@test.com', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            'matching_passwords': this.matching_passwords_group
        });
    }
    // Disable side menu for this page
    ionViewDidEnter() {
        this.menu.enable(false);
    }
    // Restore to default when leaving this page
    ionViewDidLeave() {
        this.menu.enable(true);
    }
    showTermsModal() {
        return __awaiter(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: TermsOfServicePage,
                swipeToClose: true,
                presentingElement: this.routerOutlet.nativeEl
            });
            return yield modal.present();
        });
    }
    showPrivacyModal() {
        return __awaiter(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: PrivacyPolicyPage,
                swipeToClose: true,
                presentingElement: this.routerOutlet.nativeEl
            });
            return yield modal.present();
        });
    }
    doSignup() {
        console.log('do sign up');
        this.router.navigate(['app/start']);
    }
    doFacebookSignup() {
        console.log('facebook signup');
        this.router.navigate(['app/start']);
    }
    doGoogleSignup() {
        console.log('google signup');
        this.router.navigate(['app/start']);
    }
    doTwitterSignup() {
        console.log('twitter signup');
        this.router.navigate(['app/start']);
    }
    doAppleSignup() {
        console.log('apple signup');
        this.router.navigate(['app/start']);
    }
};
SignupPage = __decorate([
    Component({
        selector: 'app-signup',
        templateUrl: './signup.page.html',
        styleUrls: [
            './styles/signup.page.scss'
        ]
    }),
    __metadata("design:paramtypes", [Router,
        ModalController,
        MenuController,
        IonRouterOutlet])
], SignupPage);
export { SignupPage };
