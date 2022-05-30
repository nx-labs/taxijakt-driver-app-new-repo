/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
let StorageService = class StorageService {
    constructor(storage) {
        this.storage = storage;
        this.dataStorage = null;
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dataStorage = yield this.storage.create();
        });
    }
    set(key, value) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("DATA STORE ::", key, "::", value);
            return yield ((_a = this.dataStorage) === null || _a === void 0 ? void 0 : _a.set(key, value));
        });
    }
    get(key) {
        var _a;
        return (_a = this.dataStorage) === null || _a === void 0 ? void 0 : _a.get(key);
    }
    getAs(key) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield ((_a = this.dataStorage) === null || _a === void 0 ? void 0 : _a.get(key));
        });
    }
    remove(key) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield ((_a = this.dataStorage) === null || _a === void 0 ? void 0 : _a.remove(key));
        });
    }
    clear() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield ((_a = this.dataStorage) === null || _a === void 0 ? void 0 : _a.clear());
        });
    }
};
StorageService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [Storage])
], StorageService);
export { StorageService };
