import { __decorate, __metadata, __param } from "tslib";
import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
export var ImageShellState;
(function (ImageShellState) {
    ImageShellState["SSR"] = "ssr-loaded";
    ImageShellState["BROWSER_FROM_SSR"] = "browser-loaded-from-ssr";
    ImageShellState["NOT_FOUND"] = "not-found";
})(ImageShellState || (ImageShellState = {}));
let TransferStateHelper = class TransferStateHelper {
    constructor(platformId, state) {
        this.platformId = platformId;
        this.state = state;
    }
    // Method with generic param
    checkDataSourceState(stateKey, dataSource) {
        const dataKey = makeStateKey(stateKey);
        if (isPlatformServer(this.platformId)) {
            // When loading resource in the server, store the result in the TransferState
            // to use when transitioning to the browser from the SSR rendered app
            return dataSource.pipe(tap((data) => {
                this.state.set(dataKey, data);
            }));
        }
        else {
            // Check if we have data in the TransferState
            if (this.state.hasKey(dataKey)) {
                const stateData = this.state.get(dataKey, null);
                if (stateData && stateData !== null) {
                    const cachedDataSource = of(stateData);
                    // After using it, remove data from state
                    // this.state.remove(dataKey);
                    // Set a flag to track if the dataSource is being cached in the server state or not
                    Object.assign(cachedDataSource, { ssr_state: true });
                    return cachedDataSource;
                }
                else {
                    return dataSource;
                }
            }
            else {
                return dataSource;
            }
        }
    }
    // This method checks if a specific image was previously handled in the server
    checkImageShellState(stateKey, imageSource) {
        let imageState = ImageShellState.NOT_FOUND;
        // Make sure we are not dealing with empty image sources
        if (imageSource !== '') {
            // We will store a collection of image sources in the state
            const dataKey = makeStateKey(stateKey);
            if (isPlatformServer(this.platformId)) {
                // When loading resource in the server, store the result in the TransferState
                // to use when transitioning to the browser from the SSR rendered app
                const stateImages = this.state.get(dataKey, []);
                stateImages.push(imageSource);
                this.state.set(dataKey, stateImages);
                // Running in the server, in this execution the image is set in the transfer state for the first time
                imageState = ImageShellState.SSR;
            }
            else {
                // Check if we have data in the TransferState
                if (this.state.hasKey(dataKey)) {
                    const stateData = this.state.get(dataKey, []);
                    // Check if the image was previously loaded in the server
                    if (stateData.includes(imageSource)) {
                        imageState = ImageShellState.BROWSER_FROM_SSR;
                    }
                }
            }
        }
        return imageState;
    }
};
TransferStateHelper = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(0, Inject(PLATFORM_ID)),
    __metadata("design:paramtypes", [Object, TransferState])
], TransferStateHelper);
export { TransferStateHelper };
