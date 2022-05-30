/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NxAppManagerService } from "@nxApp/nx-app-manager.service";
let TabsPage = class TabsPage {
    constructor(appService) {
        this.appService = appService;
    }
    //constructor(public menu: MenuController) { }
    ionViewWillEnter() {
        //	this.menu.enable(true);
    }
    ionTabsDidChange(event) {
        // console.log('ionTabsDidChange', event);
    }
};
TabsPage = __decorate([
    Component({
        selector: 'app-tabs2',
        templateUrl: 'tabs.page.html',
        styleUrls: [
            './styles/tabs.page.scss'
        ]
    }),
    __metadata("design:paramtypes", [NxAppManagerService])
], TabsPage);
export { TabsPage };
