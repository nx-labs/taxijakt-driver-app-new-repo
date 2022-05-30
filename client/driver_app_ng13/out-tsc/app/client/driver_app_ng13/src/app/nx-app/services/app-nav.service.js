/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { StorageService } from "@core/services/storage.service";
import { NavController } from "@ionic/angular";
import { NxAppPages } from "../app.paths";
let AppNavService = class AppNavService {
    constructor(navController, router, storage) {
        this.navController = navController;
        this.router = router;
        this.storage = storage;
    }
    internalError(errorData) {
        return __awaiter(this, void 0, void 0, function* () {
            this.router.navigate([NxAppPages.InternalError, errorData]);
        });
    }
    navigateRoot(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.navController.navigateRoot([path], options);
        });
    }
    navigateWithData(path, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let navigationExtras = {
                queryParams: {
                    navData: JSON.stringify(data)
                }
            };
            this.storage.set("fromLogin", true);
            return yield this.router.navigate([path], navigationExtras);
        });
    }
    getNavData(route) {
        return new Promise((resolve, reject) => {
            route.queryParams.subscribe(params => {
                if (params && params.navData) {
                    resolve(JSON.parse(params.navData));
                }
            });
        });
    }
};
AppNavService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [NavController,
        Router,
        StorageService])
], AppNavService);
export { AppNavService };
