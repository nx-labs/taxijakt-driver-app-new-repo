import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
let PageNotFoundPage = class PageNotFoundPage {
    constructor(menu) {
        this.menu = menu;
    }
    // Disable side menu for this page
    ionViewDidEnter() {
        this.menu.enable(false);
    }
    // Restore to default when leaving this page
    ionViewDidLeave() {
        this.menu.enable(true);
    }
};
PageNotFoundPage = __decorate([
    Component({
        selector: 'app-page-not-found',
        templateUrl: './page-not-found.page.html',
        styleUrls: [
            './styles/page-not-found.page.scss'
        ]
    }),
    __metadata("design:paramtypes", [MenuController])
], PageNotFoundPage);
export { PageNotFoundPage };
