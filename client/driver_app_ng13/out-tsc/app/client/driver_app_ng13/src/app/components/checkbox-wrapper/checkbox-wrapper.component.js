import { __decorate, __metadata } from "tslib";
import { Component, ContentChild, HostBinding } from '@angular/core';
// Reference to the @ionic/angular Components List:
// https://github.com/ionic-team/ionic/blob/master/angular/src/directives/proxies.ts
import { IonCheckbox } from '@ionic/angular';
let CheckboxWrapperComponent = class CheckboxWrapperComponent {
    constructor() { }
    ngAfterContentInit() {
        // ContentChild is set
        this.isChecked = this.checkbox.checked;
        // Subscribe to changes
        this.checkbox.ionChange.subscribe(changes => {
            this.isChecked = changes.detail.checked;
        });
    }
};
__decorate([
    ContentChild(IonCheckbox),
    __metadata("design:type", IonCheckbox)
], CheckboxWrapperComponent.prototype, "checkbox", void 0);
__decorate([
    HostBinding('class.checkbox-checked'),
    __metadata("design:type", Boolean)
], CheckboxWrapperComponent.prototype, "isChecked", void 0);
CheckboxWrapperComponent = __decorate([
    Component({
        selector: 'app-checkbox-wrapper',
        templateUrl: './checkbox-wrapper.component.html',
        styleUrls: [
            './checkbox-wrapper.component.scss'
        ]
    }),
    __metadata("design:paramtypes", [])
], CheckboxWrapperComponent);
export { CheckboxWrapperComponent };
