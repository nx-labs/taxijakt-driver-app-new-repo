import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
let ForgotPasswordPage = class ForgotPasswordPage {
    constructor(router, menu) {
        this.router = router;
        this.menu = menu;
        this.validation_messages = {
            'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'pattern', message: 'Enter a valid email.' }
            ]
        };
        this.forgotPasswordForm = new FormGroup({
            'email': new FormControl('test@test.com', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ]))
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
    recoverPassword() {
        console.log(this.forgotPasswordForm.value);
        this.router.navigate(['app/start']);
    }
};
ForgotPasswordPage = __decorate([
    Component({
        selector: 'app-forgot-password',
        templateUrl: './forgot-password.page.html',
        styleUrls: [
            './styles/forgot-password.page.scss'
        ]
    }),
    __metadata("design:paramtypes", [Router,
        MenuController])
], ForgotPasswordPage);
export { ForgotPasswordPage };
