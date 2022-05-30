import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShellModule } from './shell/shell.module';
import { CheckboxWrapperComponent } from './checkbox-wrapper/checkbox-wrapper.component';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { CounterInputComponent } from './counter-input/counter-input.component';
import { RatingInputComponent } from './rating-input/rating-input.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { ModalComponent } from './modal/modal.component';
let ComponentsModule = class ComponentsModule {
};
ComponentsModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            ShellModule,
            IonicModule
        ],
        declarations: [
            CheckboxWrapperComponent,
            ShowHidePasswordComponent,
            CountdownTimerComponent,
            CounterInputComponent,
            RatingInputComponent,
            GoogleMapComponent,
            ModalComponent
        ],
        exports: [
            ShellModule,
            CheckboxWrapperComponent,
            ShowHidePasswordComponent,
            CountdownTimerComponent,
            CounterInputComponent,
            RatingInputComponent,
            GoogleMapComponent
        ]
    })
], ComponentsModule);
export { ComponentsModule };
