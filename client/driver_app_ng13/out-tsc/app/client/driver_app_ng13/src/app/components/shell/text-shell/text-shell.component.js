import { __decorate, __metadata } from "tslib";
import { Component, Input, HostBinding } from '@angular/core';
import { environment } from '../../../../environments/environment';
let TextShellComponent = class TextShellComponent {
    constructor() {
        // To debug shell styles, change configuration in the environment file
        this.debugMode = (environment.appShellConfig && environment.appShellConfig.debug) ? environment.appShellConfig.debug : false;
        this.textLoaded = false;
    }
    set data(val) {
        if (!this.debugMode) {
            this._data = (val !== undefined && val !== null) ? val : '';
        }
        if (this._data && this._data !== '') {
            this.textLoaded = true;
        }
        else {
            this.textLoaded = false;
        }
    }
};
__decorate([
    HostBinding('class.text-loaded'),
    __metadata("design:type", Object)
], TextShellComponent.prototype, "textLoaded", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], TextShellComponent.prototype, "data", null);
TextShellComponent = __decorate([
    Component({
        selector: 'app-text-shell',
        templateUrl: './text-shell.component.html',
        styleUrls: ['./text-shell.component.scss']
    }),
    __metadata("design:paramtypes", [])
], TextShellComponent);
export { TextShellComponent };
