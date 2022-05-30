import { __decorate, __metadata, __param } from "tslib";
import { isPlatformBrowser } from '@angular/common';
import { Component, ViewChild, HostBinding, Inject, PLATFORM_ID } from '@angular/core';
import { IonSlides, MenuController } from '@ionic/angular';
let SettingsPage = class SettingsPage {
    constructor(platformId, menu) {
        this.platformId = platformId;
        this.menu = menu;
        this.isLastSlide = false;
    }
    // Disable side menu for this page
    ionViewDidEnter() {
        this.menu.enable(false);
    }
    // Restore to default when leaving this page
    ionViewDidLeave() {
        this.menu.enable(true);
    }
    ngAfterViewInit() {
        // Accessing slides in server platform throw errors
        if (isPlatformBrowser(this.platformId)) {
            // ViewChild is set
            this.slides.isEnd().then(isEnd => {
                this.isLastSlide = isEnd;
            });
            // Subscribe to changes
            this.slides.ionSlideWillChange.subscribe(changes => {
                this.slides.isEnd().then(isEnd => {
                    this.isLastSlide = isEnd;
                });
            });
        }
    }
};
__decorate([
    ViewChild(IonSlides, { static: true }),
    __metadata("design:type", IonSlides)
], SettingsPage.prototype, "slides", void 0);
__decorate([
    HostBinding('class.last-slide-active'),
    __metadata("design:type", Object)
], SettingsPage.prototype, "isLastSlide", void 0);
SettingsPage = __decorate([
    Component({
        selector: 'app-orders',
        templateUrl: './settings.page.html',
        styleUrls: [
            './styles/getting-started.page.scss',
            './styles/getting-started.shell.scss',
            './styles/getting-started.responsive.scss'
        ]
    }),
    __param(0, Inject(PLATFORM_ID)),
    __metadata("design:paramtypes", [Object, MenuController])
], SettingsPage);
export { SettingsPage };
