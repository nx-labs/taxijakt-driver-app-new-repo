/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const GEOLOCATION_ERRORS = {
    'errors.location.unsupportedBrowser': 'Browser does not support location services',
    'errors.location.permissionDenied': 'You have rejected access to your location',
    'errors.location.positionUnavailable': 'Unable to determine your location',
    'errors.location.timeout': 'Service timeout has been reached'
};
let GeoService = class GeoService {
    geoEnabled() {
        return !(!window.navigator || !window.navigator.geolocation);
    }
    watchPosition() {
        return new Observable(observer => {
            let watchId;
            const success = position => {
                observer.next(position);
            };
            const error = err => {
                observer.error(err);
            };
            if (this.geoEnabled()) {
                window.navigator.geolocation.watchPosition((position) => {
                    observer.next(position);
                }, (error) => {
                    switch (error.code) {
                        case 1:
                            observer.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
                            break;
                        case 2:
                            observer.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
                            break;
                        case 3:
                            observer.error(GEOLOCATION_ERRORS['errors.location.timeout']);
                            break;
                    }
                });
            }
            else {
                console.log("GEO NOT ENABLED !!!!!");
                observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
            }
        });
    }
    getPosition(geoLocationOptions) {
        geoLocationOptions = geoLocationOptions || { timeout: 5000 };
        return new Promise((resolve, reject) => {
            if (this.geoEnabled()) {
                window.navigator.geolocation.getCurrentPosition((position) => {
                    resolve(position);
                }, (error) => {
                    switch (error.code) {
                        case 1:
                            reject(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
                            break;
                        case 2:
                            reject(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
                            break;
                        case 3:
                            reject(GEOLOCATION_ERRORS['errors.location.timeout']);
                            break;
                    }
                }, geoLocationOptions);
            }
            else {
                reject(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
            }
        });
    }
    getLocation(geoLocationOptions) {
        geoLocationOptions = geoLocationOptions || { timeout: 5000 };
        return new Observable(observer => {
            if (this.geoEnabled()) {
                window.navigator.geolocation.getCurrentPosition((position) => {
                    observer.next(position);
                    observer.complete();
                }, (error) => {
                    switch (error.code) {
                        case 1:
                            observer.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
                            break;
                        case 2:
                            observer.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
                            break;
                        case 3:
                            observer.error(GEOLOCATION_ERRORS['errors.location.timeout']);
                            break;
                    }
                }, geoLocationOptions);
            }
            else {
                observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
            }
        });
    }
};
GeoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], GeoService);
export { GeoService };
