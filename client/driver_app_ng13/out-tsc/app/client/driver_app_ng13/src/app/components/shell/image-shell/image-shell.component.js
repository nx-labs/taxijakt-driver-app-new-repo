import { __decorate, __metadata } from "tslib";
import { Component, Input, HostBinding } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ImageShellState, TransferStateHelper } from '@utils/transfer-state-helper';
let ImageShellComponent = class ImageShellComponent {
    constructor(transferStateHelper) {
        this.transferStateHelper = transferStateHelper;
        // To debug shell styles, change configuration in the environment file
        this.debugDisplay = (environment.appShellConfig && environment.appShellConfig.debug)
            ? environment.appShellConfig.debug : false;
        this._src = '';
        this._alt = '';
        this._loadingStrategy = 'lazy';
        this._display = '';
        this.imageSSR = false;
        this.imageLoaded = false;
        this.imageError = false;
        this.errorMessage = 'Could not load image';
    }
    set display(val) {
        this._display = (val !== undefined && val !== null) ? val : '';
        // For display 'cover' we use a hidden aux image. As it's hidden, if set loading to 'lazy' it won't ever trigger the loading mechanism
        if (this._display === 'cover') {
            this._loadingStrategy = 'eager';
        }
    }
    get display() {
        return this._display;
    }
    set src(val) {
        if (!this.debugDisplay) {
            this._src = (val !== undefined && val !== null) ? val : '';
        }
        // When using SSR (Server Side Rendering), avoid the loading animation while the image resource is being loaded
        const imageState = this.transferStateHelper.checkImageShellState('shell-images-state', this._src);
        if (imageState === ImageShellState.SSR || imageState === ImageShellState.BROWSER_FROM_SSR) {
            this._imageProcessedInServer();
        }
        else {
            if (this._display === 'cover') {
                // Unset the background-image until the image is loaded
                this.backgroundImage = 'unset';
            }
        }
    }
    set alt(val) {
        this._alt = (val !== undefined && val !== null) ? val : '';
    }
    _imageProcessedInServer() {
        this.imageSSR = true;
        // Also set backgroundImage so it's ready when transitioning from SSR to the browser
        if (this._display === 'cover') {
            this.backgroundImage = 'url(' + this._src + ')';
        }
    }
    _imageLoaded() {
        this.imageLoaded = true;
        // If it's a cover image then set the background-image property accordingly
        if (this._display === 'cover') {
            // Now that the image is loaded, set the background image
            this.backgroundImage = 'url(' + this._src + ')';
        }
    }
    _imageLoadError(event) {
        // Image error event get's called when the src is empty. We use emty values for the shell.
        // (see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Image_loading_errors)
        // Avoid that shell case
        if (this._src && this._src !== '') {
            this.imageLoaded = false;
            this.imageSSR = false;
            setTimeout(() => {
                this.imageError = true;
            }, 500);
        }
    }
};
__decorate([
    HostBinding('class.img-ssr'),
    __metadata("design:type", Object)
], ImageShellComponent.prototype, "imageSSR", void 0);
__decorate([
    HostBinding('class.img-loaded'),
    __metadata("design:type", Object)
], ImageShellComponent.prototype, "imageLoaded", void 0);
__decorate([
    HostBinding('class.img-error'),
    __metadata("design:type", Object)
], ImageShellComponent.prototype, "imageError", void 0);
__decorate([
    HostBinding('attr.data-error'),
    __metadata("design:type", Object)
], ImageShellComponent.prototype, "errorMessage", void 0);
__decorate([
    HostBinding('style.backgroundImage'),
    __metadata("design:type", String)
], ImageShellComponent.prototype, "backgroundImage", void 0);
__decorate([
    HostBinding('attr.display'),
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ImageShellComponent.prototype, "display", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ImageShellComponent.prototype, "src", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ImageShellComponent.prototype, "alt", null);
ImageShellComponent = __decorate([
    Component({
        selector: 'app-image-shell',
        templateUrl: './image-shell.component.html',
        styleUrls: ['./image-shell.component.scss']
    }),
    __metadata("design:paramtypes", [TransferStateHelper])
], ImageShellComponent);
export { ImageShellComponent };
