import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
let HistoryHelperService = class HistoryHelperService {
    constructor(router) {
        this.router = router;
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(({ urlAfterRedirects }) => {
            // console.log('previous URL', this.previousUrl);
            this.previousUrl = urlAfterRedirects;
            // console.log('NEW previous URL', this.previousUrl);
        });
    }
};
HistoryHelperService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [Router])
], HistoryHelperService);
export { HistoryHelperService };
