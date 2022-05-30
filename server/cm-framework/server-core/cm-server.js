"use strict";
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _this = this;
exports.__esModule = true;
exports.CmServer = void 0;
// https://www.digitalocean.com/community/tutorials/how-to-use-decorators-in-typescript
require("reflect-metadata");
var myDecorator = function (target, propertyKey, descriptor) {
    // do something with your method
};
var enumerable = function (value) {
    return function (target, memberName, propertyDescriptor) {
        propertyDescriptor.enumerable = value;
    };
};
var minimumFuel2 = function (deprecationReason) {
    return function (target, memberName, propertyDescriptor) {
        return {
            get: function () {
                var _this = this;
                var wrapperFn = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    console.warn("Method " + memberName + " is deprecated with reason: " + deprecationReason);
                    propertyDescriptor.value.apply(_this, args);
                };
                Object.defineProperty(this, memberName, {
                    value: wrapperFn,
                    configurable: true,
                    writable: true
                });
                return wrapperFn;
            }
        };
    };
};
var minimumFuel = function (fuel) { return function (target, memberName, descriptor) {
    /*	const originalMethod = descriptor.value;

        const wrapperFn = function(...args) {

        };
    */
    var originalMethod = descriptor.value;
    var wrapperFn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _this.data.push("fuel");
        /*
        if (this.fuel > fuel) {
            originalMethod.apply(this, args);
        } else {
            console.log("Not enough fuel!");
        }
        */
        originalMethod.apply(_this, args);
    };
    return wrapperFn();
}; };
var Server = function (target) {
    // do something with your class
};
var Rocket = /** @class */ (function () {
    function Rocket() {
    }
    return Rocket;
}());
var CmServer = /** @class */ (function () {
    function CmServer() {
        this.data = [];
    }
    CmServer.prototype.test = function () {
        this.data.push("YoMan");
        console.log("Yo ::", this.data);
    };
    __decorate([
        enumerable(false),
        minimumFuel2(1)
    ], CmServer.prototype, "test");
    CmServer = __decorate([
        Server
    ], CmServer);
    return CmServer;
}());
exports.CmServer = CmServer;
var app = new CmServer();
var result = Reflect.getOwnMetadataKeys(app);
console.log("RESULT ::", result);
app.test();
console.log("CmServer Data ::", app.data);
