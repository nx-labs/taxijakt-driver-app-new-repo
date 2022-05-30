import { CommonModule }             from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA }   from "@angular/core";
import { NgModule }                 from "@angular/core";
import { IonicModule }              from "@ionic/angular";
import { DriverBusyModalComponent } from "@nxApp/modals/driver-busy-modal/driver-busy-modal.component";
import { SelectCarModalComponent }  from "@nxApp/modals/select-car-modal/select-car-modal.component";
import { ComponentsModule }         from "@components/components.module";
import { NewOrderModalComponent }   from "./new-order-modal/new-order-modal.component";

@NgModule(
	{
		imports     : [
			CommonModule,
			IonicModule,
			ComponentsModule,
		],
		declarations: [
			NewOrderModalComponent,
			SelectCarModalComponent,
			DriverBusyModalComponent
		],
		providers   : [],
		schemas     : [ CUSTOM_ELEMENTS_SCHEMA ]
	})
export class NxModalsModule {
}
