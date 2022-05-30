import { __decorate } from "tslib";
import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SelectCarModalComponent } from "@nxApp/modals/select-car-modal/select-car-modal.component";
import { ComponentsModule } from "@components/components.module";
import { NewOrderModalComponent } from "./new-order-modal/new-order-modal.component";
let NxModalsModule = class NxModalsModule {
};
NxModalsModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            IonicModule,
            ComponentsModule,
        ],
        declarations: [
            NewOrderModalComponent,
            SelectCarModalComponent
        ],
        providers: [],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
], NxModalsModule);
export { NxModalsModule };
