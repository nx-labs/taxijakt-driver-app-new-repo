import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
let NotificationsPage = class NotificationsPage {
    constructor(route) {
        this.route = route;
    }
    ngOnInit() {
        this.subscriptions = this.route.data
            .pipe(
        // Extract data for this page
        switchMap((resolvedRouteData) => {
            return resolvedRouteData['data'].source;
        }))
            .subscribe((pageData) => {
            this.notifications = pageData;
        }, (error) => console.log(error));
    }
    // NOTE: Ionic only calls ngOnDestroy if the page was popped (ex: when navigating back)
    // Since ngOnDestroy might not fire when you navigate from the current page, use ionViewWillLeave to cleanup Subscriptions
    ionViewWillLeave() {
        this.subscriptions.unsubscribe();
    }
};
NotificationsPage = __decorate([
    Component({
        selector: 'app-notifications',
        templateUrl: './notifications.page.html',
        styleUrls: [
            './styles/notifications.page.scss',
            './styles/notifications.shell.scss'
        ]
    }),
    __metadata("design:paramtypes", [ActivatedRoute])
], NotificationsPage);
export { NotificationsPage };
